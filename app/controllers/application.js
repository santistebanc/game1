import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['login'],
  fireauth: function (){
    var ref = this.get('firebaseRef');
    return ref.getAuth();
  }.property(),
  onAuthChange: function(authData) {
    this.set('fireauth', authData);
    var ref = this.get('firebaseRef');
    if (authData) {
      if (authData.provider === 'anonymous') {
        console.log("User " + authData.uid + " is logged in anonymously");
      } else {
        console.log("User " + authData.uid + " logged in as a registered member");
      }
    } else {
      //log the user anonymously
      console.log("User not logged in");
      console.log("Logging in anonymously...");
      ref.authAnonymously(function(error) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log('Authenticated successfully');
        }
      });
    }
  },
  login: function (data, redirect, from) {
    console.log(from);
    var ref = this.get('firebaseRef');
    var self = this;
    ref.authWithPassword(data, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        from.set('error',error);
      } else {
        console.log("Authenticated successfully, user: " + authData.uid);

        //reset textboxes and redirect
        from.reset();
        from.transitionToRoute(redirect);
      }
    });
  },
  logout: function () {
    var ref = this.get('firebaseRef');
    ref.unauth();
  },
  isRegistered: function () {
      return !(this.get('fireauth.provider') === 'anonymous');
  }.property('fireauth'),


  name: function(){
    var fireauth = this.get('fireauth');
    if(fireauth){
      return fireauth.uid;
    }
  }.property('fireauth'),
  expdate: function(){
    var fireauth = this.get('fireauth');
    if(fireauth){
      return moment(fireauth.expires*1000);
    }
  }.property('fireauth'),
  actions: {
    logout: function () {
      this.logout();
    }
  }
});
