angular.module('myFlickr.services', ['ngResource'])

.factory('PhotoSet', ['$http', function($http) {

  var userID = "124175261@N05";
  //freezingcoffee
  // console.log(findPhotoSetByUser)
  var getSet = function(userID) {
    if (!userID) {
      userID = "124175261@N05";
    }
    console.log(userID)

    var findPhotoSetByUser = "https://api.flickr.com/services/rest/" +
      "?method=flickr.photosets.getList" +
      "&api_key=YOURAPI" +
      "&user_id=" + userID +
      "&privacy_filter=1" +
      "&per_page=100" +
      "&format=json&nojsoncallback=1"

    return $http.get(findPhotoSetByUser).success(function(data) {
      // console.log(data.photosets)
      return data.photosets.photoset

    });

  }

  var getPhotos = function(setId) {
    var URL = "https://api.flickr.com/services/rest/" +
      "?method=flickr.photosets.getPhotos" +
      "&api_key=YOURAPI" +
      "&photoset_id=" + setId +
      "&privacy_filter=1" +
      "&per_page=100" +
      "&format=json&nojsoncallback=1"

    //console.log(URL)

    return $http.get(URL).success(function(data) {
      return data.photoset.photo
        // $scope.set = data.photosets.photoset
    });
  }


  var getUser = function(username) {
    //  var username = $("input:first").val();
    var findByUsername = "https://api.flickr.com/services/rest/?method=" +
      "flickr.people.findByUsername&api_key=YOURAPI" +
      "&username=" + username +
      "&format=json&nojsoncallback=1";


    return $http.get(findByUsername).success(function(data) {
      //  console.log(data)
      return data;
    });

  };


  return {
    getPhotos: getPhotos,
    getSet: getSet,
    getUser: getUser
  };
}])
