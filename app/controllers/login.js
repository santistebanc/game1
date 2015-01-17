import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

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
      this.get('controllers.application').login(data, 'index', this);
    }
  }
});
