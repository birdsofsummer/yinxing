    var point = new BMapGL.Point(105.403119,38.028658);
    map.centerAndZoom(point, 5);

    var data = [];

    var citys = [
        '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨',
        '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州',
        '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐',
        '成都', '贵阳', '昆明', '拉萨', '海口'
    ];

    var randomCount = 300;

    // 构造数据
    while (randomCount--) {
        var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
        data.push({
            geometry: {
                type: 'Point',
                coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
            },
            properties: {
                count: parseInt(4 * Math.random(), 10)
            }
        });
    }

    var pointLayer = new mapvgl.PointLayer({
        blend: 'lighter',
        size: 10,
        color: function (item) {
            if (item.properties.count === 1) {
                return 'rgb(191, 67, 66, 0.8)';
            }
            else if (item.properties.count === 2) {
                return 'rgb(211, 139, 93, 0.8)';
            }
            else if (item.properties.count === 3) {
                return 'rgb(44, 85, 48, 0.8)';
            }
            else {
                return 'rgb(115, 158, 130, 0.8)';
            }
        },
        data:data,
    });

    view.addLayer(pointLayer);

