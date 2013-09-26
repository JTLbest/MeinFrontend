majaX({
  url:'http://dennistel.nl/movies',
  method:'API'
}, function(json) {
  document.getElementById('div').innerHTML = JSON.stringify(json, null, '  ')
});