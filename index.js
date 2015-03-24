var GitterBot = require('./lib/gitter-bot'),
    GitterHelloParser = require('./lib/gitter-hello-parser'),
    GitterCalcParser = require('./lib/gitter-calc-parser');

var args = process.argv.slice(2),
    roomId = args[0] || 'yuristrelets/uwc7',
    token = args[1] || 'cfec09425d383731b89472e2bad6394607122128';

var uwcBot = new GitterBot(token);

uwcBot
  .setName('UWC Room Bot')
  .addParser(new GitterHelloParser())
  .addParser(new GitterCalcParser())
  .listenRoom(roomId);
