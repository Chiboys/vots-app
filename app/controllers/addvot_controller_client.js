var add = document.querySelector('#add');
var option = document.querySelector('#option');
var send = document.getElementById("send");	
var i = 0;var num=0;
add.addEventListener('click',function(){
	var input = document.querySelector('#input');
	var value = input.value;
	if(value){
		value = value.trim();
		if(value){
		var div = document.createElement('div');
		var delet = document.createElement('button');
		var addOne = document.createElement('input');
		var operate = document.getElementById("operate");	
		div.setAttribute('id','opt'+i);
		div.style['margin-left']='84px';
		addOne.setAttribute('type','text');
		addOne.setAttribute('value',value);
		addOne.setAttribute('name','content[]');
		addOne.setAttribute('readonly','readonly');
		delet.setAttribute('type','button');
		delet.innerHTML='delete';
		delet.style.width = '50px';
		delet.style['margin-left']='4px';
		delet.setAttribute('onclick','delet('+i+')');
		div.appendChild(addOne);
		div.appendChild(delet);
		option.insertBefore(div,operate);
		input.value='';i++;
		if(num === 1){
			send.removeAttribute('disabled');
			send.style['background-color']='white';
		}
		num++;
		}
	}
	
},true);

function delet(i){
	var child = document.getElementById('opt'+i);
    option.removeChild(child);
	num--;
	if(num < 2){
		send.setAttribute('disabled','disabled');
		send.style['background-color']='gray';
	}
};


