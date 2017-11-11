//Під`єднюємо ангуляр
const app = angular.module('app', ['ngRoute', 'ngDialog']);



//Створюємо контроллер
app.controller('myCtrl', function ($scope, $http, ngDialog) {
    
    $scope.menuBlock = false;
    $scope.headerBlock = false;
    $scope.loginBlock = true;
    
    
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


        }
    }
});

//Директива Content
app.directive('contentBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/content.html',
        controller: function ($scope) {

        }
    }
});

//Директива Login
app.directive('loginBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pages/login.html',
        controller: function ($scope, ngDialog) {
            $scope.Registr = function(){
                
                $scope.registerBlock = true;
                $scope.loginBlock = false;
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
            
        }
    }
});



