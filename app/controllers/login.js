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
    login: function(){
      var data = {email: this.get('userEmail'), password:this.get('userPassword')};
      this.get('auth').login(data, 'index', this);
    }
  }
});
