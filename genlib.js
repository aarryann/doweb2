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
  // Extract all ds and put it in a keystore for later access
  const defKeywords = fnDef.replace(/[<>]/g, '').split(' ');
  for (let i = 0; i < defKeywords.length; i++) {
    const defKeyword = defKeywords[i];
    // Ignore all fn definition keywords except verbs and assignments
    if (!defKeyword || defKeyword.indexOf('=') < 0) {
      continue;
    }
    // Get LHS (id symbol) and RHS (ds object or value) of ds assignments
    const dsAssigns = defKeyword.split('=');
    // Get ds reference for the function
    if (dsAssigns[0].indexOf('$REPEAT') >= 0) {
      referenceKey = dsAssigns[1].trim();
      continue;
    }
    // The ds id key is the key for the keystore
    const idKey = dsAssigns[0].trim();
    // Get ds object value and add it to keystore.
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
  // Expect complete nested fn blocks within the line with newline characters.
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
  // Extract ds to keystores and get looping ds reference
  let idKey = extractDataSource(fnDef, oConfig, lexDict);

  const fnStatement = fnBlock.substring(fnDef.length, fnBlock.length - 12);

  // Get the ds object for the ds reference
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

// Expands fn token from staging template into nested fn blocks
const detokenize = (line, oConfig, lexDict) => {
  let tLine = line;
  if (tLine.indexOf('#FTOK_') < 0) {
    // Exit condition
    return tLine;
  } else {
    const tokens = tLine.match(/#FTOK_\d+?#/g) || [];
    for (let token of tokens) {
      let fnBlock = detokenize(lexDict[token], oConfig, lexDict);
      tLine = tLine.replace(token, fnBlock);
    }
  }
  return tLine;
};

const getComponentSyntax = (line, oConfig, lexDict) => {
  let tLine = line;
  if (tLine.indexOf('#FTOK_') >= 0) {
    // Expands fn token from staging template into nested fn blocks outside in.
    tLine = detokenize(tLine, oConfig, lexDict);
  } else {
    // Realize placeholder variable values from ds for non fn statements
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
  // Execute function (fn), generate output and realize placeholder...
  // ...variable values for fn statements

  // fn block syntax: <$REPEAT=$1 $1=DS1 $2=DS2>fn statements<$ENDREPEAT>
  // $REPEAT | $ENDREPEAT => fn verbs, ...=$1 => datasource (ds) reference key
  // $1=.... => ds variable key - defined once within any fn in page
  // ...=DS1 || ...=DS2 => ds object assignments
  // $REPEAT=$1 $1=DS1 $2=DS2 => fn definition
  // <$REPEAT...> || <$ENDREPEAT> => fn open and close tags,
  // <=...> => placeholder or variables
  // fn statements => statements within tags and executed per fn definition
  // non fn statements => statements outside fn tags
  tLine = processFnBlocks(tLine, oConfig, lexDict);
  return tLine;
};

const getDiffedConfig = (newConfigView, oldConfigView) => {
  const strNew = JSON.stringify(newConfigView);
  const strOld = JSON.stringify(oldConfigView);
  if (strNew === strOld) {
    return [{}, []];
  } else {
    let newDiffView = diffJSON(newConfigView, oldConfigView, {});
    let newDiffKeys = Object.keys(newDiffView);
    for (let key of newDiffKeys) {
      newDiffView[key] = newConfigView[key];
    }
    // Diff for keys existing in staged config but not new config
    // Includes two scenarios - (1). few inner properties removed from new...
    // ...view config (2). entire view deleted from new config.
    let oldDiffView = diffJSON(oldConfigView, newConfigView, {});
    // console.log(JSON.stringify(oldDiffView, null, 4));
    let oldDiffKeys = Object.keys(oldDiffView);
    // filter out cases where entire view is removed from new config
    let delViews = oldDiffKeys.filter(x => !newDiffKeys.includes(x));
    let removeList = [];
    for (let key of oldDiffKeys) {
      // filter out, don't bother me for any future changes
      if (delViews.includes(key)) {
        removeList.push(
          `${oldDiffView[key].entity}.${oldDiffView[
            key
          ].category.toLowerCase()}`
        );
        delete oldDiffKeys[key];
      } else {
        // Get entire view property for cases where few inner properties...
        // ...removed from new view config
        // If key present, entire property already assigned. Don't reassign
        if (!newDiffView[key]) {
          newDiffView[key] = newConfigView[key];
        }
      }
    }

    return [newDiffView, removeList];
  }
};

const wait1Sec = async () => {
  await new Promise(resolve =>
    // eslint-disable-next-line
    setTimeout(() => {
      resolve();
    }, 1000)
  );
};

const getTypeOf = value => {
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return 'array';
    } else {
      return 'json';
    }
  } else {
    return typeof value;
  }
};

const diffJSON = (lhs, rhs, dlhs) => {
  const lKeys = Object.keys(lhs);
  for (let lKey of lKeys) {
    if (!lhs[lKey] && !rhs[lKey]) {
      continue;
    }
    if (!rhs[lKey]) {
      dlhs[lKey] = lhs[lKey];
      continue;
    }
    const lType = getTypeOf(lhs[lKey]);
    const rType = getTypeOf(rhs[lKey]);
    if (lType !== rType) {
      dlhs[lKey] = lhs[lKey];
      continue;
    }
    if (lType === 'array') {
      lType.sort();
      rType.sort();
      if (lType.toString() !== rType.toString()) {
        dlhs[lKey] = lhs[lKey];
        continue;
      }
    } else if (lType === 'json') {
      dlhs[lKey] = {};
      diffJSON(lhs[lKey], rhs[lKey], dlhs[lKey]);
      if (Object.keys(dlhs[lKey]).length === 0) {
        delete dlhs[lKey];
      }
    }
  }
  return dlhs;
};

const titleCase = word => {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
};

const getComponentIndexList = (line, importList, removeList) => {
  if (line.indexOf('import') >= 0) {
    // eslint-disable-next-line
    const com = line.match(/[\w\.]+\.gen/)[0];
    const comArr = com.split('.');
    if (!removeList.includes(`${comArr[0]}.${comArr[1]}`)) {
      importList.push(`${comArr[0]}.${titleCase(comArr[1])}`);
    }
  }
  return importList;
};

const getIndexScript = componentList => {
  let importScript = '';
  let exportScript = '';
  for (let com of componentList) {
    let comArr = com.split('.');
    let comName = comArr.join('');
    importScript += `import ${comName} from './${
      comArr[0]
    }.${comArr[1].toLowerCase()}.gen'\r\n`;

    exportScript += `${comName},\r\n`;
  }
  return (
    importScript +
    '\r\n' +
    `export const Generated = {\r\n` +
    (exportScript + ',').replace(',\r\n,', '\r\n') +
    `};\r\n`
  );
};

module.exports = {
  diffJSON,
  getComponentIndexList,
  getComponentSyntax,
  getDiffedConfig,
  getIndexScript,
  getTypeOf,
  tokenize,
  wait1Sec
};
