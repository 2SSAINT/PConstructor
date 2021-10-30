var con = require('./access.json')

// Модуль для сравнения комплектующих
module.exports = {
  cpu_mother : function(c, m) {
    //проц с материнкойcon.catalog[1].models[c].socket
    if(con.catalog[1].models[c].socket != con.catalog[0].models[m].socket)
    return 'Сокет материнской платы не соответствует сокету процессора';
  },
    // проц с ОЗУ
  cpu_ram : function(c, r) {
    if (con.catalog[1].models[c].mem_type != con.catalog[1].models[r].type)
    return'Тип оперативной памяти не поддерживается процессором';
  },
  ram_mother : function(r, m) {
    // ОЗУ и мать
    if (con.catalog[2].models[r].type != con.catalog[0].models[m].ram_type)
    return'Тип оперативной памяти не поддерживается материнской платой';
  },
  graphicsCard_mother : function(g, m) {
    if (con.catalog[0].models[m].pcie_x16 == 0)
    return'На метеринсую плату нельзя поставить видеокарту';
  },
  graphicsCard_case: function(g, c) {
    if (con.catalog[3].models[g].lenght > con.catalog[8].models[c].max_lenght_graph_card)
    return 'Длина видеокарты превышает допустимую корпусом'
  },
  cooler_cpu : function (col, cpu) {
    // кулер и процессор
    let str1 = "",str2 = "";
    var cp = 0;
    con.catalog[4].models[col].socket.forEach((item) => {
      if (item == con.catalog[1].models[cpu].socket)
        cp = 1;
    });
    if (cp == 0)
    str1 = 'Сокет кулера не совместим спроцессором';
    if (con.catalog[4].models[col].power_dissipation < con.catalog[1].models[cpu].tdp)
    str2 = 'Мощности кулера недостаточно для отвода тепла, выделяемого процессором';
    if (str1 != "" && str2 != "")
    return str1 + '\n' + str2;
    else {
      if (str1 != "") return str1;
      if (str2 != "") return str2;
    }
  },
  m2 : function(m2, m) {
  },
  case : function (m,c) {
    if(con.catalog[8].models[c].formfact != con.catalog[0].models[m].formfact)
    console.log('Корпус и материнская плата несовместимы');
  }
}
