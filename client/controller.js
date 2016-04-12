myFlickr.controller('menu', ['$scope', 'Auth', "$http", 'PhotoSet', "$location", '$routeParams', '$log', function($scope, Auth, $http, PhotoSet, $location, $routeParams, $log) {

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = false;
    $scope.logout = Auth.logout;
    $scope.getToken = Auth.getToken;
    $scope.userInfo = '';
    $scope.formData = {};
    $scope.checked = false;
    var response = $scope.getCurrentUser();

    $scope.signin = function() {
        // console.log('hihi');
        if ($scope.userInfo) {
            return true
        } else { false }
    }

    var checkIfLoggedIn = function() {
        if (response.$promise !== undefined) {
            response.$promise.then(function(data) {

                $scope.userInfo = data.toJSON(); //Changed data.data.topics to data.topics
                // //console.log($scope.userInfo)
                if ($scope.userInfo.name === $scope.username) {
                    $scope.isLoggedIn = true;
                    $scope.checked = true;
                    //console.log($scope.userInfo)
                    $scope.formData.user_id = $scope.userInfo._id;
                    $scope.formData.username = $scope.userInfo.name

                } else {
                    $scope.isLoggedIn = false;
                    $scope.checked = false;
                    //console.log('nonono')
                }

            });

        }
    }

    checkIfLoggedIn();



    $scope.favoritePictures = [];
    $scope.photos = [];
    $scope.concatPix;

    var checkifLiked = function() {
        $http.get('/api/favorites')
            .success(function(data) {
                //  console.log(data)

                if (data[0].username === $scope.username) {

                    //console.log('checkiffollowed', $scope.favoritePictures)

                    var filteredData = _.filter(data, function(name) {
                            return name.username === $scope.username
                        })
                        //   console.log(filteredData, 'filteredData')
                    $scope.favoritePictures = filteredData;
                    var ids = _.pluck(filteredData, 'picture_id')


                    var newPhotoArray = $scope.photos.filter(function(obj) {
                        return ids.indexOf(obj.id) === -1;
                    });

                    //console.log(newPhotoArray)

                    $scope.photos = newPhotoArray;
                    $scope.concatPix = $scope.favoritePictures.concat($scope.photos);
                    //  console.log($scope.concatPix)
                } else {

                    $scope.concatPix = $scope.photos
                }




            })
            .error(function(data) {
                //console.log('Error: ' + data);
            });
    }



    $scope.like = function(id, farm, server, secret) {

        $scope.formData.picture_id = id;
        $scope.formData.picture_farm = farm;
        $scope.formData.picture_server = server;
        $scope.formData.picture_secret = secret;
        $http.post('/api/favorites', $scope.formData)
            .then(function(data) {
                //console.log(data);
                $scope.getUser($scope.username);
            })

        .catch(function(err) {
            console.error('Error: ' + err);
        });
    }


    $scope.dislike = function(id) {
        $http.delete('/api/favorites/' + id)
            .success(function(data) {
                $scope.getUser($scope.username);
            })
            .error(function(data) {
                //console.log('Error: ' + data);
            });

    }

    $scope.data = {}
    $scope.all = function(id) {
        console.log($scope.favoritePictures.length)
            //  $scope.photos = id.slice(0, 300)
        if ($scope.favoritePictures.length === 0) {
            $scope.concatPix = id.slice(0, 300)
        } else {
            var ids = _.pluck($scope.favoritePictures, 'picture_id')


            var newPhotoArray = id.slice(0, 300).filter(function(obj) {
                return ids.indexOf(obj.id) === -1;
            });
            $scope.photos = newPhotoArray


        }


    }
    $scope.username = '';


    // $routeParams.username =  $scope.username
    //|| "booh!";



    $http.get("/:name").success(function(data) {
        var username = $location.absUrl().split('/')[3]
        if (!username) {
            username = 'pengphotos'
            $scope.getUser(username);
        } else { //  var username = username;
            $scope.username = username
            $scope.getUser(username);
        }

    });






    $scope.getSet = function(userID) {
        PhotoSet.getSet(userID)
            .success(function(data) {
                //  console.log(data.photosets.photoset, 'data.photosets.photoset')
                if (data.photosets.photoset.length < 1) {
                    alert("NO PHOTO ALBUMS FOUND FOR THIS USER");
                } else {
                    $scope.data = data.photosets.photoset
                        // //console.log(data.photosets.photoset)
                    _.each(data.photosets.photoset, function(item) {
                        // //console.log(item.id)
                        $scope.getPhotos(item.id)
                    })
                }
            })
    }

    $scope.pix = [];
    $scope.idHolder = []

    //$scope.getSet()

    $scope.getPhotos = function(item) {
        //  //console.log(item);
        PhotoSet.getPhotos(item)
            .success(function(data) {

                $scope.photos = data.photoset.photo.slice(0, 100)
                checkifLiked();
                //console.log("hihi", data.photoset.photo)
                _.each(data.photoset.photo, function(item) {

                    if ($scope.idHolder.indexOf(item.id) === -1) {
                        // //console.log(item.id)
                        $scope.idHolder.push(item.id)
                            //   //console.log("more thing got pushed")
                        $scope.pix.push(item)
                    }
                })
            })
    }

    //booh!

    $scope.getUser = function(username) {
        checkIfLoggedIn();
        $scope.pix = [];
        $scope.idHolder = []
            //console.log(username)
        PhotoSet.getUser(username)

        .success(function(data) {
            //console.log(data)
            if (data.code === 1 || undefined) {
                alert(data.message)
            } else {
                $scope.getSet(data.user.id)
            }
        })
    }


}])
