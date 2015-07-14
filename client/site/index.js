'use strict';

var signinEl = document.getElementById('twitter-signin');

signinEl.addEventListener('click', function(e) {
  e.preventDefault();

  window.open('http://danecando.com', '_blank', 'height=570,width=520');
});

