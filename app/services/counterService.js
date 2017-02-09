/*global define*/
'use strict';

/**
 * Services that persists and retrieves xxx
 */
define(['angular'], function(angular) {
	'use strict';
	var moduleName = 'counterServiceModule';
	angular
		.module(moduleName, [])
		.service('counter', function($interval) {
			this.time = 333;
			var counterRef;
			self = this;
			this.start = function() {
				if (counterRef == null) {
					counterRef = $interval(function() {
						self.time--;
					}, 1000);
				}
			};
			this.stop = function() {
				self.time = 30;
				$interval.cancel(counterRef);
				counterRef = null;
			};
			this.getTime = function() {
				return self.time;
			}
			return this;
		});
	return moduleName;
});
