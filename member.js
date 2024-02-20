function skillsMember() {
  return {
    restrict: 'E',
    scope: {
      member: '='
    },
    template: '<h3>{{member.name}}</h3><p>{{member.skill}}</p>'
  };
}