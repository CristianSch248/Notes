const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const notesRoutes = require('./routes/notes');
const notesHandlers = require('./handlers/noteHandlers');
const db = require('./db/connection');

const app = express();
const port = 8000;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/notes', notesRoutes);
app.get('/', notesHandlers.renderNotesHome);

db.initDb((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta: ${port}`);
    });
  }
});