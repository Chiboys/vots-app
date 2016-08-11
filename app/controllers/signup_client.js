//保证注册的账号和邮箱独一无二
var email = document.querySelector('[placeholder="Email address"]');
var submit = document.querySelector('#submit');var disEml = false;var disNam = false;
email.addEventListener('blur',function(){
	var val = email.value;
	var url = '/signup/'+0+'/'+val;
	if(val === '' || val.trim() === ''){
		return;
	}
	val = val.trim();
	var update = function(unique){
		if(unique === '0'){
			email.parentNode.classList.add('has-error');
			if(disNam === false){
				submit.setAttribute('disabled','disable');
			}
			disEml= true;
		}else{
			email.parentNode.classList.add('has-success');
			if(disNam === false){
				submit.removeAttribute('disabled');
			}	
		names.setAttribute('title','set you username');
			disEml = false;
		}
	}
	ajaxFunctions.ajaxRequest('get',url,update);
},true);

email.addEventListener('focus',function(){
		email.parentNode.classList.remove('has-error');
		email.parentNode.classList.remove('has-success');

},true);

//保证注册的账号和邮箱独一无二
var names = document.querySelector('#name');
names.addEventListener('blur',function(){
	var val = names.value;
	if(val === '' || val.trim() === ''){
		return;
	}
	val = val.trim();
	var val_c = val.replace(/\w/g,'');
	if(val_c !== ''){
		names.setAttribute('title','require name only contains words _ and numbers ');	
		if(disEml === false){
			names.parentNode.classList.add('has-error');
			submit.setAttribute('disabled','disable');
			}
		disNam= true;
		return ;
	}
	var url = '/signup/'+1+'/'+val;
	var update = function(unique){
		if(unique === '0'){
			names.parentNode.classList.add('has-error');
			if(disEml === false){
				submit.setAttribute('disabled','disable');
			}
			disNam= true;
		}else{
			names.parentNode.classList.add('has-success');
			if(disEml === false){
				submit.removeAttribute('disabled');
			}
			disNam = false;
		}
	}
	ajaxFunctions.ajaxRequest('get',url,update);
},true);

names.addEventListener('focus',function(){
		names.parentNode.classList.remove('has-error');
		names.parentNode.classList.remove('has-success');

},true);
