/*global define*/
'use strict';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 */
define([
	'angular'
], function(angular) {
	var moduleName = 'visitorDirectiveModule';
	angular
		.module(moduleName, [])
		.directive('visitor', function() {
			return {
				template: '<div class="their-video-container">'+
					'<video id="their-video" autoplay></video></div>' +
					'<video id="their-video-background"></video>'
			};
		});
	return moduleName;
});
