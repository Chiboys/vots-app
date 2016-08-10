var ajaxFunctions = {
	ready:function(fn){
		if(typeof fn !==  'function'){
			return;
		}
		if(document.readyState === 'complete'){
			return fn();
		}
		document.addEventListener('DOMContentLoaded',fn,false);
	},
	ajaxRequest:function(method,url,callback){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function(){
			if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
				
				callback(xmlHttp.response);
			}
		};
		xmlHttp.open(method,url,true);
		xmlHttp.send();
	}


};