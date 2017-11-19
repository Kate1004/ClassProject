//Під`єднюємо ангуляр
const app = angular.module('app', ['ngRoute', 'ngDialog']);
// структура об'єкту
//var users = [
//    {
//        id: 1,
//        login: "Yura",
//        password: "some12345",
//        eMail: "some@some.s",
//        name: "Yura",
//        sname: "Volchak",
//        bDay: "1987-05-25",
//        photo: "1.png",
//        sources: [
//            {
//                id: 1,
//                sName: "freelance",
//                date: "2017-11-07"
//             }
//            , {
//                id: 24,
//                sName: "present",
//                date: "2017-11-08"
//             }
//            , {
//                id: 35,
//                sName: "credit",
//                date: "2017-11-09"
//             }
//
//        , ],
//        catExpenses: [
//            {
//                id: 1,
//                name: "car",
//            },
//            {
//                id: 2,
//                name: "food",
//            },
//            {
//                id: 7,
//                name: "house"
//            },
//        ],
//        saves: [
//            {
//                id: 3,
//                name: "visa",
//                sum: 23456,
//                date: "2017-11-07",
//
//            },
//            {
//                id: 4,
//                name: "cash",
//                sum: 456,
//                date: "2017-11-08",
//
//            },
//            {
//                id: 7,
//                name: "bank",
//                sum: 2346,
//                date: "2017-11-07",
//
//            }
//        ],
//        incomes: [
//            {
//                id: 2,
//                date: "2017-11-09",
//                sum: 200,
//                sourceId: 1,
//                comments: " text"
//
//            },
//            {
//                id: 5,
//                date: "2017-11-09",
//                sum: 400,
//                sourceId: 1,
//                comments: "dgf"
//            },
//            {
//                id: 7,
//                date: "2017-11-09",
//                sum: 200,
//                sourceId: 35,
//                comments: " fhfh"
//            }
//        ],
//        expences: [
//            {
//                id: 2,
//                date: "2017-11-12",
//                sum: "299",
//                comments: "some text",
//                catExpensesId: 2
//            },
//            {
//                id: 3,
//                date: "2017-11-12",
//                sum: "100",
//                comments: "some text",
//                catExpensesId: 1
//            }
//        ]
//    }
//];
//Створюємо контроллер
app.controller('myCtrl', function ($scope, $http, ngDialog) {
    /*Включаємо форму логування*/
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
    /*Якщо бзер заходить впереше*/
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
        controller: function ($scope) {
            $scope.loginStatus = false;
            $scope.contentStatus = false;
            $scope.registrStatus = true;
            //Кнопка SIGN UP
            /* $scope.chooseSignUp = function () {
                 $scope.loginStatus = true;
                 $scope.contentStatus = false;
                 $scope.registrStatus = false;
                 $scope.headerStatus = false;
                 $scope.menuStatus = false;

             }*/
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
        controller: function ($scope) {

            $scope.registerAcc = function () {
                console.log("registr");
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
        controller: function ($scope) {

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
        controller: function ($scope, $http) {
            $scope.day = true;

            // incomes
            google.charts.load("current", {
                packages: ["corechart"]
            });
            google.charts.setOnLoadCallback(drawChartI);

            function drawChartI() {
                var DataI = function () {
                    var a1 = [], a2 = [];
                    var rt = [];
                    rt.push(['id_incomes', 'total']);
                    $.ajax({
                        url: "/getIncomes?uid=1&year=2017",
                        async: false,
                        success: function (data) {
                            a1 = Array.from(data);
                        }
                    });
                    $.ajax({
                        url: "/getIncomesSum?uid=1&year=2017",
                        async: false,
                        success: function (data) {
                            a2 = Array.from(data);
                        }
                    });
                    
                    for(var i = 0; i < a2.length; i++){
                        rt.push([a1[i]["nameSource"],a2[i]["sumIncomes"]]);
                    }
                    
                    return rt;
                };
                var dataI = google.visualization.arrayToDataTable(DataI());

                var optionsI = {
                    title: 'Incomes'
                };

                var chartI = new google.visualization.PieChart(document.getElementById('piechartI'));

                chartI.draw(dataI, optionsI);
            }

            //expenses
            google.charts.setOnLoadCallback(drawChartE);

            function drawChartE() {
                var DataE = function () {
                    var a1 = [];
                    var a2 = [];
                    var rt = [];
                    rt.push(['id_expenses', 'total']);
                    $.ajax({
                        url: "/getExpenses?uid=1&year=2017",
                        async: false,
                        success: function (data) {
                            a1 = Array.from(data);
                        }
                    });
                    $.ajax({
                        url: "/getCatExpenses?uid=1",
                        async: false,
                        success: function (data) {
                            a2 = Array.from(data);
                        }
                    });
                    
                    for(var i = 0; i < a1.length; i++){
                        rt.push([a2[i]["nameCatExp"],a1[i]["sumExpenses"]]);
                    }
                    
                    return rt;
                }
                var dataE = google.visualization.arrayToDataTable(DataE());

                var optionsE = {
                    title: 'Expenses'
                };

                var chartE = new google.visualization.PieChart(document.getElementById('piechartE'));

                chartE.draw(dataE, optionsE);
            }

            //savings
            google.charts.load("current", {
                packages: ["corechart"]
            });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                
                   var DataS = function () {
                    var a1 = [];
                    var rt = [];
                    rt.push(['id_saves', 'total']);
                    $.ajax({
                        url: "/getSaves?uid=1&year=2017",
                        async: false,
                        success: function (data) {
                            a1 = Array.from(data);
                        }
                    });
                    
                    for(var i = 0; i < a1.length; i++){
                        rt.push([a1[i]["nameSaves"],a1[i]["sumSaves"]]);
                    }
                    
                    return rt;
                }
                
                var dataS = google.visualization.arrayToDataTable(DataS());

                var optionsS = {
                    title: 'Savings',
                    pieHole: 0.4,
                };

                var chartS = new google.visualization.PieChart(document.getElementById('savings'));
                chartS.draw(dataS, optionsS);
            }


        }
    }
});
