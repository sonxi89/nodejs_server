const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.post('/handle-form-actions', coursesController.handleFormActions);
router.delete('/:id', coursesController.softDelete);
router.delete('/:id/delete', coursesController.delete);
router.patch('/:id/restore', coursesController.restore);
router.put('/:id', coursesController.update);
router.get('/:slug', coursesController.show);

module.exports = router;
