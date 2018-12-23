// tslint:disable:no-console
const fs = require('fs');
const readline = require('readline');
const yaml = require('js-yaml');

const parseSyntax = (category, appConfig) => {
  let parsedSyntax = {};
  const viewKeys = Object.keys(appConfig.Views);
  for (let view of viewKeys) {
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
    // Do your stuff ...
    // const transformedLine = line.toUpperCase();

    // Then write to outstream
    writeStream.write(transformedLine + '\r\n');
  });
};

const tokenize = (cat, line, lexDict) => {
  // let transformedLine = extractValueTokens(cat, line, lexDict);
  let transformedLine = line;
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

const extractFunctionTokens = (cat, tag, lexDict) => {
  if (tag.indexOf('<$REPEAT', 1) >= 0) {
    let startIndex = tag.search(/<\$REPEAT.+?>/);
    let startLen = tag.match(/<\$REPEAT.+?>/)[0].length;
    let lastIndex = tag.lastIndexOf('<$ENDREPEAT>');
    // Extract contents with enclosed Repeat-EndRepeat tag
    let tagValue = tag.substring(startIndex + startLen, lastIndex);
    const replacementkey = extractFunctionTokens(cat, tagValue, lexDict);
    tag = tag.replace(tagValue, replacementkey);
  }
  const idx = ++lexDict[cat]['ftok']['counter'];
  let id = `00${idx}`.slice(-3);
  lexDict[cat]['ftok']['counter'] = idx;
  const key = `#FTOK_${id}#`;
  lexDict[cat]['ftok'][key] = tag;
  return key;
};

const getValues = (value, keyStore, oConfig) => {
  const valuePairs = value.split('.');
  let returnValue = null;
  for (let i = 0; i < valuePairs.length; i++) {
    const valuePair = valuePairs[i];
    if (valuePair === 'ROOT') {
      returnValue = oConfig;
    } else if (keyStore[valuePair]) {
      returnValue = keyStore[valuePair];
    } else {
      returnValue = returnValue[valuePair];
    }
  }
  return returnValue;
};

const extractValueDict = (line, oConfig, lexDict) => {
  const endIndex = line.indexOf('>');
  let tagValue = line
    .substring(0, endIndex)
    .replace('<', '')
    .replace('>', '')
    .trim();
  if (tagValue.length === 0) {
    return;
  }
  const tagValuePairs = tagValue.split(' ');
  //console.log(tagValuePairs);
  for (let i = 0; i < tagValuePairs.length; i++) {
    const keyValue = tagValuePairs[i];
    if (
      !keyValue ||
      keyValue.indexOf('=') < 0 ||
      keyValue.indexOf('$REPEAT') === 0
    ) {
      continue;
    }
    const keyValuePair = keyValue.split('=');
    const key = keyValuePair[0].trim();
    if (!lexDict[oConfig.entity]['keyStore'][key]) {
      lexDict[oConfig.entity]['keyStore'][key] = keyValuePair[1].trim();
      lexDict[oConfig.entity]['keyStore'][key] = getValues(
        keyValuePair[1].trim(),
        lexDict[oConfig.entity]['keyStore'],
        oConfig
      );
    }
  }
  // console.log(JSON.stringify(lexDict, null, 4));
  console.log(lexDict);
};

const processMeanings = line => {
  return line;
};

const expandSyntax = (line, oConfig, lexDict) => {
  if (line.indexOf('#FTOK_') < 0) {
    // Exit condition
    // Process line
    line = processMeanings(line);
  } else {
    const tokens = line.match(/#FTOK_\d+?#/g) || [];
    for (let token of tokens) {
      // console.log(lexDict);
      extractValueDict(lexDict[token], oConfig, lexDict);
      const fTok = expandSyntax(lexDict[token], oConfig, lexDict);
      line = line.replace(token, fTok);
    }
  }
  return line;
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
};

const parser = (viewConfig, lexDict) => {
  const readStream = fs.createReadStream(
    `./src/out/staged.${viewConfig.category.toLowerCase()}.tmp`
  );
  const writeStream = fs.createWriteStream(
    `./src/out/${viewConfig.entity}.${viewConfig.category.toLowerCase()}.tsx`,
    {
      encoding: 'utf8'
    }
  );

  lexDict[viewConfig.category]['vtok'][viewConfig.entity] = {};
  lexDict[viewConfig.category]['ftok'][viewConfig.entity] = {};

  const rl = readline.createInterface({
    input: readStream,
    //    output: writeStream,
    terminal: false,
    historySize: 0
  });

  rl.on('line', line => {
    // Do your stuff ...
    lexDict[viewConfig.category]['ftok'][viewConfig.entity].keyStore = {};
    let transformedLine = expandSyntax(
      line,
      viewConfig,
      lexDict[viewConfig.category]['ftok']
    );

    // Then write to outstream
    writeStream.write(transformedLine + '\r\n');
  });
};

const wait1Sec = async () => {
  await new Promise(resolve =>
    // eslint-disable-next-line
    setTimeout(() => {
      console.log('timeout');
      resolve();
    }, 1000)
  );
};

(async function() {
  const categories = ['Mgen'];
  const appConfig = yaml.safeLoad(
    fs.readFileSync('./src/config/viewconfig.yaml', 'utf8')
  );
  let lexMap = {};
  lexMap.throttle = true;
  for (let category of categories) {
    lexer(category, appConfig.Views, lexMap);
    await wait1Sec();

    const viewKeys = Object.keys(appConfig.Views);
    for (let view of viewKeys) {
      let viewConfig = appConfig.Views[view];
      if (viewConfig.category.toLowerCase() !== category.toLowerCase()) {
        continue;
      }
      parser(viewConfig, lexMap);
    }
  }
})();
