import DS from 'ember-data';

export default DS.Model.extend({
  authData: DS.attr(),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  member: DS.attr('boolean'),
  createdAt: DS.attr('string', {
    defaultValue: function() { return new Date(); }
  })
});
