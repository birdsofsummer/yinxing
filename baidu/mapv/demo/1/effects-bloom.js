    /* global BMapGL */

    /* global mapv */

    /* global mapvgl */

    /* global initMap */

    var map = initMap();

    map.setHeading(-45.3);
    map.setTilt(80);
    var point = new BMapGL.Point(106.542353,29.565448);
    map.centerAndZoom(point, 16);

    var view = new mapvgl.View({
        effects: [new mapvgl.BloomEffect({
            blurSize: 10
        })],
        map: map
    });

    fetch('./static/chongqing.json').then(function (rs) {
        return rs.json();
    }).then(function (rs) {
        var data = rs;
        var polygons = [];
        var len = data.length;
        for (var i = 0; i < len; i++) {
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
            texture: 'images/light.jpg',
            // texture: 'images/heatmap.png',
            blend: 'lighter',
            color: [0.8, 0.8, 0.1],
            opacity: 1.0
        });
        view.addLayer(shaperLayer);
        shaperLayer.setData(polygons);

    });
