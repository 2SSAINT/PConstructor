const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;
const con = require('./access.json');
const ind = require('./index.js')

var results = [];
var b;
var body = '0';

app.set('view engine', 'ejs');

const createPath = (page) => path.resolve(__dirname, `${page}.ejs`);

app.listen(PORT, (error) =>{
  error? console.log(error): console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
  var dat = con.catalog;
  res.render(createPath('main_paige'), {dat});
});

app.post('/', (req, res)=>{
  b = req.body;
  results[0] = ind.cpu_mother(b.CPU, b.MB);
  results[1] = ind.cpu_ram(b.CPU, b.RAM);
  results[2] = ind.ram_mother(b.RAM, b.MB);
  results[3] = ind.graphicsCard_mother(b.GC, b.MB);
  results[4] = ind.graphicsCard_case(b.GC, b.CASE);
  results[5] = ind.cooler_cpu(b.COOL, b.CPU);
  results[6] = ind.case_mother(b.CASE, b.MB);
  results[7] = ind.power_unit(b.PU,b.MB,b.CPU,b.RAM,b.GC,b.COOL,b.HDD,b.SSDS);
  res.redirect("/results");
});

app.get('/results',(req,res)=>{
  var dat = con.catalog;
  var j = 1;
  results.forEach((item, i) => {
    if (results[item] != 1){
      j = 0;
    }
  });
  res.render(createPath('Results_of_check'), {j, b, results, dat});
});

app.get('/catalog',(req,res)=>{
  var dat = con.catalog;
  res.render(createPath('Catalog'), {dat, body});
});

app.post('/catalog', (req, res)=>{
  body = req.body.value;
  var dat = con.catalog;
  console.log(body);
  res.render(createPath('Catalog'), {dat, body});
});

app.get('/MBinfo/:id', function(req, res) {
  var dat = con.catalog;
  MBid = req.params.id;
  res.render(createPath('info-ejs/MB'), {MBid, dat});
})

app.get('/CPUinfo/:id', function(req, res) {
  var dat = con.catalog;
  CPUid = req.params.id;
  res.render(createPath('info-ejs/CPU'), {CPUid, dat});
})

app.get('/RAMinfo/:id', function(req, res) {
  var dat = con.catalog;
  RAMid = req.params.id;
  res.render(createPath('info-ejs/RAM'), {RAMid, dat});
})

app.get('/GCinfo/:id', function(req, res) {
  var dat = con.catalog;
  GCid = req.params.id;
  res.render(createPath('info-ejs/GC'), {GCid, dat});
})

app.get('/COOLinfo/:id', function(req, res) {
  var dat = con.catalog;
  COOLid = req.params.id;
  res.render(createPath('info-ejs/COOL'), {COOLid, dat});
})

app.get('/HDDinfo/:id', function(req, res) {
  var dat = con.catalog;
  HDDid = req.params.id;
  res.render(createPath('info-ejs/HDD'), {HDDid, dat});
})

app.get('/SSDinfo/:id', function(req, res) {
  var dat = con.catalog;
  SSDid = req.params.id;
  res.render(createPath('info-ejs/SSD'), {SSDid, dat});
})

app.get('/CASEinfo/:id', function(req, res) {
  var dat = con.catalog;
  CASEid = req.params.id;
  res.render(createPath('info-ejs/CASE'), {CASEid, dat});
})

app.get('/PUinfo/:id', function(req, res) {
  var dat = con.catalog;
  PUid = req.params.id;
  res.render(createPath('info-ejs/PU'), {PUid, dat});
})
