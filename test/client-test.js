var client = require('../lib/cloudstackClient');

var args = (process.env.LIVE)
	? require('./live/clientargs')
	: require('./nonlive/clientargs');

if (!process.env.LIVE) {	
	var mocks = require('./nonlive/mocks');
	(new mocks()).engage();
}

var client = new client(args);

exports['deployVirtualMachine'] = function(test) {
	client.deployVirtualMachine(211, 1, 1, { domainId:1, account:"TestUser" }, function(result) {
		result.emitter.on('success', function() {
			test.done();
		});

		result.emitter.on('fail', function() {
			test.fail();
			test.done();
		});
	});	
};