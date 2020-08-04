var layer = new mapvgl.HeatmapLayer({
    min:0,
    max:1000,
    size:1,
    gradient: {
        0.0: 'rgb(50, 50, 256)',
        0.1: 'rgb(50, 250, 56)',
        0.5: 'rgb(250, 250, 56)',
        1.0: 'rgb(250, 50, 56)'
    },
    data: [
        {
            geometry: {
                type: 'Point',
                coordinates: [116.392394, 39.910683]
            }
        },

    ],
});
