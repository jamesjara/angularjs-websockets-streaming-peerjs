describe("ViewportController", function(){
	
	beforeEach(module("mirrormeApp"));
	
	it("show create a peer conection", inject(function($controller){
		var scope = {};
		var ctrl = $controller("ViewportController",{ $scope: scope});
		
		// expect(scope.etc).toBe(..);
	}));
	
	
});