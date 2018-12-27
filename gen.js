// tslint:disable:no-console
const fs = require('fs');
const readline = require('readline');
const yaml = require('js-yaml');
const lib = require('./genlib');

const stageTemplate = (cat, lexDict) => {
  const readStream = fs.createReadStream(
    `./src/templates/${cat.toLowerCase()}.tpl`
  );
  const writeStream = fs.createWriteStream(
    `./src/generated/${cat.toLowerCase()}.gen.stg`,
    {
      encoding: 'utf8'
    }
  );

  lexDict[cat] = {};
  lexDict[cat]['WIP'] = '';
  lexDict[cat]['ftok'] = {};
  lexDict[cat]['ftok']['counter'] = 0;

  const rl = readline.createInterface({
    input: readStream,
    // output: writeStream,
    terminal: false,
    historySize: 0
  });

  rl.on('line', line => {
    // Do your stuff ...
    let [transform, tLine] = lib.tokenize(cat, line, lexDict);

    // Then write to outstream
    if (transform) {
      writeStream.write(tLine + '\r\n');
    }
  });
};

const generateComponent = (viewConfig, lexDict) => {
  const readStream = fs.createReadStream(
    `./src/generated/${viewConfig.category.toLowerCase()}.gen.stg`
  );
  const writeStream = fs.createWriteStream(
    `./src/generated/${
      viewConfig.entity
    }.${viewConfig.category.toLowerCase()}.gen.tsx`,
    {
      encoding: 'utf8'
    }
  );

  lexDict[viewConfig.category]['ftok'][viewConfig.entity] = {};

  const rl = readline.createInterface({
    input: readStream,
    //    output: writeStream,
    terminal: false,
    historySize: 0
  });

  lexDict[viewConfig.category]['ftok'][viewConfig.entity].keyStore = {};
  rl.on('line', line => {
    // Do your stuff ...
    let transformedLine = lib.getComponentSyntax(
      line,
      viewConfig,
      lexDict[viewConfig.category]['ftok']
    );

    // Then write to outstream
    writeStream.write(transformedLine + '\r\n');
  });
};

(async function() {
  const categories = ['Mgen'];
  const appConfig = yaml.safeLoad(
    fs.readFileSync('./src/config/viewconfig.yaml', 'utf8')
  );
  let lexMap = {};
  for (let category of categories) {
    stageTemplate(category, lexMap);
    await lib.wait1Sec();

    const viewKeys = Object.keys(appConfig.Views);
    for (let view of viewKeys) {
      let viewConfig = appConfig.Views[view];
      if (viewConfig.category.toLowerCase() !== category.toLowerCase()) {
        continue;
      }
      generateComponent(viewConfig, lexMap);
    }
  }
  fs.copyFile(
    './src/config/viewconfig.yaml',
    './src/generated/viewconfig.gen.yaml',
    err => {
      if (err) throw err;
    }
  );
})();
