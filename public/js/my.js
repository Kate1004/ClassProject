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
                $scope.contentStatus = false;
                $scope.registrStatus = true;
                $scope.headerStatus = false;
                $scope.menuStatus = false;
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

