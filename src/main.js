// Importing:

const {
  __,
  add,
  map,
  curry,
  assoc,
  append,
  evolve,
  reject
} = require('ramda')

const Type = require('union-type')
const forwardTo = require('flyd-forwardto')

const app = require('./app')

const component = require('./event')

const { svg, div, button } = require('./html')
const h = require('snabbdom/h')

// require('./style.css')

// The Code:

// The Model:

// if parts of the model are not updated, are they the same exact object?
// should be because scan reduces on the initialModel

const init = () => ({
  events: [],
  nextId: 0,
  buffer: ''
})

// The Reducer:

const Msg = Type({
  Input: [String],
  Insert: [],
  Remove: [Number],  // These are playloads supplied to the union-type
  Modify: [Number, component.Msg]
})

// This makes the code look much cleaner
const { Insert, Remove, Modify } = Msg

const update = (model, msg) => {
  const evolveModel = evolve(__, model)

  return Msg.case({

    Input: (string) => assoc('buffer', string, model),

    Insert: () => evolveModel({
      nextId: add(1),
      events: append([model.nextId, component.init()])
    }),

    Remove: (id) => evolveModel({
      events: reject((event) => event[0] === id)
    }),

    Modify: (id, eventMsg) => evolveModel({
      events: map((event) => {
        const [eventId, eventModel] = event
        return (eventId === id)
          ? [eventId, component.update(eventModel, eventMsg)]
          : event
      })
    }),

    _: model

  }, msg)
}

// The Views:

const eventView = curry((msgs$, event) => {
  const [id, model] = event
  return div({ class: { 'inline-block': true, px1: true } }, [
    component.view(forwardTo(msgs$, Modify(id)), model),
    button({
      on: { click: [msgs$, Remove(id)] },
      class: { btn: true, 'btn-primary': true, mb1: true }
    }, 'Remove')
  ])
})

const view = curry((msgs$, model) => {
  function pass (event) {
    /* This is just a test to see how to pass the event information on to the
     * messages stream with a Msg type
     */
    console.log(event.target.value)
    // pass the Input Msg the value of the input element.
    msgs$(Msg.Input(event.target.value))
  }

  const events = map(eventView(msgs$), model.events)
  return div({ style: {textAlign: 'center'} }, [
    h('div', {}, model.buffer),
    h('form', {}, [
      h('div.clearfix', {}, [
        h('div.sm-col.sm-col-6.px1', {}, [
          h('label.label', {
            style: {textAlign: 'left'}
          }, 'First Name'),
          h('input.input', {
            props: {
              id: 'firstname',
              name: 'firstname',
              type: 'text',
              placeholder: 'Type your name...'
            },
            on: {input: pass}
          }, [])
        ]),
        h('div.sm-col.sm-col-6.px1', {}, [
          h('label.label', {
            style: {textAlign: 'left'}
          }, 'Last Name'),
          h('input.input', {
            props: {id: 'lastname', name: 'lastname', type: 'text'}
          }, [])
        ])
      ])
    ]),
    button({
      on: { click: [msgs$, Insert()] },
      class: { btn: true, 'btn-primary': true, my1: true }
    }, 'Create'),
    div({}, events),
    svg({attrs: {width: 100, height: 100}}, [
      svg.circle({attrs: {cx: 50, cy: 50, r: 40, stroke: 'green', 'stroke-width': 4, fill: 'yellow'}})
    ])
  ])
})

// Start Program:

app.program({ update, view, initialModel: init() })
