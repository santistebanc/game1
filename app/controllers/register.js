import Ember from 'ember';

export default Ember.Controller.extend({
  reset: function() {
    this.setProperties({
      userEmail: "",
      userPassword: "",
      error: ""
    });
  },

  actions: {
    signUp: function() {
      var data = {
        email: this.get('userEmail'),
        password: this.get('userPassword')
      };
      this.get('auth').signUp(data, this);
    }
  },
});
