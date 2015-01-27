/* global Firebase */
import config from '../config/environment';
import authManager from '../objects/authManager';

export default {
  name: "firebaseref",

  initialize: function(container, application) {
    var firebaseRef = new Firebase(config.firebase_url);
    application.register('ref:firebase', firebaseRef, { instantiate: false });
    application.inject( 'route', 'firebaseRef', 'ref:firebase' );
    application.inject( 'controller', 'firebaseRef', 'ref:firebase' );

    application.register('auth:firebase', firebaseRef.getAuth(), { instantiate: false });
    application.inject( 'controller:application', 'fireauth', 'auth:firebase' );

    application.register('ref:auth', authManager, { instantiate: false });
    application.inject( 'route', 'auth', 'ref:auth' );
    application.inject( 'controller', 'auth', 'ref:auth' );
  }
};
