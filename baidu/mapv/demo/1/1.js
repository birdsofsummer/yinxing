var timeOffset = 1526774400;
street=async ()=>{
    u='./data/guiji.xierqi.json'
    let rs=await get(u)
    rs = rs.data;
    var data = [];
    var startTime = null;
    var endTime = null;
    for (var key in rs) {
        var group = rs[key];
        for (var i = 0; i < group.length; i++) {
            var line = group[i];
            var traj_base = line.traj_base.split(',');
            traj_base[0] = ~~traj_base[0];
            traj_base[1] = ~~traj_base[1];

            var time_base = ~~(line.time_base);
            if (startTime === null) {
                startTime = time_base;
            }

            if (endTime === null) {
                endTime = time_base;
            }

            startTime = Math.min(startTime, time_base);
            endTime = Math.max(endTime, time_base);

            var traj_list = line.traj_list;
            var time_list = line.time_list;
            var add = 0;
            var traj = [];
            var timeArr = [];
            for (var j = 0; j < time_list.length; j++) {
                timeArr.push(time_base + ~~(time_list[j]));
                traj.push([
                    traj_base[0] + ~~(traj_list[j][0]),
                    traj_base[1] + ~~(traj_list[j][1]),
                    1,
                    time_base + ~~(time_list[j]) - timeOffset
                ]);
            }
            data.push({
                time: timeArr,
                geometry: {
                    type: 'LineString',
                    coordinates: traj
                }
            });
        }
    }

    var lineLayer = new mapvgl.LineTripLayer({
        step: 0.3,
        trailLength: 20,
        startTime: startTime - timeOffset,
        endTime: endTime - timeOffset,
        color: [0, 255, 255],
        data:data;
    });
    view.addLayer(lineLayer);

}

street()
