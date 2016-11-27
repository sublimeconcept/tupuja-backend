Parse.Cloud.define('updateAuction',function(req,resp){
	console.log("We are about to update the auctionObject");
	Parse.Cloud.useMasterKey();//with this I'm telling Parse that I don't care about ACLs because I'm god!! cool isn't it? =)
	
	console.log(JSON.stringify(req));

	var pUser = req.user;
	console.log("user: ", req.user);
	var auctionId = req.params.auction;
	console.log("auction: ", auctionId);
	
	
	//update users info
	pUser.increment("credits", -1);//decrement its credits.. hell yeah give me back my money 
	console.log("Current credit amount: ", pUser.get('credits'));
	pUser.save()
		.then(function(user){
			console.log("user credits have been updated!: ", user.get('credits'));
		},
		function(err){
			console.error("Error trying to update user's credit info: ", err);
		});

	//update auction information
	var q = new Parse.Query("Auction");
	
	q.equalTo("objectId", auctionId);

	q.find()
		.then(function(auction){
			
			console.log("auction found: ", auction.id);
			auction.increment("bids");//increase bids
			auction.increment("currentPrice", 0.01);//increase the price
			var newTime = auction.get("endDate");
			newTime.setMinutes(newTime.getMinutes() + 1);//add a minute every time there is a new bid
			auction.set("endDate", newTime);
			auction.save()
				.then(function(pAuct){
					console.log("Auction updated!!");
				},
				function(err){
					console.error("Error occurred updating auction: ", err);
				});
		},
		funtion(err){
			console.error("error fetching auction from parse server: ", err);
		});

	

	resp.success("Function Executed successfully!!!!");
});
