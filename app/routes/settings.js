import Ember from 'ember';

export default Ember.Route.extend({
  needs: ['application'],
  beforeModel: function(){
    var authData = this.controllerFor('application').get('fireauth');
    if(!authData || authData.provider === 'anonymous'){
      this.transitionTo('login');
    }
  },
  model: function(){
    //var authData = this.controllerFor('application').get('fireauth');
    //return this.store.find('user', authData.get('uid'));
  },
  setupController: function (controller) {
    var ref = this.get('firebaseRef');
    ref.onAuth(controller.onAuthChange, controller);
  }
});
