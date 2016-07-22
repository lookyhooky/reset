const flyd = require('flyd')

const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/attributes'), // needed for using svg!
  require('snabbdom/modules/eventlisteners')
])

const msgs$ = flyd.stream()

const rootElementId = 'scheduler'

const program = function ({update, view, initialModel}) {
  // Begin rendering when the DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById(rootElementId)

    if (container) {
      // All modifications to the state originate here
      const msgs$ = flyd.stream() // Html dom related messages maybe
      // const subscriptions = flyd.stream()
      // subscriptions would create a different route for the update
      // function to occur... don't know what that would look like yet.
      // Do the subscriptions require mapping from child and parent
      // messages or does subscribe route messages directly to
      // the update date function of child components???

      // Contains the entire state of the application

      // update() should return an initial model when not given arguments
      // which will be the accumulator for the model stream
      const model$ = flyd.scan(update, initialModel, msgs$)

      // Stream of virtual nodes to render
      const vnode$ = flyd.map(view(msgs$), model$)

      // Uncomment to log state on every update
      flyd.map(console.log.bind(console), model$)

      // Observe vnode$ for changes in state, apply patch on change,
      // starting with reducing on container
      flyd.scan(patch, container, vnode$)
    }
  })
}

module.exports = { msgs$, program }
