var title = document.getElementById('title');	
var option = document.getElementById('options');
var votInf = document.getElementById('votInf');
var vot_option = document.getElementById('content_title');
var choose = document.getElementById('choose');
var but= document.getElementById('back');
var hasvot =false;
but.setAttribute('onclick','back()');


function back(){
	vot_option.removeAttribute('hidden');
	votInf.setAttribute('hidden','hidden');
};
var look = function(id){
	var url = '/votInf/id='+id;
	function update(data){
		if(data){
			var data = JSON.parse(data);
			if(hasvot === true){
				choose.removeAttribute('hidden');
			}
			hasvot = false;
			votInf.removeAttribute('hidden');
			vot_option.setAttribute('hidden','hidden');
			title.setAttribute('value',data.name);
			option.innerHTML='';
			choose.setAttribute('onclick','inc("'+id+'")');
			data.choose.forEach(function(ele,index){
				var opt = document.createElement('option');
				opt.setAttribute('value',ele);
   				opt.innerHTML = ele;
				if(index === 0){
					opt.setAttribute('selected','selected');
				}
				option.appendChild(opt);
			});
				svg(data.result,data.choose);
	
		}
	}
	ajaxFunctions.ajaxRequest('post',url,update);
};
//vot
function svg(data,name){
	//d3 pie
	document.getElementById('pie').innerHTML='';
	var val = data.reduce(function(pre,cur){
				return pre+cur;
			});
			if(val !== 0){
				
			var origin = data.slice(0,data.length);
			var height = 400;
				var width = 400;
				
				var svg = d3.select('#pie')
				.append('svg')
				.attr('height',height)
				.attr('width',width);
				var layout = d3.layout.pie();
				var data = layout(data);
				var innerRadius = 50;
				var outerRadius = 100;
				var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);
				var arcs= svg.selectAll('g')
							.data(data)
							.enter()
							.append("g")
							.attr('transform',"translate("+(width/3)+","+(height/3)+")");
				var color = d3.scale.category20();
						arcs.append('path')
						.attr('fill',function(d,i){
							return color(i);
					})
						.attr('d',function(d,i){
							return arc(d);
					}).on('mouseover',function(d,i){
							div.transition()
								.duration(100)
								.style('opacity',0.9);
							div.html(
								'<span><p>option: '+name[i]+'</p></span><br/>'+
								'<span><p>count: '+origin[i]+'</p></span>'
							)
							   .style("left",(d3.event.pageX + 20)+"px")
					           .style("top",(d3.event.pageY+20)+"px");;
						
						})
						.on('mouseout',function(d){
							div.transition()
								.duration(200)
								.style('opacity',0);
						});
		
				   var rectW = 25,rectH=25;
					var div = d3.select('body')
								.append('div')
								.attr('class','tooltip');
					var explain = svg.append('g')
						.selectAll('rect')
						.data(name)
						.enter()
						.append('rect')
						.attr('height',rectH)
						.attr('width',rectW)
						.attr('fill',function(d,i){
							return color(i);
						})
						.attr('transform',function(d,i){
							var x ,y,row,col;
							if(i < 6){
								x = width/10+ i*60;
								y = height/3+ outerRadius + 50;
							}else{
								row = parseInt(i / 6); 
								col = i % 6;
								x = width/10 + col*60;
								y = height/3+ outerRadius + 50 + 50*row;
							}
							return 'translate('+x+','+y+')';
						})
						 .on('mouseover',function(d,i){
							div.transition()
								.duration(100)
								.style('opacity',0.9);
							div.html(
								'<span><p>option: '+name[i]+'</p></span><br/>'+
								'<span><p>count: '+origin[i]+'</p></span>'
							)
							   .style("left",(d3.event.pageX + 40)+"px")
					           .style("top",(d3.event.pageY+40)+"px");;
						
						})
						.on('mouseout',function(d){
							div.transition()
								.duration(200)
								.style('opacity',0);
						});
						//tag
						svg.append('g')
							.selectAll('text')
							.data(name)
							.enter()
							.append('text')
						    .attr("transform",function(d,i){
								  var x ,y,row,col;
							if(i < 6){
								x = width/10+ i*60;
								y = height/3+ outerRadius + 50 + rectH + 15;
							}else{
								row = parseInt(i / 6); 
								col = i % 6;
								x = width/10 + col*60;
								y = height/3+ outerRadius + 50 + 45*row + rectH + 5;;
							}
							return 'translate('+x+','+y+')';
						 })
							  .text(function(d,i){
								if(d.length>7){
									d = d.slice(0,5)+'...'
								}
						          return d;
						   });
			}
}

function inc(id){
	if(hasvot===false){
				choose.setAttribute('hidden','hidden');
	}
	hasvot = true;
    var index = option.selectedIndex;
	var url = '/choose/'+id+'/'+index;
	function update(data){
		if(data){
			data=JSON.parse(data);
			svg(data.result,data.choose);
		}
	}
	ajaxFunctions.ajaxRequest('post',url,update);
}
