const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;
const con = require('./access.json');

app.set('view engine', 'ejs');

const createPath = (page) => path.resolve(__dirname, `${page}.ejs`);

app.listen(PORT, (error) =>{
  error? console.log(error): console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
  //const dat = JSON.parse(con);
  var dat = con.catalog;
  res.render(createPath('main_paige'), {dat});
});

app.post('/', (req, res)=>{
  res.send(req.body);
});
