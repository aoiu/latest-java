'use strict';

var fs = require('fs');
var spawnSync = require('child_process').spawnSync;

var rimraf = require('rimraf');
var log = require('spm-log');
var Queue = require('dong-queue');

var path = require('path');

function cleanup(next) {
	log.info('java','cleanup');
	rimraf('../java', function(err) {
		if(err) {
			log.error('cleanup',err);
		}
		else {
			log.info('cleanup','done');
		}
		next();
	});
}

function getCode(next) {
	log.info('java','getCode');
	var child = spawnSync('svn', ['export', 'http://svn.sdp.nd/svn/admin-develop/branch/src/main/java/', path.resolve( process.cwd(), '../java'),'--username','901010']);
	var outputArr = child.stdout.toString().split('\r\n');
	outputArr.forEach(function(line) {
		if(line) {
			log.info('svn',line);
		}
	})
	log.info('getCode','done');
	next();
}

function updateConfig(next) {
	var config = JSON.parse(fs.readFileSync('./config.json'));
	for(var key in config) {
		var filename = path.join('..', config[key]['path'], key);
		var content = fs.readFileSync(filename, {encoding: 'utf-8'});
		for(var rep in config[key]['replace']) {
			var replacement = config[key]['replace'][rep];
			content = content.replace(replacement['from'], replacement['to']);
			fs.writeFileSync(filename, content);
			log.info('update',key+' '+rep);
		}
	}
	next();
}

var queue = new Queue();
queue.use(function(next){
	cleanup(next);
});
queue.use(function(next){
	getCode(next);
});
queue.use(function(next){
	updateConfig(next);
});
queue.run(function(){
	log.info('all','done');
});