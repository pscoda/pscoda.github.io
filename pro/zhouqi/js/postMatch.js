// 季后赛交互
$(document).ready(function(){
	// document.write('<script language=javascript src="/js/d3.v3.min.js"></script>');
	var width = document.body.clientWidth,
	    height = 700,
	    padding = 85; //svg边距
	var pathWidth = 10; //比赛间路径长度

	var match_marign = 30,
	    totalHight = 80;

	var TeamColor = {
	  'GD':'rgb(19, 72, 45)',
	  'JS':'rgb(13, 38, 90)',
	  'BY':'rgb(157, 0, 43)',
	  'SH':'rgb(34, 91, 154)',
	  'ZJ':'rgb(12, 55, 29)',
	  'FJ':'rgb(233, 71, 44)',
	  'SZ':'rgb(178, 0, 64)',
	  'LN':'rgb(255, 182, 18)',
	  'BJ':'rgb(59, 1, 96)',
	  'XJ':'rgb(52, 120, 168)',
	  'JL':'rgb(210, 184, 135)',
	  'GZ':'rgb(193, 18, 66)',
	  'SX':'rgb(23, 57, 125)',
	  'SD':'rgb(34, 116, 118)',
	  'GS':'rgb(231, 57, 45)',
	  'TJ':'rgb(193, 18, 66)',
	  'QD':'rgb(0, 59, 72)',
	  'SC':'rgb(39, 0, 0)',
	  'TX':'rgb(170, 0, 60)',
	  'BK':'rgb(12, 35, 64)'
	  };
    
	var TeamMap = {
	  '广东':'GD',
	  '江苏':'JS',
	  '北京':'BY',
	  '上海':'SH',
	  '浙江':'ZJ',
	  '福建':'FJ',
	  '深圳':'SZ',
	  '辽宁':'LN',
	  '北京':'BJ',
	  '新疆':'XJ',
	  '吉林':'JL',
	  '广州':'GZ',
	  '山西':'SX',
	  '山东':'SD',
	  '广厦':'GS',
	  '天津':'TJ',
	  '青岛':'QD',
	  '四川':'SC',
	  '同曦':'TX',
	  '北控':'BK'
	} 
    
	var svg = d3.select("#post-season-svg").attr('width',width).attr('height',height);
var aMatch = function(TeamName, Score, X, Y, column){
    var temp;

    if ( Score[0]*1 < Score[1]*1) {
      temp = TeamName[0];
      TeamName[0] = TeamName[1];
      TeamName[1] = temp;
      // console.log("change");
      temp = Score[0];
      Score[0] = Score[1];
      Score[1] = temp;
    }
    var textLeft = 30,
        textRight = 13;
    var length1 = totalHight * Score[0] / ( Score[0] + Score[1]);
    var length2 = totalHight * Score[1] / ( Score[0] + Score[1]);

    svg.append("line")
       .data([TeamName[0]])
       .attr('x1', X)
       .attr('y1', Y)
       .attr('x2', X)
       .attr('y2', Y + length1)
       .attr('class', 'TeamScore')
       .attr('column',column)
       .attr('teamName', TeamName[0])
       .attr('stroke', TeamColor[TeamName[0]])
       .style("z-index", 2)
       .attr("stroke-width",10);

    svg.append("line")
       .data([TeamName[1]])
       .attr('x1', X)
       .attr('y1', Y + length1)
       .attr('x2', X)
       .attr('y2', Y + totalHight)
       .attr('class', 'TeamScore')
       .attr('column',column)
       .attr('teamName', TeamName[1])
       .attr('stroke', TeamColor[TeamName[1]])
       .style("z-index", 2)
       .attr("stroke-width",10);;

    svg.append("text")
       .attr('x',function(d,i){
          return X - textLeft;
       })
       .attr('y',function(d,i){
          return Y + totalHight / 4;
       })
       .attr('fill', TeamColor[TeamName[0]])
       .text(TeamName[0])
       .attr('class','TeamName')
       .attr('font-size','10px');

    svg.append("text")
       .attr('x',function(d,i){
          return X - textLeft;
       })
       .attr('y',function(d,i){
          return Y + totalHight;
       })
       .attr('fill', TeamColor[TeamName[1]])
       .text(TeamName[1])
       .attr('class','TeamName')
       .attr('font-size','10px');  

    svg.append("text")
       .attr('x',function(d,i){
          return X + textRight;
       })
       .attr('y',function(d,i){
          return Y + totalHight / 4;
       })
       .attr('fill', TeamColor[TeamName[0]])
       .text(Score[0])
       .attr('class','TeamName')
       .attr('font-size','10px');

    svg.append("text")
       .attr('x',function(d,i){
          return X + textRight;
       })
       .attr('y',function(d,i){
          return Y + totalHight;
       })
       .attr('fill', TeamColor[TeamName[1]])
       .text(Score[1])
       .attr('class','TeamName')
       .attr('font-size','10px'); 
}

// aMatch( ['BJ','SZ'], [101,50], 200, 200);


d3.csv("data/postSeason.csv", function(error,csvdata){
  if(error){
    console.log(error);
  }
  

  //生成时间轴
  var timeLine = [];
  timeLine.push({time:csvdata[0].date});
  for (var i = 1; i < csvdata.length; i++) {
    // console.log(csvdata[i].date +  timeLine[timeLine.length-1].time);
    if ( csvdata[i].date != timeLine[timeLine.length-1].time) {
      timeLine.push({time:csvdata[i].date});
    }
  }

  var tureWidth = width - 2 * padding;
  var tureHeight = height = 2 * padding;
  var deltaWidth = tureWidth/(timeLine.length-1);
  for (var i = 0; i < timeLine.length; i++) {
    timeLine[i].x = padding + deltaWidth * i;
  }

  svg.selectAll('.TimeLine')
     .data(timeLine)
     .enter()
     .append("text")
     .attr('x',function(d,i){
        return d.x - 30;
     })
     .attr('y',padding)
     .attr('fill', 'rgb(25, 118, 210)')
     .text(function(d,i){
        return d.time;
        // return '<tspan x="' + d.x+ '" dy="1em">' + d.time + '</tspan>';
        // '<tspan fill="red">' + d.time + '</tspan>';
     })
     .attr('class','TimeLine')
     .attr('font-size','10px');

    for (var i = 0; i < timeLine.length; i++) {
      timeLine[i].num = 0;
      timeLine[i].y = padding + match_marign;
    }

    for (var i = 0; i < timeLine.length; i++) {
      timeLine[i].x += 16;
    }

    for (var i = 0; i < csvdata.length; i++) {
      var team1 = TeamMap[csvdata[i].team1];
      var team2 = TeamMap[csvdata[i].team2];
      var score1 = csvdata[i].score1;
      var score2 = csvdata[i].score2;

      for (let j = timeLine.length - 1; j >= 0; j--) {
        if( timeLine[j].time == csvdata[i].date){

          // console.log(  team1 + ' ' + team2 + ' ' + score1 + ' ' + score2 );
          // console.log( score2 );
          aMatch([team1, team2], [score1*1, score2*1], timeLine[j].x, timeLine[j].y, j);

          timeLine[j].y += match_marign + padding;
          timeLine[j].num += 1;
          break;
        }
      }
    }

    // var floor = function(a){return Math.floor(a);} 
    function drawPath( color, X0, Y0, X1, Y1, startWidth, endWidth,team){
      X0 += 0.1;
      X1 -= 0.1;
      var dataset = [X0];
      var index = 0;
      var pow1 = d3.scale.pow()
                  .exponent(1.9)
                  .domain([0,(X1-X0)/2])
                  .range([Y0,(Y0+Y1)/2]);
      var pow2 = d3.scale.pow()
                  .exponent(1/1.9)
                  .domain([0,(X1-X0)/2])
                  .range([(Y0+Y1)/2,Y1]);

      var pow3 = d3.scale.pow()
                  .exponent(2)
                  .domain([X0,X1])
                  .range([startWidth,
                    endWidth]);
      //跨两格
      var pow4 = d3.scale.pow()
                  .exponent(1/1.5)
                  .domain([0,(X1-X0)/2])
                  .range([Y0,0.85*(Y0+Y1)]);

      var pow5 = d3.scale.pow()
                  .exponent(1.5)
                  .domain([0,(X1-X0)/2])
                  .range([0.85*(Y0+Y1),Y1]);

      while( dataset[dataset.length-1] < X1  ){
        dataset.push( dataset[dataset.length-1] + deltaWidth/8);
      }

      // var Y = [];
      for (let i = 0; i < timeLine.length; i++) {
        if ( timeLine[i].x < X1 && timeLine[i].x > X0) {
          dataset.push( timeLine[i].x );
        }
      }

      dataset.sort(d3.ascending);
      // y = [];
      // for (var i = 0; i < dataset.length; i++) {
      //   if ( dataset[i]) {}
      // }

      var areaPath = d3.svg.area()
                       .x( function(d,i){ return d})  
                       .y0( function(d,i){ 
                          return pow3(d) + ( ( X1 - X0 <= deltaWidth || Y1 - Y0 != 0 ) ?
                                             ( d<(X1+X0)/2 ? pow1(d - X0) : pow2(d - (X1+X0)/2 ) ):
                                             ( d<(X1+X0)/2 ? pow4(d - X0) : pow5(d - (X1+X0)/2 ) ) );
                        })
                       .y1( function(d,i){ 
                          return ( ( X1 - X0 <= deltaWidth || Y1 - Y0 != 0 ) ?
                                   ( d<(X1+X0)/2 ? pow1(d - X0) : pow2(d - (X1+X0)/2 ) ):
                                   ( d<(X1+X0)/2 ? pow4(d - X0) : pow5(d - (X1+X0)/2 ) ) );
                        })
                       .interpolate("basis");

      svg.append("path")
         .attr('d', areaPath(dataset))
         .attr('stroke', 'none')
         .attr('fill', color)
         .style("opacity", 0)
         .attr('class', team + ' connect');
    }

    var line = svg.selectAll('line');
    line.select(function(d,j){ 
        var column = this.getAttribute('column');
        var team = this.getAttribute('teamName');
        var X1 = this.getAttribute('x1');
        var Y1 = this.getAttribute('y1');
        var X2 = this.getAttribute('x2');
        var Y2 = this.getAttribute('y2');
        var previous = this;

        var nextLine= line.select(function(d ,i){
          var c = this.getAttribute('column');
          var t = this.getAttribute('teamName');
          if ( i < j || c < column || t != team || previous == this) 
            return null;
          else 
            return this;
        });
        // drawPath('#fff', 101,115,203.30769230769232,157.69058295964126, 43.930635838150295, 37.30941704035874);
        var nextLine = nextLine[0];
        var target = [];
        for (var i = 0; i < nextLine.length; i++) {
          if ( nextLine[i] != null) {
            target = [nextLine[i].getAttribute('x1'),nextLine[i].getAttribute('y1'),nextLine[i].getAttribute('x2'),nextLine[i].getAttribute('y2'),nextLine[i].getAttribute('column')];

            var startWidth = Y2 - Y1;
            var endWidth = target[3] - target[1];

            drawPath(TeamColor[team], X1*1,Y1*1,target[0]*1,target[1]*1,startWidth*1,endWidth*1,team);
            break;
          }         
        }

    });

      // console.log( thisColumn.attr('column'));
    svg.selectAll('line').remove();
    svg.selectAll('TeamName').remove();

    for (var i = 0; i < timeLine.length; i++) {
      timeLine[i].num = 0;
      timeLine[i].y = padding + match_marign;
    }

    for (var i = 0; i < csvdata.length; i++) {
      var team1 = TeamMap[csvdata[i].team1];
      var team2 = TeamMap[csvdata[i].team2];
      var score1 = csvdata[i].score1;
      var score2 = csvdata[i].score2;

      for (let j = timeLine.length - 1; j >= 0; j--) {
        if( timeLine[j].time == csvdata[i].date){

          // console.log(  team1 + ' ' + team2 + ' ' + score1 + ' ' + score2 );
          // console.log( score2 );
          aMatch([team1, team2], [score1*1, score2*1], timeLine[j].x, timeLine[j].y, j);

          timeLine[j].y += match_marign + padding;
          timeLine[j].num += 1;
          break;
        }
      }
    }

    svg.selectAll('.TeamScore')
       .on('mouseover',function(d,i){
          var team = this.getAttribute('teamName');
          svg.selectAll('.' + team)
            .style('opacity',0.5);
       })
       .on('mouseout',function(d,i){
          var team = this.getAttribute('teamName');
          svg.selectAll('.' + team)
            .style('opacity',0);
       })

    // 化决赛分界线
    // svg.append("line")
    //    .attr('y1', padding - 20)
    //    .attr('x1', timeLine[9].x + padding/2 )
    //    .attr('x2', timeLine[9].x + padding/2 )
    //    .attr('y2', timeLine[0].y)
    //    .attr('stroke-width',5)
    //    .attr('stroke', 'rgba(255, 200, 77, 0.72)')
    //    .attr('stroke-dasharray','15,10');
  });

})