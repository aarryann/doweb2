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

const tokenize = (cat, line, lexMap) => {
  let wipLine = line;
  const wip = lexMap[cat]['WIP'];
  if (!lexMap[cat]['counter']) {
    lexMap[cat]['counter'] = 0;
  }
  const match = true; //Placeholder
  if (wip.length > 0) {
    wipLine += wip + line;
  }
  if (wipLine.indexOf('<$') >= 0) {
    const openCount = wipLine.match(/<\$REPEAT/g);
    const closeCount = wipLine.match(/<\$ENDREPEAT/g);
    if (openCount === closeCount) {
      const idx = lexMap[cat]['counter']++;
      lexMap[cat][`$TAG_${idx}`] = wipLine;
    }
  }
  // Placeholder
  if (match) {
    lexMap[cat]['KEY'] = wipLine;
  } else {
    lexMap[cat]['WIP'] = wipLine;
  }

  return [line, lexMap, true];
};

const extractTokens = (cat, line, lexMap) => {
    const startIndex = line.indexOf('<$REPEAT');
    const lastIndex = line.lastIndexOf('<$ENDREPEAT>') + 12;
    const extracted = line.substring(startIndex, lastIndex);
    const idx = lexMap[cat]['counter']++;
    lexMap[cat][`$TAG_${idx}`] = line.replace(extracted, `$TAG_${idx}`);
    if (extracted.indexOf('<$') >= 0) {
      extractTokens(cat, extracted, lexMap);
    }

}

const lexer = (cat, viewConfig, lexMap) => {
  const readStream = fs.createReadStream(
    `./src/templates/${cat.toLowerCase()}.tpl`
  );
  const writeStream = fs.createWriteStream(
    `./src/out/staged.${cat.toLowerCase()}.tmp`,
    {
      encoding: 'utf8'
    }
  );

  lexMap[cat] = {};

  const rl = readline.createInterface({
    input: readStream,
    //    output: writeStream,
    terminal: false,
    historySize: 0
  });

  rl.on('line', line => {
    // Do your stuff ...
    let [transformedLine, lexMap, transform] = tokenize(cat, line, lexMap);

    // Then write to outstream
    if (transform) {
      writeStream.write(transformedLine + '\r\n');
    }
  });

  return lexMap;
};

const categories = ['Mgen'];
const appConfig = yaml.safeLoad(
  fs.readFileSync('./src/config/viewconfig.yaml', 'utf8')
);

let lexMap = {};
for (let category of categories) {
  lexMap = lexer(category, appConfig.Views, lexMap);

  const viewKeys = Object.keys(parsedSyntax);
  for (let view of viewKeys) {
    // console.log(JSON.stringify(appConfig.Views[view], null, 4));
    let componentSyntax = parsedSyntax[view];
    generateComponent(category, view, componentSyntax);
  }
}
