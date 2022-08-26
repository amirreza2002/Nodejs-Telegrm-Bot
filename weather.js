const Tbot = require("node-telegram-bot-api");
var weather = require('weather-js');
const mongose = require("mongoose");
mongose.connect("mongodb://	YOUR LOCALHOST/DATABASE NAME");
const db = mongose.connection;
db.once("open" , ()=>{
	console.log("database is connected");
})
const User = require("./user.js");

const token = "YOUR TOKEN";

const bot = new Tbot(token , {polling : true});

console.log('bot is runnig ...');

bot.onText(/\/start/ , msg=>{
	console.log(msg);
	const NewUser = new User({
		chat_id : msg.chat.id,
		username: msg.from.first_name,
		telegram_id: msg.from.username,
	});
	NewUser.save(function(err , User)
	{
		if(err){
			console.log(err);
		} 
		else
		{
			console.log("\n\ninfo saved ...\n\n");
		}
	});

	bot.sendMessage(msg.chat.id , "سلام " + msg.from.first_name + " به ربات ما خوش آمدید" , 
	{
		reply_markup:
		{
			'keyboard':
			[
				["معرفی به دیگران" , "درباره من"],["حمایت از ما" , "شروع"]
			]
		}
	}
	);

});

bot.on('message' , msg=>{
	console.log(msg);
	var about_me = "من امیرضا مهدی زاده هستم برنامه نویس جاواسکریپت و پایتون  و این ربات به وسیله نود جی اس ساخته شده است";
	var protect_me = "اگر از ربات من خوشتون اومد میتونید از من به مبلغ دلخواه حمایت کنید\n\n\n6280-2314-6993-4458 \nبانک مسکن امیرضا مهدی زاده"
	if (msg.text == "salam" || msg.text == "/salam" || msg.text == "Salam" || msg.text == "سلام") 
	{
		bot.sendMessage(msg.chat.id , "سلام");
	}
	else if (msg.text == "معرفی به دیگران") 
	{
		bot.sendMessage(msg.chat.id , "https://t.me/nodejs_test_armz_bot");
	}
	else if (msg.text ==  "درباره من") 
	{
		bot.sendMessage(msg.chat.id , about_me);
	}
	else if (msg.text == "حمایت از ما")
	{
		bot.sendMessage(msg.chat.id , protect_me);
	}
	else if (msg.text == "شروع")  
	{
			bot.sendMessage(msg.chat.id , "نام شهر خود را به انگلیسی وارد کنید");
			bot.on('message' , msgg=>{
			weather.find({search: msgg.text , degreeType: 'F'}, function(err, result) 
			{
		  		if(err) console.log(err);
		  		//var res = JSON.stringify(result, null, 2)
		  		console.log(result);
		  		var f = parseInt(result[0]["current"]["temperature"]);
		  		var f1 = f - 32;
		  		var ff = parseInt(f1/1.8);
		  		bot.sendMessage(msgg.chat.id , "نام مکان :" + result[0]["location"]["name"] + "\nدما :" + ff + "\nوضعیت :" + result[0]["current"]["skytext"] + "\nتاریخ :" + result[0]["current"]["date"] + "\nسرعت باد :" + result[0]["current"]["windspeed"]);
			});
		});
	}
});