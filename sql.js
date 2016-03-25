var sqlite3 = require('sqlite3');

var db = new sqlite3.Database("db_file.db");

db.serialize(function(){
    db.run("Create  Table if not exists " +
        "lorem (info text)");

    db.run("insert into lorem(info) values (1)");
});

db.close();
