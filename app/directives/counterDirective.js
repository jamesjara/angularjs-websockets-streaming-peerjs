/*global define*/
'use strict';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 */
define([
	'angular'
], function(angular) {
	var moduleName = 'counterDirectiveModule';
	angular
		.module(moduleName, [])
		.directive('toolbar', function() {
			return {
				template: '<div class="counterDown-container">' +
					'<div class="counterDown">' +
					'<div>' +
					'  <div me></div>' +
					'</div>' +
					'<div>' +
					'  <span>{{counter}}</span>' +
					'  <div class="smalltext">Seconds</div>' +
					'</div>' +
					'</div>' +
					'</div>'
			};
		})
	return moduleName;
});
