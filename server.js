//Підключаємо бібліотеки
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

/*Локальний користувач*/
var users = [
    {
        id: 1,
        login: "Yura",
        password: "some12345",
        eMail: "some@some.s",
        name: "Yura",
        sname: "Volchak",
        bDay: "1987-05-25",
        photo: "1.png",
        sources: [
            {
                id: 1,
                sName: "freelance",
                date: "2017-11-07"
             }
            , {
                id: 24,
                sName: "present",
                date: "2017-11-08"
             }
            , {
                id: 35,
                sName: "credit",
                date: "2017-11-09"
             }

        , ],
        catExpenses: [
            {
                id: 1,
                name: "car",
            },
            {
                id: 2,
                name: "food",
            },
            {
                id: 7,
                name: "house"
            },
        ],
        saves: [
            {
                id: 3,
                name: "visa",
                sum: 23456,
                date: "2017-11-07",

            },
            {
                id: 4,
                name: "cash",
                sum: 456,
                date: "2017-11-08",

            },
            {
                id: 7,
                name: "bank",
                sum: 2346,
                date: "2017-11-07",

            }
        ],
        incomes: [
            {
                id: 2,
                date: "2017-11-09",
                sum: 200,
                sourceId: 1,
                comments: " text"

            },
            {
                id: 5,
                date: "2017-11-09",
                sum: 400,
                sourceId: 1,
                comments: "dgf"
            },
            {
                id: 7,
                date: "2017-11-09",
                sum: 200,
                sourceId: 35,
                comments: " fhfh"
            }
        ],
        expences: [
            {
                id: 2,
                date: "2017-11-12",
                sum: "299",
                comments: "some text",
                catExpensesId: 2
            },
            {
                id: 3,
                date: "2017-11-12",
                sum: "100",
                comments: "some text",
                catExpensesId: 1
            }
        ]
    }
];

//Клієнтська частина сайту знаходитиметься у папці public
app.use(express.static(__dirname + '/public'));
//Стандарти кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

//Усі адреси контролюються клієнтським ангуляром

app.get('/userData', function (req, res) {
    res.status(200).send(users[0]);
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//Запуск серверу
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
