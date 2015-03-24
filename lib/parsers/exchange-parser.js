var https = require('https');

var API_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    PATTERN = /^exchange/i;

/**
 * Exchange Rate Parser
 * Parse message string and return exchange rate.
 * @constructor
 */
function ExchangeParser() {
  this._name = 'Exchange Rate Parser';
  this._pattern = PATTERN;

  this._rates = [];
  this._loaded = false;

  this._loadRates();
}

/**
 * Execute parser.
 * @param room
 * @param message
 * @returns {*}
 */
ExchangeParser.prototype.execute = function(room, message) {
  message = message.text;

  if(this._loaded && this._pattern.test(message)) {
    message = message.replace(this._pattern, '');
    room.send(this._prepare(message));
  }
};

/**
 * Return help string.
 */
ExchangeParser.prototype.help = function() {
  return 'exchange [USD|EUR|RUR]';
};

/**
 * Load rates from remote service.
 * @private
 */
ExchangeParser.prototype._loadRates = function() {
  var me = this, body = '';

  https.get(API_URL, function(res) {
    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      me._rates = JSON.parse(body) || [];
      me._loaded = true;
    });

  }).on('error', function(e) {
    console.error(e);
  });

};

/**
 * Format and return currency rate string.
 * @param item
 * @returns {string}
 * @private
 */
ExchangeParser.prototype._format = function(item) {
  return [
    '* ',
    item.ccy.toUpperCase(),
    ' ',
    parseFloat(item.buy).toFixed(2),
    ' / ',
    parseFloat(item.sale).toFixed(2)
  ].join('');
};

/**
 * Prepare and return message string.
 * @param [ccy]
 * @returns {string}
 * @private
 */
ExchangeParser.prototype._prepare = function(ccy) {
  ccy = ccy.replace(/\s+/g, '');

  var result = ccy ?
    this._rates.filter(function(item) { return item.ccy.toLowerCase() === ccy.toLowerCase() }) :
    this._rates;

  return result.map(this._format).join('\n');
};

module.exports = ExchangeParser;
