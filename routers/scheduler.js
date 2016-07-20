const express = require('express')
const router = express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.json({msg: 'no events'})
})

router.get('/:id', function (req, res) {
  const id = parseInt(req.params.id, 10)
  res.json({msg: 'no event with id ' + id})
})

function find (pred, xs) {
  let idx = 0
  const len = xs.length
  while (idx < len) {
    if (pred(xs[idx])) {
      return xs[idx]
    }
    idx += 1
  }
  return null
}

module.exports = router
