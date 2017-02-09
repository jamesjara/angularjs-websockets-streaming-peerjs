/*global require*/
'use strict';
require.config({
	paths: {
    'jQuery': '../libs/jquery/dist/jquery',
		'angular': '../libs/angular/angular',
		'webcam': '../libs/webcam/dist/webcam.min',
		'Peer': '../libs/peerjs/peer'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		jQuery: {
				exports: 'jQuery'
		},
		Peer: {
				exports: 'Peer'
		},
		webcam: {
			  deps : ['angular'],
				exports: 'webcam'
		}
	},
	deps: ['bootstrap']
});
