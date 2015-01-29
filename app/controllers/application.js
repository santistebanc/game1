import Ember from 'ember';

export default Ember.Controller.extend({
  isRegistered: function () {
      return !(this.get('auth.currentUser.provider') === null || this.get('auth.currentUser.provider') === 'anonymous');
  }.property('auth.currentUser'),
});
