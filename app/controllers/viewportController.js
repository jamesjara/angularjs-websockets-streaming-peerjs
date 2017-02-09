/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the xx service
 * - exposes the model to the template and provides event handlers
 */
define(['angular','Peer','webcam','jQuery'], function(angular, Peer, webcam, jQuery) {
	return ['$scope','counter','user',
		function($scope,counter, user) {
			$scope.loaded = false;
			this.peer = {};
			var peer = this.peer;
			var me = this;

			// create peer connection
			peer = new Peer({
				host: 'peer-server-mirrorme.herokuapp.com',
				port: /*location.port || */ (location.protocol === 'https:' ? '443' : '80'),
				path: '/',
				key: 'peerjs',
				allow_discovery: true
			});
			peer.on('error', function(err) {
				console.log(err);
				$scope.loaded = false;
				$scope.$apply();
			});
			peer.on('open', function(id) {
				console.log('creating peer: ' + id);
				console.log('waiting connections');
				$scope.loaded = true;
				$scope.$apply();

				// Call a peer, providing our mediaStream
				callSomeOne(peer);
			});

			// config my stream
			$scope.me = {
				videoHeight: 80,
				videoWidth: 80,
				video: null // Will reference the video element on success,
			};
			$scope.onErrorMe = function (err) {};
			$scope.onStreamMe = function (stream) {
				console.log(stream);
				me.stream = stream;
			};
			$scope.onSuccessMe = function (stream) {};

			// Answer any one who calls always, even if we are not streaming
			peer.on('call', function(call) {
			  console.info("ansering call from player id: ",call);
				call.answer(me.stream);
			});

			function callSomeOne() {
				user.visitor(function(playerId) {

					//if there is not vistir, remark in 5 Seconds
					if(typeof playerId == "undefined" || peer.id == playerId){
					  console.log('no connection found, quering in 5 seconds');
						setTimeout(callSomeOne, 5000);
						return;
					}

					// Call a peer, providing our mediaStream
			    var call = peer.call(playerId, me.stream);
					console.info("calling player with id: " + playerId);

					// Wait for stream on the call, then set peer video display
					call.on('stream', function(stream) {
						$('#their-video').prop('src', URL.createObjectURL(me.stream));
						$('#their-video-background').prop('src', URL.createObjectURL(me.stream));
						console.info("call accepted from player with id: " + playerId);
						console.info("reciviing streaming from player id: " + playerId);
					});
				});
			}
		}
	];
});
