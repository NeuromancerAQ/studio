import { Slider, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import Stack from "@foxglove/studio-base/components/Stack";
import useGlobalVariables from "@foxglove/studio-base/hooks/useGlobalVariables";
import { SaveConfig } from "@foxglove/studio-base/types/panels";

type Config = { topicPath: string };
type Props = { config: Config; saveConfig: SaveConfig<Config> };


function UtoGauge({ config, saveConfig }: Props): JSX.Element {
  const chartRef: any = useRef(null)
  const chartRef2: any = useRef(null)
  const [chart, setChart] = useState<any>();
  const [chart2, setChart2] = useState<any>();

  const handleResize = () => {
    chart?.resize();
    chart2?.resize();
  }

  const init = () => {
    if (chart) {
      // 建议替换为 ResizeObserver （2023.5.25）
      window.removeEventListener('resize', handleResize);
    }
    var demoData = [{
      name: '功率输出',
      unit: '%',
      value: 68,
    }, ];
    var color = new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
      offset: 0,
      color:  'rgba(0, 97, 226, 0.2)' // 0% 处的颜色
    },
      {
        offset: 0.6,
        color:  'rgba(0, 219, 255, 0.6)' // 100% 处的颜色
      },
      {
        offset: 0.95,
        color: 'rgba(0, 219, 255, 0.9)' // 100% 处的颜色
      },
      {
        offset: 1,
        color: 'rgba(0, 213, 255, 0.9)' // 100% 处的颜色
      }
    ]);
    var colorSet = [
      [0.80, color],
      [1, 'rgba(0, 97, 226, 0)']
    ];

    const option = {
      backgroundColor: '#010101',
      series: (function() :any[] {
        var result: any[] = [];

        demoData.forEach(function(item) {
          result.push(
            {
              name: item.name,
              type: 'gauge',
              radius: '47.10%',
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 100,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 2,
                  color: [
                    [
                      item.value / 100, new echarts.graphic.LinearGradient(
                      0, 1, 1, 0, [{
                        offset: 0,
                        color: 'green',
                      }, {
                        offset: 0.3,
                        color: 'yellow',
                      },
                        {
                          offset: 1,
                          color: 'red',
                        }
                      ]
                    )
                    ],
                    [
                      1, 'rgba(255,255,255,.0)'
                    ]
                  ]
                }
              },
              axisTick: {
                show: 0,
              },
              splitLine: {
                show: 0,
              },
              axisLabel: {
                show: 0
              },
              pointer: {
                show: false,
                length: '100%'
              },
              itemStyle: {
                color: 'rgba(255, 36, 74,.3)',
                borderColor: 'rgba(255, 36, 74,1)',
              },
              data: [{
                value: item.value
              }]},
            {
              name: item.name,
              type: 'gauge',
              radius: '45.10%',
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 100,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 10,
                  color: [
                    [
                      item.value / 100, new echarts.graphic.LinearGradient(
                      0, 1, 1, 0, [{
                        offset: 0,
                        color: 'rgba(255, 36, 74,0)',
                      }, {
                        offset: 0.3,
                        color: 'rgba(255, 36, 74,0)',
                      },
                        {
                          offset: 1,
                          color: 'rgba(255, 36, 74,1)',
                        }
                      ]
                    )
                    ],
                    [
                      1, 'rgba(255,255,255,.0)'
                    ]
                  ]
                }
              },
              axisTick: {
                show: 0,
              },
              splitLine: {
                show: 0,
              },
              axisLabel: {
                show: 0
              },
              pointer: {
                show: false,
                length: '100%'
              },
              itemStyle: {
                color: 'rgba(255, 36, 74,.3)',
                borderColor: 'rgba(255, 36, 74,1)',
              },
              data: [{
                value: item.value
              }]},
            {
              name: item.name,
              type: 'gauge',
              radius: '47.10%',
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 100,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: 0,
              },
              splitLine: {
                show: 0,
              },
              axisLabel: {
                show: 0
              },
              pointer: {
                show: true,
                width: 2,
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                      offset: 0, color: 'green' // 0% 处的颜色
                    }, {
                      offset: 0.3, color: 'yellow' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'red' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                },
                icon: 'rect',
                length: '100%'
              },
              detail: {
                show: false,
              },
              itemStyle: {
                color: 'rgba(255, 36, 74,1)',
              },
              data: [{
                value: item.value
              }]},
            {
              type: 'gauge',
              radius: '70%',
              splitNumber: 8,
              min: 0,
              max: 400,
              startAngle: 200,
              endAngle: -20,
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              pointer: {
                show: 0
              },
              detail: {
                show: 0
              }
            }, );
        });

        return result;
      })()
    };

    const _chart: any = echarts.init(chartRef.current as any as HTMLElement);
    _chart.setOption(option);
    window.addEventListener('resize', handleResize);
    setChart(_chart);
  };

  const init2 = () => {
    if (chart2) {
      // 建议替换为 ResizeObserver （2023.5.25）
      window.removeEventListener('resize', handleResize);
    }
    var placeHolderStyle = {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      color: 'rgba(0,0,0,0)',
      borderWidth: 0,
    };
    const option = {
      backgroundColor:"#000",
      title:{
        text:"MBPs",
        left:'43%',
        top:"66%",
        textStyle:{
          color:'#74757a',
          fontSize:'50'
        }
      },
      legend: {
        legend: {
          orient: 'vertical', //设置图例的方向
          right: 10,
          top: 'center',
          itemGap: 30, //设置图例的间距
        },
      },

      graphic: {
        type: 'text',
        left: '38%',
        top: '75%',
      },

      series: [
        // 仪表盘
        {
          type: 'gauge',
          min: 0,
          max: 100,
          splitNumber: 5,
          // 进度
          progress: {
            show: true,
            width: 18,
            roundCap: true,
            itemStyle:{
              color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#4f61d5',
                },
                {
                  offset: 1,
                  color: '#8191f9',
                },
              ]),
            }
          },
          // 仪表盘轴线相关配置
          axisLine: {
            // 仪表盘轴线样式
            lineStyle: {
              width: 18,
              shadowBlur: 30,
              shadowColor: '#9a9696',
              color:[[1, '#54565c']]
            },
            // 是否在两端显示成圆形
            roundCap: true,
          },
          // 刻度样式
          axisTick: {
            show: false,
          },
          // 分隔线样式
          splitLine: {
            show: false,
          },
          //   刻度标签
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 20,
          },
          //   指针
          pointer:{
            length:"100%",
            width:12,
            itemStyle:{
              shadowColor:"#404247",
              shadowOffsetY:'10',
              shadowBlur: 10,
              color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#4f61d5',
                },
                {
                  offset: 1,
                  color: '#8191f9',
                },
              ]),
            }
          },
          // 仪表盘详情
          detail: {
            // 是否开启标签的数字动画
            valueAnimation: true,
            fontSize: 80,
            offsetCenter: [0, '30%'],
            color: '#fff',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
        // 外圆线
        {
          type: 'pie',
          radius: ['80%', '79%'],
          center: ['50%', '50%'],
          hoverAnimation: false, //鼠标移入变大
          startAngle: 225,
          labelLine: {
            show: false,
          },
          label: {
            position: 'center',
          },
          data: [
            {
              value: 75,
              itemStyle: {
                shadowBlur: 30,
                shadowColor: '#fff',
                color:'#4e576f'
              },
            },
            {
              value: 25,
              itemStyle: placeHolderStyle,
            },
          ],
        },
      ],
    }

    const _chart = echarts.init(chartRef2.current as any as HTMLElement);
    _chart.setOption(option);
    window.addEventListener('resize', handleResize);
    setChart(_chart);
  };

  useEffect(() => {
    init();
    init2();
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Stack fullHeight>
      <PanelToolbar />
      <Stack
        fullHeight
        gap={2}
        paddingY={2}
        paddingX={3}
      >
        <div ref={chartRef} style={{
          width: "100%",
          height: "100%",
        }}></div>
        <div ref={chartRef2} style={{
          width: "100%",
          height: "100%",
        }}></div>
      </Stack>
    </Stack>
  );
}

UtoGauge.panelType = "UtoGauge";
UtoGauge.defaultConfig = {
  topicPath: "",
};

export default Panel(UtoGauge);