"use strict";
var url = process.cwd();
var User = require("../models/user");
var Vot = require("../models/vot");
var parser = require("body-parser");

module.exports=function(app,passport){
	function isLogIn(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}else{
			res.sendFile(url+"/public/home.html");
		}
	}
	app.use(parser.urlencoded({extended:false}));
	//以上的依据不可以在路由里面使用。
	app.get("/",isLogIn,function(req,res){
		res.sendFile(process.cwd()+"/public/userPage.html");
	});
	app.get('/visit/:page',function(req,res){
		var page = parseInt(req.params.page,10),skips=0,arr;
		if(page !== 'NaN'){
			skips = 10 * page;
			arr = Vot.find({},function(err,arr){
				if(err){throw err;}
				if(arr.length !== 0){
					res.send(arr);
				}else{
					res.end('');
				}
			}).limit(10).skip(skips);
		}
	});
	app.route("/login")
		.get(function(req,res){
			res.sendFile(url+"/public/login.html");
		})
		.post(passport.authenticate('local', {
			successRedirect: '/hostpage',
			failureRedirect: '/login'
			//failureFlash: true
			
		}));
	app.get("/logout",function(req,res){
		req.logout();
		res.sendFile(url+"/public/home.html");
	});
	app.get("/hostpage",isLogIn,function(req,res){
		res.sendFile(url+"/public/userPage.html");
	});
	app.get('/userPage/name/:id',isLogIn,function(req,res){
		User.findOne({'user.email':req.user},{_id:false},function(err,data){
			if(err){ throw err;}
						var data = {
					name:data.user.name
					}
					res.json(data);
		});
	});
	app.route('/addvot/:id')
		.get(isLogIn,function(req,res){
			res.sendFile(url+'/public/addVot.html');
		})
		.post(isLogIn,function(req,res){
		var body = req.body;
		var content = body['content[]'];
		var vot=new Vot(),
			result=[];
		if(Array.isArray(content)){
			result = content.map(function(ele){
					return 0;
				});
		}else{
			result = [0];
		}
			
			vot.name = body.title;
			vot.result = result;
			vot.choose=content;
			vot.save(function(err,inf){
				if(err){throw err;}
				var id = inf['_id']+'';
				User.findOneAndUpdate({'user.email':req.user},{$push:{'vot':[id,inf.name]},$inc:{'__v':1}},function(err){
				if(err)
				{
					throw err;
				}
				});
			});
		res.redirect('/');
	});
	app.get('/openVots',isLogIn,function(req,res){
		res.sendFile(url+"/public/votings.html");
		
	});
	app.get('/vots',isLogIn,function(req,res){
		if(req.user){
			User.findOne({'user.email':req.user},{_id:false},function(err,data){
				if(err){ throw err;}
					if(data['__v'] > 0){
						res.send(data.vot);
					}else{
						res.end("");
					}
			
			});
		}else{
			req.logout();
			res.redirect('/');
		}
		
	});
	app.post('/votInf/id=:id',function(req,res){
		 Vot.findById(req.params.id,{_id:false},function(err,data){
			if(err){ throw err;}
			if(data){
				res.json(data);
			}else{
				res.end("")
			}
		 });

	});
app.post('/choose/:id/:index',function(req,res){
    Vot.findById(req.params.id,{'_id':false},function(err,data){
		if(err){ throw err;}
		if(data){
			data.result[req.params.index] ++;
			Vot.findByIdAndUpdate(req.params.id,{$set:{'result':data.result}},function(err){
				if(err){ throw err;}
			});
			Vot.findById(req.params.id,function(err,result){
				if(err){ throw err;}
				if(result){
					res.json(result);
				}else{
					res.end('');
				}
			});
		}
		});
	
});
	app.get('/delete/:id',isLogIn,function(req,res){
		Vot.findByIdAndRemove(req.params.id,function(err,inf){
			if(err){ throw err;}
			if(req.user){
			User.findOne({'user.email':req.user},function(err,inf){
				if(err) { throw err;}
				var vots = inf.vot;
				vots = vots.filter(function(ele){
					if(ele[0] == req.params.id){
						return false;
					}
					return true;
				});
				User.findOneAndUpdate({'user.email':req.user},{$set:{'vot':vots},$inc:{'__v':-1}},function(err){
					if(err){
						throw err;
					}
					
				});
				res.redirect('/openVots');
			});
			
			}
			
			
		
		});
	
	});
	app.route("/signup")
		.get(function(req,res){
	          res.sendFile(url+"/public/signup.html");
	
	})
		.post(function(req,res){
	          var newUser = new User();
			  newUser.user.name = req.body.name.toString();
			  newUser.user.email = req.body.email.toString();
			  newUser.user.password = req.body.password.toString();
			  newUser.vot = [];
			  newUser['__v'] = 0;
			  newUser.save(function(err){
			      if(err)
					  throw err;
			  });
			  res.redirect("/");
	
	});
}