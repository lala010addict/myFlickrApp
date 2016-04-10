(function(angular, undefined) {
  angular.module("myFlickr.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})

;
})(angular);