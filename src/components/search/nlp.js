// Helper functions for Porter Stemming
/* Step 1b (part 2):
                AT  →   ATE
                BL  →   BLE
                IZ  →   IZE
  (*d and not (*L or *S or *Z))   →   single letter
          (m=1 and *o)  →   E
*/
/* function endsWith(str, suffixes) {
  return suffixes.some((suffix) => str.endsWith(suffix));
}
function hasVowel(word) {
  return /[aeiouy]/.test(word);
}
function doubleConsonant(word) {
  const lastTwo = word.slice(-2);
  return /(bb|cc|dd|ff|gg|hh|jj|kk|ll|mm|nn|pp|qq|rr|ss|tt|vv|ww|xx|zz)$/.test(lastTwo);
}
function porter1bHelper(word) {
  if (word.endsWith('at')) {
    return `${word}e`;
  }
  if (word.endsWith('bl')) {
    return `${word}e`;
  }
  if (word.endsWith('iz')) {
    return `${word}e`;
  }
  if (doubleConsonant(word) && !endsWith(word, ['l', 's', 'z'])) {
    return word.slice(0, -1);
  }
  if ((/[^aeiouy][aeiouy][^aeiouy]$/.test(word.slice(-3)))) {
    return `${word}e`;
  }
  return word;
}
function measureFunc(word) {
  let m = 0;
  let isPreviousCharVowel = false;
  const pattern = '[^aeiou][aeiouy][^aeiouy]';
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  for (let i = 0; i < word.length; i += 1) {
    if (vowels.includes(word[i])) {
      if (!isPreviousCharVowel) {
        m += 1;
        isPreviousCharVowel = true;
      }
    } else {
      isPreviousCharVowel = false;
    }
  }
  const regex = new RegExp(pattern, 'gi');
  const matches = (word.match(regex) || []);
  m -= matches.length;
  // Return measure if value, otherwise no pattern exists.
  return m > 0 ? m : 0;
}
function stemWord(word) {
  let stemmedWord = word.toLowerCase();
  if (stemmedWord.endsWith('sses')) {
    stemmedWord = stemmedWord.slice(0, -2);
  } else if (stemmedWord.endsWith('ies')) {
    stemmedWord = stemmedWord.slice(0, -2);
  } else if (stemmedWord.endsWith('s') && !stemmedWord.endsWith('ss')) {
    stemmedWord = stemmedWord.slice(0, -1);
  }
  if (stemmedWord.endsWith('eed')) {
    if (porter1bHelper(stemmedWord.slice(0, -3)) > 0) {
      stemmedWord = stemmedWord.slice(0, -1);
    } else {
      return stemmedWord;
    }
  } else if (stemmedWord.endsWith('ed')) {
    if (hasVowel(stemmedWord.slice(0, -2))) {
      stemmedWord = porter1bHelper(stemmedWord.slice(0, -2));
    } else {
      return stemmedWord;
    }
  } else if (stemmedWord.endsWith('ing')) {
    if (hasVowel(stemmedWord.endsWith(0, -3))) {
      stemmedWord = porter1bHelper(stemmedWord.slice(0, -3));
    } else {
      return stemmedWord;
    }
  }
  if ((stemmedWord.endsWith('y')) && (hasVowel(stemmedWord.slice(0, -1)))) {
    stemmedWord = `${stemmedWord.slice(0, -1)}i`;
  }
  switch (true) {
    case stemmedWord.endsWith('ational'):
      stemmedWord = stemmedWord.replace('ational', 'ate');
      break;
    case stemmedWord.endsWith('tional'):
      stemmedWord = stemmedWord.replace('tional', 'tion');
      break;
    case stemmedWord.endsWith('enci'):
      stemmedWord = stemmedWord.replace('enci', 'ence');
      break;
    case stemmedWord.endsWith('anci'):
      stemmedWord = stemmedWord.replace('anci', 'ance');
      break;
    case stemmedWord.endsWith('izer'):
      stemmedWord = stemmedWord.replace('izer', 'ize');
      break;
    case stemmedWord.endsWith('abli'):
      stemmedWord = stemmedWord.replace('abli', 'able');
      break;
    case stemmedWord.endsWith('alli'):
      stemmedWord = stemmedWord.replace('alli', 'al');
      break;
    case stemmedWord.endsWith('entli'):
      stemmedWord = stemmedWord.replace('entli', 'ent');
      break;
    case stemmedWord.endsWith('eli'):
      stemmedWord = stemmedWord.replace('eli', 'e');
      break;
    case stemmedWord.endsWith('ousli'):
      stemmedWord = stemmedWord.replace('ousli', 'ous');
      break;
    case stemmedWord.endsWith('ization'):
      stemmedWord = stemmedWord.replace('ization', 'ize');
      break;
    case stemmedWord.endsWith('ation'):
      stemmedWord = stemmedWord.replace('ation', 'ate');
      break;
    case stemmedWord.endsWith('ator'):
      stemmedWord = stemmedWord.replace('ator', 'ate');
      break;
    case stemmedWord.endsWith('alism'):
      stemmedWord = stemmedWord.replace('alism', 'al');
      break;
    case stemmedWord.endsWith('iveness'):
      stemmedWord = stemmedWord.replace('iveness', 'ive');
      break;
    case stemmedWord.endsWith('fulness'):
      stemmedWord = stemmedWord.replace('fulness', 'ful');
      break;
    case stemmedWord.endsWith('ousness'):
      stemmedWord = stemmedWord.replace('ousness', 'ous');
      break;
    case stemmedWord.endsWith('aliti'):
      stemmedWord = stemmedWord.replace('aliti', 'al');
      break;
    case stemmedWord.endsWith('iviti'):
      stemmedWord = stemmedWord.replace('iviti', 'ive');
      break;
    case stemmedWord.endsWith('biliti'):
      stemmedWord = stemmedWord.replace('biliti', 'ble');
      break;
    default:
      break;
  }
  switch (true) {
    case stemmedWord.endsWith('icate'):
      stemmedWord = stemmedWord.replace('icate', 'ic');
      break;
    case stemmedWord.endsWith('ative'):
      stemmedWord = stemmedWord.replace('ative', '');
      break;
    case stemmedWord.endsWith('alize'):
      stemmedWord = stemmedWord.replace('alize', 'al');
      break;
    case stemmedWord.endsWith('iciti'):
      stemmedWord = stemmedWord.replace('iciti', 'ic');
      break;
    case stemmedWord.endsWith('ical'):
      stemmedWord = stemmedWord.replace('ical', 'ic');
      break;
    case stemmedWord.endsWith('ful'):
      stemmedWord = stemmedWord.replace('ful', '');
      break;
    case stemmedWord.endsWith('ness'):
      stemmedWord = stemmedWord.replace('ness', '');
      break;
    default:
      break;
  }
  // Step 4
  let m = measureFunc(stemmedWord);
  if (m > 1) {
    if (stemmedWord.endsWith('al')) {
      stemmedWord = stemmedWord.slice(0, -2);
    } else if (stemmedWord.endsWith('ance')) {
      stemmedWord = stemmedWord.slice(0, -4);
    } else if (stemmedWord.endsWith('ence')) {
      stemmedWord = stemmedWord.slice(0, -4);
    } else if (stemmedWord.endsWith('er')) {
      stemmedWord = stemmedWord.slice(0, -2);
    } else if (stemmedWord.endsWith('ic')) {
      stemmedWord = stemmedWord.slice(0, -2);
    } else if (stemmedWord.endsWith('able')) {
      stemmedWord = stemmedWord.slice(0, -4);
    } else if (stemmedWord.endsWith('ible')) {
      stemmedWord = stemmedWord.slice(0, -4);
    } else if (stemmedWord.endsWith('ant')) {
      stemmedWord = stemmedWord.slice(0, -3);
    } else if (stemmedWord.endsWith('ement')) {
      stemmedWord = stemmedWord.slice(0, -5);
    } else if (stemmedWord.endsWith('ment')) {
      stemmedWord = stemmedWord.slice(0, -4);
    } else if (stemmedWord.endsWith('ent')) {
      stemmedWord = stemmedWord.slice(0, -3);
    } else if ((stemmedWord.endsWith('s') || stemmedWord.endsWith('t')) && stemmedWord.endsWith('ion')) {
      stemmedWord = stemmedWord.slice(0, -3);
    } else if (stemmedWord.endsWith('ou')) {
      stemmedWord = stemmedWord.slice(0, -2);
    } else if (stemmedWord.endsWith('ism')) {
      stemmedWord = stemmedWord.slice(0, -3);
    } else if (stemmedWord.endsWith('ate')) {
      stemmedWord = stemmedWord.slice(0, -3);
    } else if (stemmedWord.endsWith('iti')) {
      stemmedWord = stemmedWord.slice(0, -3);
    } else if (stemmedWord.endsWith('ous')) {
      stemmedWord = stemmedWord.slice(0, -3);
    } else if (stemmedWord.endsWith('ive')) {
      stemmedWord = stemmedWord.slice(0, -3);
    } else if (stemmedWord.endsWith('ize')) {
      stemmedWord = stemmedWord.slice(0, -3);
    }
  }
  // Step 5 a & b
  m = measureFunc(stemmedWord);
  const endsWithDoubleConsonant = /(bb|dd|ff|gg|mm|nn|pp|rr|tt)$/.test(stemmedWord);
  const endsWithL = /[^aeiou]l$/.test(stemmedWord);
  if (m > 1 && stemmedWord.endsWith('e')) {
    if (stemmedWord.endsWith('ee') || stemmedWord.endsWith('oe')) {
      return stemmedWord;
    }
    if (endsWithL && !stemmedWord.endsWith('le')) {
      return stemmedWord.slice(0, -1);
    }
    if (!endsWithDoubleConsonant && !endsWithL && !stemmedWord.endsWith('o')) {
      return stemmedWord.slice(0, -1);
    }
  } else if (m === 1 && !word.endsWith('o') && stemmedWord.endsWith('e')) {
    return stemmedWord.slice(0, -1);
  }
  if (m > 1 && endsWithDoubleConsonant && /[lsz]$/.test(stemmedWord.slice(-3, -2))) {
    return stemmedWord.slice(0, -1);
  }
  return stemmedWord;
}
*/
const step2list = {
  ational: 'ate',
  tional: 'tion',
  enci: 'ence',
  anci: 'ance',
  izer: 'ize',
  bli: 'ble',
  alli: 'al',
  entli: 'ent',
  eli: 'e',
  ousli: 'ous',
  ization: 'ize',
  ation: 'ate',
  ator: 'ate',
  alism: 'al',
  iveness: 'ive',
  fulness: 'ful',
  ousness: 'ous',
  aliti: 'al',
  iviti: 'ive',
  biliti: 'ble',
  logi: 'log',
};
const step3list = {
  icate: 'ic',
  ative: '',
  alize: 'al',
  iciti: 'ic',
  ical: 'ic',
  ful: '',
  ness: '',
};
const c = '[^aeiou]';
const v = '[aeiouy]';
const C = `${c}[^aeiouy]*`;
const V = `${v}[aeiou]*`;

const mgr0 = `^(${C})?${V}${C}`;
const meq1 = `^(${C})?${V}${C}(${V})?$`;
const mgr1 = `^(${C})?${V}${C}${V}${C}`;
const sV = `^(${C})?${v}`;

/* Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
paper, in
Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
no. 3, pp 130-137,
see also http://www.tartarus.org/~martin/PorterStemmer

Release 1 be 'andargor', Jul 2004
Release 2 (substantially revised) by Christopher McKenzie, Aug 2009
*/
function stemmer(word) {
  let stem;
  let suffix;
  let re;
  let re2;
  let re3;
  let re4;
  let w = word;
  let fp;

  if (w.length < 3) { return w; }

  const firstch = w.substr(0, 1);
  if (firstch === 'y') {
    w = firstch.toUpperCase() + w.substr(1);
  }

  // Step 1a
  re = /^(.+?)(ss|i)es$/;
  re2 = /^(.+?)([^s])s$/;

  if (re.test(w)) {
    w = w.replace(re, '$1$2');
  } else if (re2.test(w)) {
    w = w.replace(re2, '$1$2');
  }

  // Step 1b
  re = /^(.+?)eed$/;
  re2 = /^(.+?)(ed|ing)$/;
  if (re.test(w)) {
    fp = re.exec(w);
    re = new RegExp(mgr0);
    if (re.test(fp[1])) {
      re = /.$/;
      w = w.replace(re, '');
    }
  } else if (re2.test(w)) {
    fp = re2.exec(w);
    stem = fp[1];
    re2 = new RegExp(sV);
    if (re2.test(stem)) {
      w = stem;
      re2 = /(at|bl|iz)$/;
      re3 = new RegExp('([^aeiouylsz])\\1$');
      re4 = new RegExp(`^${C}${v}[^aeiouwxy]$`);
      if (re2.test(w)) {
        w = `${w}e`;
      } else if (re3.test(w)) {
        re = /.$/; w = w.replace(re, '');
      } else if (re4.test(w)) {
        w = `${w}e`;
      }
    }
  }

  // Step 1c
  re = /^(.+?)y$/;
  if (re.test(w)) {
    fp = re.exec(w);
    stem = fp[1];
    re = new RegExp(sV);
    if (re.test(stem)) { w = `${stem}i`; }
  }

  // Step 2
  re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  if (re.test(w)) {
    fp = re.exec(w);
    stem = fp[1];
    suffix = fp[2];
    re = new RegExp(mgr0);
    if (re.test(stem)) {
      w = stem + step2list[suffix];
    }
  }

  // Step 3
  re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
  if (re.test(w)) {
    fp = re.exec(w);
    stem = fp[1];
    suffix = fp[2];
    re = new RegExp(mgr0);
    if (re.test(stem)) {
      w = stem + step3list[suffix];
    }
  }

  // Step 4
  re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  re2 = /^(.+?)(s|t)(ion)$/;
  if (re.test(w)) {
    fp = re.exec(w);
    stem = fp[1];
    re = new RegExp(mgr1);
    if (re.test(stem)) {
      w = stem;
    }
  } else if (re2.test(w)) {
    fp = re2.exec(w);
    stem = fp[1] + fp[2];
    re2 = new RegExp(mgr1);
    if (re2.test(stem)) {
      w = stem;
    }
  }

  // Step 5
  re = /^(.+?)e$/;
  if (re.test(w)) {
    fp = re.exec(w);
    stem = fp[1];
    re = new RegExp(mgr1);
    re2 = new RegExp(meq1);
    re3 = new RegExp(`^${C}${v}[^aeiouwxy]$`);
    if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
      w = stem;
    }
  }

  re = /ll$/;
  re2 = new RegExp(mgr1);
  if (re.test(w) && re2.test(w)) {
    re = /.$/;
    w = w.replace(re, '');
  }

  // and turn initial Y back to y

  if (firstch === 'y') {
    w = firstch.toLowerCase() + w.substr(1);
  }

  return w;
}

function removeStopwords(query, stopwords) {
  const words = query.toLowerCase().split(/\W+/);
  const filteredWords = words.filter((word) => !stopwords.has(word));
  return filteredWords.join(' ');
}
function containsStopword(userInput) {
  const query = userInput;
  const stopWords = new Set([
    'a',
    'able',
    'about',
    'above',
    'abroad',
    'according',
    'accordingly',
    'across',
    'actually',
    'adj',
    'after',
    'afterwards',
    'again',
    'against',
    'ago',
    'ahead',
    'aint',
    'all',
    'allow',
    'allows',
    'almost',
    'alone',
    'along',
    'alongside',
    'already',
    'also',
    'although',
    'always',
    'am',
    'amid',
    'amidst',
    'among',
    'amongst',
    'an',
    'and',
    'another',
    'any',
    'anybody',
    'anyhow',
    'anyone',
    'anything',
    'anyway',
    'anyways',
    'anywhere',
    'apart',
    'appear',
    'appreciate',
    'appropriate',
    'are',
    'arent',
    'around',
    'as',
    'as',
    'aside',
    'ask',
    'asking',
    'associated',
    'at',
    'available',
    'away',
    'awfully',
    'b',
    'back',
    'backward',
    'backwards',
    'be',
    'became',
    'because',
    'become',
    'becomes',
    'becoming',
    'been',
    'before',
    'beforehand',
    'begin',
    'behind',
    'being',
    'believe',
    'below',
    'beside',
    'besides',
    'best',
    'better',
    'between',
    'beyond',
    'both',
    'brief',
    'but',
    'by',
    'c',
    'came',
    'can',
    'cannot',
    'cant',
    'cant',
    'caption',
    'cause',
    'causes',
    'certain',
    'certainly',
    'changes',
    'clearly',
    'cmon',
    'co',
    'co.',
    'com',
    'come',
    'comes',
    'concerning',
    'consequently',
    'consider',
    'considering',
    'contain',
    'containing',
    'contains',
    'corresponding',
    'could',
    'couldnt',
    'course',
    'cs',
    'currently',
    'd',
    'dare',
    'darent',
    'definitely',
    'described',
    'despite',
    'did',
    'didnt',
    'different',
    'directly',
    'do',
    'does',
    'doesnt',
    'doing',
    'done',
    'dont',
    'down',
    'downwards',
    'during',
    'e',
    'each',
    'edu',
    'eg',
    'eight',
    'eighty',
    'either',
    'else',
    'elsewhere',
    'end',
    'ending',
    'enough',
    'entirely',
    'especially',
    'et',
    'etc',
    'even',
    'ever',
    'evermore',
    'every',
    'everybody',
    'everyone',
    'everything',
    'everywhere',
    'ex',
    'exactly',
    'example',
    'except',
    'f',
    'fairly',
    'far',
    'farther',
    'few',
    'fewer',
    'fifth',
    'first',
    'five',
    'followed',
    'following',
    'follows',
    'for',
    'forever',
    'former',
    'formerly',
    'forth',
    'forward',
    'found',
    'four',
    'from',
    'further',
    'furthermore',
    'g',
    'get',
    'gets',
    'getting',
    'given',
    'gives',
    'go',
    'goes',
    'going',
    'gone',
    'got',
    'gotten',
    'greetings',
    'h',
    'had',
    'hadnt',
    'half',
    'happens',
    'hardly',
    'has',
    'hasnt',
    'have',
    'havent',
    'having',
    'he',
    'hed',
    'hell',
    'hello',
    'help',
    'hence',
    'her',
    'here',
    'hereafter',
    'hereby',
    'herein',
    'heres',
    'hereupon',
    'hers',
    'herself',
    'hes',
    'hi',
    'him',
    'himself',
    'his',
    'hither',
    'hopefully',
    'how',
    'howbeit',
    'however',
    'hundred',
    'i',
    'id',
    'ie',
    'if',
    'ignored',
    'ill',
    'im',
    'immediate',
    'in',
    'inasmuch',
    'inc',
    'inc.',
    'indeed',
    'indicate',
    'indicated',
    'indicates',
    'inner',
    'inside',
    'insofar',
    'instead',
    'into',
    'inward',
    'is',
    'isnt',
    'it',
    'itd',
    'itll',
    'its',
    'its',
    'itself',
    'ive',
    'j',
    'just',
    'k',
    'keep',
    'keeps',
    'kept',
    'know',
    'known',
    'knows',
    'l',
    'last',
    'lately',
    'later',
    'latter',
    'latterly',
    'least',
    'less',
    'lest',
    'let',
    'lets',
    'like',
    'liked',
    'likely',
    'likewise',
    'little',
    'look',
    'looking',
    'looks',
    'low',
    'lower',
    'ltd',
    'm',
    'made',
    'mainly',
    'make',
    'makes',
    'many',
    'may',
    'maybe',
    'maynt',
    'me',
    'mean',
    'meantime',
    'meanwhile',
    'merely',
    'might',
    'mightnt',
    'mine',
    'minus',
    'miss',
    'more',
    'moreover',
    'most',
    'mostly',
    'mr',
    'mrs',
    'much',
    'must',
    'mustnt',
    'my',
    'myself',
    'n',
    'name',
    'namely',
    'nd',
    'near',
    'nearly',
    'necessary',
    'need',
    'neednt',
    'needs',
    'neither',
    'never',
    'neverf',
    'neverless',
    'nevertheless',
    'new',
    'next',
    'nine',
    'ninety',
    'no',
    'nobody',
    'non',
    'none',
    'nonetheless',
    'noone',
    'no-one',
    'nor',
    'normally',
    'not',
    'nothing',
    'notwithstanding',
    'novel',
    'now',
    'nowhere',
    'o',
    'obviously',
    'of',
    'off',
    'often',
    'oh',
    'ok',
    'okay',
    'old',
    'on',
    'once',
    'one',
    'ones',
    'ones',
    'only',
    'onto',
    'opposite',
    'or',
    'other',
    'others',
    'otherwise',
    'ought',
    'oughtnt',
    'our',
    'ours',
    'ourselves',
    'out',
    'outside',
    'over',
    'overall',
    'own',
    'p',
    'particular',
    'particularly',
    'past',
    'per',
    'perhaps',
    'placed',
    'please',
    'plus',
    'possible',
    'presumably',
    'probably',
    'provided',
    'provides',
    'q',
    'que',
    'quite',
    'qv',
    'r',
    'rather',
    'rd',
    're',
    'really',
    'reasonably',
    'recent',
    'recently',
    'regarding',
    'regardless',
    'regards',
    'relatively',
    'respectively',
    'right',
    'round',
    's',
    'said',
    'same',
    'saw',
    'say',
    'saying',
    'says',
    'second',
    'secondly',
    'see',
    'seeing',
    'seem',
    'seemed',
    'seeming',
    'seems',
    'seen',
    'self',
    'selves',
    'sensible',
    'sent',
    'serious',
    'seriously',
    'seven',
    'several',
    'shall',
    'shant',
    'she',
    'shed',
    'shell',
    'shes',
    'should',
    'shouldnt',
    'since',
    'six',
    'so',
    'some',
    'somebody',
    'someday',
    'somehow',
    'someone',
    'something',
    'sometime',
    'sometimes',
    'somewhat',
    'somewhere',
    'soon',
    'sorry',
    'specified',
    'specify',
    'specifying',
    'still',
    'sub',
    'such',
    'sup',
    'sure',
    't',
    'take',
    'taken',
    'taking',
    'tell',
    'tends',
    'th',
    'than',
    'thank',
    'thanks',
    'thanx',
    'that',
    'thatll',
    'thats',
    'thats',
    'thatve',
    'the',
    'their',
    'theirs',
    'them',
    'themselves',
    'then',
    'thence',
    'there',
    'thereafter',
    'thereby',
    'thered',
    'therefore',
    'therein',
    'therell',
    'therere',
    'theres',
    'theres',
    'thereupon',
    'thereve',
    'these',
    'they',
    'theyd',
    'theyll',
    'theyre',
    'theyve',
    'thing',
    'things',
    'think',
    'third',
    'thirty',
    'this',
    'thorough',
    'thoroughly',
    'those',
    'though',
    'three',
    'through',
    'throughout',
    'thru',
    'thus',
    'till',
    'to',
    'together',
    'too',
    'took',
    'toward',
    'towards',
    'tried',
    'tries',
    'truly',
    'try',
    'trying',
    'ts',
    'twice',
    'two',
    'u',
    'un',
    'under',
    'underneath',
    'undoing',
    'unfortunately',
    'unless',
    'unlike',
    'unlikely',
    'until',
    'unto',
    'up',
    'upon',
    'upwards',
    'us',
    'use',
    'used',
    'useful',
    'uses',
    'using',
    'usually',
    'v',
    'value',
    'various',
    'versus',
    'very',
    'via',
    'viz',
    'vs',
    'w',
    'want',
    'wants',
    'was',
    'wasnt',
    'way',
    'we',
    'wed',
    'welcome',
    'well',
    'well',
    'went',
    'were',
    'were',
    'werent',
    'weve',
    'what',
    'whatever',
    'whatll',
    'whats',
    'whatve',
    'when',
    'whence',
    'whenever',
    'where',
    'whereafter',
    'whereas',
    'whereby',
    'wherein',
    'wheres',
    'whereupon',
    'wherever',
    'whether',
    'which',
    'whichever',
    'while',
    'whilst',
    'whither',
    'who',
    'whod',
    'whoever',
    'whole',
    'wholl',
    'whom',
    'whomever',
    'whos',
    'whose',
    'why',
    'will',
    'willing',
    'wish',
    'with',
    'within',
    'without',
    'wonder',
    'wont',
    'would',
    'wouldnt',
    'x',
    'y',
    'yes',
    'yet',
    'you',
    'youd',
    'youll',
    'your',
    'youre',
    'yours',
    'yourself',
    'yourselves',
    'youve',
    'z',
    'zero',
  ]);
  const filteredQuery = removeStopwords(query, stopWords);
  if (filteredQuery !== query) {
    console.log(filteredQuery);
    return filteredQuery;
  }
  return query;
}
function processQuery(userInput) {
  const keywords = containsStopword(userInput);
  const keywordArray = keywords.split(' ');
  /* let stemmedArray = [];
  for (let i = 0; i < keywordArray.length; i += 1) {
    stemmedArray.push(stemWord(keywordArray[i]));
  } */
  for (let i = 0; i < keywordArray.length; i += 1) {
    keywordArray[i] = stemmer(keywordArray[i]);
  }
  console.log(keywordArray);
  return keywordArray;
}

module.exports = {
  processQuery,
};
