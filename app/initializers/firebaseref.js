import authManager from '../objects/authManager';

export default {
  name: "firebaseref",

  initialize: function(container, application) {
    application.register('ref:auth', authManager, { instantiate: false });
    application.inject( 'route', 'auth', 'ref:auth' );
    application.inject( 'controller', 'auth', 'ref:auth' );
    application.inject( 'mixin', 'auth', 'ref:auth' );
  }
};
