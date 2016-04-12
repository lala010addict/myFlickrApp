//angular.module('myFlickr.services', ['ngResource'])

myFlickr.factory('PhotoSet', ['$http', function($http) {
    // var userID = "124175261@N05";
    //freezingcoffee
    // console.log(findPhotoSetByUser)
    var getSet = function(userID) {
        // if (!userID) {
        //   userID = "124175261@N05";
        // }
        //  console.log(userID)


        var findPhotoSetByUser = "https://api.flickr.com/services/rest/" +
            "?method=flickr.photosets.getList" +
            "&api_key=" + api_key +
            "&user_id=" + userID +
            "&privacy_filter=1" +
            "&per_page=100" +
            "&format=json&nojsoncallback=1"

        return $http.get(findPhotoSetByUser, {
            cache: true
        }).success(function(data) {
            // console.log(data.photosets)
            return data.photosets.photoset

        });

    }

    var getPhotos = function(setId) {
        var URL = "https://api.flickr.com/services/rest/" +
            "?method=flickr.photosets.getPhotos" +
            "&api_key=" + api_key +
            "&photoset_id=" + setId +
            "&privacy_filter=1" +
            "&per_page=100" +
            "&format=json&nojsoncallback=1"

        //console.log(URL)

        return $http.get(URL, {
            cache: true
        }).success(function(data) {
            return data.photoset.photo

            // $scope.set = data.photosets.photoset
        });
    }


    var getUser = function(username) {
        console.log(username);
        //  var username = $("input:first").val();
        var findByUsername = "https://api.flickr.com/services/rest/?method=" +
            "flickr.people.findByUsername&api_key=" + api_key +
            "&username=" + username +
            "&format=json&nojsoncallback=1";


        return $http.get(findByUsername, {
            cache: true
        }).success(function(data) {
            //  console.log(data)
            return data;
        });

    };

    var getAlbum = function(id) {

        var findByAlbumbyPhoto = "https://api.flickr.com/services/rest/?method=" +
            "flickr.photos.getAllContexts&api_key=" + api_key +
            "&photo_id=" + id +
            "&format=json&nojsoncallback=1";


        return $http.get(findByAlbumbyPhoto, {
            cache: true
        }).success(function(data) {
            //  console.log(data)
            return data;
        });

    };



    return {
        getPhotos: getPhotos,
        getSet: getSet,
        getUser: getUser,
        getAlbum: getAlbum
    };
}])
