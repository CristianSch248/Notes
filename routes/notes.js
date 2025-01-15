const { Router } = require('express');
const notesHandlers = require('../handlers/noteHandlers');

const router = Router();

router.get('/', notesHandlers.renderCreateNote);
router.get('/:id', notesHandlers.renderNoteDetail);
router.get('/edit/:id', notesHandlers.renderEditNote);
router.post('/update', notesHandlers.handleUpdateNote);
router.post('', notesHandlers.handleCreateNote);
router.post('/delete', notesHandlers.handleDeleteNote);

module.exports = router;
