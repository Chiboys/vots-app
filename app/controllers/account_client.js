(function(){
	var user = document.querySelector('#userName');
	var nameEle = document.querySelector('#username');
	var downbut = document.querySelector('#downbut');
	var url = '/account';
	function update(data){
		data = JSON.parse(data);
		console.log(data);
		var names = document.createElement('p');
				var nameS = document.createElement('span');
				
		var email  = document.createElement('p');
						var emailS = document.createElement('span');
		var votNum  = document.createElement('p');
						var votNumS = document.createElement('span');
		names.innerHTML = '<span style="font-size:20px">Name:</span>'+ ' '+data.user.name;
		email.innerHTML = '<span style="font-size:20px">Email:</span>'+' '+data.user.email;
		votNum.innerHTML = '<span style="font-size:20px">Vot number:</span>' + " "+data['__v'];
		nameEle.innerHTML = data.user.name;
		 downbut.innerHTML = data.user.name;
		user.appendChild(names);
		user.appendChild(email);
		user.appendChild(votNum);
		 
	}
	ajaxFunctions.ready(ajaxFunctions.ajaxRequest("post",url,update));
})();