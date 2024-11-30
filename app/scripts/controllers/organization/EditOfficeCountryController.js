(function (module) {
    mifosX.controllers = _.extend(module, {
        EditOfficeCountryController: function (scope, routeParams, resourceFactory, location, dateFilter) {
            resourceFactory.createOfficeCountryResource.get({countryId: routeParams.id}, function (data) {
                scope.formData = {
                    name : data.name,
                    description : data.description,
                    position : data.position,
                    isActive : data.isActive,
                    locale: "en"
                }
            })

            scope.submit = function (){
                resourceFactory.createOfficeCountryResource.update({countryId:routeParams.id},this.formData,function(data){
                    location.path('/officecountry/')
                })
            }
        }
    });
    mifosX.ng.application.controller('EditOfficeCountryController', ['$scope', '$routeParams', 'ResourceFactory', '$location', 'dateFilter', mifosX.controllers.EditOfficeCountryController]).run(function ($log) {
        $log.info("EditOfficeCountryController initialized");
    });
}(mifosX.controllers || {}));
