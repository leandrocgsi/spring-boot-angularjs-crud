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
                console.log('Buscando todos os cursos');
                var deferred = $q.defer();
                $http.get(urls.COURSE_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Todos os cursos recuperados com sucesso');
                            $localStorage.courses = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar os cursos');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllCourses(){
                return $localStorage.courses;
            }

            function getCourse(id) {
                console.log('Recuperando as informações do curso de id :'+id);
                var deferred = $q.defer();
                $http.get(urls.COURSE_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Informações do curso de id :'+id+ ' recuperadas com sucesso');
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar as informações do curso de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createCourse(course) {
                console.log('Criando um novo curso');
                var deferred = $q.defer();
                $http.post(urls.COURSE_SERVICE_API, course)
                    .then(
                        function (response) {
                            loadAllCourses();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Erro ao criar um novo curso : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateCourse(course, id) {
                console.log('Atualizando o curso de id '+id);
                var deferred = $q.defer();
                $http.put(urls.COURSE_SERVICE_API + id, course)
                    .then(
                        function (response) {
                            loadAllCourses();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao atualizar o curso de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeCourse(id) {
                console.log('Removendo o curso de id '+id);
                var deferred = $q.defer();
                $http.delete(urls.COURSE_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllCourses();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao remover o curso de id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);