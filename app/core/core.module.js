
(function initCore(){
    // Business Object
    var myApp = angular.module('core', []);


    myApp.factory('Classes',function classcontainer(User, Group){

        function addGroup(){
            
        }


        var userList = [];

        function genRandomUsers(){
            for(var i = 0; i < 10; i++){
                var user = new User(); 
                user.id = (i+1);
                user.name = faker.name.findName();
                user.email = faker.internet.email();
                user.age = 0
                user.gender = Math.random() > 0.5 ? 'M' : 'F'
                user.imgUrl = 'http//=blank'
                user.groups = []
                user.description = 'Tell me about yourself'
                user.maritalStatus = 'Single'
                user.hobbies = 'Comma separated hobbies'
                user.profession = 'Expat'
                user.origin = {lat: parseFloat(faker.address.latitude(), 3) , lng: parseFloat(faker.address.longitude(), 3)}
                user.currentLocation = {lat: faker.address.latitude,  lng: faker.address.longitude}
                userList.push(user);
            }
            
        }
        genRandomUsers()

        var groupList = [];
        function genRandomGroups(){
            for(var i = 0; i < 10; i++){
                var group = Object.create(Group);
                group.groupid = (i + 1);
                group.name = faker.company.companyName();
                group.imageUrl = faker.image.sports(640,480,true); 
                groupList.push(group);
            }
            
        }
        genRandomGroups()


        return {
            User : User,
            Group: Group,
            UserList: userList,
            GroupList: groupList
        }
    })

    
})()


