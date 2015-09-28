// create angular app
var validationApp = angular.module('signup-form', []);

// create angular controller
validationApp.controller('signup-cont', function($scope,$filter) {

  $scope.$watch('nome', function (val) {
    $scope.nome = $filter('uppercase')(val);
  }, true);
  $scope.$watch('divisao', function (val) {
    $scope.divisao = $filter('uppercase')(val);
  }, true);
  $scope.$watch('servico', function (val) {
    $scope.servico = $filter('uppercase')(val);
  }, true);
  $scope.$watch('secao', function (val) {
    $scope.secao = $filter('uppercase')(val);
  }, true);
  $scope.$watch('setor', function (val) {
    $scope.setor = $filter('uppercase')(val);
  }, true);
  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      //alert('our form is amazing');
    }

  };

});
