[doc](https://lbsyun.baidu.com/solutions/solutions/mapvdata "")


```javascript
// 点数据
[{
    geometry: {
        type: 'Point',
        coordinates: [116.392394, 39.910683]
    },
    properties: {
        color: 'rgba(255, 255, 50, 0.5)',
        count: 90
    }
}]


// 线数据
[{
    geometry: {
        type: 'LineString',
        coordinates: [
            [116.392394, 39.910683], 
            [116.423123, 39.134534]
        ]
    },
    properties: {
        count: 30
    }
}]



// 面数据
[{
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [112.342124, 38.333312], 
                [116.392394, 39.910683], 
                [116.423123, 39.134534]
            ]
        ]
    },
    properties: {
        count: 30 * Math.random()
    }
}]







var pointLayer = new mapvgl.PointLayer({
    data: data,
    size: 10,
    color: '#fff',
});
view.addLayer(pointLayer);
//pointLayer.setData(data);



```
