const yaml = require('js-yaml');
const axios = require('axios');
const fs   = require('fs');

const locales = ['en', 'nl']

const stats = {}
const translations = {}
const promises = []

/* Makes sure all strings from origin language are present in translation object */
function padTranslation(translation, original) {
  for(i in original) {
    translation[i] = padEntry(translation[i], original[i])
  }
  for(i in translation) {
    if(typeof original[i] === 'undefined') {
      delete translation[i]
    }
  }
  return translation
}

/* Adds entry from origin language to translation object, recursive if needed */
function padEntry(translation, original) {
  if(typeof original === 'string') {
      if(typeof translation === 'undefined' || translation === original) {
      translation = original+' TODO'
    }
  }
  else if(typeof original === 'object') {
    if(typeof translation === 'undefined') {
      translation = original
    }
    for(i in original) {
      translation[i] = padEntry(translation[i], original[i])
    }
  }
  return translation
}

/* Gets rid of TODO and DONE in (the strings of a) translation object */
function scrubTranslation(translation) {
  for(i in translation) {
    translation[i] = scrubEntry(translation[i])
  }
  return translation
}

/* Gets rid of TODO and DONE in a translation entry, recursive if needed */
function scrubEntry(translation) {
  if(typeof translation === 'string') {
    if(translation.indexOf('DONE') !== -1) {
      translation = translation.replace('DONE', '').trim()
    }
    if(translation.indexOf('TODO') !== -1) {
      translation = translation.replace('DONE', '').trim()
    }
  } else if(typeof translation === 'object') {
    for(i in translation) {
      translation[i] = scrubEntry(translation[i])
    }
  }
  return translation
}

// Let's get to work
console.log('Regenerating locales...')
for(l in locales) {
  let locale = locales[l]
  try {
    translations[locale] = yaml.safeLoad(fs.readFileSync('./locales/'+locale+'.yaml', 'utf8'));
  } catch (error) {
    console.log('Could not read '+locale+'.yaml', error)
  }
  if(locale !== 'en') {
    // Pad language files with new entries from origin files (English)
    for(file in translations.en) {
      translations[locale] = padTranslation(translations[locale], translations.en)
    }
  }
  try {
    // Writes sorted and padded yaml back to disk
    fs.writeFileSync('./locales/'+locale+'.yaml', yaml.safeDump(translations[locale], {sortKeys: true, lineWidth: 10000}), 'utf8')
  } catch (error) {
    console.log('Could not write yaml.'+locale, error)
  }
  // Filter out DONE and TODO
  translations[locale] = scrubTranslation(translations[locale])
  try {
    // Writes compiled json to disk
    fs.writeFileSync('./locales/dist/'+locale+'.json', JSON.stringify(translations[locale], null, 0), 'utf8')
  } catch (error) {
    console.log('Could not write json.'+locale, error)
  }
}
console.log('Done.')
