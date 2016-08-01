(function(){
    var myApp = angular.module('core')
    .factory('BusinessObject', function(){
        var BusinessObject = {
            id: 0  
            , createdOn: new Date()
            , modifiedOn: new Date()
            , isDeleted: false
            , isVisible: true
            , create: function add(){}
            , edit: function edit(){}
            , del: function del(){}
            , getDetails: function getDetails(){}
            , objectModified: false 
        }

        return BusinessObject;
    });
})()
