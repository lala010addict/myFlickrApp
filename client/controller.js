myFlickr.controller('menu', ['$scope', 'Auth', "$http", 'PhotoSet', "$location", '$routeParams', '$log', function($scope, Auth, $http, PhotoSet, $location, $routeParams, $log) {





    $scope.photosphotos = [{
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/abf9b57d34338cdd95de59fe6903e3fe_600.jpg",
        link: "http://bokete.jp/boke/39978078",
        title: "とぼけんな、給料日だろ"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/904a534a5dba72ea5eb879182441cd16_600.jpg",
        link: "http://bokete.jp/boke/39979574",
        title: "奈落より　出でよ破壊の"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/81d5a932257f2cb36dc6e56b7d1e1fa4_600.jpg",
        link: "http://bokete.jp/boke/39972987",
        title: "職質かけたら思いっきりグーパンされたので一旦部下のとこへ戻る"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/09ea4d769e819f473a2b538860a94c9e_600.jpg",
        link: "http://bokete.jp/boke/39970408",
        title: "ヘディングしてから様子がおかしい"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/ef164c0fa2b42aac8e6cb512811cbed0_600.jpg",
        link: "http://bokete.jp/boke/39964824",
        title: "けえ"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/07af9fc488bb67250a5f5dc69cea9bae_600.jpg",
        link: "http://bokete.jp/boke/39953927",
        title: "大佐が掃除機かけ始めた。"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/92a0c960ca925b7cf8fc714a16463d23_600.jpg",
        link: "http://bokete.jp/boke/39980792",
        title: "占い師に「今年２月に人生で最高についてることが起こります」って言われてたけどコレじゃないことを全力で祈る"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/4e11f7ba4767d995053442bb3a98c0ab_600.jpg",
        link: "http://bokete.jp/boke/39967369",
        title: "四年も経って"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/ea01d23c4713273be387d58d611331ac_600.jpg",
        link: "http://bokete.jp/boke/39998749",
        title: "這ってるヤツと中腰のヤツがやたら早い"
    }, {
        src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/ac25d96925da8be29b71724ca780491c_600.jpg",
        link: "http://bokete.jp/boke/39973578",
        title: "銀のエンゼルがなかなか当たらないので直接狩りにきたら結構強かった"
    }];






    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = false;
    $scope.logout = Auth.logout;

    // $scope.userID = $scope.getCurrentUser()._id;
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

    var checkifLiked = function() {
        $http.get('/api/favorites')
            .success(function(data) {
                //console.log(data)

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
                }



            })
            .error(function(data) {
                //console.log('Error: ' + data);
            });
    }

 $scope.photosphotos = [{
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/abf9b57d34338cdd95de59fe6903e3fe_600.jpg",
    link: "http://bokete.jp/boke/39978078",
    title: "とぼけんな、給料日だろ"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/904a534a5dba72ea5eb879182441cd16_600.jpg",
    link: "http://bokete.jp/boke/39979574",
    title: "奈落より　出でよ破壊の"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/81d5a932257f2cb36dc6e56b7d1e1fa4_600.jpg",
    link: "http://bokete.jp/boke/39972987",
    title: "職質かけたら思いっきりグーパンされたので一旦部下のとこへ戻る"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/09ea4d769e819f473a2b538860a94c9e_600.jpg",
    link: "http://bokete.jp/boke/39970408",
    title: "ヘディングしてから様子がおかしい"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/ef164c0fa2b42aac8e6cb512811cbed0_600.jpg",
    link: "http://bokete.jp/boke/39964824",
    title: "けえ"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/07af9fc488bb67250a5f5dc69cea9bae_600.jpg",
    link: "http://bokete.jp/boke/39953927",
    title: "大佐が掃除機かけ始めた。"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/92a0c960ca925b7cf8fc714a16463d23_600.jpg",
    link: "http://bokete.jp/boke/39980792",
    title: "占い師に「今年２月に人生で最高についてることが起こります」って言われてたけどコレじゃないことを全力で祈る"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/4e11f7ba4767d995053442bb3a98c0ab_600.jpg",
    link: "http://bokete.jp/boke/39967369",
    title: "四年も経って"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/ea01d23c4713273be387d58d611331ac_600.jpg",
    link: "http://bokete.jp/boke/39998749",
    title: "這ってるヤツと中腰のヤツがやたら早い"
  }, {
    src: "http://d2dcan0armyq93.cloudfront.net/photo/odai/600/ac25d96925da8be29b71724ca780491c_600.jpg",
    link: "http://bokete.jp/boke/39973578",
    title: "銀のエンゼルがなかなか当たらないので直接狩りにきたら結構強かった"
  }]

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

        $scope.photos = id.slice(0, 300)
            //console.log($scope.photos)
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



    $scope.photos = {};
    $scope.getSet = function(userID) {
        PhotoSet.getSet(userID)
            .success(function(data) {
                console.log(data.photosets.photoset, 'data.photosets.photoset')
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
                // //console.log("hihi", data.photoset.photo)
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
