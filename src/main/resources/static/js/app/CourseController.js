'use strict';

angular.module('crudApp').controller('CourseController',
    ['CourseService', '$scope',  function( CourseService, $scope) {

        var self = this;
        self.course = {};
        self.courses=[];

        self.submit = submit;
        self.getAllCourses = getAllCourses;
        self.createCourse = createCourse;
        self.updateCourse = updateCourse;
        self.removeCourse = removeCourse;
        self.editCourse = editCourse;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        function submit() {
            console.log('Submitting');
            if (self.course.id === undefined || self.course.id === null) {
                console.log('Saving New Course', self.course);
                createCourse(self.course);
            } else {
                updateCourse(self.course, self.course.id);
                console.log('Course updated with id ', self.course.id);
            }
        }

        function createCourse(course) {
            console.log('About to create course');
            CourseService.createCourse(course)
                .then(
                    function (response) {
                        console.log('Course created successfully');
                        self.successMessage = 'Course created successfully';
                        self.errorMessage='';
                        self.done = true;
                        self.course={};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Error while creating Course');
                        self.errorMessage = 'Error while creating Course: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updateCourse(course, id){
            console.log('About to update course');
            CourseService.updateCourse(course, id)
                .then(
                    function (response){
                        console.log('Course updated successfully');
                        self.successMessage='Course updated successfully';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Error while updating Course');
                        self.errorMessage='Error while updating Course '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function removeCourse(id){
            console.log('About to remove Course with id '+id);
            CourseService.removeCourse(id)
                .then(
                    function(){
                        console.log('Course '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing course '+id +', Error :'+errResponse.data);
                    }
                );
        }


        function getAllCourses(){
            return CourseService.getAllCourses();
        }

        function editCourse(id) {
            self.successMessage='';
            self.errorMessage='';
            CourseService.getCourse(id).then(
                function (course) {
                    self.course = course;
                },
                function (errResponse) {
                    console.error('Error while removing course ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function reset(){
            self.successMessage='';
            self.errorMessage='';
            self.course={};
            $scope.myForm.$setPristine(); //reset Form
        }
    }


    ]);