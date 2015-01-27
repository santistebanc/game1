/* global Firebase */
import config from '../config/environment';
import Ember from 'ember';

export default Ember.Object.create({
  ref: null,
  authData: null,
  init: function () {
    var ref = new Firebase(config.firebase_url);
    this.set('ref',ref);
    this.set('auth',ref.getAuth());
    ref.onAuth(this.onAuthChange,this);
  },
  onAuthChange: function (authData){
    this.set('authData',authData);
    var ref = this.get('ref');
    if (authData) {
      if (authData.provider === 'anonymous') {
        console.log("aUser " + authData.uid + " is logged in anonymously");
      } else {
        console.log("aUser " + authData.uid + " logged in as a registered member");
      }
    } else {
      //log the user anonymously
      console.log("aUser not logged in");
      console.log("aLogging in anonymously...");
      ref.authAnonymously(function(error) {
        if (error) {
          console.log("aLogin Failed!", error);
        } else {
          console.log('aAuthenticated successfully');
        }
      });
    }
  }
});
