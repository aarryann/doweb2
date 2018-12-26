// tslint:disable:no-console
const fs = require('fs');
const readline = require('readline');
const yaml = require('js-yaml');

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

const tokenize = (cat, line, lexDict) => {
  let transformedLine = line;
  let completeTag = transformedLine;
  let transform = false;
  const wip = lexDict[cat]['WIP'];
  if (wip.length > 0) {
    completeTag = wip + transformedLine + '\r\n';
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
      lexDict[cat]['WIP'] = '';
    } else {
      lexDict[cat]['WIP'] = completeTag;
    }
  } else {
    transform = true;
    lexDict[cat]['WIP'] = '';
  }

  return [transform, transformedLine, lexDict];
};

const getValues = (value, keyStore, oConfig) => {
  const valueTokens = value.split('.');
  let returnValue = null;
  for (let i = 0; i < valueTokens.length; i++) {
    const valuePair = valueTokens[i];
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

const extractDataSource = (line, oConfig, lexDict) => {
  const repIndex = line.indexOf('<$REPEAT');
  if (repIndex < 0) {
    return;
  }
  const endIndex = line.indexOf('>', repIndex);
  let tagValue = line
    .substring(0, endIndex)
    .replace('<', '')
    .replace('>', '')
    .trim();
  if (tagValue.length === 0) {
    return;
  }
  const tagValuePairs = tagValue.split(' ');
  console.log(`LINE: ${line}`);
  console.log(tagValuePairs);
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
    console.log(`keyValuePair: ${keyValuePair}`);
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
  // console.log(lexDict);
};

const processMeanings = (line, oConfig, lexDict) => {
  console.log(line);
  let startIndex = line.search(/<\$REPEAT.+?>/);
  let startLen = line.match(/<\$REPEAT.+?>/)[0].length;
  let lastIndex = line.lastIndexOf('<$ENDREPEAT>');
  // Extract contents with enclosed Repeat-EndRepeat tag
  let key = line
    .substring(0, startLen)
    .replace(/[<>]/, '')
    .split(' ')[0]
    .trim()
    .split('=')[1]
    .trim();

  const loopDS = lexDict[oConfig.entity]['keyStore'][key];
  let isArr = Array.isArray(loopDS);
  let loopDSArr = isArr ? loopDS : Object.keys(loopDS);
  let transformedLine = '';
  console.log(loopDSArr);

  for (let element of loopDSArr) {
    let tagValue = line.substring(startIndex + startLen, lastIndex);
    let loopElement = isArr ? element : loopDS[element];
    lexDict[oConfig.entity]['keyStore'][`${key}:ITEMVALUE`] = element;
    lexDict[oConfig.entity]['keyStore'][`${key}:ITEMNODE`] = loopElement;
    const tokens = tagValue.match(/<=.+?>/g);
    if (tokens) {
      for (let token of tokens) {
        console.log(tagValue);
        tagValue = tagValue.replace(
          token,
          getValues(
            token.replace(/[<=>]/g, ''),
            lexDict[oConfig.entity]['keyStore'],
            oConfig
          )
        );
      }
    }
    transformedLine += tagValue + '\r\n';
  }

  return transformedLine;
};

const expandSyntax = (line, oConfig, lexDict) => {
  if (line.indexOf('#FTOK_') < 0) {
    // Exit condition
    // Process line
    // line = processMeanings(line);
    return line;
  } else {
    const tokens = line.match(/#FTOK_\d+?#/g) || [];
    for (let token of tokens) {
      console.log(lexDict);
      extractDataSource(lexDict[token], oConfig, lexDict);
      let fTok = expandSyntax(lexDict[token], oConfig, lexDict);
      fTok = processMeanings(fTok, oConfig, lexDict);
      line = line.replace(token, fTok);
    }
  }
  return line;
};

const processSyntax = (line, oConfig, lexDict) => {
  if (line.indexOf('#FTOK_') >= 0) {
    line = expandSyntax(line, oConfig, lexDict);
  } else {
    const tokens = line.match(/<=.+?>/g);
    if (tokens) {
      for (let token of tokens) {
        line = line.replace(
          token,
          getValues(
            token.replace(/[<=>]/g, ''),
            lexDict[oConfig.entity]['keyStore'],
            oConfig
          )
        );
      }
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
    let transformedLine = processSyntax(
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
      // console.log('timeout');
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
