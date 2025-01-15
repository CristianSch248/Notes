const db = require('../db/connection');
const { ObjectId } = require('mongodb');

async function renderNotesHome(req, res) {
  const notes = await db.getDb().db().collection('notes').find({}).toArray();
  return notes
}

async function getNoteById(id) {
  const note = await db.getDb().db().collection('notes').findOne({ _id: new ObjectId(id) });
  return note;
}

async function createNote(title, description) {
  await db.getDb().db().collection('notes').insertOne({ title, description });
}

async function updateNote(id, title, description) {
  await db.getDb().db().collection('notes').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, description } }
  );
}

async function deleteNote(id) {
  await db.getDb().db().collection('notes').deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  renderNotesHome,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
