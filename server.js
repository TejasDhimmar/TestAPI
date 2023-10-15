var express = require('express');
const bodyParser = require('body-parser');

var app = express();
const db = require('./app/utils/db');

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 500000 }));

db.sequelize.sync({ force: false, alter: true }).then(() => {
    console.log('DB migrated...');
});

app.use(function (err, req, res, next) {
    console.log("ERRRR",err)
    res
      .status(err.status || 500)
      .send({ message: err.message, stack: err.stack });
  });

require('./app/routes/product.route.js')(app);
require('./app/routes/user.route.js')(app);
require('./app/routes/jokes.route.js')(app);

var server = app.listen(process.env.port, '0.0.0.0', function () {

    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})