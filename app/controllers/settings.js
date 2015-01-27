import Ember from 'ember';

export default Ember.Controller.extend({
  onAuthChange: function(authData) {
    this.set('fireauth', authData);
    if(!authData || authData.provider === 'anonymous'){
      this.transitionTo('login');
    }
  },
  actions: {
    save: function() {
      console.log(this.model);
      this.model.save().then(function() {
        console.log('changes were persisted');
      }, function() {
        console.log('could not persist changes');
      });
    }
  }
});
