(function(angular) {
	var app = angular.module('mirrorme', []);
	app.controller('viewportController', ['$scope', 'counter', 'user', function($scope, counter, user) {
		$scope.loaded = false;

   		 navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
         
		initPeer();
		findVisitor();


		$scope.$watch(function() {
			return counter.getTime();
		}, function() {
			if (counter.getTime() < 0) {
				counter.stop();
				$scope.loaded = false;
				findVisitor();
			} else {
				$scope.counter = counter.getTime();
			}
		}); 

		function initPeer() {
			this.peer = peer = new Peer({
				host: 'peer-server-mirrorme.herokuapp.com',
				port: 80,
				path: '/',
				key: 'peerjs',
				allow_discovery: true
			});
			peer.on('error', function(err) {
				console.log(err);
			});
			peer.on('open', function(id) {
				console.log('creating peer: ' + id);
			});
			/*
			peer.on('connection', function(conn) {
				var connection = conn;
				connection.on('open', function() {
					console.log(counter);
				});
				connection.on('data', function(data) {
					alert(data);
				});
			});
			*/
	   		 // Get audio/video stream
	         navigator.getUserMedia({audio: true, video: true}, function(stream){
	           // Set your video displays
	           $('#my-video').prop('src', URL.createObjectURL(stream));

	           window.localStream = stream;  
	           
	         }, function(){ alert("error"); });
	         
	         // Receiving a call
	         peer.on('call', function(call){
	           // Answer the call automatically (instead of prompting user) for demo purposes
	           call.answer(window.localStream); 
	         });
		}
		
		
		function findVisitor() {
			user.visitor(function(id) {
				var playerId = id;
				//var connection = this.peer.connect(playerId);
				

		        // Initiate a call!
		        var call = this.peer.call(playerId, window.localStream);
		        console.log(call);
		        // Hang up on an existing call if present
		        if (window.existingCall) {
		          window.existingCall.close();
		        } 

		        // Wait for stream on the call, then set peer video display
		        call.on('stream', function(stream){
			          $('#their-video').prop('src', URL.createObjectURL(stream));
			          $('#their-video-background').prop('src', URL.createObjectURL(stream));
		          
		          

					console.log("conectied to vistior peer: " + playerId);
					$scope.loaded = true;
					counter.start();
					 
		        }); 

		        // UI stuff
		        window.existingCall = call;
		        

		        /*
				connection.on('open', function(data) {
					// alert("Connection Established 2");
					// fire dispatcher
					console.log("conectied to vistior peer: " + playerId);
					$scope.loaded = true;
					counter.start();
				});
				*/
			});
		}
	}]);
	app.factory('user', ['$http', function($http) {
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
	app.service('counter', function($interval) {
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
	app.directive('toolbar', function() {
		return {
			template: '<div class="counterDown-container">'+
					  '<div class="counterDown">'+
					  '<div>'+ 
					  '  <div me></div>'+
					  '</div>'+
					  '<div>'+
					  '  <span>{{counter}}</span>'+
					  '  <div class="smalltext">Seconds</div>'+
					  '</div>'+
					  '</div>'+
					  '</div>'
		};
	});
	app.directive('visitor', function() {
		return {
			template: 	'<div class="their-video-container"><video id="their-video" autoplay></video></div>'+ 
						'<video id="their-video-background"></video>'
		};
	});
	app.directive('me', function() {
		return {
			template: '<div class="my-video-container"><video id="my-video" muted="true" width="80"  autoplay></video></div>'
		};
	});
})(window.angular);
