const mongose = require("mongoose");

const bot_user = mongose.Schema({
	chat_id:
	{
		type: String,
   		required:true,
    	index:
    	{
    		unique:true,
    		dropDups:true
    	}
    },
    username:
    {
    	type: String,
   		required:true,
    },
    telegram_id:
    {
    	type: String,
   		required:true,
    	index:
    	{
    		unique:true,
    		dropDups:true
    	}
    },
    joinDate:
    {
   	 	type:Date,
   		default : Date.now,
    },
})

User = mongose.model("User" , bot_user);
module.exports = User;
