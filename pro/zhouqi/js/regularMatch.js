var dataTeam = [];
var dataScore1 = [];
var dataScore2 = [];
var dataScoreZ = [];
var dataLb = [];
var dataGm = [];
var dataImg = [];

d3.csv("./data/zhouqi.csv",function(error, data){
    if(error){
        console.log(error);
    } else {
        for(let i=0;i<data.length;i++){
			dataTeam.push(data[i].Team);
			dataScore1.push(data[i].Score1);
			dataScore2.push(data[i].Score2);
			dataScoreZ.push(data[i].ScoreZ);
			dataLb.push(data[i].Lb);
			dataGm.push(data[i].Gm);
			dataImg.push(data[i].Img);
        }
    }
});

		
var width = document.body.clientWidth;
var height = 300;


var svg = d3.select("#changguisai")
			.attr("width", width + 'px')
			.attr("height", height + 'px');

var dataY = [ 1,1,1,1,1,1,1,3,4,4,
			  3,6,5,4,4,4,4,3,3,3,
			  3,3,3,3,3,2,2,2,2,2,
			  2,1,1,1,1,1,1,1,
			  1,1,1,1,1,1,1,3,4,4,
			  3,6,5,4,4,4,4,3,3,3,
			  3,3,3,3,3,2,2,2,2,2,
			  2,1,1,1,1,1,1,1 ]; 
var dataWin = [ 1,1,1,1,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1 ];
var dataS = [ 110,109,118,109,119,
			  115,99,85,91,139,
			  112,97,114,90,121,
			  125,111,120,104,95,
			  131,97,135,104,109,
			  135,129,113,135,100,
			  109,138,108,129,110,
			  100,118,123,12,9,15,21,0,0,12,0,22,29,10,16,12,0,0,15,17,12,12,11,21,16,20,16,16,10,22,11,24,12,21,16,11,0,26,17,13,19]; 

var linear1 = d3.scale.linear()
				.domain([0, 38])
				.range([0, width-100]);
var axisX = d3.svg.axis().scale(linear1).orient("bottom").ticks(3);	
svg.append("g")
	.attr("class","axis")//
	.attr("transform","translate(60,250)")
	.call(axisX);
var linear2 = d3.scale.linear()
				.domain([1, 9])
				.range([0, height - 100]);
var axisY = d3.svg.axis().scale(linear2).orient("left").ticks(9);
svg.append("g")
	.attr("class","axis")//
	.attr("transform","translate(60,50)")
	.call(axisY);
for(let j = 0; j < 9; j++){
	if(j!=7)
	{
		svg.append("line")
			.attr("x1",20)
			.attr("x2",1920)
			.attr("y1",function(d,i){
			return linear2(j+1);
		})
			.attr("y2",function(d,i){
			return linear2(j+1);
		})
			.attr("class","line1")
			.attr("transform","translate(40,50)");
	}
}
svg.append("line")
	.attr("x1",20)
	.attr("x2",1920)
	.attr("y1",function(d,i){
	return linear2(8);
})
	.attr("y2",function(d,i){
	return linear2(8);
})
	.attr("class","line2")
	.attr("transform","translate(40,50)");
svg.append("text")
	.attr("x",20)
	.attr("y",function(d,i){
	return linear2(8)-3;
})
	.attr("stroke","#DCDDDD")
	.attr("stroke-width",0.7)
	.attr("transform","translate(60,65)")
	.attr("font-family","simsun")
	.attr("font-size","10px")
	.text("常规赛晋级资格");
for(let j = 1; j <= 3; j++){
	svg.append("line")
		.attr("x1",function(){
			return 20 + linear1(j*10) ;
		})
		.attr("x2",function(){
			return 20 + linear1(j*10) ;
		})
		.attr("y1",0)
		.attr("y2",height-100)
		.attr("class","line1")
		.attr("transform","translate(40,50)");
}
var game = d3.select("#game");
var tooltip = d3.select("body")
				.append("div")
				.attr("class","tooltip")
				.style("opacity",0.0);
var xp = (width-100)/38;
var yp = (height-100)/8;
svg.selectAll("rect")
	.data(dataY)
	.enter()
	.append("rect")
	.attr("x",function(d,i){
		 return (i%38) * xp + 60 + xp;
	})
	.attr("y",function(d,i){
		 return (d-1) * yp +50;
	});
var rectWidth = (width / 40) * 0.06;
svg.selectAll("rect")
	.data(dataS)
	.attr("width",function(d,i){
      return rectWidth * Math.sqrt(d);
    })
    .attr("height",function(d,i){
      return rectWidth * Math.sqrt(d);
    })
    .attr("fill",function(d,i){
		if(i<38)
		{
			return dataWin[i%38]?"#F22525":"#DCDDDD";
		}
		else
		{
			return dataWin[i%38]?"#F49A9A":"#727171";
		}
	});
svg.selectAll("rect")
	.data(dataY)
	.attr("transform",function (d, i) {
		return "rotate(-135, "+((i%38)*xp+60+xp)+"  "+((d-1) * yp +50)+" )" + "translate(-"+rectWidth*0.5*Math.sqrt(dataS[i%38])+" -"+rectWidth*0.5*Math.sqrt(dataS[i%38])+" )";
	})
	.on("mouseenter",function(d, i){
		if(i<38){
		var pwidth = 200;
		var pheight = 170;
		var node = document.getElementById('changguisai');
		let tx = d3.mouse(this)[0];
		let ty = d3.mouse(this)[1];
		if (ty + pheight + 10 > height) {
			ty = height - pheight - 10;
		}
		console.log(tx,ty, 'dsfsdfsd');
		var panel = svg.append('g')
				.attr('class', 'datapanel')
				.attr('transform', 'translate(' + (tx + rectWidth * Math.sqrt(d)) + ',' + ty + ')')
		panel.append('image')
				.attr('x', 0)
				.attr('y', 0)
				.attr('xlink:href', './img/panelbackground.png')
				.attr('width', pwidth + 10)
				.attr('height', pheight + 10);
		panel.append('rect')
				.attr('x', 0)
				.attr('y', 0)
				.attr('width', pwidth)
				.attr('height', pheight)
				.style('fill', 'white');
		var padding = 20;
		panel.append('text')
				.text('新疆')
				.attr('class', 'xjtext')
				.attr('x',  0.125 * pwidth)
				.attr('y', padding)
		panel.append('image')
				.attr('class', 'xjimage')
				.attr('x', 0.125 * pwidth)
				.attr('y', 28)
				.attr('xlink:href', './img/image/新疆.png')
				.attr('height', 32)
		panel.append('text')
				.attr('class', 'xjnum')
				.text(dataScore1[i])
				.attr('y', 87)
				.attr('x', 0.125 * pwidth)

		panel.append('text')
				.text(dataTeam[i])
				.attr('x', 140)
				.attr('y', padding)
				.attr('class', 'othertext')
		panel.append('image')
				.attr('class', 'otherimage')
				.attr('x', 140)
				.attr('y', 28)
				.attr('xlink:href', './img/image/' + dataImg[i])
				.attr('height', 32)
		panel.append('text')
				.attr('class', 'othernum')
				.text(dataScore2[i])
				.attr('y', 87)
				.attr('x', 140)

		panel.append('text')
				.attr('class', 'vstext')
				.text('VS')
				.attr('y', 58)
				.attr('x', 84);
		panel.append('text')
				.attr('class', 'zhouqitext')
				.text('周琦得分：' + dataScoreZ[i])
				.attr('x', 0.125 * pwidth)
				.attr('y', 104 + 10);
		panel.append('text')
				.attr('class', 'zhouqitext')
				.text('篮板：' + dataLb[i])
				.attr('x', 0.125 * pwidth)
				.attr('y', 121 + 10);
		panel.append('text')
				.attr('class', 'zhouqitext')
				.text('盖帽：' + dataGm[i])
				.attr('x', 0.125 * pwidth)
				.attr('y', 138 + 10);
		// let tx = parseFloat(d3.select(this).attr("x"));
		// game.style("left", function(){
		// 		return tx + "px";
		// 		// if(tx+205<=width){
		// 		// 	return tx + "px";
		// 		// }
		// 		// else{
		// 		// 	return (width-205) + "px";
		// 		// }
		// 	})
		// 	.style("top", ty + "px")
		// 	// .style("top", (parseFloat(d3.select(this).attr("y")) + 50) + "px")
		// 	.style("opacity",1.0);
		// game.select("#xj").select("#game_xj_prob")
		// 	.html(dataScore1[i]);
		// game.select("#team").select("#game_team_name")
		// 	.html(dataTeam[i]);
		// game.select("#team").select("#game_team_img")
		// 	.attr("src","./img/image/"+dataImg[i]);
		// game.select("#team").select("#game_team_prob")
		// 	.html(dataScore2[i]);
		// game.select("#zhouqi")
		// 	.html("周琦得分：" + dataScoreZ[i] + "<br />" + 
		// 			"篮板：" + dataLb[i] + "<br />" +
		// 			"盖帽：" + dataGm[i]);
		}
	})
	.on("mouseleave",function(d, i){
		d3.select('.datapanel').remove();
		// game.style("opacity",0.0);
	})
	;