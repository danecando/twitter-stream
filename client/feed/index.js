var Ractive = require('ractive');

var feedTemplate = require('./template/feed.ract');

var feed = new Ractive({
  template: feedTemplate,
  el: '#feed',
  data: { name: 'bitch' }
});
