//Підключаємо бібліотеки
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = 8000;



//Клієнтська частина сайту знаходитиметься у папці public
app.use(express.static(__dirname + '/public'));
//Стандарти кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "my_project"
});

connection.connect();
//авторизація
app.post('/loginUser', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            if (rows[0].pass == req.body.pass) {
                res.status(200).send("welcome");
            } else {
                res.status(200).send("wrong password");
            }
        } else {
            res.status(200).send("wrong login");
        }
    });
});

//реєстрація 
app.post('/loginRegistr', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            res.status(200).send("Choose another login!");
        } else {
            connection.query('INSERT INTO users SET ?', req.body,
                function (err, result) {
                    if (err) throw err;
                    console.log('user added to database with id: ' + result.insertId);

                }

            );
            res.status(200).send(req.body.login+" registered!");
        }
    });
});

 //Профіль юзера
app.post('userProfile', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
			connection.query('SELECT eMail,nameUser,snameUser,bDay,photo FROM users', rows[0].id, function (err, res) {
                if (err) throw err;
                if (resu[0] != undefined) {
                    res.status(200).send(resu);
                } else {
                    res.status(200).send("Profile is undefined!");
                }
            });
        } else {
            res.status(200).send("Profile is undefined!");
        }
    });
});

//данні Соурсів
app.post('userSources', function (req, res) {
			connection.query('SELECT nameSource,dateSource,nameUser FROM  sources JOIN users ON sources.id_users = users.id; ', rows[0].id, function (err, res) {
                if (err) throw err;
                if (resu[0] != undefined) {
                    res.status(200).send(res);
                } else {
                   res.status(200).send("Choose your Sources!")
                }
      }
     );   
    });
//данні категорії витрат
app.post('userCatExpenses', function (req, res) {
			connection.query('SELECT nameCatExp,nameUser FROM  catexpenses JOIN users ON catexpenses.id_users = users.id', rows[0].id, function (err, res) {
                if (err) throw err;
                if (resu[0] != undefined) {
                    res.status(200).send(res);
                } else {
                   res.status(200).send("Choose your Category Expenses")
                }
     }
     );   
    });
//данні про збереження
app.post('userSaves', function (req, res) {
			connection.query('SELECT nameSaves,sumSaves,dateSaves,nameUser FROM  saves JOIN users ON saves.id_users = users.id', rows[0].id, function (err, res) {
                if (err) throw err;
                if (resu[0] != undefined) {
                    res.status(200).send(res);
                } else {
                   res.status(200).send("Choose your Saves!")
                }
   }
     );   
    });
// данні про доходи
app.post('userInsomes', function (req, res) {
			connection.query('SELECT nameUser,dateIncomes,sumIncomes,comments,nameSource FROM incomes JOIN users ON incomes.id_users = users.id JOIN sources ON incomes.id_sources = sources.id', rows[0].id, function (err, res) {
                if (err) throw err;
                if (resu[0] != undefined) {
                    res.status(200).send(res);
                } else {
                   res.status(200).send("Choose your Incomes!")
                }
   }
     );   
    });
//данні про витрати
app.post('userExpenses', function (req, res) {
			connection.query('SELECT nameUser,dateExpenses,sumExpenses,commentsExpenses,nameSaves,nameCatExp FROM expenses JOIN users ON expenses.id_users = users.id JOIN saves ON expenses.id_saves = saves.id JOIN catexpenses ON expenses.id_catexpenses = catexpenses.id', rows[0].id, function (err, res) {
                if (err) throw err;
                if (resu[0] != undefined) {
                    res.status(200).send(res);
                } else {
                   res.status(200).send("Choose your Expenses!")
                }
    }
     );   
    });
//запит Отримуєм всі сорси юзера +
app.get('/getIncomes', function (req, res) {
			connection.query('SELECT * FROM sources WHERE id_users = ? AND dateSource LIKE ?', [req.query.uid, '%' + req.query.year], function (err, resu, fld) {
                if (err) throw err;
                res.status(200).send(resu);
   });   
});
// отримуєм суми +
app.get('/getIncomesSum', function (req, res) {
			connection.query('SELECT * FROM incomes WHERE id_users = ? AND dateIncomes LIKE ?', [req.query.uid, '%'+req.query.year], function (err, resu, fld) {
                if (err) throw err;
                res.status(200).send(resu);
   });   
});
//отримуєм суми по окремому типу +
/*app.get('/getIncomeSum', function (req, res) {
			connection.query('SELECT * FROM incomes WHERE id_users = ? AND id_sources = ?', [req.query.uid, req.query.sid], function (err, resu) {
                if (err) throw err;
                res.status(200).send(resu);
   });   
});*/
//отримуєм назви витрат +
app.get('/getCatExpenses', function (req, res) {
			connection.query('SELECT * FROM catexpenses WHERE id_users = ?', [req.query.uid], function (err, resu, fld) {
                if (err) throw err;
                res.status(200).send(resu);
   });   
});
// отримуєм витрати +
app.get('/getExpenses', function (req, res) {
			connection.query('SELECT * FROM expenses WHERE id_users = ? AND dateExpenses LIKE ?', [req.query.uid, '%'+req.query.year], function (err, resu, fld) {
                if (err) throw err;
                res.status(200).send(resu);
   });   
});
// отримуєм збереження +
app.get('/getSaves', function (req, res) {
			connection.query('SELECT * FROM saves WHERE id_users = ? AND dateSaves LIKE ?', [req.query.uid, '%'+req.query.year], function (err, resu, fld) {
                if (err) throw err;
                res.status(200).send(resu);
   });   
});


app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//Запуск серверу
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});