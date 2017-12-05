//Під`єднюємо ангуляр
const app = angular.module('app', ['ngRoute', 'ngDialog']);

//Створюємо контроллер
app.controller('myCtrl', function ($scope, $http, ngDialog) {
    /*Включаємо форму логування*/

    $scope.users = [
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
                    sum: 500,
                    date: "23.11.2017",

            },
                {
                    id: 4,
                    name: "cash",
                    sum: 9000,
                    date: "23.11.2017",

            },
                {
                    id: 288,
                    name: "bank",
                    sum: 10,
                    date: "23.11.2017",

            }
        ],
            incomes: [
                {
                    id: 2,
                    date: "02.01.2017",
                    sum: 100,
                    sourceId: 1,
                    comments: " text"

            },
                {
                    id: 5,
                    date: "23.11.2017",
                    sum: 10000,
                    sourceId: 1,
                    comments: "dgf"
            },
                {
                    id: 7,
                    date: "05.09.2017",
                    sum: 200,
                    sourceId: 35,
                    comments: " fhfh"
            },
            {
                    id: 7,
                    date: "09.11.2017",
                    sum: 200,
                    sourceId: 35,
                    comments: " fhfh"
            }
        ],
            expences: [
                {
                    id: 2,
                    date: "20.11.2017",
                    sum: 3000,
                    comments: "some text",
                    catExpensesId: 2
            },
                {
                    id: 3,
                    date: "23.10.2017",
                    sum: 100,
                    comments: "some text",
                    catExpensesId: 1
            },
            {
                    id: 3,
                    date: "23.01.2017",
                    sum: 100,
                    comments: "some text",
                    catExpensesId: 1
            },
            {
                    id: 3,
                    date: "22.11.2017",
                    sum: 1000,
                    comments: "some text",
                    catExpensesId: 1
            }
        ]
                }];

    $scope.loginBlock = true;
    $scope.ShowHomeBlock = function () {
        /*Включаємо інтерфейс коритувача*/
        $scope.menuBlock = true;
        $scope.headerBlock = true;
        /*Катя тут напише show homeBlock = true*/
        $scope.homeBlock = true;
        /*Ховаємо форму логування*/
        $scope.loginBlock = false;
        //        console.log($scope.user.login);
    }

    $scope.ShowLoginBlock = function () {

        localStorage.login = undefined;

        $scope.menuBlock = false;
        $scope.headerBlock = false;

        $scope.homeBlock = false;

        $scope.loginBlock = true;
    }

    /*Написано Дмитром*/
    /*Якщо юзер заходить впереше*/
    if (localStorage.login == "undefined") {
        localStorage.login = "Guest"
    }
    /*Якщо юзер вже заходив*/
    if (localStorage.login != "Guest") {
        $http.get("/userData").then(function succesCallBack(response) {
            $scope.user = response.data;
        });
        $scope.ShowHomeBlock();
    }
});
//Директива header
app.directive('headerBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/header.html',
        controller: function ($scope, ngDialog) {
            //відкриваємо діалогове вікно для додавання доходу
            $scope.openIncomes = function () {
                ngDialog.open({
                    template: '../template/pages/incomeAddModal.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            }

            //Рахує всі збереження
            $scope.CalculTotalBudget = function(){
                let length = $scope.users[0].saves.length;

                let sum = 0;

                for(var i = length-1; i >= 0; i--){
                    sum += $scope.users[0].saves[i].sum;
                }

                return $scope.totalBudget = sum;
            }

            /*обраховуємо місячні доходи*/
            $scope.CalculMounthInc = function() {
                let length = $scope.users[0].incomes.length;

                let date = new Date()
                let currentDate = date.getMonth() + 1;

                let sum = 0;

                for(var i = length-1; i >= 0; i--){

                    var result = $scope.users[0].incomes[i].date.split(".");

                    if( result[1] == currentDate ){

                        sum += $scope.users[0].incomes[i].sum;
                    }
                }

                return $scope.monthInc = sum;
            }

            // Обрахувати місяні витрати
            $scope.CalculMounthExp = function() {
                let length = $scope.users[0].expences.length;

                let date = new Date()
                let currentDate = date.getMonth() + 1;

                let sum = 0;

                for(var i = length-1; i >= 0; i--){

                    var result = $scope.users[0].expences[i].date.split(".");

                    if( result[1] == currentDate ){

                        sum += $scope.users[0].expences[i].sum;
                    }
                }

                return $scope.monthExp = sum;
            }


            $scope.CalculTotalBudget();
            $scope.CalculMounthInc();
            $scope.CalculMounthExp();

            /*

                incomes: [
                {
                    id: 2,
                    date: "23.01.2017",
                    sum: 200,
                    sourceId: 1,
                    comments: " text"


            */
        }
    }
});
// Додати надходження
app.directive("addIncome", function () {
    return {
        replace: true,
        templateUrl: 'template/pages/incomeAdd.html',
        controller: function ($scope, ngDialog) {
            //дeфолтні select
            $scope.SelectedIncomeSource = $scope.users[0].sources[0];
            $scope.SelectedIncomeSave = $scope.users[0].saves[0];
            //дефолтна сума
            $scope.IncomeSum = 1;
            //Обраховуємо суму сейву
            $scope.newSaveSum = $scope.SelectedIncomeSave.sum + $scope.IncomeSum;
            // Додаємо наші витрати


            $scope.addIncome = function () {
                let obj = {
                    sourceId: $scope.SelectedIncomeSource.id,
                    name: $scope.IncomeName,
                    comment: $scope.IncomeComment,
                    sum: $scope.IncomeSum,
                    saveId: $scope.SelectedIncomeSave.id
                }
                console.log(obj);
            }
        }
    }
});
/*навігація*/

app.directive('navBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/nav.html',
        controller: function ($scope) {

            $scope.LogOut = function () {
                $scope.ShowLoginBlock();
                $scope.accountBlock = false;
                $scope.homeBlock = false;
                $scope.statsBlock = false;
            }

            $scope.usersPage = function () {
                $scope.accountBlock = true;
                $scope.homeBlock = false;
                $scope.statsBlock = false;
            }
            $scope.statsPage = function () {
                $scope.accountBlock = false;
                $scope.homeBlock = false;
                $scope.statsBlock = true;
            }
            $scope.homePage = function () {
                $scope.accountBlock = false;
                $scope.homeBlock = true;
                $scope.statsBlock = false;
            }

        }
    }
});
//Директива Content
app.directive('contentBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/content.html',
        controller: function ($scope) {}
    }
});
//Директива Login
app.directive('loginBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pages/login.html',
        controller: function ($scope, ngDialog, $http) {
            $scope.Registr = function () {
                $scope.registerBlock = true;
                $scope.loginBlock = false;
            }
            $scope.getUser = function () {
                $http.get("/userData").then(function succesCallBack(response) {
                    console.log(response.data);

                    $scope.user = response.data;

                    localStorage.login = $scope.user.login;

                    $scope.ShowHomeBlock();
                });
            }
        }
    }
});
//Директива Registration
app.directive('registrBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pages/registr.html',
        controller: function ($scope, $http) {

            $scope.registerAcc = function () {
                let obj = {
                    nameUser: $scope.RegName,
                    snameUser: $scope.RegSurname,
                    eMail: $scope.RegMail,
                    login: $scope.RegLogin,
                    pass: $scope.RegPassword,
                    bDay: $scope.RegBDate
                };
                         $http.post('http://localhost:8000/registrBlock', obj)
                        .then(function successCallback() {
                            alert("Registered " + $scope.RegLogin + "!!!");
                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                console.log(obj);
                
                
            }

            $scope.closeRegAcc = function () {
                $scope.registerBlock = false;
                $scope.loginBlock = true;
            }
        }
    }
});

//Директива home
app.directive('homeBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pages/home.html',
        controller: function ($scope, ngDialog) {
            //Локальна змінна для даних


            $scope.spendSavesModal = function (id) {

                //Відкриваєо модальне вікно
                ngDialog.open({
                    template: '../template/pages/spendSavesModal.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            }
        }
    }
});
//Витарати
app.directive("spendSaves", function () {
    return {
        replace: true,
        templateUrl: 'template/pages/spendSaves.html',
        controller: function ($scope, ngDialog) {
            //Дефолтна сума
            $scope.ExpenseSum = 1;
            // по дефолту вибираємо перший select 
            $scope.SelectedExpenseSave = $scope.users[0].saves[0];

            //Відсилаємо наші витрати
            $scope.spendSaves = function () {
                let obj = {
                    name: $scope.ExpenseName,
                    comment: $scope.ExpenseSum,
                    sum: $scope.ExpenseSum,
                    saveId: $scope.SelectedExpenseSave.id
                }
                
                console.log(obj);
            }
        }
    }
});
//directive account
app.directive('accountBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pages/account.html',
        controller: function ($scope) {}
    }
});
//директива статистика
app.directive('statsBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pages/statistic.html',
        controller: function ($scope) {
            $scope.day = false;
            $scope.dates = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                 "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                 "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30",
                "31"

            ],
                $scope.months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
                $scope.years = [
                "2017",
                "2018",
                "2019",
                "2020"
            ]
            $scope.selectDay = function () {
                $scope.day = true;
                $scope.month = false;
                $scope.year = false;

            }
            $scope.selectMonth = function () {
                $scope.day = false;
                $scope.month = true;
                $scope.year = false;
            }
            $scope.SelectYear = function () {
                $scope.day = false;
                $scope.month = false;
                $scope.year = true;
            }
        }
    }
});
