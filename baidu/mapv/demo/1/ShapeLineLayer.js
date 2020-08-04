var layer = new mapvgl.ShapeLineLayer({
    color: 'rgba(55, 55, 200, 1)',
    data: [{
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [116.392394, 39.910683],
                    [116.405976, 39.927727],
                    [116.420996, 39.910351]
                ]
            ]
        },
        properties: {
            height: 100, // 多边形高度
        }
    }]
});
