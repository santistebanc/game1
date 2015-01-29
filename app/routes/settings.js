import AuthRoute from './auth';

export default AuthRoute.extend({
  beforeModel: function(){
    this._super();
      if (this.get('auth.currentUser.provider') === 'anonymous') {
        this.transitionTo('login');
      }
    },
  model: function(){
    return this.store.find('user', this.get('auth.currentUser.uid'));
  }
});
