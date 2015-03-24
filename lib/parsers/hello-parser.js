var HELLO_MESSAGE = '**Hello {name}!**',
    PATTERN = /^hello/i;

/**
 * Hello Parser
 * Parse message string and perform greeting.
 * @constructor
 */
function HelloParser() {
  this._name = 'Hello Parser';
  this._pattern = PATTERN;
}

/**
 * Execute parser.
 * @param room
 * @param message
 */
HelloParser.prototype.execute = function(room, message) {
  if(this._pattern.test(message.text)) {
    room.send(HELLO_MESSAGE.replace('{name}', message.fromUser.displayName));
  }
};

/**
 * Return help string.
 */
HelloParser.prototype.help = function() {
  return 'hello';
};

module.exports = HelloParser;
