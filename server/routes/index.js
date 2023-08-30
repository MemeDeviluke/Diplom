const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const reportRouter = require('./reportRouter')


router.use('/user', userRouter)
router.use('/report', reportRouter)


module.exports = router