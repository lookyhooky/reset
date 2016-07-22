/**
 * The Event Module
 */

// Importing:

const { div, button } = require('./html')

const Type = require('union-type')

const {
  curry,
  evolve
} = require('ramda')

// The Code:

// The Model Initializer:

const init = () => ({
  clicks: 0
})

// The Messages:

const Msg = Type({
  Click: []
})

// The Reducer:

const update = curry((model, msg) => {
  console.log(model)
  return Msg.case({

    Click: () => evolve({ clicks: n => n + 1 }, model),

    _: () => model

  }, msg)
})

// The View:

const view = curry((msgs$, model) => {
  const { clicks } = model
  return div({}, [
    div({}, 'Clicks: ' + clicks),
    button({
      on: { click: [msgs$, Msg.Click()] },
      class: { btn: true, my1: true }
    }, 'Clicky')
  ])
})

// Exposing:

module.exports = {
  init,
  Msg,
  update,
  view
}
