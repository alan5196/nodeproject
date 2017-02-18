var Writable = require('stream').Writable;
var util = require('util');

module.exports = CountStream;

util.inherits(CountStream, Writable);

// Function defenition did not semi-colon
function CountStream(matchText, options){
	Writable.call(this, options);
	this.count = 0;
	this.matcher = new RegExp(matchText, 'ig');
}

// Statements need semi-colon
CountStream.prototype._write = function(chunk, encoding, cb) {
	var matches = chunk.toString().match(this.matcher);

	if (matches) {
		this.count += matches.length;
	}
	
	cb();
};

CountStream.prototype.end = function(){
	this.emit('total', this.count);
};