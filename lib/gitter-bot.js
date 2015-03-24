var Gitter = require('node-gitter');

var JOIN_MESSAGE = '**{name}**\n',
    DEFAULT_NAME = 'Room Bot';

/**
 * Gitter Bot
 * Provide interface for execute parsers.
 * @param token
 * @constructor
 */
function GitterBot(token) {
  this._name = DEFAULT_NAME;
  this._parsers = [];

  this._token = null;
  this._setToken(token);

  this._gitter = new Gitter(this._token);
}

/**
 * Set name.
 * @param name
 * @returns {GitterBot}
 */
GitterBot.prototype.setName = function(name) {
  if(name) {
    this._name = name;
  }

  return this;
};

/**
 * Get name.
 * @returns {string}
 */
GitterBot.prototype.getName = function() {
  return this._name;
};

/**
 * Add parser.
 * @param parser
 * @returns {GitterBot}
 */
GitterBot.prototype.addParser = function(parser) {
  if(!parser.execute) { // monkey checking
    throw new Error('Invalid parser!');
  }

  this._parsers.push(parser);

  return this;
};

/**
 * Remove parser.
 * @param parser
 * @returns {GitterBot}
 */
GitterBot.prototype.removeParser = function(parser) {
  var index = this._parsers.indexOf(parser);

  if(-1 !== index) {
    this._parsers.splice(index, 1);
  }

  return this;
};

/**
 * Start listen room.
 * @param roomId
 * @returns {GitterBot}
 */
GitterBot.prototype.listenRoom = function(roomId) {
  var me = this;

  this._gitter.rooms.join(roomId)
    .then(function(room) {
      console.log('Joined room:', room.name);
      room.send(JOIN_MESSAGE.replace('{name}', me.getName()) + me._collectHelp());

      room.listen().on('message', me._onMessageReceived.bind(me, room));
    })
    .fail(function(err) {
      console.error('Not possible to join the room:', err);
    });

  return this;
};

/**
 * Set gitter api token.
 * @param token
 * @returns {GitterBot}
 * @private
 */
GitterBot.prototype._setToken = function(token) {
  if('string' !== typeof token || !token) {
    throw new Error('Token must be a string!');
  }

  if(token.length !== 40) {
    throw new Error('Token has an invalid format!');
  }

  this._token = token;

  return this;
};

/**
 * Room message received handler.
 * Performs sequential parsers execution.
 * @param room
 * @param message
 * @private
 */
GitterBot.prototype._onMessageReceived = function(room, message) {
  this._parsers.forEach(function(parser) {
    parser.execute(room, message);
  });
};

GitterBot.prototype._collectHelp = function() {
  if(!this._parsers.length) return;

  var help = [], item;
  help.push('Available commands:');

  this._parsers.forEach(function(parser) {
    if(parser.help) {

      if(item = parser.help()) {
        help.push('* ' + item);
      }
    }
  });

  return help.join('\n');
};

module.exports = GitterBot;
