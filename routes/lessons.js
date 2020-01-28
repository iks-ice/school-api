const router = require('express').Router();
const { checkAuth, checkRole } = require('../middlewares/checkPermissons');
const {
  read, create, update, del,
} = require('../controllers/lessons');

router.get('/', checkAuth, read);
router.post('/', checkAuth, checkRole, create);
router.put('/:id', checkAuth, checkRole, update);
router.delete('/:id', checkAuth, checkRole, del);

module.exports = router;
