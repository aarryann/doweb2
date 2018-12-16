// tslint:disable:no-console
const fs = require('fs');
const readline = require('readline');
const yaml = require('js-yaml');

const parseSyntax = (category, appConfig) => {
  let parsedSyntax = {};
  const viewKeys = Object.keys(appConfig.Views);
  for (let view of viewKeys) {
    // console.log(JSON.stringify(appConfig.Views[view], null, 4));
    let viewConfig = appConfig.Views[view];
    if (viewConfig.category.toLowerCase() !== category.toLowerCase()) {
      continue;
    }
    parsedSyntax[view] = {};
    parsedSyntax[view]['#COMPONENT_NAME#'] = view + category;
    parsedSyntax[view]['#DECLARE_PROPS#'] = '';
    parsedSyntax[view]['#DECLARE_DATASOURCE#'] = '';
    const childrenKeys = Object.keys(viewConfig.children);
    for (let index of childrenKeys) {
      let componentConfig = viewConfig.children[index];
      parsedSyntax[view]['#DECLARE_PROPS#'] += getSyntax(
        '#DECLARE_PROPS#',
        index,
        componentConfig
      );
      parsedSyntax[view]['#DECLARE_DATASOURCE#'] += getSyntax(
        '#DECLARE_DATASOURCE#',
        index,
        componentConfig
      );
    }
  }

  console.log(JSON.stringify(parsedSyntax, null, 4));
  return parsedSyntax;
};

const getSyntax = (syntax, index, componentConfig) => {
  switch (syntax) {
    case '#DECLARE_PROPS#': {
      return `const props${index} = props.children['${index}'].props;\r\n`;
    }
    case '#DECLARE_DATASOURCE#': {
      return `const [results${index}, setResults${index}] = Datasources.${
        componentConfig.dataSource
      }(props.client);\r\n`;
    }
  }
};

const transformSyntax = (line, syntax, parsedSyntaxView) => {
  if (line.indexOf(syntax) >= 0) {
    return line.replace(syntax, parsedSyntaxView[syntax]);
  } else {
    return line;
  }
};

const convertSyntax = (line, parsedSyntaxView) => {
  let transformedLine = transformSyntax(
    line,
    '#COMPONENT_NAME#',
    parsedSyntaxView
  );
  transformedLine = transformSyntax(
    transformedLine,
    '#DECLARE_PROPS#',
    parsedSyntaxView
  );
  transformedLine = transformSyntax(
    transformedLine,
    '#DECLARE_DATASOURCE#',
    parsedSyntaxView
  );
  transformedLine = transformSyntax(
    transformedLine,
    '#DECLARE_ACTIONS#',
    parsedSyntaxView
  );
  transformedLine = transformSyntax(
    transformedLine,
    '#LIST_COMPONENTS#',
    parsedSyntaxView
  );
  return transformedLine;
};

const generateComponent = (cat, componentId, parsedSyntaxView) => {
  const readStream = fs.createReadStream(
    `./src/templates/${cat.toLowerCase()}.tpl`
  );
  const writeStream = fs.createWriteStream(
    `./src/out/${componentId}.${cat.toLowerCase()}.tsx`,
    {
      encoding: 'utf8'
    }
  );

  const rl = readline.createInterface({
    input: readStream,
    //    output: writeStream,
    terminal: false,
    historySize: 0
  });

  rl.on('line', line => {
    let transformedLine = line;
    if (line.indexOf('#') >= 0) {
      transformedLine = convertSyntax(line, parsedSyntaxView);
    }
    // console.log(line);
    // Do your stuff ...
    // const transformedLine = line.toUpperCase();
    // console.log(transformedLine);

    // Then write to outstream
    writeStream.write(transformedLine + '\r\n');
  });
};

const tokenize = (cat, line, lexDict) => {
  let transformedLine = extractValueTokens(cat, line, lexDict);
  let completeTag = transformedLine;
  let transform = false;
  const wip = lexDict[cat]['WIP'];
  if (wip.length > 0) {
    completeTag += wip + transformedLine + '\r\n';
  }
  if (completeTag.indexOf('<$') >= 0) {
    const openCount = (completeTag.match(/<\$REPEAT/g) || []).length;
    const closeCount = (completeTag.match(/<\$ENDREPEAT/g) || []).length;
    if (openCount === closeCount) {
      const startIndex = completeTag.indexOf('<$REPEAT');
      const lastIndex = completeTag.lastIndexOf('<$ENDREPEAT>');
      // Extract contents with enclosed Repeat-EndRepeat tag
      const extracted = completeTag.substring(startIndex, lastIndex + 13);
      let replacementTag = extractFunctionTokens(cat, extracted, lexDict);
      transformedLine = completeTag.replace(extracted, replacementTag);
      transform = true;
    } else {
      lexDict[cat]['WIP'] = completeTag;
    }
  } else {
    transform = true;
  }

  return [transform, transformedLine, lexDict];
};

const extractValueTokens = (cat, line, lexDict) => {
  const tokens = line.match(/<=.+?>/g) || [];
  let idx;
  let id;
  for (let token of tokens) {
    if (!lexDict[cat]['vtok']['index'][token.replace('.', '$')]) {
      idx = ++lexDict[cat]['vtok']['counter'];
      id = `00${idx}`.slice(-3);
      lexDict[cat]['vtok']['counter'] = idx;

      lexDict[cat]['vtok']['index'][token.replace('.', '$')] = id;
      const re = new RegExp(token, 'g');
      line = line.replace(re, `#VTOK_${id}#`);
    }
  }
  return line;
};

const extractFunctionTokens = (cat, line, lexDict) => {
  let transformedLine = line;
  if (line.indexOf('<$') > 1) {
    const startIndex = line.indexOf('<$REPEAT');
    const lastIndex = line.lastIndexOf('<$ENDREPEAT>');
    // Extract contents with enclosed Repeat-EndRepeat tag
    const extracted = line.substring(startIndex, lastIndex + 13);
    let replacementTag = extractFunctionTokens(cat, extracted, lexDict);
    transformedLine = line.replace(extracted, replacementTag);
  }
  const idx = ++lexDict[cat]['ftok']['counter'];
  let id = `00${idx}`.slice(-3);
  lexDict[cat]['ftok']['counter'] = idx;
  const tag = `#FTOK_${id}#`;
  lexDict[cat]['ftok'][tag] = transformedLine;
  console.log(JSON.stringify(lexDict[cat], null, 4));
  return tag;
};

const extractMeanings = (oConfig, lexDict, flatKey) => {
  const oKeys = Object.keys(oConfig) || [];
  if (oKeys.length === 0) {
    // Exit condition
  } else {
    for (let oKey of oKeys) {
      extractMeanings(oConfig[oKey], lexDict, `${flatKey}$${oKey}`);
    }
  }
};

const parser = (cat, lexDict, appConfig) => {
  let parsedSyntax = {};
  const viewKeys = Object.keys(appConfig.Views);
  for (let view of viewKeys) {
    // console.log(JSON.stringify(appConfig.Views[view], null, 4));
    let viewConfig = appConfig.Views[view];
    if (viewConfig.category.toLowerCase() !== cat.toLowerCase()) {
      continue;
    }
    lexDict[cat]['vtok'][view] = {};
    extractMeanings(viewConfig, lexDict, 'ROOT');
  }

  console.log(JSON.stringify(parsedSyntax, null, 4));
  return parsedSyntax;
};

const lexer = (cat, viewConfig, lexDict) => {
  const readStream = fs.createReadStream(
    `./src/templates/${cat.toLowerCase()}.tpl`
  );
  const writeStream = fs.createWriteStream(
    `./src/out/staged.${cat.toLowerCase()}.tmp`,
    {
      encoding: 'utf8'
    }
  );

  lexDict[cat] = {};
  lexDict[cat]['WIP'] = '';
  lexDict[cat]['ftok'] = {};
  lexDict[cat]['vtok'] = {};
  lexDict[cat]['vtok']['index'] = {};
  lexDict[cat]['ftok']['counter'] = 0;
  lexDict[cat]['vtok']['counter'] = 0;

  const rl = readline.createInterface({
    input: readStream,
    //    output: writeStream,
    terminal: false,
    historySize: 0
  });

  rl.on('line', line => {
    // Do your stuff ...
    let [transform, transformedLine, ...rest] = tokenize(cat, line, lexDict);

    // Then write to outstream
    if (transform) {
      writeStream.write(transformedLine + '\r\n');
    }
  });

  return lexDict;
};

const categories = ['Mgen'];
const appConfig = yaml.safeLoad(
  fs.readFileSync('./src/config/viewconfig.yaml', 'utf8')
);

let lexMap = {};
for (let category of categories) {
  lexMap = lexer(category, appConfig.Views, lexMap);

  /*
  const viewKeys = Object.keys(parsedSyntax);
  for (let view of viewKeys) {
    // console.log(JSON.stringify(appConfig.Views[view], null, 4));
    let componentSyntax = parsedSyntax[view];
    generateComponent(category, view, componentSyntax);
  }
  */
}
