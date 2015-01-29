import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
      if(this.get('auth.currentUser.provider') === 'password'){
        return this.store.find('user', this.get('auth.currentUser.uid'));
      }
  }.observes('auth.currentUser')
});
