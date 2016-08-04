var width = 300;	
var height = 200;	
var rectHeight = 25;
var rectWidth = 25;	


var socket = io();
socket.on('link change', function(linkInfo) {
	var ele = document.getElementById('latestUpdateTime').innerText = new Date();
    links = linkInfo;
    console.log(JSON.stringify(links));
    refreshLinks();
    
});
var dataSchema = [
    {
        instances: [{
	           w: 25,
	           name: 'RS0'   
			}, {
	           w: 25,
	           name: 'RS0'
			}, {
	           w: 25,
	           name: 'RS0'
			}, { 
	           w: 25,
	           name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}
        ],
        sysName: 'RIS.RAPP PO'
    },{
        instances: [{
	           w: 25,
	           name: 'RS0'     
			}, {
	           w: 25,
	           name: 'RS0'
			}, {
	           w: 25,
	           name: 'RS0'
			}, { 
	           w: 25,
	           name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}
        ],
        sysName: 'RIS.RAPP P1'
    },{
        instances: [{
	           w: 25,
	           name: 'RS0'    
			}, {
	           w: 25,
	           name: 'RS0'
			}, {
	           w: 25,
	           name: 'RS0'
			}, { 
	           w: 25,
	           name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}
        ],
        sysName: 'RIS.RAPP P1'
    },{
        instances: [{
	           w: 25,
	           name: 'RS0'     
			}, {
	           w: 25,
	           name: 'RS0'
			}, {
	           w: 25,
	           name: 'RS0'
			}, { 
	           w: 25,
	           name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}
        ],
        sysName: 'RIS.RAPP P1'
    },{
        instances: [{
	           w: 25,
	           name: 'RS0'     
			}, {
	           w: 25,
	           name: 'RS0'
			}, {
	           w: 25,
	           name: 'RS0'
			}, { 
	           w: 25,
	           name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}
        ],
        sysName: 'RIS.RAPP P1'
    },{
        instances: [{
	           w: 25,
	           name: 'RS0'    
			}, {
	           w: 25,
	           name: 'RS0'
			}, {
	           w: 25,
	           name: 'RS0'
			}, { 
	           w: 25,
	           name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}, {
			   w: 25,
			   name: 'RS0'
			}
        ],
        sysName: 'RIS.RAPP P1'
    }
];

var links = [
    {
    	source: '3,2',
        target: '1,5'
    },{
    	source: '2, 3',
    	target: '4, 5'
    },{
    	source: '1, 6',
    	target: '4, 5'
    },{
    	source: '3, 5',
    	target: '4, 1'
    },{
    	source: '6, 6',
    	target: '1, 1'
    }
];
var mainSvg = d3.select('#mainCanvas');

var systemGroup = d3.select('#mainCanvas')
                 .selectAll('g')
                 .data(dataSchema)
                 .enter()
                 .append('g')
                 .attr('transform', function(system, i) {
                 	var x = i * 300 % 900;
                 	var y = Math.floor(i / 3) * 200;
                    return 'translate(' + x + ' ' + y  + ')';
                 });

systemGroup.append('rect')
           .attr('class', 'system-container')
           .attr('x', 0)
           .attr('y', 0)
           .attr('height', height)
           .attr('width', width);

systemGroup.append('text')
           .attr('x', 95)
           .attr('y', 30)
           .attr('class', 'system-name')
           .text(function(system, i) {
               return system.sysName
           });


var instanceGroup = systemGroup.selectAll('.instance-unit')
                 .data(function(system, i) {
                    return system.instances
                 })
                 .enter()
                 .append('rect')
                 .attr('class', 'instance-unit');


    textGroup = systemGroup.selectAll('.instance-name')
                .data(function(system, i) {
                    return system.instances
                })
                .enter()
                .append('text')
                .attr('class', 'instance-name')
                .text(function(instance, i) {
                    return instance.name;
                })
                .attr('y', function(d, i) {
                    return 50 + (Math.ceil((i + 1) / 5) - 1) * (rectHeight + 25) + 40;
                }) 
                .attr('x', function(d, i) {
                    return 40 + i % 5 * (rectWidth + 25);
                });
    
    instanceGroup.attr('y', function(d, i){
                        return 50 + (Math.ceil((i + 1) / 5) - 1) * (rectHeight + 25);
                 })
				 .attr('x', function(d, i){
						return 40 + i % 5 * (rectWidth + 25);
				 })
				 .attr('width', rectWidth)
				 .attr('height', rectHeight)
				 .attr('fill', 'url(#instanceGradient)')
				 .on('click', function(instance, i) {
				 	 alert(instance.w);
				 })
				 .on('mouseover', function(){
		            d3.select(this)
		                .attr('fill', 'yellow');
		         })
		         .on('mouseout', function(){
		            d3.select(this)
		                .transition()
		                .duration(500)
		                .attr('fill', '#1bbc9b');
		         });

    


    var getCoordinate = function(system, offset) {
    	var systemX = (system - 1) % 3 * 300;
    	var systemY = (Math.ceil(system / 3) - 1) * 200;
    	var offsetX = 40 + (offset - 1) %5 * 50 + 12;
    	var offsetY = 50 + (Math.ceil(offset / 5) - 1) * 50 + 12;
    	return [systemX + offsetX, systemY + offsetY];
    }
    
    var refreshUI = function(elements) {
        elements.attr('x1', function(line, i) {
	            var start = line.source;
	            var system = start.split(',')[0];
	            var offset = start.split(',')[1];
	            return getCoordinate(system, offset)[0];
	        })
	        .attr('y1', function(line, i) {
	            var start = line.source;
	            var system = start.split(',')[0];
	            var offset = start.split(',')[1];
	            return getCoordinate(system, offset)[1];
	        })
	        .attr('x2', function(line, i) {
	            var end = line.target;
	            var system = end.split(',')[0];
	            var offset = end.split(',')[1];
	            return getCoordinate(system, offset)[0];
	        })
	        .attr('y2', function(line, i) {
	            var end = line.target;
	            var system = end.split(',')[0];
	            var offset = end.split(',')[1];
	            return getCoordinate(system, offset)[1];
	        });    
    }
    var refreshLinks = function() {
    	var updateLink = mainSvg.selectAll(".link")
	        .data(links);
	    var enterLink = updateLink.enter().append("line")
	        .attr("class", "link");
        var exitLink = updateLink.exit();
   
        refreshUI(updateLink);
        refreshUI(enterLink);
        exitLink.remove();
    }

    refreshLinks();

    // var dataChange = document.getElementById('dataChange');
    // dataChange.addEventListener('click', function() {
    //     links.push({
    //         source: '2,2',
    //         target: '6,3'
    //     });
    //     refreshLinks();
    // }, false);