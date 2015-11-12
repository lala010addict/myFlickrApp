angular.module('myFlickr', ['myFlickr.services', 'ngResource'])

.controller('menu', ['$scope', "$http", 'PhotoSet', function($scope, $http, PhotoSet) {
  $scope.data = {}
  $scope.sets = {}
  $scope.username = ""
  $scope.click = function(e) {
    alert(e)
  }
  $scope.photos = {};
  $scope.getSet = function(userID) {
    PhotoSet.getSet(userID)
      .success(function(data) {
        //  console.log(data.photosets.photoset)
        if (data.photosets.photoset.length < 1) {
          alert("NO PHOTO ALBUMS FOUND FOR THIS USER");
        } else {
          $scope.data = data.photosets.photoset
            // console.log(data.photosets.photoset)
          _.each(data.photosets.photoset, function(item) {
            // console.log(item.id)
            $scope.getPhotos(item.id)
          })
        }
      })
  }

  $scope.pix = [];
  $scope.getSet();

  $scope.getPhotos = function(item) {
    PhotoSet.getPhotos(item)
      .success(function(data) {

        $scope.photos = data.photoset.photo
        _.each(data.photoset.photo, function(item) {
          console.log(item.id)
        })
      })
  }

  $scope.getUser = function(username) {
    console.log(username)
    PhotoSet.getUser(username)
      .success(function(data) {
        if (data.code === 1 || undefined) {
          alert(data.message)
        } else {
          $scope.getSet(data.user.id)
        }
      })
  }


}])
