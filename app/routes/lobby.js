import AuthRoute from './auth';

export default AuthRoute.extend({
  model: function () {
    return this.store.find('user');
  }
});
