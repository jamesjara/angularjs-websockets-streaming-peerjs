/*global define*/
'use strict';

/**
 * Services that persists and retrieves xxx
 */
define(['angular'], function(angular) {
	'use strict';
	var moduleName = 'userFactoryModule';
	angular
		.module(moduleName, [])
		.factory('user', ['$http', function($http) {
			return {
				"current": function() {
					return "xxxxxxxx";
				},
				"visitor": function(callback) {
					$http({
						method: 'GET',
						url: '//peer-server-mirrorme.herokuapp.com/peersall'
					}).then(function(response) {
						var data = response.data;
						callback(data[0]);
					});
				}
			}
		}]);
	return moduleName;
});
