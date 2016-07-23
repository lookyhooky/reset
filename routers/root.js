/**
 * Homepage Rounter
 */
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('root', {
    title: false,
    isRoot: true,
    description: 'Mobile Operated Crane Rental in Pasco, Kennewick, Richland' +
      ' and Southeastern Washington'
  })
})

module.exports = router
