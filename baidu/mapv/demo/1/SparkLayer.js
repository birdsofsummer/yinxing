
/*
var layer = new mapvgl.SparkLayer({
    color: 'rgba(200, 50, 50, 1)',
    height: 200,
    data: [{
        geometry: {
            type: 'POINT',
            coordinates: [116.403748, 39.915055]
        }
    }]
});
*/
    /* global BMapGL */

    /* global mapv */

    /* global mapvgl */

    /* global initMap */

    var map = initMap({
        tilt: 73,
        heading: 150,
        center: [106.559872,29.566579],
        zoom: 19
    });

    var view = new mapvgl.View({
        map: map
    });
    var point = new BMapGL.Point(106.560734,29.566986);

    // 制造数据
    var sparkData1 = [];
    var sparkData2 = [];
    var sparkData3 = [];
    var randomNum = 40;
    // 随机生成点的偏移尺度，勿修改变量名
    var RANDOM_SIZE = 0.01;
    for (var i = 0; i < randomNum; i++) {
        var coord = [
            point.lng + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2,
            point.lat + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2
        ];
        sparkData1.push({
            geometry: {
                type: 'Point',
                coordinates: coord
            },
            properties: {
                height: parseInt(200 * Math.random(), 10)
            }
        });
    }
    for (var i = 0; i < randomNum; i++) {
        var coord = [
            point.lng + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2,
            point.lat + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2
        ];
        sparkData2.push({
            geometry: {
                type: 'Point',
                coordinates: coord
            },
            properties: {
                height: parseInt(200 * Math.random(), 10)
            }
        });
    }
    for (var i = 0; i < randomNum; i++) {
        var coord = [
            point.lng + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2,
            point.lat + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2
        ];
        sparkData3.push({
            geometry: {
                type: 'Point',
                coordinates: coord
            },
            properties: {
                height: parseInt(200 * Math.random(), 10)
            }
        });
    }

    var sparkLayer1 = new mapvgl.SparkLayer({
        height: function (data) {
            return data.properties.height;
        },
        step: 0.1,
        startTime: 1,
        endTime: 12,
        color: 'rgb(255, 153, 51)'
    });
    view.addLayer(sparkLayer1);

    var sparkLayer2 = new mapvgl.SparkLayer({
        height: function (data) {
            return data.properties.height;
        },
        color: 'rgb(255, 0, 255)'
    });
    view.addLayer(sparkLayer2);

    var sparkLayer3 = new mapvgl.SparkLayer({
        height: function (data) {
            return data.properties.height;
        },
        step: 0.1,
        startTime: 2,
        endTime: 10,
        color: 'rgb(0, 204, 255)'
    });
    view.addLayer(sparkLayer3);

    sparkLayer1.setData(sparkData1);
    sparkLayer2.setData(sparkData2);
    sparkLayer3.setData(sparkData3);

    fetch('./static/chongqing.json').then(function (rs) {
        return rs.json();
    }).then(function (rs) {
        var data = rs;
        var polygons = [];
        var len = data.length;
        for (var i = 0; i < len / 10; i++) {
            var line = data[i];
            var polygon = [];
            var pt = [line[1] * 512, line[2] * 512];
            for (var j = 3; j < line.length; j += 2) {
                pt[0] += line[j] / 100 / 2;
                pt[1] += line[j + 1] / 100 / 2;
                polygon.push([pt[0], pt[1]]);
            }

            polygons.push({
                geometry: {
                    type: 'Polygon',
                    coordinates: [polygon]
                },
                properties: {
                    height: line[0] / 2
                }
            });
        }

        var shaperLayer = new mapvgl.ShapeLayer({
            blend: false,
            color: [36 / 255, 44 / 255, 60 / 255, 1]
        });

        view.addLayer(shaperLayer);

        shaperLayer.setData(polygons);

    });

