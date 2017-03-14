/**
 * Created by dell on 2016-8-18.
 */
$.fn.drawChart = function(param){
    param.displayType = param.displayType || "horizontal";
    checkParam();
    var myChart = echarts.init(this[0]);
    var barColor = ["#ea6b6b","#78dfe8","#608adf","#b3c279","#f1dc78","#f5a355","#9e9e9e","#89c37a","#a5d74d","#efc486"];
    var option  = getOption();

    function getOption(){
        var option = {};

        switch (param.chartType){
            case "bar":
                option = getBarOption();
                break;
            case "line":
                option = getLineOption();
        }

        return option;
    }

    function getLineOption(){
        var option = {
            title: {
                text: param.title.text || "折线图",
                textStyle:{
                    color:param.title.color || "#333",
                    fontWeight:param.title.fontWeight || "normal",
                    fontSize:param.title.fontSize || "18px",
                    fontFamily:param.title.fontSize || "宋体"
                }
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis: {
                data: param.xData || [],
                type : 'category',
                boundaryGap : !isNullOrEmpty(param.xBoundaryGap),
                axisLabel : {
                    interval : 0,
                    formatter : function(params){
                        return cutXText(params);
                    },
                    rotate:param.textRotate || 0

                }
            },
            yAxis : [{
                    type : param.yAxis.type || 'value'
                }],
            series:[]
        };

        for(var i = 0; i < param.data.length; i++){
            var colorSet = [];

            option.series.push({
                areaStyle: { normal: {} },
                itemStyle: {
                    normal: {
                        color: param.dataSet[i].color || "#398dee"
                    }
                },
                label: {
                    normal: {
                        show: param.dataSet[i].showPoint == undefined ? true : param.dataSet[i].showPoint,
                        position: 'top'
                    }
                },
                type: param.chartType || 'line',
                data: param.data[i]
            });

            if(param.dataSet[i].name){//如果定义了数据的说明名称
                option.series[i].name = param.dataSet[i].name;
            }
            if(param.dataSet[i].topColor){//如果定义了图形的顶部颜色
                colorSet.push({
                    offset: 0,
                    color: param.dataSet[i].topColor
                });

                option.series[i].areaStyle.normal = {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, colorSet)
                };
            }
            if(param.dataSet[i].bottomColor){//如果定义了图形的底部颜色
                colorSet.push({
                    offset: 1,
                    color: param.dataSet[i].bottomColor
                });
                
                option.series[i].areaStyle.normal = {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, colorSet)
                };
            }
        }

        return option;
    }

    function getBarOption(){
        var option = {
            title: {
                text: param.title.text || "柱状图",
                textStyle:{
                    color:param.title.color || "#333",
                    fontWeight:param.title.fontWeight || "normal",
                    fontSize:param.title.fontSize || "18px",
                    fontFamily:param.title.fontSize || "宋体"
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '8%',
                containLabel: true
            },
            yAxis : [{
                type : param.yAxis.type || 'value'
            }],
            series:[]
        };

        if(param.displayType == "horizontal"){
            option.xAxis = {
                data: param.xData || [],
                type : 'category',
                axisTick: {
                    alignWithLabel: true
                },
                boundaryGap : param.xBoundaryGap || true,
                axisLabel : {
                    interval : 0,
                    formatter : function(params){
                        return cutXText(params);
                    },
                    rotate:param.textRotate
                }
            };
            option.yAxis = [{
                type : param.yAxis.type || 'value'
            }];
        }
        else if(param.displayType == "perpendicular") {
            option.yAxis = {
                data: param.xData || [],
                type : 'category',
                axisTick: {
                    alignWithLabel: true
                },
                boundaryGap : param.xBoundaryGap || true,
                axisLabel : {
                    interval : 0,
                    formatter : function(params){
                        return cutXText(params);
                    },
                    rotate:param.textRotate || 0
                }
            };
            option.xAxis = [{
                type : param.yAxis.type || 'value'
            }];
        }

        var data = null;

        for(var i = 0; i < param.dataSet.length; i++){
            data = [];

            for(var j = 0; j < param.dataSet[i].data.length; j++){
                data.push({
                    value:param.dataSet[i].data[j],
                    itemStyle: {
                        normal: {
                            color: barColor[j]//getBarColorByProvince(param.xData[i])
                        }
                    }
                });
            }

            option.series.push({
                barWidth: param.dataSet[i].barWidth || "60%",
                type: param.chartType || 'bar',
                data: data
            });

            if(param.dataSet[i].name){//如果定义了数据的说明名称
                option.series[i].name = param.dataSet[i].name;
            }
        }

        return option;
    }

    function checkParam(){

    }

    function getBarColorByRank(rank){
        var color = "";

        switch (parseInt(rank)){
            case 1:
                color = "";
                break;
            case 2:
                color = "";
                break;
            case 3:
                color = "";
                break;
            case 4:
                color = "";
                break;
            case 5:
                color = "";
                break;
            case 6:
                color = "";
                break;
            case 7:
                color = "";
                break;
            case 8:
                color = "";
                break;
            case 9:
                color = "";
                break;
            case 10:
                color = "";
                break;
            default:
                color = "";
                break;
        }

        return color;
    }

    function getBarColorByProvince(province){
        var color = "";

        switch (province){
            case "四川":
                color = "";
                break;
            case "重庆":
                color = "";
                break;
            case "北京":
                color = "#608adf";
                break;
            case "上海":
                color = "#efc486";
                break;
            case "天津":
                color = "";
                break;
            case "广东":
                color = "";
                break;
            case "广西":
                color = "";
                break;
            case "山东":
                color = "#ea6b6b";
                break;
            case "山西":
                color = "";
                break;
            case "陕西":
                color = "#78dfe8";
                break;
            case "湖南":
                color = "#89c37a";
                break;
            case "湖北":
                color = "";
                break;
            case "河南":
                color = "";
                break;
            case "河北":
                color = "";
                break;
            case "青海":
                color = "";
                break;
            case "甘肃":
                color = "";
                break;
            case "宁夏":
                color = "";
                break;
            case "西藏":
                color = "";
                break;
            case "新疆":
                color = "";
                break;
            case "内蒙":
                color = "#f1dc78";
                break;
            case "福建":
                color = "";
                break;
            case "江苏":
                color = "#f5a355";
                break;
            case "江西":
                color = "#b3c279";
                break;
            case "浙江":
                color = "";
                break;
            case "安徽":
                color = "#a5d74d";
                break;
            case "云南":
                color = "";
                break;
            case "贵州":
                color = "";
                break;
            case "海南":
                color = "";
                break;
            case "台湾":
                color = "";
                break;
            case "香港":
                color = "";
                break;
            case "澳门":
                color = "";
                break;
            case "辽宁":
                color = "";
                break;
            case "吉林":
                color = "";
                break;
            case "黑龙江":
                color = "";
                break;
            default:
                color = "";
                break;
        }

        return color;
    }

    function cutXText(params){
        var newParamsName = "";
        var paramsNameNumber = params.length;
        var provideNumber = 7;
        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);

        if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                var start = p * provideNumber;
                var end = start + provideNumber;
                if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                } else {
                    tempStr = params.substring(start, end) + "\n";
                }
                newParamsName += tempStr;
            }

        } else {
            newParamsName = params;
        }
        return newParamsName
    }

    function isNullOrEmpty(obj){
        if(!obj) return true;
        else if(obj.length == 0) return true;
        else if(obj instanceof Number) return false;
        else if(obj instanceof Object && $.isEmptyObject(obj)) return true;
        else return false;
    }

    function parseBoolean(obj){
        if(isNullOrEmpty(obj)){
            return false;
        }
        else if(!obj || obj == "false"){
            return false;
        }
        else{
            return true;
        }
    }

    myChart.setOption(option);
    window.onresize = myChart.resize;
};