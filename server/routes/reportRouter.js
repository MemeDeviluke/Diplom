const Router = require('express')
const router = new Router()
const reportController = require('../controllers/reportController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole("ADMIN"), reportController.create)
router.get('/', reportController.getAll)
router.get('/:id', reportController.getOne)


module.exports = router