import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('register');
  this.route("login");
  this.route("logout");
  this.route("settings");
  this.route("emailreset");
  this.route("lobby");
});

export default Router;
