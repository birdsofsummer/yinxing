
    var citys = [
        '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特',
        '哈尔滨', '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州',
        '郑州', '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁',
        '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'
    ];

    var randomCount = 350; // 模拟的飞线的数量
    var curve = new mapvgl.BezierCurve();

    var data = [];

    // 构造数据
    while (randomCount--) {
        var startPoint = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
        var endPoint = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
        var length = 0;
        var startPoint = map.lnglatToMercator(startPoint.lng, startPoint.lat);
        var endPoint = map.lnglatToMercator(endPoint.lng, endPoint.lat);

        curve.setOptions({
            start: [startPoint[0], startPoint[1]],
            end: [endPoint[0], endPoint[1]]
        });
        var curveModelData = curve.getPoints(60);

        data.push({
            geometry: {
                type: 'LineString',
                coordinates: curveModelData
            },
            properties: {
                count: Math.random()
            }
        });
    }

    var view = new mapvgl.View({

        /* effects: [new mapvgl.BloomEffect({
             blurSize: 0
         })], */
        map: map
    });

    var lineLayer = new mapvgl.LineTripLayer({
        color: 'rgb(255, 255, 204)', // 飞线动画颜色
        step: 0.3
    });
    view.addLayer(lineLayer);

    lineLayer.setData(data.map(item => {
        item.geometry.coordinates = item.geometry.coordinates.map(item => {
            item[2] += 3;
            return item;
        });
        return item;
    }));

    var lineLayer = new mapvgl.SimpleLineLayer({
        blend: 'lighter',
        color: 'rgb(255, 153, 0, 0.6)' // 飞线颜色
    });
    view.addLayer(lineLayer);
    lineLayer.setData(data);

