import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    if(this.get('auth.currentUser') === null){
      this.transitionTo('index');
    }
  }
});
