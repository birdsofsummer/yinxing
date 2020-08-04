    /* global BMapGL */

    /* global mapv */

    /* global mapvgl */

    /* global initMap */

    /* global whiteStyle */

    /* global purpleStyle */
    var map = initMap({
        tilt: 60,
        heading: 0,
        center: [106.526814,29.526265],
        zoom: 13,
        style: purpleStyle
    });

    var view = new mapvgl.View({
        // effects: [new mapvgl.BloomEffect()],
        map: map
    });

    fetch('./static/car.csv').then(rs => {
        return rs.text();
    }).then(csvstr => {
        var dataSet = mapv.csv.getDataSet(csvstr);
        var data = dataSet.get();

        var layer = new mapvgl.SimpleLineLayer({
            blend: 'lighter',
            color: 'rgba(255, 71, 26, 0.8)'
        });
        layer.setData(data);
        view.addLayer(layer);
    });

