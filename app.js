var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var path = require("path");


const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use('/api/store/', require('./api/store/index'));
app.use('/api/pos/', require('./api/pos/index'));
app.use('/api/order/', require('./api/order/index'));
app.use('/api/notifications/', require('./api/notifications/index'));
app.use('/api/coti/', require('./api/coti/index'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// app.use("/assets", express.static(__dirname + "/assets"));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port '+ app.get('puerto'));
});