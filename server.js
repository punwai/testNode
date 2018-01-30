const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('error!');
    }
  });
  next();
});

// // maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
//   next();
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Get Page',
    welcomeMessage: 'hallo its me',
    currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Get Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})


app.listen(3000);
