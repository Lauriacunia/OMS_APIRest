const express = require('express');
const mongoose = require('mongoose');
const morgan= require('morgan');

const app = express();


// conecting to db

mongoose.connect('mongodb+srv://oms:*******@cluster0.cyfup.mongodb.net/omsCovid?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log('Db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes

app.use('/', indexRoutes);

//starting the server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})