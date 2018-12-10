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
      parsedSyntax[view][
        '#DECLARE_PROPS#'
      ] += `const props${index} = props.children['${index}'].props;\r\n`;
      parsedSyntax[view][
        '#DECLARE_DATASOURCE#'
      ] += `const [results${index}, setResults${index}] = Datasources.${
        componentConfig.dataSource
      }(props.client);\r\n`;
    }
  }

  console.log(JSON.stringify(parsedSyntax, null, 4));
  return parsedSyntax;
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

const categories = ['Mgen'];
const appConfig = yaml.safeLoad(
  fs.readFileSync('./src/config/viewconfig.yaml', 'utf8')
);

for (let category of categories) {
  const parsedSyntax = parseSyntax(category, appConfig);

  const viewKeys = Object.keys(parsedSyntax);
  for (let view of viewKeys) {
    // console.log(JSON.stringify(appConfig.Views[view], null, 4));
    let componentSyntax = parsedSyntax[view];
    generateComponent(category, view, componentSyntax);
  }
}
