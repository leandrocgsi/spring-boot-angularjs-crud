'use strict';

angular.module('crudApp').controller('HomeController',
    ['$scope',  function( $scope) {
        var self = this;

        function addCourses() {
        	$state.go('course');
        }
        
        function addStudents() {
            $state.go('student');
        }
    }
]);