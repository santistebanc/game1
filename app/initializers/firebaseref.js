/* global Firebase */
import config from '../config/environment';

export default {
  name: "firebaseref",

  initialize: function(container, application) {
    var firebaseRef = new Firebase(config.firebase_url);
    application.register('ref:firebase', firebaseRef, { instantiate: false });
    application.inject( 'route', 'firebaseRef', 'ref:firebase' );
    application.inject( 'controller', 'firebaseRef', 'ref:firebase' );
    application.inject( 'adapter', 'firebaseRef', 'ref:firebase' );
  }
};
