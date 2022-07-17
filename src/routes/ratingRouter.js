const { Router } = require('express')
const { ratingController } = require('../controllers')

const {
  amountValidity,
  pageQuery,
} = require('../middlewares/taskHistoryMiddlewares')

let ratingRouter = Router()

ratingRouter.get('/', amountValidity, pageQuery, ratingController)

module.exports = ratingRouter
