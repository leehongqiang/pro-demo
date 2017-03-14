/**
 * Created by Dell on 2016/8/19.
 */
var json = {
    dateType:[ '周','月','季','年'],
    dateVal:{
       week:['2016.8月第一周','2016.8月第二周','2016.8月第三周'],
       month:['2016.8月','2016.9月','2016.10月'],
       quarter: ['2016.第一季','2016.第二季','2016.第三季'],
       year: ['2016年','2017年','2018年']
    }
}
console.log(json);
$(function(){
        var tabStr = '<li class="active"><a class="tab-title" href="#week" data-toggle="tab" >'+json.dateType[0]+'</a></li>'+
            '<li><a class="tab-title" href="#month" data-toggle="tab">'+json.dateType[1]+'</a></li>'+
            '<li><a class="tab-title" href="#quarter" data-toggle="tab">'+json.dateType[2]+'</a></li>'+
            '<li><a class="tab-title" href="#year" data-toggle="tab">'+json.dateType[3]+'</a></li>';

    $(".ranking-tab").append(tabStr);
    var weekStr='';
    for(var j =0;j<json.dateVal.week.length;j++){

         weekStr += '<button type="button" class="btn btn-default btn-lg">'+json.dateVal.week[j]+'</button>';
    }
    $(".week-ct").append(weekStr);
});