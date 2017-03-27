var app = angular.module('crudApp',['ui.router','ngStorage']);

app.constant('urls', {
    BASE: 'http://localhost:8080/',
    COURSE_SERVICE_API : 'http://localhost:8080/api/course/',
    STUDENT_SERVICE_API : 'http://localhost:8080/api/student/'
});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        
        $stateProvider
        
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home',
                controller:'HomeController',
                controllerAs:'homeCtrl',
            })
            .state('student', {
                url: '/student',
                templateUrl: 'partials/students',
                controller:'StudentController',
                controllerAs:'studentCtrl',
                resolve: {
                    students: function ($q, StudentService) {
                        console.log('Listando os alunos');
                        var deferred = $q.defer();
                        StudentService.loadAllStudents().then(deferred.resolve, deferred.resolve);
                        return deferred.promise;
                    },
                    courses: function ($q, CourseService) {
                        console.log('Listando os cursos');
                        var deferred = $q.defer();
                        CourseService.loadAllCourses().then(deferred.resolve, deferred.resolve);
                        return deferred.promise;
                    }
                }
            })
            .state('course', {
                url: '/course',
                templateUrl: 'partials/courses',
                controller:'CourseController',
                controllerAs:'courseCtrl',
                resolve: {
                    courses: function ($q, CourseService) {
                        console.log('Listando os cursos');
                        var deferred = $q.defer();
                        CourseService.loadAllCourses().then(deferred.resolve, deferred.resolve);
                        return deferred.promise;
                    }
                }
            });
            ;
    }]);

