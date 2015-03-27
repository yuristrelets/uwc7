var GitterBot = require('./lib/gitter-bot'),
    HelloParser = require('./lib/parsers/hello-parser'),
    CalcParser = require('./lib/parsers/calc-parser'),
    ExchangeParser = require('./lib/parsers/exchange-parser');

var args = process.argv.slice(2),
    room = args[0] || 'yuristrelets/uwc7',
    token = args[1] || 'cfec09425d383731b89472e2bad6394607122128';

new GitterBot(token)
  .setName('UWC Gitter Bot')
  .addParser(new HelloParser())
  .addParser(new CalcParser())
  .addParser(new ExchangeParser())
  .listenRoom(room);
