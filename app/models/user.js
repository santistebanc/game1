import DS from 'ember-data';

export default DS.Model.extend({
  authData: DS.attr(),
  name: DS.attr('string'),
  member: DS.attr('boolean'),
  createdAt: DS.attr('string', {
    defaultValue: function() { return new Date(); }
  })
});
