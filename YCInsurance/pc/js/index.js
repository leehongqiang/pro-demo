/**
 * Created by Dell on 2016/8/19.
 */
    /*顾问的假数据*/
var json=[
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    },
    {
        'num':'1',
        'organ':'山东',
        'curPeople':'顾伟',
        'cost':'99.55',
        'stationSum':'34',
        'planStationPercent':'29.55%',
        'favour':'7'
    }
];
var json2=[
    {
        'num':'1',
        'organ':'山东',
        'planStation':'10',
        'newStation':'20',
        'stationPercent':'29.55%',
        'stationSum':'34',
        'stationCost':'29.55',
        'curStationCostSum':'70'
    },
    {
        'num':'1',
        'organ':'山东',
        'planStation':'10',
        'newStation':'20',
        'stationPercent':'29.55%',
        'stationSum':'34',
        'stationCost':'29.55',
        'curStationCostSum':'70'
    },
    {
        'num':'1',
        'organ':'山东',
        'planStation':'10',
        'newStation':'20',
        'stationPercent':'29.55%',
        'stationSum':'34',
        'stationCost':'29.55',
        'curStationCostSum':'70'
    },
    {
        'num':'1',
        'organ':'山东',
        'planStation':'10',
        'newStation':'20',
        'stationPercent':'29.55%',
        'stationSum':'34',
        'stationCost':'29.55',
        'curStationCostSum':'70'
    },
    {
        'num':'1',
        'organ':'山东',
        'planStation':'10',
        'newStation':'20',
        'stationPercent':'29.55%',
        'stationSum':'34',
        'stationCost':'29.55',
        'curStationCostSum':'70'
    },
    {
        'num':'1',
        'organ':'山东',
        'planStation':'10',
        'newStation':'20',
        'stationPercent':'29.55%',
        'stationSum':'34',
        'stationCost':'29.55',
        'curStationCostSum':'70'
    }
];
$(function(){
    var adRankingStr = '';
    for(var i=0;i<json.length;i++){
        adRankingStr+='<tr><td>'+json[i].num+'</td><td>'+json[i].organ+'</td><td>'+json[i].curPeople+'</td><td>'+json[i].cost+'</td><td>'+
                +json[i].stationSum+'</td><td>'+json[i].planStationPercent+'</td><td>'+
            '<span class="favour"></span><span class="favour-num">'+json[i].favour+'</span></td></tr>';
    }
    $("#adviser-ranking").append(adRankingStr);


    var bcRankingStr = '';
    for(var j=0;j<json2.length;j++){
        bcRankingStr+='<tr><td>'+json2[j].num+'</td><td>'+json2[j].organ+'</td><td>'+json2[j].planStation+'</td><td>'+json2[j].newStation+'</td><td>'+
            json2[j].stationPercent+'</td><td>'+json2[j].stationSum+'</td><td>'+json2[j].stationCost+'</td><td>'+json2[j].curStationCostSum+'</td></tr>';
    }
    $("#branchCpn-ranking").append(bcRankingStr);

    var option_bar = {
        title:{
            text:"本周保费(万元)",//标题，默认为“折线图”
            color:"#333",//标题颜色，默认为“#333”
            fontWeight:"normal",//标题粗细，默认为“normal”
            fontSize:"14px",//标题字体大小，默认为“18px”
            fontFamily:"微软雅黑"//标题字体类型，默认为宋体
        },
        chartType:"bar",//图形类型，必填
        xData:["山东","广西","福建","黑龙江","宁夏","浙江","河南","湖北","陕西","安徽"],//X轴显示文字，默认为空字符串
        xBoundaryGap:true,//X轴边界两边是否留白，默认为true
        yAxis:{
            type:"value"//坐标轴类型，默认为value
        },
        dataSet:[{
            barWidth:"40%",//柱子宽度，默认为60%
            name:"保费",//tooltip显示名称，不填不显示
            data:[98,88,80,72,68,52,37,35,17,8]//数据，二维数组类型，必填
        }]
    };
     function adjust(){
         var winW  = document.body.clientWidth-46;
         $("#branchCanvas").css({"width":winW+'px',"height":'165px'});
         $("#branchCanvas").drawChart(option_bar);
         $("#hnCpy").css({"width":winW+'px',"height":'165px'});
         $("#hnCpy").drawChart(option_bar);
     }
    adjust();//默认加载一次
    $(window).resize(function() {
        adjust();//监听浏览器变化时加载
    });

    $("#adviser-ranking tr").on("click",".favour",function(e){
        e.stopPropagation();
       $(this).toggleClass("haveFavour");
        var num = Number($(this).next(".favour-num").text())
        if($(this).hasClass("haveFavour")){
             num += 1;
            $(this).next(".favour-num").text(num);
        }else{
            num -= 1;
            $(this).next(".favour-num").text(num);
        }
    });
    $("#branchCpn-ranking").on("click","tr",function(){
        window.location = './companyDetails.html'
    });
    $("#adviser-ranking").on("click","tr",function(){
        window.location = './details.html'
    });
        /*
         var myTabChild= $("#myTab").find("li");
         myTabChild.on('click','a',function(){
         var tabId = $(this).attr("href");
         showPage(tabId);
         });
         function showPage(tabId, url){
             switch (tabId){
                 case "#branchCpn":

                     break;
             }
          }*/
});