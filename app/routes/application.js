import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    var ref = this.get('firebaseRef');
    ref.onAuth(controller.onAuthChange, controller);
  }
});
