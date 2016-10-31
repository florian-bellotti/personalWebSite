var filmApp = angular.module("filmApp", [])
.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});

filmApp.controller("FilmCtrl", function ($scope, $http, $timeout) {
	$scope.data = {};
    $http({
	  	method: 'GET',
	  	url: '/film/list'
	}).then(function successCallback(response) {
	    $scope.data.films = response.data.films;
	    console.log(response.data.films);
	}, function errorCallback(response) {
	    $scope.data.error = response;
	});

  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    $timeout(function() {
      var elements = document.querySelectorAll('.grid-item');
      var maxHeight = 0;

      for ( var key in elements ) {
        if ( elements[key].clientHeight > maxHeight ) {
          maxHeight = elements[key].clientHeight;
        }
      }
                      
      for(var i=0; i<elements.length; i++){
        elements[i].style.height = maxHeight + "px";
      }   
    }, 10);
  });
});