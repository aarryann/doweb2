// tslint:disable:no-console

const fs = require('fs');
const readline = require('readline');

import appConfig from './src/config/viewconfig.yaml';
const readStream = fs.createReadStream('./src/templates/mgen.tpl');
const writeStream = fs.createWriteStream('./src/out/out.tsx', {
  encoding: 'utf8'
});

for (let view of appConfig.Views) {
  console.log(view);
}

const rl = readline.createInterface({
  input: readStream,
  //    output: writeStream,
  terminal: false,
  historySize: 0
});

// console.log(rl);

rl.on('line', line => {
  // console.log(line);
  // Do your stuff ...
  // const transformedLine = line.toUpperCase();
  const transformedLine = line;
  // console.log(transformedLine);

  // Then write to outstream
  writeStream.write(transformedLine + '\r\n');
});
