(function (module) {
    mifosX.controllers = _.extend(module, {
        OfficeCountryController: function (scope, resourceFactory, location) {
                scope.countries = [];

                resourceFactory.createOfficeCountryResource.getAllOfficeCountries(function (data){
                    scope.countries = data;
                });
                
                console.log(scope.countries);
                
                if (!scope.searchCriteria.countries) {
                    scope.searchCriteria.countries = null;
                    scope.saveSC();
                }

                scope.filterText = scope.searchCriteria.countries || '';

                scope.onFilter = function () {
                    scope.searchCriteria.countries = scope.filterText;
                    scope.saveSC();
                };

                scope.limitCountriesPerPage = 15;



        }
    });
    mifosX.ng.application.controller('OfficeCountryController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.OfficeCountryController]).run(function ($log) {
        $log.info("OfficeCountryController initialized");
    });
}(mifosX.controllers || {}));