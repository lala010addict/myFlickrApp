myFlickr.controller('menu', ['$scope', 'Auth', "$http", 'PhotoSet', "$location", '$routeParams', '$log', function($scope, Auth, $http, PhotoSet, $location, $routeParams, $log) {

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = false;
    $scope.logout = Auth.logout;

    $scope.userID = $scope.getCurrentUser()._id;
    $scope.getToken = Auth.getToken;
    $scope.userInfo = '';
    $scope.formData = {};
    $scope.checked = false;
    var response = $scope.getCurrentUser();


    var checkIfLoggedIn = function() {
        if (response.$promise !== undefined) {
            response.$promise.then(function(data) {

                $scope.userInfo = data.toJSON(); //Changed data.data.topics to data.topics
                console.log($scope.userInfo)
                if ($scope.userInfo.name === $scope.username) {
                    $scope.isLoggedIn = true;
                    $scope.checked = true;
                    $scope.formData.user_id = $scope.userInfo._id;

                } else {
                    $scope.isLoggedIn = false;
                    $scope.checked = false;
                    console.log('nonono')
                }

            });

        }
    }

    checkIfLoggedIn();

    $scope.ok = false;

    var checkifLiked = function() {
        $http.get('/api/favorites')
            .success(function(data) {
                console.log('checkiffollowed', data)
                // _.forEach(data, function(item) {
                //     if (item.user_id === $scope.followers.user_id) {
                //         //  console.log('yes!!!!')
                //         $scope.followid = item._id;
                //         $scope.follow = 'Followed'
                //         $scope.check = 'check';
                //     }
                // })
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }


    checkifLiked();



    $scope.like = function(id, farm, server, secret) {
        $scope.formData.picture_id = id;
        $scope.formData.picture_farm = farm;
        $scope.formData.picture_server = server;
        $scope.formData.picture_secret = secret;
        $http.post('/api/favorites', $scope.formData)
            .then(function(data) {
                console.log(data);

            })

        .catch(function(err) {
            console.error('Error: ' + err);
        });
    }




    $scope.data = {}
    $scope.all = function(id) {

        $scope.photos = id.slice(0, 300)
        console.log($scope.photos)
    }
    $scope.username = '';


    // $routeParams.username =  $scope.username
    //|| "booh!";
    $scope.click = function(e) {
        alert(e)
    }


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

    //$scope.getSet()

    $scope.getPhotos = function(item) {
        //  console.log(item);
        PhotoSet.getPhotos(item)
            .success(function(data) {

                $scope.photos = data.photoset.photo.slice(0, 100)
                console.log("hihi", data.photoset.photo)
                _.each(data.photoset.photo, function(item) {

                    if ($scope.idHolder.indexOf(item.id) === -1) {
                        // console.log(item.id)
                        $scope.idHolder.push(item.id)
                            //   console.log("more thing got pushed")
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
