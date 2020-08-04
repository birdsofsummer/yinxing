var layer = new mapvgl.LineTripLayer({
    color: 'rgba(50, 50, 200, 1)',
    step: 0.3,
    trailLength: 20,
    startTime: 0,
    endTime: 100,
    data: [{
        geometry: {
            type: 'LineString',
            coordinates: [
                [116.394191, 39.91334],
                [116.417259, 39.913672]
            ]
        }
    }]
});
