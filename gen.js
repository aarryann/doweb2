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
    // output: writeStream,
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

const generateIndex = (changeList, removeList) => {
  fs.copyFileSync(
    './src/generated/index.tsx',
    './src/generated/index.old.gen.tsx'
  );
  const readStream = fs.createReadStream(`./src/generated/index.old.gen.tsx`);
  const writeStream = fs.createWriteStream(`./src/generated/index.tsx`, {
    encoding: 'utf8'
  });

  const rl = readline.createInterface({
    input: readStream,
    // output: writeStream,
    terminal: false,
    historySize: 0
  });

  let importList = [];
  rl.on('line', line => {
    // Do your stuff ...
    importList = lib.getComponentIndexList(line, importList, removeList);
  }).on('close', () => {
    console.log('Have a great day!');
    console.log(importList);
    changeList = [...new Set(changeList.concat(importList))];
    if (changeList.length === 0) {
      return;
    }
    console.log(changeList);
    let script = lib.getIndexScript(changeList.sort());
    writeStream.write(script + '\r\n');
  });
};

(async function() {
  const categories = ['Mgen'];
  let removeList = [];
  let diffConfig = yaml.safeLoad(
    fs.readFileSync('./src/config/viewconfig.yaml', 'utf8')
  );
  if (fs.existsSync('./src/generated/viewconfig.old.gen.yaml')) {
    let oldConfig = yaml.safeLoad(
      fs.readFileSync('./src/generated/viewconfig.old.gen.yaml', 'utf8')
    );
    [diffConfig['Views'], removeList] = lib.getDiffedConfig(
      diffConfig.Views,
      oldConfig.Views
    );
  }
  const viewKeys = Object.keys(diffConfig.Views);
  if (viewKeys.length === 0) {
    return;
  }

  let lexMap = {};
  let changeList = [];
  for (let category of categories) {
    stageTemplate(category, lexMap);
    await lib.wait1Sec();

    for (let view of viewKeys) {
      let viewConfig = diffConfig.Views[view];
      if (viewConfig.category.toLowerCase() !== category.toLowerCase()) {
        continue;
      }
      generateComponent(viewConfig, lexMap);
      changeList.push(`${viewConfig.entity}.${viewConfig.category}`);
    }
  }

  generateIndex(changeList, removeList);

  fs.copyFile(
    './src/config/viewconfig.yaml',
    './src/generated/viewconfig.old.gen.yaml',
    err => {
      if (err) throw err;
    }
  );
})();
