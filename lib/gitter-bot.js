var Gitter = require('node-gitter');

var JOIN_TEMPLATE = '**{name} joined**',
    DEFAULT_NAME = 'Room Bot';


/**
 *
 * @param token
 * @constructor
 */
function GitterBot(token) {
  this._name = DEFAULT_NAME;
  this._parsers = [];

  this._token = null;
  this.setToken(token);

  this._gitter = new Gitter(this._token);
}

GitterBot.prototype.setName = function(name) {
  if(name) {
    this._name = name;
  }

  return this;
};

GitterBot.prototype.getName = function() {
  return this._name;
};

GitterBot.prototype.setToken = function(token) {
  if('string' !== typeof token) {
    throw new Error('Token must be string!');
  }

  if(!token) {
    throw new Error('Token cannot be empty!');
  }

  if(token.length !== 40) {
    throw new Error('Token has an invalid format!');
  }

  this._token = token;

  return this;
};

GitterBot.prototype.addParser = function(parser) {
  if(!parser.execute) { // monkey checking
    throw new Error('Invalid parser!');
  }

  if(parser.setBot instanceof Function) {
    parser.setBot(this);
  }

  this._parsers.push(parser);

  return this;
};

GitterBot.prototype.listenRoom = function(roomId) {
  var me = this;

  this._gitter.rooms.join(roomId)
    .then(function(room) {
      console.log('Joined room:', room.name);
      room.send(JOIN_TEMPLATE.replace('{name}', me.getName()));
      room.listen().on('message', me._onMessageReceived.bind(me, room));
    })
    .fail(function(err) {
      console.error('Not possible to join the room:', err);
    });

  return this;
};

GitterBot.prototype._onMessageReceived = function(room, message) {
  this._parsers.forEach(function(parser) {
    parser.execute(room, message);
  });
};

module.exports = GitterBot;
