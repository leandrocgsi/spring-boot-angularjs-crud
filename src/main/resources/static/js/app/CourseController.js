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
            console.log('Submetendo');
            if (self.course.id === undefined || self.course.id === null) {
                console.log('Salvando Um Novo Curso', self.course);
                createCourse(self.course);
            } else {
                updateCourse(self.course, self.course.id);
                console.log('Atualizando o curso com o id ', self.course.id);
            }
        }

        function createCourse(course) {
            console.log('Criação de Cursos');
            CourseService.createCourse(course)
                .then(
                    function (response) {
                        console.log('Curso criado com sucesso');
                        self.successMessage = 'Curso criado com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        self.course={};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Erro ao criar Curso');
                        self.errorMessage = 'Erro ao criar Curso: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updateCourse(course, id){
            console.log('Atualização de Cursos');
            CourseService.updateCourse(course, id)
                .then(
                    function (response){
                        console.log('Curso atualizado com sucesso');
                        self.successMessage='Curso atualizado com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Erro ao atualizar o curso');
                        self.errorMessage='Erro ao atualizar o curso '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function removeCourse(id){
            console.log('Remoção do curso com o id '+id);
            CourseService.removeCourse(id)
                .then(
                    function(){
                        console.log('Curso de id '+id + ' removido com sucesso');
                    },
                    function(errResponse){
                        console.error('Erro ao remover o curso '+id +', Erro :'+errResponse.data);
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
                    console.error('Erro ao remover o curso ' + id + ', Error :' + errResponse.data);
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