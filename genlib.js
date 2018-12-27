// tslint:disable:no-console
const extractFunctionTokens = (cat, fnBlock, lexDict) => {
  // Checking for an enclosed fn block within this block
  if (fnBlock.indexOf('<$REPEAT', 1) >= 0) {
    // Skip the enclosing fn tags
    let sIndex = fnBlock.indexOf('<$REPEAT', 1);
    let lIndex = fnBlock.lastIndexOf('<$ENDREPEAT>', fnBlock.length - 13);
    // Extract enclosed nested fn blocks
    let innerFn = fnBlock.substring(sIndex, lIndex + 12);
    const replacementkey = extractFunctionTokens(cat, innerFn, lexDict);
    fnBlock = fnBlock.replace(innerFn, replacementkey);
  }
  const idx = ++lexDict[cat]['ftok']['counter'];
  let id = `00${idx}`.slice(-3);
  lexDict[cat]['ftok']['counter'] = idx;
  const key = `#FTOK_${id}#`;
  lexDict[cat]['ftok'][key] = fnBlock;
  return key;
};

const tokenize = (cat, line, lexDict) => {
  let tLine = line;
  let completeTag = tLine;
  let transform = false;
  const wip = lexDict[cat]['WIP'];
  if (wip.length > 0) {
    completeTag = wip + tLine + '\r\n';
    // completeTag = wip + tLine;
  }
  if (completeTag.indexOf('<$') >= 0) {
    const openCount = (completeTag.match(/<\$REPEAT/g) || []).length;
    const closeCount = (completeTag.match(/<\$ENDREPEAT/g) || []).length;
    if (openCount === closeCount) {
      const startIndex = completeTag.indexOf('<$REPEAT');
      const lastIndex = completeTag.lastIndexOf('<$ENDREPEAT>');
      // Extract enclosed fn block
      const extracted = completeTag.substring(startIndex, lastIndex + 12);
      let replacementTag = extractFunctionTokens(cat, extracted, lexDict);
      tLine = completeTag.replace(extracted, replacementTag);
      transform = true;
      lexDict[cat]['WIP'] = '';
    } else {
      lexDict[cat]['WIP'] = completeTag;
    }
  } else {
    transform = true;
    lexDict[cat]['WIP'] = '';
  }

  return [transform, tLine];
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
    } else if (
      returnValue &&
      typeof returnValue === 'object' &&
      returnValue[valuePair]
    ) {
      returnValue = returnValue[valuePair];
    }
  }
  return returnValue;
};

const extractDataSource = (fnDef, oConfig, lexDict) => {
  // This fn extracts the fn data sources if any.
  let referenceKey = '';
  // Extract all datasources and put it in a keystore for later access
  const defKeywords = fnDef.replace(/[<>]/g, '').split(' ');
  for (let i = 0; i < defKeywords.length; i++) {
    const defKeyword = defKeywords[i];
    // Ignore all function definition keywords except datasource assignments
    if (!defKeyword || defKeyword.indexOf('=') < 0) {
      continue;
    }
    // Get LHS (id symbol) and RHS (datasource object or value) of datasource assignments
    const dsAssigns = defKeyword.split('=');
    // Get datasource reference for the function
    if (dsAssigns[0].indexOf('$REPEAT') >= 0) {
      referenceKey = dsAssigns[1].trim();
      continue;
    }
    // The datasource id key is the key for the keystore
    const idKey = dsAssigns[0].trim();
    // Get datasource object value and add it to keystore.
    const dsValue = getValues(
      dsAssigns[1].trim(),
      lexDict[oConfig.entity]['keyStore'],
      oConfig
    );
    lexDict[oConfig.entity]['keyStore'][idKey] = dsValue;
  }
  // console.log(JSON.stringify(lexDict, null, 4));
  // console.log(lexDict);
  return referenceKey;
};

const processFnBlocks = (line, oConfig, lexDict) => {
  // Do not proceed if no enclosed fn blocks
  // Expect complete entire nested fn blocks within the line with newline characters.
  // The line may or may not start with fn block / definitions
  const sIndex = line.indexOf('<$REPEAT');
  if (sIndex < 0) {
    return line;
  }
  const lIndex = line.lastIndexOf('<$ENDREPEAT>');
  const fnBlock = line.substring(sIndex, lIndex + 12);

  // Execute fn
  const tLine = xecFunctions(fnBlock, oConfig, lexDict);
  return line.replace(fnBlock, tLine);
};

const xecFunctions = (fnBlock, oConfig, lexDict) => {
  // Extract the fn definition
  const fnDef = fnBlock.match(/<\$REPEAT.+?>/)[0];
  // Extract datasources to keystores and get looping datasource reference
  let idKey = extractDataSource(fnDef, oConfig, lexDict);

  const fnStatement = fnBlock.substring(fnDef.length, fnBlock.length - 12);

  // Get the datasource object for the datasource reference
  // If value is null, definition error - fail it
  const loopDS = lexDict[oConfig.entity]['keyStore'][idKey];
  const isArr = Array.isArray(loopDS);
  const loopDSArr = isArr ? loopDS : Object.keys(loopDS);

  // Exclude the outer tags
  const sInnerIndex = fnStatement.indexOf('<$REPEAT');
  let fnInner = '';
  if (sInnerIndex >= 0) {
    const lInnerIndex = fnStatement.lastIndexOf('<$ENDREPEAT>');
    fnInner = fnStatement.substring(sInnerIndex, lInnerIndex + 12);
  }
  let resolvedBlock = '';
  // Loop over the looping datasource
  for (let item of loopDSArr) {
    const loopItem = isArr ? item : loopDS[item];
    lexDict[oConfig.entity]['keyStore'][`${idKey}:KEY`] = item;
    lexDict[oConfig.entity]['keyStore'][`${idKey}:CONTENTS`] = loopItem;

    let resolvedStatement = fnStatement;
    // Check for nested fn block. Exit recursion if none
    if (sInnerIndex >= 0) {
      let resolvedInner = xecFunctions(fnInner, oConfig, lexDict);
      resolvedStatement = fnStatement.replace(fnInner, resolvedInner);
    }

    const tokens = resolvedStatement.match(/<=.+?>/g);
    if (tokens) {
      for (let token of tokens) {
        const placeholderValue = getValues(
          token.replace(/[<=>]/g, ''),
          lexDict[oConfig.entity]['keyStore'],
          oConfig
        );
        resolvedStatement = resolvedStatement.replace(token, placeholderValue);
      }
    }
    resolvedBlock += resolvedStatement + '\r\n';
  }

  return resolvedBlock;
};

// Expands fn token from staging template into nested fn blocks going outside in.
const detokenize = (line, oConfig, lexDict) => {
  let tLine = line;
  if (tLine.indexOf('#FTOK_') < 0) {
    // Exit condition
    return tLine;
  } else {
    const tokens = tLine.match(/#FTOK_\d+?#/g) || [];
    for (let token of tokens) {
      // Extract the fn datasource and add it to keystore outside in.
      // extractDataSource(lexDict[token], oConfig, lexDict);
      // Recursion - Changes order at this line from outside in to inside out
      let fnBlock = detokenize(lexDict[token], oConfig, lexDict);
      // fnBlock = processMeanings(fnBlock, oConfig, lexDict);
      tLine = tLine.replace(token, fnBlock);
    }
  }
  return tLine;
};

const getComponentSyntax = (line, oConfig, lexDict) => {
  let tLine = line;
  if (tLine.indexOf('#FTOK_') >= 0) {
    // Expands fn token from staging template into nested fn blocks going outside in.
    tLine = detokenize(tLine, oConfig, lexDict);
  } else {
    // Realize placeholder variable values from datasource for non fn statements
    const tokens = tLine.match(/<=.+?>/g);
    if (tokens) {
      for (let token of tokens) {
        tLine = tLine.replace(
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
  // Execute fn, generate output and realize placeholder variable values for fn statements

  // Function (fn) block syntax: <$REPEAT=$1 $1=DS1 $2=DS2>fn statements<$ENDREPEAT>
  // $REPEAT | $ENDREPEAT => fn verbs, ...=$1 => datasource reference key
  // $1=.... => datasource variable key - defined once within any function in page
  // ...=DS1 || ...=DS2 => datasource object assignments
  // $REPEAT=$1 $1=DS1 $2=DS2 => fn definition
  // <$REPEAT...> || <$ENDREPEAT> => fn open and close tags, <=...> => placeholder or variables
  // fn statements => statements within tags and executed per fn definition
  // non fn statements => statements outside fn tags
  tLine = processFnBlocks(tLine, oConfig, lexDict);
  return tLine;
};

const wait1Sec = async () => {
  await new Promise(resolve =>
    // eslint-disable-next-line
    setTimeout(() => {
      resolve();
    }, 1000)
  );
};

module.exports = {
  extractFunctionTokens,
  tokenize,
  getValues,
  extractDataSource,
  processFnBlocks,
  xecFunctions,
  detokenize,
  getComponentSyntax,
  wait1Sec
};
