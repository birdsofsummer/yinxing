var layer = new mapvgl.RippleLayer({
    color: 'rgba(50, 50, 200, 1)',
    scale: 2,
    size: 2,
    unit: 'px',
    data: [{
        geometry: {
            type: 'POINT',
            coordinates: [116.403748, 39.915055]
        }
    }]
});
