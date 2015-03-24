var MSG_TEMPLATE = '***{name} says "Hello!"***';
var PATTERN = /^sayhello/i;

/**
 * Hello Parser
 * Parse `sayhello` string and performs greeting.
 * @constructor
 */
function GitterHelloParser() {
  this._bot = null;
  this._pattern = PATTERN;
}


/**
 * Set Bot instance.
 * @param bot
 * @returns {GitterHelloParser}
 */
GitterHelloParser.prototype.setBot = function(bot) {
  this._bot = bot;

  return this;
};

/**
 * Execute parser.
 * @param room
 * @param message
 */
GitterHelloParser.prototype.execute = function(room, message) {
  if(this._pattern.test(message.text)) {
    room.send(MSG_TEMPLATE.replace('{name}', this._bot.getName()));
  }
};

module.exports = GitterHelloParser;
