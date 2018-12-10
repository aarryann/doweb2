// tslint:disable:no-console

const fs = require('fs');
const readline = require('readline');
const yaml = require('js-yaml');

const readStream = fs.createReadStream('./src/templates/mgen.tpl');
const writeStream = fs.createWriteStream('./src/out/out.tsx', {
  encoding: 'utf8'
});

const appConfig = yaml.safeLoad(
  fs.readFileSync('./src/config/viewconfig.yaml', 'utf8')
);

const viewKeys = Object.keys(appConfig.Views);

for (let view of viewKeys) {
  // console.log(JSON.stringify(appConfig.Views[view], null, 4));
}

const rl = readline.createInterface({
  input: readStream,
  //    output: writeStream,
  terminal: false,
  historySize: 0
});

rl.on('line', line => {
  // console.log(line);
  // Do your stuff ...
  // const transformedLine = line.toUpperCase();
  const transformedLine = line;
  // console.log(transformedLine);

  // Then write to outstream
  writeStream.write(transformedLine + '\r\n');
});
