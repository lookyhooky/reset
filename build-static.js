/**
 * A very simple static site generator.
 */

const fs = require('fs')
const Mustache = require('mustache')

const tidy = require('./tidy')

/**
 * The Pages to build
 */

const pages = ['index', 'cranes', 'scheduler']

/**
 * The Partial Templates
 */

const navbar = readPartial('navbar')
const footer = readPartial('footer')

/**
 * The Master Template
 */

const master = readPartial('master')

/**
 * Build each page. Use json for data and mustache for templates.
 */

pages.forEach(function (name) {
  /**
   * Load the json data file for the page
   */

  fs.readFile('static/' + name + '.json', 'utf8', function (err, json) {
    if (err) { return console.log('Json Error: ' + err) }

    /**
     * The page data parsed and ready for template injection
     */

    const data = JSON.parse(json)

    /**
     * Load the mustache template file for the page
     */

    fs.readFile('static/' + name + '.mustache', 'utf8', function (err, template) {
      if (err) { return console.log('Mustache Error: ' + err) }

      /**
       * The Partials Object expected by the master template
       */

      const partials = {
        navbar: navbar,
        page: template,
        footer: footer
      }

      /**
       * The rendered html from mustache
       */

      const html = Mustache.render(master, data, partials)

      /**
       * Clean up the html to make it look pretty
       */

      tidy(html, function (err, html) {
        if (err) { console.log('Tidy Error: ' + err) }

        /**
         * Write the finished html to the public folder
         */

        fs.writeFile('public/' + name + '.html', html, 'utf8', function (err) {
          if (err) { return console.log('Save Error: ' + err) }
          console.log(name + '.html build success')
        })
      })
    })
  })
})

function readPartial (name) {
  return fs.readFileSync('static/_' + name + '.mustache', 'utf8')
}
