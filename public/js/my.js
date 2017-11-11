//Під`єднюємо ангуляр
const app = angular.module('app', ['ngRoute', 'ngDialog']);

//Створюємо контроллер
app.controller('myCtrl', function ($scope, $http, ngDialog) {});



//Директива Login
app.directive('loginBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/login.html',
        controller: function ($scope, ngDialog) {
            $scope.loginStatus = true;
            $scope.registrStatus = false;
            //Кнопка Реєстрації
            $scope.chooseRegistr = function () {
                $scope.loginStatus = false;
                $scope.contentStatus = false;
                $scope.registrStatus = true;
                $scope.headerStatus = false;
                $scope.menuStatus = false;
            }

            //при натискані кнопки Registration ngDialog
            $scope.registerDialWind = function () {
                ngDialog.open({
                    template: "/template/registr.html",
                    scope: $scope,
                    controller: function () {
                        $scope.loginStatus = false;
                        $scope.registerStatus = true;

                        $scope.registerAcc = function () {
                            $scope.loginStatus = true;
                            $scope.registerStatus = false;
                        }

                    }
                })
            }


        }
    }
});

//Директива Registration
app.directive('registrBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/registr.html',
        controller: function ($scope) {}
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
            $scope.chooseSignUp = function () {
                $scope.loginStatus = true;
                $scope.contentStatus = false;
                $scope.registrStatus = false;
                $scope.headerStatus = false;
                $scope.menuStatus = false;

            }
        }
    }
});

//Директива Content
app.directive('contentBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/content.html',
        controller: function ($scope) {
            $scope.loginStatus = false;
            $scope.registrStatus = false;
            $scope.contentStatus = true;
            $scope.headerStatus = true;
            $scope.menuStatus = true;
        }
    }
});


app.directive('navBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/nav.html',
        controller: function ($scope) {


        }
    }
});
