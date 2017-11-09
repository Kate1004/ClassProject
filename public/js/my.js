//Під`єднюємо ангуляр
var app = angular.module('app', ['ngRoute']);

//Створюємо контроллер
app.controller('myCtrl', function ($scope) {});


//Директива Login
app.directive('loginBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/login.html',
        controller: function ($scope) {
            $scope.loginStatus = true;
            $scope.registrStatus = false;
            //Кнопка Реєстрації
            $scope.chooseRegistr = function () {
                $scope.loginStatus = false;
                $scope.registrStatus = true;
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
