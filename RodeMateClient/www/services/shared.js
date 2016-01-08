angular.module('starter.services')

.service('SharedMethods', function($ionicPopup, $ionicLoading, $q, $http) {

  return {
    alertPopup: function(title, template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template,
        cssClass: 'alert_no_opacity'
      });
    },
    showLoader: function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="crescent"></ion-spinner>'
      });
    },
    closeLoader: function() {
      $ionicLoading.hide();
    }
  }
})