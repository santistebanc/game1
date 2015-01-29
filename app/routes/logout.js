import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    this.get('auth').logout();
    this.transitionTo('index');
  }
});
