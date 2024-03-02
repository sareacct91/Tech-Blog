require('express-async-errors');
const express = require('express');
const session = require('express-session');
const { create } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const path = require('path');
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
const helpers = require('./utils/helpers');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT;
const hbs = create({extname: 'hbs', helpers});

app.use(session({
  secret: process.env.SESS_SECRET,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
    httpOnly: true,
    sameSite: 'strict',
  },
  resave: false,
  rolling: true,
  saveUninitialized: false,
  store: new SequelizeStore({ db: sequelize })
}))

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router);
app.use(errorHandler);

(async function () {
  await sequelize.sync({ force: false });
  app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
})();