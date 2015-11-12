angular.module('myFlickr', ['myFlickr.services', 'ngResource'])

.controller('menu', ['$scope', "$http", 'PhotoSet', function($scope, $http, PhotoSet) {
  $scope.data = {}
  $scope.all = function(id) {
    console.log(id)
    $scope.photos = id.slice(0, 100)
  }
  $scope.username = "pengphotos"
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
  $scope.idHolder = []

  $scope.getSet()

  $scope.getPhotos = function(item) {
    console.log(item);
    PhotoSet.getPhotos(item)
      .success(function(data) {

        $scope.photos = data.photoset.photo
          //console.log(data.photoset.photo)
        _.each(data.photoset.photo, function(item) {

          if ($scope.idHolder.indexOf(item.id) === -1) {
            // console.log(item.id)
            $scope.idHolder.push(item.id)
            console.log("more thing got pushed")
            $scope.pix.push(item)
          }
        })
      })
  }

  //booh!

  $scope.getUser = function(username) {
    $scope.pix = [];
    $scope.idHolder = []
    console.log(username)
    PhotoSet.getUser(username)
      .success(function(data) {
        console.log(data)
        if (data.code === 1 || undefined) {
          alert(data.message)
        } else {
          $scope.getSet(data.user.id)
        }
      })
  }


}])
