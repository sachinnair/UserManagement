'use strict';

angular.module('myApp.view1', ['ui.router', 'core'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('view1',{
        url : '/view1',
        views : {
            "" : {
                templateUrl: 'view1/view1.html',
                controller: 'View1Ctrl'
            }
        }
    }).state('view1.leftMenu.groups',{
        url : '/:id'
    }).state('view1.leftMenu',{
        url : '/:id',
        resolve : {
            emailId : function($stateParams){                
                return $stateParams.id;
            }
        }
    });
}])

.controller('View1Ctrl', [function() {

}])


.directive('map', function(Classes,$state){
    return {
        link: function(){
            console.log(Classes.UserList)
        
            function initMap(){
                scaledSize: new google.maps.Size(25, 25)
                var latitudes = Classes.UserList.map(function(x){return x.origin.lat;})
                var longitudes = Classes.UserList.map(function(x){return x.origin.lat;})
                var minLat = Math.min.apply(null, latitudes);
                var maxLat = Math.max.apply(null, latitudes);
                var minLng = Math.min.apply(null, longitudes);
                var maxLng = Math.max.apply(null, longitudes);

                var medianLat = parseFloat((minLat + maxLat)/2, 3);
                var medianLng = parseFloat((minLng + maxLng)/2, 3);


                var myLatLng = { lat: medianLat
                                , lng: medianLng };

                // Create a map object and specify the DOM element for display.
                    // center: myLatLng,
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: myLatLng,
                    scrollwheel: true,
                    zoom: 4, 
                    minZoom: 2,
                    mapTypeControlOptions: {
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                });

                // Create a marker and set its position.
                var userMarker = {
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aiga_toiletsq_men.svg/744px-Aiga_toiletsq_men.svg.png",
                    scaledSize: new google.maps.Size(25, 25)
                }

                for(var i =0; i < Classes.UserList.length; i++){
                    var latLong = Classes.UserList[i].origin;
                    var email = Classes.UserList[i].email;
                    var name = Classes.UserList[i].name;
                    var id = Classes.UserList[i].id;
                    // google.maps.MarkerOptions.label = "Hello";
                    var marker = new google.maps.Marker({
                        map: map,
                        icon: userMarker,
                        position: latLong,
                        title: name,
                        email : email,
                        id: id
                    })
                    .addListener('click', function() {
                        $state.go('view1.leftMenu',{id : this.id});
                        map.setZoom(8);
                        map.setCenter(this.position);
                    });
                }
            }
            initMap();
        }
        , controller: function($scope, $state, $stateParams, Business){
            $scope.$state = $state;
            $scope.change = true;
            $scope.groups = $scope.change == true ? Classes.GroupList : Classes.GroupList.filter(function(x){return x.id == $stateParams.id});

            $scope.addUser = function(groupid){
                console.log("Add user to group", $stateParams.id, groupid);

                var currentUser = $stateParams.id;
                var userDetails = Classes.UserList.filter(function(x){
                    return x.id == currentUser;
                })[0];

                userDetails.addGroup(groupid);
                console.log(Business.network);

                updateListing();
            };


            function updateListing(){
                var currentUser = $stateParams.id;
                var partOfGroups = [];
                partOfGroups = Business.network.filter(function(x){return x.userid == currentUser}).map(function(x){return x.groupid;});
                var filteredGroupsList = Classes.GroupList.filter(function(x){
                    if($scope.change){
                        return !partOfGroups.some(function(y){return y == x.groupid})
                    }
                    return partOfGroups.some(function(y){return y == x.groupid})
                })
                $scope.groups = filteredGroupsList;
            }

            $scope.changeListing = function(){
                $scope.change = !($scope.change);

                updateListing();
            }
        }

    }
});
