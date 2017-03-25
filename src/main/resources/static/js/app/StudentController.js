'use strict';

angular.module('crudApp').controller('StudentController',
    ['StudentService', 'CourseService', '$scope',  function( StudentService, CourseService, $scope) {

        var self = this;
        self.student = {};
        self.students=[];
        self.courses= CourseService.getAllCourses();

        self.submit = submit;
        self.getAllStudents = getAllStudents;
        self.getAllCourses = CourseService.getAllCourses();
        self.createStudent = createStudent;
        self.updateStudent = updateStudent;
        self.removeStudent = removeStudent;
        self.editStudent = editStudent;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;
        
        self.filterCondition = {
            u: {}
        }

        function submit() {
            console.log('Submetendo');
            if (self.student.id === undefined || self.student.id === null) {
                console.log('Salvando um novo aluno', self.student);
                createStudent(self.student);
            } else {
                updateStudent(self.student, self.student.id);
                console.log('Aluno atualizado com o id ', self.student.id);
            }
        }

        function createStudent(student) {
            console.log('Criação do Aluno');
            StudentService.createStudent(student)
                .then(
                    function (response) {
                        console.log('Aluno cadastrado com sucesso');
                        self.successMessage = 'Aluno cadastrado com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        self.student={};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Erro ao criar o aluno');
                        self.errorMessage = 'Erro ao criar o aluno: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updateStudent(student, id){
            console.log('About to update student');
            StudentService.updateStudent(student, id)
                .then(
                    function (response){
                        console.log('Aluno atualizado com sucesso');
                        self.successMessage='Aluno atualizado com sucesso';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Erro ao remover o Aluno');
                        self.errorMessage='Erro ao remover o Aluno '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function removeStudent(id){
            console.log('Removendo o estudante de id '+id);
            StudentService.removeStudent(id)
                .then(
                    function(){
                        console.log('Aluno '+id + ' removido com sucesso');
                    },
                    function(errResponse){
                        console.error('Erro ao remover o aluno '+id +', Error :'+errResponse.data);
                    }
                );
        }


        function getAllStudents(){
            return StudentService.getAllStudents();
        }

        function editStudent(id) {
            self.successMessage='';
            self.errorMessage='';
            StudentService.getStudent(id).then(
                function (student) {
                    self.student = student;
                },
                function (errResponse) {
                    console.error('Erro ao remover o aluno ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function reset(){
            self.successMessage='';
            self.errorMessage='';
            self.student={};
            $scope.myForm.$setPristine(); //reset Form
        }
        
        function getAllCourses(){
            return CourseService.getAllCourses();
        }
    }
]);