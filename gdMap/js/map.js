

/**
 * 高德地图封装
 * 
 * @class Maps
 */
class Maps{
  constructor(option){
    this.option = option;
    this.gdmap = new AMap.Map(this.option.dom,this.option.setting);
  }
  /**
   * 重新设置地图中心点
   * 
   * @param {any} poisition
   * 
   * @memberOf Maps
   */
  changeMapCenter(poisition){
    this.gdmap.setZoomAndCenter(16,poisition)
  }
 
  /**
   * 在地图上添加mark（定位标记图标）
   * 
   * @param {any} markOption
   * 
   * @memberOf Maps
   */
  addMark(markOption){
    let self = this
    let icons = ''
    if(markOption.clearMark){
      self.gdmap.clearMap()
    }
    if(markOption.icon){
       icons= new AMap.Icon({            
            size: new AMap.Size(40, 50),  //图标大小
            image: markOption.icon,
            imageOffset: new AMap.Pixel(0, -60)
        })
    }
    let mark = new AMap.Marker({
      position:markOption.position,
      icon:icons
    })
    if(markOption.title){
      self.addInfo(markOption);
    }
    mark.setMap(self.gdmap)
    mark.on("click",function () { 
      self.addInfo(markOption);
    })
  }
  /**
   * 在地图上添加信息展示窗口
   * 
   * @param {any} infoOption
   * 
   * @memberOf Maps
   */
  addInfo(infoOption){
    let infoWindow;
     let infos = [];
        infos.push("<div>"+infoOption.title+"</div> ");
        infoWindow = new AMap.InfoWindow({
            content: infos.join("<br/>"),  //使用默认信息窗体框样式，显示信息内容
            offset: new AMap.Pixel(0, -30),
            autoMove:true
        });
        infoWindow.open(this.gdmap, infoOption.position);
  }
  /**
   * 
   * 在地图上标记园
   * @param {any} circleInfo
   * 
   * @memberOf Maps
   */
  addCircle(circleInfo){
    let center = new AMap.LngLat(circleInfo.center[0],circleInfo.center[1])
    let Circle = new AMap.Circle({
      center:center,
      radius:circleInfo.radius,
      fillOpacity:circleInfo.Opacity,
      fillColor:circleInfo.bgColor,
      strokeColor:circleInfo.borderColor
    })
    Circle.setMap(this.gdmap)
  }
  /**
   * 按关键字搜索并返回地址列表
   * 
   * @param {any} searchInfo 搜索配置信息isGeographicis经纬度，addr地址
   * @returns {arry} info 返回地址数组列表
   * 
   * @memberOf Maps
   */
  searchPlace(searchInfo){
    return new Promise(function (resolve, reject) { 
      let info = [];
      AMap.service(["AMap.PlaceSearch"], function() {
        let placeSearch = new AMap.PlaceSearch({
          type:"汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施"
        });
        //判断是否用经纬度搜索
        if(searchInfo.isGeographicis){
          placeSearch.searchNearBy('',searchInfo.Geographicis,searchInfo.range||1000);
        }else{
          placeSearch.search(searchInfo.addr)
        }
        //监听是否搜索完毕
        AMap.event.addListener(placeSearch, "complete", function (result) { 
          result.poiList.pois.map(function (value) { 
            info.push({
              lng:value.location.lng,
              lat:value.location.lat,
              name:value.name,
              addr:value.address
            });
          });
          resolve(info)
        });
      });
    }); 
  }
}