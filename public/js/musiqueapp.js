var musiqueApp = angular.module("musiqueApp", [])
.filter("category", function () {
    return function (items, category) {
        var filtered = [];
        if (items != null) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].categorie == category){
                    filtered.push(items[i]);
                }
            }
        }
        return filtered;
    }
})
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

musiqueApp.controller("MusiqueCtrl", function ($scope, $http, $timeout) {
	$scope.data = {};

    $http({
	  	method: 'GET',
	  	url: '/musique/list'
	}).then(function successCallback(response) {
	    $scope.data.albums = response.data.albums;
	    console.log(response.data.albums);
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
