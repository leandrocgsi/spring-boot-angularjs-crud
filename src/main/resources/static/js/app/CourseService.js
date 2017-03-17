'use strict';

angular.module('crudApp').factory('CourseService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllCourses: loadAllCourses,
                getAllCourses: getAllCourses,
                getCourse: getCourse,
                createCourse: createCourse,
                updateCourse: updateCourse,
                removeCourse: removeCourse
            };

            return factory;

            function loadAllCourses() {
                console.log('Fetching all courses');
                var deferred = $q.defer();
                $http.get(urls.USER_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Fetched successfully all courses');
                            $localStorage.courses = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading courses');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllCourses(){
                return $localStorage.courses;
            }

            function getCourse(id) {
                console.log('Fetching Course with id :'+id);
                var deferred = $q.defer();
                $http.get(urls.USER_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Course with id :'+id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading course with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createCourse(course) {
                console.log('Creating Course');
                var deferred = $q.defer();
                $http.post(urls.USER_SERVICE_API, course)
                    .then(
                        function (response) {
                            loadAllCourses();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Error while creating Course : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateCourse(course, id) {
                console.log('Updating Course with id '+id);
                var deferred = $q.defer();
                $http.put(urls.USER_SERVICE_API + id, course)
                    .then(
                        function (response) {
                            loadAllCourses();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating Course with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeCourse(id) {
                console.log('Removing Course with id '+id);
                var deferred = $q.defer();
                $http.delete(urls.USER_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllCourses();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Course with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);