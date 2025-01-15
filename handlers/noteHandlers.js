const NoteServices = require('../services/noteService');

function renderCreateNote(req, res) {
  res.render('notes/create');
}

async function renderNotesHome(req, res) {
  try {
    const notes = await NoteServices.renderNotesHome()
    console.log("🚀 ~ app.get ~ notes:", notes)
    res.render('home', { notes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar notas.');
  }
}

async function renderNoteDetail(req, res) {
  try {
    const note = await NoteServices.getNoteById(req.params.id);
    console.log("🚀 ~ renderNoteDetail ~ note:", note);
    res.render('notes/detail', { note });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar detalhes da nota.');
  }
}

async function renderEditNote(req, res) {
  try {
    const note = await NoteServices.getNoteById(req.params.id);
    res.render('notes/edit', { note });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar nota para edição.');
  }
}

async function handleUpdateNote(req, res) {
  try {
    const { id, title, description } = req.body;
    await NoteServices.updateNote(id, title, description);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar a nota.');
  }
}

async function handleCreateNote(req, res) {
  try {
    const { title, description } = req.body;
    await NoteServices.createNote(title, description);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar a nota.');
  }
}

async function handleDeleteNote(req, res) {
  try {
    const { id } = req.body;
    await NoteServices.deleteNote(id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar a nota.');
  }
}

module.exports = {
  renderCreateNote,
  renderNotesHome,
  renderNoteDetail,
  renderEditNote,
  handleUpdateNote,
  handleCreateNote,
  handleDeleteNote,
};
