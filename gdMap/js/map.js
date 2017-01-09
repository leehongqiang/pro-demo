

/**
 * 高德地图封装
 * 
 * @class Maps
 */
class Maps {
  constructor(option) {
    this.option = option;
    this.gdmap = new AMap.Map(this.option.dom, this.option.setting);
    this.pi = 3.1415926535897932384626;
    this.ee = 0.00669342162296594323;
    this.a = 6378245.0;// 长半轴
  }
  /**
   * 重新设置地图中心点
   * 
   * @param {any} poisition
   * 
   * @memberOf Maps
   */
  changeMapCenter(poisition) {
    this.gdmap.setZoomAndCenter(16, poisition)
  }

  /**
   * 在地图上添加mark（定位标记图标）
   * 
   * @param {any} markOption
   * 
   * @memberOf Maps
   */
  addMark(markOption) {
    let self = this
    let icons = ''
    if (markOption.clearMark) {
      self.gdmap.clearMap()
    }
    if (markOption.icon) {
      icons = new AMap.Icon({
        size: new AMap.Size(40, 50),  //图标大小
        image: markOption.icon,
        imageOffset: new AMap.Pixel(0, -60)
      })
    }
    let mark = new AMap.Marker({
      position: markOption.position,
      icon: icons
    })
    if (markOption.title) {
      self.addInfo(markOption);
    }
    mark.setMap(self.gdmap)
    mark.on("click", function () {
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
  addInfo(infoOption) {
    let infoWindow;
    let infos = [];
    infos.push("<div>" + infoOption.title + "</div> ");
    infoWindow = new AMap.InfoWindow({
      content: infos.join("<br/>"),  //使用默认信息窗体框样式，显示信息内容
      offset: new AMap.Pixel(0, -30),
      autoMove: true
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
  addCircle(circleInfo) {
    let center = new AMap.LngLat(circleInfo.center[0], circleInfo.center[1])
    let Circle = new AMap.Circle({
      center: center,
      radius: circleInfo.radius,
      fillOpacity: circleInfo.Opacity,
      fillColor: circleInfo.bgColor,
      strokeColor: circleInfo.borderColor
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
  searchPlace(searchInfo) {
    return new Promise(function (resolve, reject) {
      let info = [];
      AMap.service(["AMap.PlaceSearch"], function () {
        let placeSearch = new AMap.PlaceSearch({
          type: "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施",
          pageSize: searchInfo.size || searchInfo.size === 0 ? searchInfo.size : 10
        });
        //判断是否用经纬度搜索
        if (searchInfo.isGeographicis) {
          placeSearch.searchNearBy('', searchInfo.Geographicis, searchInfo.range || 1000);
        } else {
          placeSearch.search(searchInfo.addr)
        }
        //监听是否搜索完毕
        AMap.event.addListener(placeSearch, "complete", function (result) {
          result.poiList.pois.map(function (value) {
            info.push({
              lng: value.location.lng,
              lat: value.location.lat,
              name: value.name,
              addr: value.address
            });
          });
          resolve(info)
        });
      });
    });
  }
  
  /**
   * IOS坐标地图转换为高德地图
   * 
   * @returns
   * 
   * @memberOf Maps
   */
  convertAdress(option) {
    return new Promise(function (resolve, reject) {
      AMap.convertFrom(option.posi, "gps", function (status, result) {
        resolve(result);
      });
    })
  }

  /** 
   * 地球坐标转换为火星坐标 
   * World Geodetic System ==> Mars Geodetic System 
   * 
   * @param wgLat  地球坐标 
   * @param wgLon 
   * 
   * mglat,mglon 火星坐标 
   */
  earthTransformMars(wgLat, wgLon) {
    let mgLat ='',
        mgLon = '';
    if (this.outOfChina(wgLat, wgLon)) {
      mgLat = wgLat;
      mgLon = wgLon;
      return;
    }
    let dLat = this.transformLat(wgLon - 105.0, wgLat - 35.0),
      dLon = this.transformLon(wgLon - 105.0, wgLat - 35.0),
      radLat = wgLat / 180.0 * this.pi,
      magic = Math.sin(radLat);
    magic = 1 - this.ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);
    dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);
    mgLat = parseFloat(wgLat)  + parseFloat(dLat);//如果不转的话在手机端可能出现按照字符串拼接
    mgLon = parseFloat(wgLon) + parseFloat(dLon);//如果不转的话在手机端可能出现按照字符串拼接
    return [mgLat,mgLon]
  }
  outOfChina(lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
      return true;
    if (lat < 0.8293 || lat > 55.8271)
      return true;
    return false;
  }
  transformLat(x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.pi) + 40.0 * Math.sin(y / 3.0 * this.pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.pi) + 320 * Math.sin(y * this.pi / 30.0)) * 2.0 / 3.0;
    return ret;
  }

  transformLon(x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.pi) + 40.0 * Math.sin(x / 3.0 * this.pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.pi) + 300.0 * Math.sin(x / 30.0 * this.pi)) * 2.0 / 3.0;
    return ret;
  }
}