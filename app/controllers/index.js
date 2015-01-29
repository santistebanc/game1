import Ember from 'ember';

export default Ember.Controller.extend({
  user: function () {
    return this.get('auth.currentUser');
  }.property('auth.currentUser'),
  isRegistered: function () {
    return !(this.get('auth.currentUser.provider') && this.get('auth.currentUser.provider') === 'anonymous');
  }.property('auth.currentUser'),
});
