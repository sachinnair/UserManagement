(function(){

    var myApp = angular.module('core')
    .factory('Group',function classcontainer(BusinessObject){
        // Group Object
        var Group = Object.create(BusinessObject);
        Group = {
            name: ''
            , keywords: ''
            , location: ''
            , events: []
            , users: []
            , description: ''
            , createdOn: new Date()
            , modifiedOn: new Date()
            , isDeleted: new Date()
            , isVisible: new Date()
            , add: function add(){}
            , edit: function edit(){}
            , del: function del(){}
            , getDetails: function getDetails(){}
            , addUser: function addUser(){}
            , showUsers: function showUsers(){}
            , remUser: function remUser(){}
        }
        
        return Group;
    });
})()
