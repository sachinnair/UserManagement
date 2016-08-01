(function(){
    var myApp = angular.module('core');
    myApp.factory('Business', function(BusinessObject){
        var network = [];
        return {
            network : network,
            addUserGroup: function addUserGroup(userid, groupid){
                var relation = Object.create(BusinessObject);
                relation.id = network.length + 1;
                relation.userid = userid
                relation.groupid = groupid
                relation.isactive = 'Y'

                network.push(relation);
            }
        }
    })
})()
