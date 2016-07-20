/**
 * A very simple static site generator.
 */

const fs = require('fs')
const Mustache = require('mustache')

const tidy = require('./tidy')

/**
 * The Pages to build
 */

const pages = ['index', 'cranes', 'schedule']

/**
 * The Partial Templates
 */

const navbar = readMustache('navbar')
const footer = readMustache('footer')

/**
 * The Master Template
 */

const master = readMustache('master')

/**
 * Build each page. Use json for data and mustache for templates.
 */

pages.forEach(function (name) {
  fs.readFile('static/' + name + '.json', 'utf8', function (err, json) {
    if (err) { return console.log('Json Error: ' + err) }

    const data = JSON.parse(json)

    fs.readFile('static/' + name + '.mustache', 'utf8', function (err, template) {
      if (err) { return console.log('Mustache Error: ' + err) }

      const partials = {
        navbar: navbar,
        page: template,
        footer: footer
      }

      const html = Mustache.render(master, data, partials)

      tidy(html, function (err, html) {
        if (err) { console.log('Tidy Error: ' + err) }

        fs.writeFile('public/' + name + '.html', html, 'utf8', function (err) {
          if (err) { return console.log('Save Error: ' + err) }
          console.log(name + '.html build success')
        })
      })
    })
  })
})

function readMustache (name) {
  return fs.readFileSync('static/_' + name + '.mustache', 'utf8')
}
