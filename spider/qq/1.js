/* eslint-disable */
$(document).ready(function () {
  if (!isMobile.any) {
    $('body').addClass('pc');
  } else {
    $('body').addClass('mobile');
  }
  // 缩放
  (function () {
    let scaleX = window.innerWidth / 750;
    if (scaleX < 1) {
      $('#scaleContainer')
        .css('transform', 'scale(' + scaleX + ')')
        .show();
      $('.pop_qs')
      .css('transform', 'scale(' + scaleX + ') translate(-50%, -50%)');
      $('.button').css({
        transform: 'scale(' + scaleX + ')'
      });
    } else {
      $('#scaleContainer').show();
      $('.button').css({
        'margin-left': (window.innerWidth - 750) / 2
      });
    }
  })();
  // resize
  (function () {
    window.addEventListener('resize', resizeThrottler, false);
    let resizeTimeout;
    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler();
          // The actualResizeHandler will execute at a rate of 15fps
        }, 66);
      }
    }
    function actualResizeHandler() {
      // handle the resize event

      var scaleX = window.innerWidth / 750;
      if (scaleX < 1) {
        $('#scaleContainer')
          .css('transform', 'scale(' + scaleX + ')')
          .show();
        $('.button').css({
          transform: 'scale(' + scaleX + ')'
        });
      } else {
        $('#scaleContainer').show();
        $('.button').css({
          'margin-left': (window.innerWidth - 750) / 2
        });
      }
    }
  })();

  var items = ['confirm', 'dead'];
  // var items = ['confirm', 'suspect', 'dead'];
  var colorHash = {
    confirm: '#BC423C',
    dead: '#0f153f',
    suspect: '#F8D4A7'
  };

  //数据加载完成后进行地图绘制
  function drawMap(provs) {
    // $el.empty();
    // 这里调用绘制地图方法
    let ary = [];
    let data = {};
    //https://mat1.gtimg.com/yslp/yyh5/mapview/js/jmap.js
    //素材数据上线改成//https://mat1.gtimg.com/yslp/yyh5/mapview/
    data.path = "https://mat1.gtimg.com/yslp/yyh5/mapview/";
    //地图上显示的数据
    // console.log(ary.length, ary[0]);
    data.mapList = provs;
    data.div = {
      //页面传递一个容器
      id: "chmap",
      //宽度
      width: 1500,
      //高度
      height: 1200
    };
    //对应的颜色 100ren 10ren 1+ 0
    data.colors = ['#ED514e', '#FF8f66', '#FFB769', '#FFE6BE'];
    new Main(data);
  }
  function cloneObj(obj){
    let newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (let key in obj) {
        let val = obj[key];
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
        newObj[key] = typeof val === 'object' ? Publics.cloneObj(val): val;
    }
    return newObj;
};
  function parseChinaMapData(data){
    let ary=[];
    let totalData={};
    let provName;
    data.map(function (d) {
      provName=d.area;
      if(totalData[provName]){
        // console.log(provName,totalData[provName].confirm,d.city,d.confirm);
        totalData[provName].confirm+=d.confirm;
      }else{
        totalData[provName]=cloneObj(d);
        ary.push(totalData[provName]);
        // console.log(provName,totalData[provName].confirm,d.city,d.confirm);
      }
    });
    // console.log(ary);
    drawMap(ary);
  }

  //绘制注意这个方法已经只绘制曲线图
  function map() {
    $.ajax({
      url: 'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_cn_day_counts',
      dataType: 'jsonp',
      jsonp: 'callback',
      scriptCharset: 'UTF-8',
      success: (res) => {
        let _data = JSON.parse(res.data);
        let data = _data.sort((a, b) => {
          const strA = a.date;
          const strB = b.date;
          return strA < strB ? 1 : -1;
        });
        // 画折线图
        var drawChart = function (container, data) {
          $(container).empty();
          var $chart = $('<div class="chart"></div>').appendTo($(container));

          data = data.slice().sort(function (a, b) {
            return a.date > b.date ? 1 : -1;
          });
          console.log('v4');
          console.log(data);

          data.map(function (v) {
            for (key in v) {
              if (!v[key]) v[key] = null;
            }
          });

          // console.log(data);

          var myChart = echarts.init($chart[0]);
          option = {
            // title: {
            //     text: '折线图堆叠'
            // },
            // tooltip: {
            //     trigger: 'axis'
            // },
            // legend: {
            //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            // },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '3%',
              top: '3%',
              containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: { fontSize: 20, color: '#595757' },
              boundaryGap: ['30%', '30%'],
              axisTick: { show: false },
              data: data.map(function (d) {
                return d.date;
              }) || ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
              type: 'value',
              axisLabel: { fontSize: 20, color: '#595757' },
              axisLine: { show: false },
              axisTick: { show: false },
              minInterval: 1, //会出现负数刻度
              min: 0
            },
            series: items.map(function (d) {
              return {
                name: d,
                type: 'line',
                symbolSize: 10,
                lineStyle: { width: 4 },
                itemStyle: { color: colorHash[d] },
                // stack: '总量',
                data: data.map(function (da) {
                  return da[d];
                })
              };
            }) || [
                {
                  name: '邮件营销',
                  type: 'line',
                  // stack: '总量',
                  data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name: '联盟广告',
                  type: 'line',
                  // stack: '总量',
                  data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                  name: '视频广告',
                  type: 'line',
                  // stack: '总量',
                  data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                  name: '直接访问',
                  type: 'line',
                  // stack: '总量',
                  data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                  name: '搜索引擎',
                  type: 'line',
                  // stack: '总量',
                  data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
              ]
          };

          myChart.setOption(option);
        };
        // console.log(chia)
        drawChart($('.china'), data);

        var drawProvs = function ($el, provArray) {
          provArray.forEach(function (d) {
            drawProv($el, provs[d]);
          });
        };

        var drawProv = function ($el, provData) {
          var prov = provData[provData.length - 1];
          let provConfirm = Number(prov.confirm);
          let provHeal = Number(prov.heal || 0);
          let provDead = Number(prov.dead);
          var html = `<div class="place ${prov.area == '湖北' ? 'current' : ''}">
          <div class="info">
            <span class="infoName">${prov.area || ''}</span>
            <span class="confirm">确诊${provConfirm}例，</span>
            <span class="heal">治愈${provHeal}例，</span>
            <span class="dead">死亡${provDead}例</span>
          </div>
          <div class="infoItem">
            <span class="name">武汉</span>确诊XXXX例，治愈XXXX例，死亡XXX例
          </div>
          <div class="infoItem">
            <span class="name">武汉</span>确诊XXXX例，治愈XXXX例，死亡XXX例
          </div>
        </div>`;
          // let $con = $(html).appendTo($el);
          // $con.find('.info').click(function() {
          //   $(this).closest('.place').toggleClass('current');
          // })
          // if (isMobile.any) {
          //   // mobile
          //   $con.css('cursor', 'pointer');
          //   $con.click(function() {
          //     var $this = $(this).find('.icon');
          //     var $chart = $con.find('.lineChart');
          //     $this.toggleClass('active');
          //     if ($this.hasClass('active')) {
          //       $chart.show();
          //       drawChart($chart, provData);
          //     } else {
          //       $chart.hide();
          //     }
          //   });
          // } else {
          //   // pc
          //   $con.find('.iconClick').click(function() {
          //     var $this = $(this).find('.icon');
          //     var $chart = $con.find('.lineChart');
          //     $this.toggleClass('active');
          //     if ($this.hasClass('active')) {
          //       $chart.show();
          //       drawChart($chart, provData);
          //     } else {
          //       $chart.hide();
          //     }
          //   });
          // }
        };

        // drawProvs($('.places'), provArray);
        // $('.places').append('<div class="up-tips">海外国家</div>');
        // drawProvs($('.places'), foreignArray);
        // trigger click 湖北默认展开
        $('.places .place')
          .first()
          .find('.iconClick')
          .trigger('click');

        // nav
        $('#moveNav').html($('#staticNav').html());
        $('body').on('click', '.navTab', function () {
          var type = $(this).data('id');
          highlightNav(type);
        });
        var $navTabs = $('.navTabs');
        var highlightNav = function (type) {
          $navTabs.find('.navTab').removeClass('active');
          $navTabs.find('.navTab.' + type + 'Tab').addClass('active');
        };

        // IntersectionObserver
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (i) {
              // console.log('Time: ' + i.time);
              // console.log('Target: ' + i.target.id);
              // console.log('IntersectionRatio: ' + i.intersectionRatio);
              // console.log('rootBounds: ' + i.rootBounds);
              // console.log(i.boundingClientRect);
              // console.log(i.intersectionRect);
              // console.log('================');
              if (i.target.id === 'staticNav') {
                if (i.intersectionRatio >= 0.99) {
                  $('#moveNav').hide();
                } else {
                  $('#moveNav').show();
                }
              }
            });
          },
          {
            threshold: [0, 0.5, 1]
          }
        );
        io.observe(document.querySelector('#staticNav'));

        var io2 = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (i) {
              if (i.target.id === 'charts') {
                if (i.intersectionRatio > 0) {
                  highlightNav('charts');
                }
              }
            });
          },
          {
            threshold: [0, 0.1],
            rootMargin: -window.innerHeight / 2.2 + 'px 0px'
          }
        );
        io2.observe(document.querySelector('#charts'));

        var io3 = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (i) {
              if (i.target.id === 'prevent') {
                if (i.intersectionRatio > 0) {
                  highlightNav('prevent');
                }
              }
            });
          },
          {
            threshold: [0],
            rootMargin: -window.innerHeight / 2.2 + 'px 0px'
          }
        );
        io3.observe(document.querySelector('#prevent'));

        var io4 = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (i) {
              if (i.target.id === 'news') {
                if (i.intersectionRatio > 0) {
                  highlightNav('news');
                }
              }
            });
          },
          {
            threshold: [0],
            rootMargin: -window.innerHeight / 2.2 + 'px 0px'
          }
        );
        io4.observe(document.querySelector('#news'));

        var io5 = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (i) {
              if (i.target.id === 'rumor') {
                if (i.intersectionRatio > 0) {
                  highlightNav('rumor');
                }
              }
            });
          },
          {
            threshold: [0],
            rootMargin: -window.innerHeight / 2.2 + 'px 0px'
          }
        );
        io5.observe(document.querySelector('#rumor'));
        // data 结束
      }
    });
  }

  // 地区数据
  // <div class="place current" style="cursor: pointer;">
  //         <div class="info">
  //           <span class="infoName">湖北</span>
  //           <span class="confirm">确诊750例，</span>
  //           <span class="heal">治愈0例，</span>
  //           <span class="dead">死亡39例</span>
  //         </div>
  //         <div class="infoItem">
  //           <span class="name">武汉</span>确诊XXXX例，治愈XXXX例，死亡XXX例
  //         </div>
  //         <div class="infoItem">
  //           <span class="name">武汉</span>确诊XXXX例，治愈XXXX例，死亡XXX例
  //         </div>
  //       </div>
  function mapAreaData($el, data) {
    // console.log(data)
    var __data = {};
    data.map(function(d) {
      if (__data[d.area]) {
        __data[d.area].citys.push(d);
        __data[d.area].confirm = parseInt(__data[d.area].confirm) + parseInt(d.confirm);
        __data[d.area].heal = parseInt(__data[d.area].heal) + parseInt(d.heal);
        __data[d.area].dead = parseInt(__data[d.area].dead) + parseInt(d.dead);
        __data[d.area].suspect = parseInt(__data[d.area].suspect) + parseInt(d.suspect);
      } else {
        __data[d.area] = {};
        __data[d.area].citys = [];
        if(d.city && d.city !== ''){
          __data[d.area].citys.push(d)
        }
        __data[d.area].confirm = parseInt(d.confirm);
        __data[d.area].heal = parseInt(d.heal);
        __data[d.area].dead = parseInt(d.dead);
        __data[d.area].suspect = parseInt(d.suspect);
        __data[d.area].area = d.area;
      }
    });
    var __data_arr = [];
    for (var i in __data) {
      __data_arr.push(__data[i])
    }
    __data_arr.sort(function(a,b){
      if (a.confirm !== b.confirm) {
        return b.confirm - a.confirm;
      } else {
        return b.suspect - a.suspect;
      }
    });
    // console.log(__data_arr,223344);
    __data = data.sort(function (a, b) {
      if (a.confirm !== b.confirm) {
        return b.confirm - a.confirm;
      } else {
        return b.suspect - a.suspect;
      }
    });
    // console.log(__data)
    __data_arr.map(function(d){
      var _html = '';
      // console.log(d)
      var _html = `<div class="place ${d.citys.length <= 0 ? 'no-sharp' : ''} ${d.area == '湖北' ? 'current' : ''}" style="cursor: pointer;" area="${d.area}">
        <div class="info">
          <span class="infoName">${d.area}</span>
          <span class="confirm">确诊<span>${d.confirm}</span>例</span>
          <span class="heal ${parseInt(d.heal) <= 0 ? 'hide' : ''}">，治愈<span>${d.heal}</span>例</span>
          <span class="dead ${parseInt(d.dead) <= 0 ? 'hide' : ''}">，死亡<span>${d.dead}</span>例</span>
        </div>
      </div>`;
      $el.append(_html);
      var $_closestDom = $('.place[area="' + d.area + '"]')
      d.citys = d.citys.sort(function(f,g){
        if (f.confirm !== g.confirm) {
          return g.confirm - f.confirm;
        } else {
          return g.suspect - f.suspect;
        }
      });
      d.citys.map(function(dd){
        var _innerhtml = `<div class="infoItem">
        <span class="name">${dd.city}</span>
        确诊<span class="confirm">${dd.confirm}</span>例<span ${parseInt(dd.heal) <= 0 ? 'class="hide"' : ''}>，治愈<span>${dd.heal}</span>例</span><span ${parseInt(dd.dead) <= 0 ? 'class="hide"' : ''}>，死亡<span>${dd.dead}</span>例</span>
        </div>`;
        $_closestDom.append(_innerhtml);
      });
    })
    $el.append('<div class="dataTips">*数据来源于国家及各地卫健委通报</div>')
  }

  function mapOthData($el, data) {
    var __data = data.sort(function(a,b){
      if (a.confirm !== b.confirm) {
        return b.confirm - a.confirm;
      } else {
        return b.suspect - a.suspect;
      }
    });
    var __hw_confirm = 0;
    var __hw_dead = 0;
    var $hw_confirm = $('.hw_confirm');
    var $hw_dead = $('.hw_dead');
    __data.map(function (d) {
      var _html = '';
      __hw_confirm += parseInt(d.confirm);
      __hw_dead += parseInt(d.dead);
      _html = `<div class="place no-sharp" style="cursor: pointer;">
          <div class="info">
            <span class="infoName ${d.country.length > 3 ? 'small' : ''}">${d.country}</span>
            <span class="confirm">确诊<span>${d.confirm}</span>例</span>
            <span class="heal ${parseInt(d.heal) <= 0 ? 'hide' : ''}">，治愈<span>${d.heal}</span>例</span>
            <span class="dead ${parseInt(d.dead) <= 0 ? 'hide' : ''}">，死亡<span>${d.dead}</span>例</span>
          </div>
        </div>`;
      // console.log(_html, $el)
      $el.append(_html);
    })
    $hw_confirm.text(__hw_confirm);
    $hw_dead.text(__hw_dead);
  }

  function areaMap() {
    $.ajax({
      url: 'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_area_counts',
      dataType: 'jsonp',
      jsonp: 'callback',
      scriptCharset: 'UTF-8',
      success: (res) => {
        let data = JSON.parse(res.data);
        // console.log(data)
        var dataCn = data.filter(function (d) {
          return d.country === '中国';
        });
        //绘制地图方法入口
        parseChinaMapData(dataCn);
        mapAreaData($('.places'), dataCn)
        // console.log(dataCn)
        var foreignArray = data.filter(function (d) {
          return d.country !== '中国';
        });
        // console.log(foreignArray)
        if (foreignArray.length > 0) {
          $('.places').append('<div class="up-tips up-gnbl">海外国家<span class="datas">确诊<span class="hw_confirm">0</span>例，死亡<span class="hw_dead">0</span>例</span></div>');
          mapOthData($('.places'), foreignArray)
        }
      }
    })
  }
  (function () {
    $.ajax({
      url: 'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_global_vars',
      dataType: 'jsonp',
      scriptCharset: 'UTF-8',
      jsonp: 'callback',
      success: (res) => {
        let data = JSON.parse(res.data)[0];
        let hintWords = data.hintWords;
        let recentTime = data.recentTime;
        useTotal = data.useTotal;
        let recentTotal = {
          confirm: data.confirmCount,
          suspect: data.suspectCount,
          dead: data.deadCount,
          cure: data.cure
        };
        // 更新外显

        // 确诊
        $('.recentNumber')
          .find('.confirm')
          .find('.number')
          .html(recentTotal.confirm);
        // 疑似
        $('.recentNumber')
          .find('.suspect')
          .find('.number')
          .html(recentTotal.suspect);
        // 治愈
        $('.recentNumber')
          .find('.cure')
          .find('.number')
          .html(recentTotal.cure);
        // 死亡
        $('.recentNumber')
          .find('.dead')
          .find('.number')
          .html(recentTotal.dead);
        $('.timeNum .d').html('截至 ' + recentTime);
        $('.marquee-tab .text')
          .html(hintWords)
          .css('width', Math.max(100, (hintWords.length / 15) * 100) + '%');
        map();
        areaMap();
        $('body').on('click', '.place .info', function () {
          $(this).closest('.place').toggleClass('current');
        })
        var $pop_qs = $('.pop_qs');
        var $qs_mask = $('.qs_mask');
        $('.ac-dataqs').click(function() {
          $pop_qs.show();
          $qs_mask.show();
        });
        $('.ac_qs_close, .ac_qs_mask').click(function(){
          $pop_qs.hide();
          $qs_mask.hide();
        });
      }
    });

    // var data = d3.csvParse(OriginData);
    // http://localhost/map/data.json
    // https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_area_datas
    // https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_area_datas&callback=jsonp
  })();
});

