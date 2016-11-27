Parse.Cloud.define('updateAuction',function(req,resp){
	console.log("we are here");
	Parse.Cloud.useMasterKey();//I don't give a damm about ACL's ';..;'
	console.log("It Just happened");
	console.log(JSON.stringify(req));	
	console.log("user: ", req.user);
	console.log("auction: ", req.auction);

	resp.success("Function Executed successfully!!!!");
});
