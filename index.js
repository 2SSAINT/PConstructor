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
    // \n НЕ РАБОТАЕТ
    return str1 + '\n' + str2;
    else {
      if (str1 != "") return str1;
      if (str2 != "") return str2;
    }
  },
  case : function (m,c) {
    if(con.catalog[8].models[c].formfact != con.catalog[0].models[m].formfact)
    console.log('Корпус и материнская плата несовместимы');
  },
  power_unit : function(p, m, cpu, r, g, col, h, s){
    var temp = 0, j = 0;
    var mas = [m, cpu, r, g, col];
    for (var i = 0; i < 5; i++){
      temp += con.catalog[i].models[mas[j]].tdp;
      j++;
    }
    // ниже, если ssd или hdd нет, то в функцию в качестве параметра передается -1
    if (h >= 0) {
      if (s == -1)
      temp += con.catalog[5].models[h].tdp;
      else temp += con.catalog[5].models[h].tdp + con.catalog[6].models[s].tdp;
    }
    else {
      if (s >= 0)
      temp += con.catalog[6].models[s].tdp;
    }
    if (con.catalog[9].models[p].power < temp)
    return 'Мощности блока питания не хватает';
  }
}
