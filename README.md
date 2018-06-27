# VaHI Website

[VaHI](https://vahi.eu/) is a standardized grading system for limbal stem cell deficiency.

> This is the `wesbite` repository which holds the code for [our website](https://api.vahi.eu/).

For more information on what VaHI does/is, please visit [vahi.eu](https://vahi.eu/).

## About

The **website** respository holds VaHI's website available at vahi.eu.

This site is build with [Vue.js](https://vuejs.org/) and [Nuxt](https://nuxtjs.org/).
We use `nuxt generate` to build it into a static site that we deploy on [Netlify](https://netlify.com) 
and hook up to our [api](https://github.com/vahicode/api).

## System Requirements

 - node.js

## Installation

 - Clone the respository and install dependencies with NPM (or yarn):
 
```
git clone git@github.com:vahicode/website.git
cd website
npm install
```

  - Configure the `VAHI_API` environment variable to point to your API (eg: `export VAHI="https://api.vahi.eu"`).
  - You can now run `npm run dev` to serve the site on [localhost:3000](http://localhost:3000/)
  - Or run `npm run generate` to generate a static site.

## Translations

We use [vue-i18n](https://github.com/kazupon/vue-i18n) for translations. If you'd like to add a language, you can simply copy [the English language file](https://github.com/vahicode/website/blob/master/locales/en.yaml) and translate it. 

For example, to add a Spanish translation, copy `locales/en.yaml` to `locales/es.yaml` and translate it to Spanish. Keep in mind that these are YAML file with `key`: `value` pairs. You should only translate the `value` and not the `key`.

Once your translation is ready, run `npm run locgen` in the project root. Then, add the language to the config file to add it to the site. You will also want to [add a flag icon](https://github.com/vahicode/website/tree/master/static/icons/flags).

## Contribute

Your pull request are welcome here. If you have any questions, please [create an issue](https://github.com/vahicode/website/issues/new).

## License
VaHI is licensed under the MIT license. See [the License file](https://github.com/vahicode/api/blob/master/LICENSE) for more information.
