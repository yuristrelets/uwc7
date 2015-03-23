var Gitter = require('node-gitter');

var LOGO_TEMPLATE = '```\n"{name} started"\n```';

function GitterRoomBot(token) {
  this._token = null;
  this._name = 'RooM BoT';
  this._parsers = [];

  this.setToken(token);

  this._gitter = new Gitter(this._token);
}

GitterRoomBot.prototype.setName = function(name) {
  if(name) {
    this._name = name;
  }

  return this;
};

GitterRoomBot.prototype.setToken = function(token) {
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

GitterRoomBot.prototype.addParser = function(parser) {
  if(!parser.execute) {
    throw new Error('Invalid parser!');
  }

  this._parsers.push(parser);

  return this;
};

GitterRoomBot.prototype.listen = function(roomId) {
  var me = this;

  this._gitter.rooms.join(roomId)
    .then(function(room) {
      console.log('Joined room:', room.name);
      room.send(LOGO_TEMPLATE.replace('{name}', me._name));
      room.listen().on('message', me._onMessageReceived.bind(me, room));
    })
    .fail(function(err) {
      console.error('Not possible to join the room:', err);
    });

  return this;
};

GitterRoomBot.prototype.leave = function(roomId) {
  this._gitter.rooms.find(roomId)
    .then(function(room) {
      room.leave();
    });

  return this;
};

GitterRoomBot.prototype._onMessageReceived = function(room, message) {
  this._parsers.forEach(function(parser) {
    parser.execute(room, message.text);
  });
};

module.exports = GitterRoomBot;
