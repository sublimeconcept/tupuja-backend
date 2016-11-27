Parse.Cloud.define('updateAuction',function(req,resp){
	console.log("we are here");
	Parse.cloud.useMasterKey();//I don't give a damm about ACL's ';..;'
	console.log("It Just happened");	
	console.log("user: ", req.params.user);
	console.log("auction: ", req.params.auction);
});
