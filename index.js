var GitterRoomBot    = require('./lib/gitter-room-bot');
var GitterCalcParser = require('./lib/gitter-calc-parser');

var args  = process.argv.slice(2);
var room  = args[0] || 'yuristrelets/uwc7';
var token = args[1] || 'cfec09425d383731b89472e2bad6394607122128';

new GitterRoomBot(token)
  .addParser(new GitterCalcParser())
  .listen(room);