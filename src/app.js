const express = require('express');
const mongoose = require('mongoose');
const morgan= require('morgan');
const cors = require('cors');
const app = express();


/* ～●～●～●～●～●～●～●～●～●～●～ 
         Conecting to DB
   ～●～●～●～●～●～●～●～●～●～●～ 
*/

mongoose.connect('mongodb+srv://oms:contraseniaSegura2021@cluster0.cyfup.mongodb.net/omsCovid?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log('Db connected'))
  .catch(err => console.log(err));

/* ～●～●～●～●～●～●～●～●～●～●～ 
         Importing Routes
   ～●～●～●～●～●～●～●～●～●～●～ 
*/

const indexRoutes = require('./routes/index');

/* ～●～●～●～●～●～●～●～●～●～●～ 
         Settings
   ～●～●～●～●～●～●～●～●～●～●～ 
*/

app.set('port', process.env.PORT || 3000);
app.use(cors());

/* ～●～●～●～●～●～●～●～●～●～●～ 
         Middlewares
   ～●～●～●～●～●～●～●～●～●～●～ 
*/

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))


/* ～●～●～●～●～●～●～●～●～●～●～ 
         Routes
   ～●～●～●～●～●～●～●～●～●～●～ 
*/

app.use('/', indexRoutes);

/* ～●～●～●～●～●～●～●～●～●～●～ 
         Starting the server
   ～●～●～●～●～●～●～●～●～●～●～ 
*/

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})