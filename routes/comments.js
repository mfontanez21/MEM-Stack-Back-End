const router = require('express').Router()
const commentsCtrl = require('../controllers/comments.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, commentsCtrl.index)
router.post('/', checkAuth, commentsCtrl.create)
router.put('/:commentId', checkAuth, commentsCtrl.update)
router.delete('/:commentId', checkAuth, commentsCtrl.delete)


module.exports = router