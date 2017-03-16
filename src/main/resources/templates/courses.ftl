<div class="generic-container">
    <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-heading"><span class="lead">Curso </span></div>
		<div class="panel-body">
	        <div class="formcontainer">
	            <div class="alert alert-success" role="alert" ng-if="courseCtrl.successMessage">{{courseCtrl.successMessage}}</div>
	            <div class="alert alert-danger" role="alert" ng-if="courseCtrl.errorMessage">{{courseCtrl.errorMessage}}</div>
	            <form ng-submit="courseCtrl.submit()" name="myForm" class="form-horizontal">
	                <input type="hidden" ng-model="courseCtrl.course.id" />
	                <div class="row">
	                    <div class="form-group col-md-12">
	                        <label class="col-md-2 control-lable" for="uname">Nome</label>
	                        <div class="col-md-7">
	                            <input type="text" ng-model="courseCtrl.course.name" id="uname" class="coursename form-control input-sm" placeholder="Digite um nome" required ng-minlength="3"/>
	                        </div>
	                    </div>
	                </div>

	                <div class="row">
	                    <div class="form-actions floatRight">
	                        <input type="submit"  value="{{!courseCtrl.course.id ? 'Salvar' : 'Atualizar'}}" class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid || myForm.$pristine">
	                        <button type="button" ng-click="courseCtrl.reset()" class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Limpar</button>
	                    </div>
	                </div>
	            </form>
    	    </div>
		</div>	
    </div>
    <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-heading"><span class="lead">Lista de Cursos</span></div>
		<div class="panel-body">
			<div class="table-responsive">
		        <table class="table table-hover">
		            <thead>
		            <tr>
		                <th>ID</th>
		                <th>Nome</th>
		                <th width="100"></th>
		                <th width="100"></th>
		            </tr>
		            </thead>
		            <tbody>
		            <tr ng-repeat="u in courseCtrl.getAllCourses()">
		                <td>{{u.id}}</td>
		                <td>{{u.name}}</td>
		                <td><button type="button" ng-click="courseCtrl.editCourse(u.id)" class="btn btn-success custom-width">Editar</button></td>
		                <td><button type="button" ng-click="courseCtrl.removeCourse(u.id)" class="btn btn-danger custom-width">Remover</button></td>
		            </tr>
		            </tbody>
		        </table>		
			</div>
		</div>
    </div>
</div>