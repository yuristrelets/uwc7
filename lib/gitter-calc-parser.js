var math = require('mathjs');

var
  RESULT_TEMPLATE = '**{expr} = {result}**',
  INVALID_EXPRESSION = 'Invalid Expression',
  DEFAULT_PATTERN = /^calc[\s+]?/i;

/**
 *
 * @param pattern
 * @constructor
 */
function GitterCalcParser(pattern) {
  this._pattern = pattern || DEFAULT_PATTERN;
}

GitterCalcParser.prototype._test = function(message) {
  return this._pattern.test(message);
};

GitterCalcParser.prototype._sendMessage = function(room, expr, result) {
  room.send(RESULT_TEMPLATE.replace('{expr}', expr).replace('{result}', result));
};

GitterCalcParser.prototype.execute = function(room, message) {
  message = message.text;

  if(this._test(message)) {
    if(message = message.replace(this._pattern, '')) {
      var expr, result;

      try {
        expr = math.parse(message).toString();
        result = math.eval(message);

        console.log('Calc Parser Result:', result);
        this._sendMessage(room, expr, result);

      } catch(e) {
        console.log('Calc Parser Expression:', message);
        console.log('Calc Parser Error:', e.message);

        this._sendMessage(room, message, INVALID_EXPRESSION);
      }
    }
  }
};

module.exports = GitterCalcParser;
