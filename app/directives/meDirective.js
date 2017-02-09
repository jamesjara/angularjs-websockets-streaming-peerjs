/*global define*/
'use strict';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 */
define([
	'angular'
], function(angular) {
	var moduleName = 'meDirectiveModule';
	angular
		.module(moduleName, [])
		.directive('me', function() {
			return {
				template: '<div class="my-video-container">'+
				'<webcam channel="me" id="my-video"  on-stream="onStreamMe(stream)"'+
  			'on-streaming="onSuccessMe()" on-error="onErrorMe(err)"></webcam>'+
				'</div>'
			};
		});
	return moduleName;
});
