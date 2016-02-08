var express = require('express');
var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set the port
app.set('port', process.env.PORT || 3000);

// declare statick middleware
app.use(express.static(__dirname + '/public'));



// route homepage
app.get('/', function (req, res) {
  res.render('home');
});


// set foutune cookie
var fortunes = [
        "Conquer you fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple",
];


// route about page
app.get('/about', function (req, res) {
  var randomFortuene = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortuene });
});




// custom 404 page
app.use(function (err, req, res, next) {
   res.status(404);
   res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
   console.error(err.stack);
   res.status(500);
   res.render('500');
});

app.listen(app.get('port'), function () {
   console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-c to terminate');
});
