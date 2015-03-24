var math = require('mathjs');

var RESULT_TEMPLATE = '`{expr} = {result}`',
    INVALID_EXPRESSION = 'Invalid Expression',
    PATTERN = /^calc[\s+]?/i;


/**
 * Calc Parser
 * Parse message string and perform calculation.
 * @constructor
 */
function CalcParser() {
  this._name = 'Calc Parser';
  this._pattern = PATTERN;
}

/**
 * Regexp test message.
 * @param message
 * @returns {boolean}
 * @private
 */
CalcParser.prototype._test = function(message) {
  return this._pattern.test(message);
};

/**
 * Format and send message.
 * @param room
 * @param expr
 * @param result
 * @private
 */
CalcParser.prototype._sendMessage = function(room, expr, result) {
  room.send(RESULT_TEMPLATE.replace('{expr}', expr).replace('{result}', result));
};

/**
 * Execute parser.
 * @param room
 * @param message
 */
CalcParser.prototype.execute = function(room, message) {
  message = message.text;

  if(this._test(message)) {
    if(message = message.replace(this._pattern, '')) {
      var expr, result;

      try {
        expr = math.parse(message).toString();
        result = math.eval(message);
        console.log(this._name, 'result', result);

        this._sendMessage(room, expr, result);

      } catch(e) {
        console.log(this._name);
        console.log('-> expression', message);
        console.log('-> error', e.message);

        this._sendMessage(room, message, INVALID_EXPRESSION);
      }
    }
  }
};

/**
 * Return help string.
 */
CalcParser.prototype.help = function() {
  return 'calc {expression}';
};

module.exports = CalcParser;
