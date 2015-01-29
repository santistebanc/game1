/* global Firebase */
import config from '../config/environment';
import Ember from 'ember';

export default Ember.Object.create({
  ref: null,
  currentUser: null,
  init: function() {
    var ref = new Firebase(config.firebase_url);
    this.set('ref', ref);
    this.set('currentUser', ref.getAuth());
    ref.onAuth(this.onAuthChange, this);
  },
  onAuthChange: function(authData) {
    this.set('currentUser', authData);
    var ref = this.get('ref');
    var self = this;
    if (authData) {
      if (authData.provider === 'anonymous') {
        console.log("User " + authData.uid + " is logged in anonymously");
      } else {
        console.log("User " + authData.uid + " logged in as a registered member");
      }
    } else {
      console.log("User not logged in");
        console.log("Logging in anonymously...");
        ref.authAnonymously(function(error, authData) {
          self.set('currentUser', authData);
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log('Authenticated successfully');
          }
        });
  }
  },

  login: function(data, redirect, from) {
    console.log(from);
    var ref = this.get('ref');
    ref.authWithPassword(data, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        from.set('error', error);
      } else {
        console.log("Authenticated successfully, user: " + authData.uid);

        //reset textboxes and redirect
        from.reset();
        from.transitionToRoute(redirect);
      }
    });
  },
  logout: function() {
    var ref = this.get('ref');
    ref.unauth();
  },
  signUp: function(data, from) {
    var ref = this.get('ref');
    ref.createUser(data, function(error) {
      if (error === null) {
        console.log("User created successfully");
        //authorize user and login
        ref.authWithPassword(data, function(error, authData) {
          if (error) {
            console.log("Login after registration Failed!", error);
            from.set('error', error);
          } else {
            console.log("Authenticated successfully after registration, user: " + authData.uid);
            //persist user to database
            var user = from.store.createRecord("user", {
              id: authData.uid,
              authData: authData,
              name: '',
              member: true
            });
            console.log(user);
            user.save().then(function() {
              console.log('User persisted');
              //reset textboxes and redirect
              from.reset();
              from.transitionToRoute('index');
            }, function(user) {
              console.log('Could not persist');
              from.set('error', 'User could not be registered properly, try again.');
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
        from.set('error', error);
      }
    });
  }
});
