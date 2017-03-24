'use strict';

angular.module('crudApp').factory('StudentService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllStudents: loadAllStudents,
                getAllStudents: getAllStudents,
                getStudent: getStudent,
                createStudent: createStudent,
                updateStudent: updateStudent,
                removeStudent: removeStudent
            };

            return factory;

            function loadAllStudents() {
                console.log('Buscando todos os alunos');
                var deferred = $q.defer();
                $http.get(urls.STUDENT_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Alunos recuperados com sucesso');
                            $localStorage.students = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Erro ao recuperar os alunos');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllStudents(){
                return $localStorage.students;
            }

            function getStudent(id) {
                console.log('Recuperando as informações do Aluno com o id :'+id);
                var deferred = $q.defer();
                $http.get(urls.STUDENT_SERVICE_API + id.id + "/" +id.registration)
                    .then(
                        function (response) {
                            console.log('Recuperando as informações do Aluno com o id :'+id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao ler as informações do Aluno com o id  :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createStudent(student) {
                console.log('Creating Student');
                var deferred = $q.defer();
                $http.post(urls.STUDENT_SERVICE_API, student)
                    .then(
                        function (response) {
                            loadAllStudents();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Erro ao criuar o aluno : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateStudent(student, id) {
                console.log('Updating Student with id '+id);
                var deferred = $q.defer();
                $http.put(urls.STUDENT_SERVICE_API + id.id + "/" +id.registration, student)
                    .then(
                        function (response) {
                            loadAllStudents();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao atualizar o aluno com o id  :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeStudent(id) {
                console.log('Removendo o Aluno com o id '+id);
                var deferred = $q.defer();
                $http.delete(urls.STUDENT_SERVICE_API + id.id + "/" +id.registration)
                    .then(
                        function (response) {
                            loadAllStudents();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Erro ao remover o aluno com o id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);