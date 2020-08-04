    var data = [{
        geometry: {
            type: 'POINT',
            coordinates: [116.403748, 39.915055]
        }
    }];

    var bmapgl = new BMapGL.Map('map_container');
    var point = new BMapGL.Point(116.403748, 39.915055);
    bmapgl.centerAndZoom(point, 17);
    var view = new mapvgl.View({
        map: bmapgl
    });
    var layer = new mapvgl.PointLayer({
        color: 'rgba(50, 50, 200, 1)',
        blend: 'lighter',
        size: 2,
        data: data,
    });
    view.addLayer(layer);
    //layer.setData(data);

