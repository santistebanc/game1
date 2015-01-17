import Ember from 'ember';

export default Ember.Controller.extend({
  algo: console.log(this.store),
  needs: ['application'],

  reset: function() {
    this.setProperties({
      userEmail: "",
      userPassword: "",
      error: ""
    });
  },

  actions: {
    signUp: function(){
      var self = this;
      var ref = this.get('firebaseRef');
      var data = {email: this.get('userEmail'), password:this.get('userPassword')};
      console.log(this.store);
      ref.createUser(data, function(error) {
        if (error === null) {
          console.log("User created successfully");
          //authorize user and login
          ref.authWithPassword(data, function(error, authData) {
            if (error) {
              console.log("Login after registration Failed!", error);
              self.set('error',error);
            } else {
              console.log("Authenticated successfully after registration, user: " + authData.uid);
              //persist user to database
              var user = self.store.createRecord("user", {
                authData: authData,
                firstName: '',
                lastName: '',
                member: true
              });
              user.save().then(function (){
                console.log('User persisted');
                //reset textboxes and redirect
                self.reset();
                self.transitionToRoute('index');
              },function (user){
                console.log('Could not persist');
                self.set('error', 'User could not be registered properly, try again.');
                //deleting created account
                console.log('Removing User');
                ref.removeUser(data, function(error) {
                  if (error === null) {
                    console.log("User removed successfully");
                  } else {
                    console.log("Error removing user. Remove manually from firebase: ", user, error);
                  }
                });
              });
            }
          });
        } else {
          console.log("Error creating user:", error);
          self.set('error', error);
        }
      });
    }
  },
});
