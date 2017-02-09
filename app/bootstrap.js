/*global require*/
'use strict';
require([
	'angular',
	'Peer',
	'jQuery'
], function(angular) {
	require([
		'controllers/viewportController',
		'directives/counterDirective',
		'directives/meDirective',
		'directives/visitorDirective',
		'services/counterService',
		'services/userFactory'
	], function(viewportController, counterDirectiveModule,
		meDirectiveModule, visitorDirectiveModule, counterServiceModule,
		userFactoryModule
	) {
		angular
			.module('mirrorme', [counterDirectiveModule, meDirectiveModule,
				visitorDirectiveModule, counterServiceModule,
				userFactoryModule, 'webcam'
			])
			.controller('ViewportController', viewportController);
		angular.bootstrap(document, ['mirrorme']);
	});
});
