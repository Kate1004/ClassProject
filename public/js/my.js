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
                $scope.registrStatus = true;
            }

            //при натискані кнопки Registration ngDialog
            $scope.registerDialWind = function() {
                ngDialog.open({
                    template: "/template/registr.html",
                    scope: $scope,
                    controller: function() {
                        $scope.loginStatus = false;
                        $scope.registerStatus = true;

                        $scope.registerAcc = function() {
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
        controller: function ($scope) {
        }
    }
});

//Директива header
app.directive('headerBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/header.html',
        controller: function ($scope) {
        }
    }
});

//Директива header
app.directive('bodyBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/body.html',
        controller: function ($scope) {
        }
    }
});
