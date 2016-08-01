(function(){

    var myApp = angular.module('core')

    .factory('User', function(BusinessObject, Business){

        var User = function(){
            this.name= ''
            this.age= 0
            this.email = ''
            this.gender= 'M'
            this.imgUrl= 'http//=blank'
            this.groups= []
            this.description= 'Tell me about yourself'
            this.maritalStatus= 'Single'
            this.hobbies= 'Comma separated hobbies'
            this.profession= 'Expat'
            this.origin= 'Obtain from maps'
            this.currentLocation= 'Obtain from maps'
        } 

        // Done to have default values 
        User.prototype = Object.create(BusinessObject);
        User.prototype.create= function createUser(){
            user = this;
            user.memory = {};
            user.memory.crash = true;

            // Write code to save it in local storage
            if(Storage){
                // TODO: localStorage & sessionStorage available is Storage is defined
                // Retrieve list of existing users
                var users = localStorage.getItem('Users');
                var userlist = JSON.parse(users) || {users:[]};

                // TODO: careful while parsing and unparsing date object - need to handle it separately
                // Store new user into existing user
                userlist.users.push(user);
                localStorage.setItem('Users', JSON.stringify(userlist));

            }else{
                // Storage not supported in browser
            }



            // Write code to use indexedDb to store user information
            persist();
        }
        User.prototype.del= function del(){}
        User.prototype.edit= function edit(){}
        User.prototype.getDetails= function getDetails(){}
        User.prototype.addGroup= function addGroup(groupId){
            console.log("user calls addgroup");
            
            // Call business logic
            Business.addUserGroup(this.id, groupId);
        }
        User.prototype.showGroups= function showGroups(){};
        User.prototype.exitGroup= function remGroup(groupId){};

        return User;
    });
})()
