(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateOfficeCountryController: function (scope, resourceFactory, location, dateFilter) {
                scope.formData ={
                    name: '',
                    description:'',
                    position:0,
                    isActive:false,
                    locale:''
                }

                scope.submit = function(){
                    scope.formData.locale = scope.optlang.code;
                    var countryData = {
                        name : scope.formData.countryName,
                        description : scope.formData.description,
                        position :scope.formData.position,
                        isActive : scope.formData.isActive,
                        locale :scope.formData.locale 
                    };

                    resourceFactory.createOfficeCountryResource.save(countryData,function(data) {
                        location.path('/officecountry');
                    },function(errorResponse){
                        console.log("Error in subitting the form:"+errorResponse)
                    }
                    );


                };
        }
    });
    mifosX.ng.application.controller('CreateOfficeCountryController', ['$scope', 'ResourceFactory', '$location', 'dateFilter', mifosX.controllers.CreateOfficeCountryController]).run(function ($log) {
        $log.info("CreateOfficeCountryController initialized");
    });
}(mifosX.controllers || {}));
