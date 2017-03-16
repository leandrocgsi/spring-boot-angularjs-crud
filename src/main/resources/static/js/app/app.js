var app = angular.module('crudApp',['ui.router','ngStorage']);

app.constant('urls', {
    BASE: 'http://localhost:8080/',
    USER_SERVICE_API : 'http://localhost:8080/api/user/',
    COURSE_SERVICE_API : 'http://localhost:8080/api/course/',
    STUDENT_SERVICE_API : 'http://localhost:8080/api/student/'
});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/home');
	    
		$stateProvider
		
			.state('home', {
				url: '/',
		        templateUrl: 'partials/list',
		        controller:'UserController',
		        controllerAs:'ctrl',
		        resolve: {
		            users: function ($q, UserService) {
		                console.log('Load all users');
		                var deferred = $q.defer();
		                UserService.loadAllUsers().then(deferred.resolve, deferred.resolve);
		                return deferred.promise;
		            }
		        }
			})
	        .state('list', {
	        	url: '/list',
		        templateUrl: 'partials/list',
		        controller:'UserController',
		        controllerAs:'ctrl',
		        resolve: {
		            users: function ($q, UserService) {
		                console.log('Load all users');
		                var deferred = $q.defer();
		                UserService.loadAllUsers().then(deferred.resolve, deferred.resolve);
		                return deferred.promise;
		            }
		        }
	        })
	        .state('course', {
	            url: '/course',
	            templateUrl: 'partials/courses',
		        controller:'CourseController',
		        controllerAs:'courseCtrl'/*,
		        resolve: {
		            courses: function ($q, CoursesService) {
		                console.log('Load all courses');
		                var deferred = $q.defer();
		                CourseService.loadAllCourses().then(deferred.resolve, deferred.resolve);
		                return deferred.promise;
		            }
		        }*/
	        });
		    ;
    }]);

