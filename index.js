var con = require('./access.json')

// Модуль для сравнения комплектующих
module.exports = {
  cpu : function( m, c, r) {
    //проц с материнкойcon.catalog[1].models[c].socket
    if(con.catalog[1].models[c].socket != con.catalog[0].models[m].socket)
    console.log('Сокет материнской платы не соответствует сокету процессора');
    // проц с ОЗУ
    if (con.catalog[1].models[c].mem_type != con.catalog[1].models[r].type)
    console.log('Тип оперативной памяти не поддерживается процессором');
  },
  ram : function(r, m) {
    // ОЗУ и мать
    if (con.catalog[2].models[r].type != con.catalog[0].models[m].ram_type)
    console.log('Тип оперативной памяти не поддерживается материнской платой');
  },
  graphics_card : function(g, m, c) {
    //видеокарта и мать НЕДОДЕЛАНО
    if (con.catalog[0].models[m].pcie_x8 != 0 && con.catalog[3].models[g].interface != 'PCI-E 8x')
    console.log('Материнская плата и видеокарта несовместимы по интерфейсу');
    else if (con.catalog[0].models[m].pcie_x4 != 0 && con.catalog[3].models[g].interface != 'PCI-E 4x')
    console.log('Материнская плата и видеокарта несовместимы по интерфейсу');
    else if (con.catalog[0].models[m].pcie_x2 != 0 && con.catalog[3].models[g].interface != 'PCI-E 2x')
    console.log('Материнская плата и видеокарта несовместимы по интерфейсу');
    else if (con.catalog[0].models[m].pcie_x2 != 0 && con.catalog[3].models[g].interface != 'PCI-E 1x')
    console.log('Материнская плата и видеокарта несовместимы по интерфейсу');
  },
  cooler : function (col, cpu) {
    // кулер и процессор
    var cp = 0;
    for (var i = 0; i < con.catalog[4].models[col].socket.lenght; i++) {
      if (con.catalog[4].models[col].socket[i] == con.catalog[1].models[cpu].socket){
        cp = 1;
        break;
      }
    }
    if (cp == 0)
    console.log('Сокет кулера не совместим спроцессором');
    if (con.catalog[4].models[col].power_dissipation < con.catalog[1].models[cpu].tdp)
    console.log('Мощности кулера недостаточно для отвода тепла, выделяемого процессором');
  }
}
