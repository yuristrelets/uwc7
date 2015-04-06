var GitterBot = require('./lib/gitter-bot'),
    HelloParser = require('./lib/parsers/hello-parser'),
    CalcParser = require('./lib/parsers/calc-parser'),
    ExchangeParser = require('./lib/parsers/exchange-parser');

var args = process.argv.slice(2),
    room = args[0],
    token = args[1];

if(!room || !token) {
  throw new Error('You forget room or token!');
}

new GitterBot(token)
  .setName('UWC Gitter Bot')
  .addParser(new HelloParser())
  .addParser(new CalcParser())
  .addParser(new ExchangeParser())
  .listenRoom(room);
