(function(){
  'use strict';

  angular
    .module('<%= moduleName %>')
    .component('<%= componentName %>', <%= componentName %>Component());

  function <%= componentName %>Component() {
    return {
      templateUrl: '<%= folder %><%= componentName %>.template.html',
      bindings: {},
      controller: <%= capitalizeComponentName %>Controller,
      controllerAs: '$ctrl',
      transclude: false
    }
  }

  function <%= capitalizeComponentName %>Controller() {
    let vm = this;

  }

})();
