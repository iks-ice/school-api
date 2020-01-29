const router = require('express').Router();
const { check } = require('express-validator');
const { checkAuth, checkRole } = require('../middlewares/checkPermissons');
const {
  read, create, update, del,
} = require('../controllers/lessons');

router.get('/', checkAuth, read);
router.post('/', checkAuth, checkRole, [
  check('subject', 'Subject is required').not().isEmpty(),
  check('time', 'Date and time  are required').not().isEmpty(),
  check('classroom', 'Classroom is required').not().isEmpty(),
], create);
router.put('/:id', checkAuth, checkRole, update);
router.delete('/:id', checkAuth, checkRole, del);

module.exports = router;
