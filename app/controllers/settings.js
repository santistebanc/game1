import Ember from 'ember';

export default Ember.Controller.extend({
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
