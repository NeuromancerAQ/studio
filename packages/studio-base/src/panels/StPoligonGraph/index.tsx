// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Divider, Skeleton, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useRef, useEffect  } from 'react';

import CopyButton from "@foxglove/studio-base/components/CopyButton";
import { DirectTopicStatsUpdater } from "@foxglove/studio-base/components/DirectTopicStatsUpdater";
import EmptyState from "@foxglove/studio-base/components/EmptyState";
import {
  MessagePipelineContext,
  useMessagePipeline,
} from "@foxglove/studio-base/components/MessagePipeline";
import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import Stack from "@foxglove/studio-base/components/Stack";
import { Topic } from "@foxglove/studio-base/src/players/types";
import "./stPoligonGraph.css"

const useStyles = makeStyles<void, "copyIcon">()((theme, _params, classes) => ({
  overline: {
    opacity: 0.6,
  },
}));

let idPos = []

function StPoligonGraph(): JSX.Element {
  const { classes } = useStyles();
  const canvasRef = useRef(null)

  const chartHeight = 400;
  const chartWidth = 480;



  const color = ['#1B9F1CFF','#3F71DAFF','#DA523FFF','#3FCDDAFF'];
  const padding = {x:55,y:80};
//画布的款高
  let cw = chartWidth;
  let ch = chartHeight;
  const max = {x:9,y:200};
  //计算刻度可使用的总宽度
  let avgWidth = (cw - 2*padding.x - 50)/(max.x-1);
//原点，bottomRight:X轴终点,topLeft:Y轴终点
  let origin = {x:padding.x,y:ch-padding.y};
  let bottomRight = {x:cw-padding.x,y:ch-padding.y};
  let topLeft = {x:padding.x,y:padding.y};

  function drawAxis(context){

    //绘制X轴
    context.beginPath();
    context.fillStyle ="#979797";
    context.moveTo(origin.x,origin.y);
    context.lineTo(bottomRight.x,bottomRight.y);
    //绘制X轴箭头
    context.lineTo(bottomRight.x-10,bottomRight.y-5);
    context.moveTo(bottomRight.x,bottomRight.y);
    context.lineTo(bottomRight.x-10,bottomRight.y+5);
    //绘制Y轴
    context.moveTo(origin.x,origin.y);
    context.lineTo(topLeft.x,topLeft.y);
    //绘制Y轴箭头
    context.lineTo(topLeft.x-5,topLeft.y+10);
    context.moveTo(topLeft.x,topLeft.y);
    context.lineTo(topLeft.x+5,topLeft.y+10);

    context.stroke();
    context.beginPath();
    //设置字号
    context.font = '14px SimHei';
    let avgValue=Math.floor(max.y/5);
    let avgHeight = (ch-padding.y*2-50)/5;
    //绘制X方向刻度

    for(let i=0;i<max.x;i++){
      //循环绘制所有刻度线
      if(i > 0){
        //移动刻度起点
        context.moveTo(origin.x+i*avgWidth,origin.y);
        //绘制到刻度终点
        context.lineTo(origin.x+i*avgWidth,origin.y-(ch-padding.y*2));
      }
      //X轴说明文字：1月，2月...
      if(i == 0){
        let txtWidth = context.measureText('0').width;
        context.fillText('0',origin.x+i*avgWidth-txtWidth/2,origin.y+24);
      }
      if(i == max.x-1){
        let txtWidth = context.measureText('8(s)').width;
        context.fillText('8(s)',origin.x+i*avgWidth-txtWidth/2,origin.y+24);
      }else{
        let txtWidth = context.measureText(i).width;
        context.fillText(i,origin.x+i*avgWidth-txtWidth/2,origin.y+24);
      }

    }
    //绘制Y方向刻度

    /*var max = Math.max.apply(this,arr);
    console.log(max);*/

    for(let i=1;i<6;i++){
      //绘制Y轴刻度
      context.moveTo(origin.x,origin.y-i*avgHeight);
      context.lineTo(origin.x+avgWidth*9,origin.y-i*avgHeight);
      //绘制Y轴文字
      //X轴说明文字：1月，2月...
      if(i == 5){
        let txtWidth = context.measureText('200(m)').width;
        context.fillText('200(m)',origin.x-txtWidth-10,origin.y-i*avgHeight+6);
      }else{
        let txtWidth = context.measureText(i*40).width;
        context.fillText(i*40,origin.x-txtWidth-10,origin.y-i*avgHeight+6);
      }

    }
    context.strokeStyle = '#333A48FF';
    context.stroke();


  }
  function drawSpeedLine(arr, context){
    if(!arr || arr.length < 0 ){
      return;
    }
    //绘制折线
    context.beginPath();
    for(let i=0;i<arr.length;i++){
      let posY = origin.y - (arr[i].s/max.y*(ch-2*padding.y-50));
      let posX = origin.x + (arr[i].t)*avgWidth;
      if(i==0){
        context.moveTo(posX,posY);
      }else{
        context.lineTo(posX,posY);
      }
      //具体金额文字
      if(i == parseInt(arr.length/2)){
        let _posX = posX,_posY = posY;
        let lastPos = idPos[idPos.length-1];
        if(lastPos && Math.abs(lastPos[0]-_posX)<15){
          _posX = posX-15;
        }
        if(lastPos && Math.abs(lastPos[1]-_posY)<15){
          _posY = posY-15;
        }
        idPos.push([_posX,_posY]);
        context.fillStyle ="#ffffff";
        context.fillText('st-曲线',_posX,_posY);
      }

    }
    context.strokeStyle = '#ffffff';
    context.stroke();
  }

  function drawObstacleObejtLine(object, context){
    if(!object || !object.points || object.points.length <=0){
      return;
    }

    let arr = object.points || [];
    //绘制闭合多边形
    context.beginPath();
    let textPosIndex = parseInt(Math.random()*(arr.length-1-0+1)+0,10);
    for(let i=0;i<arr.length;i++){
      let posY = origin.y - Math.floor(arr[i].s/max.y*(ch-2*padding.y-50));
      let posX = origin.x + (arr[i].t)*avgWidth;

      if(i==0){
        context.moveTo(posX,posY);
      }else{
        context.lineTo(posX,posY);
      }
      //具体金额文字

      if(i == textPosIndex){
        context.fillStyle = color[object.type];
        let _posX = posX,_posY = posY;
        let lastPos = idPos[idPos.length-1];
        if(lastPos && Math.abs(lastPos[0]-_posX)<=10){
          _posX = posX-10;
        }
        if(lastPos && Math.abs(lastPos[1]-_posY)<=10){
          _posY = posY-10;
        }
        idPos.push([_posX,_posY]);
        context.fillText("ID:"+object.id,_posX,_posY)
      }

    }

    context.strokeStyle = color[object.type];
    context.closePath();
    context.stroke();
  }

  const drawGraph = (context, payload) => {
    const { motion_planning_info } = payload || {};
    // console.log(payload);
    let { longi_planning_info } = motion_planning_info || {};
    if(!longi_planning_info) longi_planning_info = {};
    let { st_graph } = longi_planning_info || {};
    if(!st_graph) st_graph = {};
    let { objects } = st_graph || [];
    let { st_profile } = st_graph || [];
    if(!objects) objects = [];
    if(!st_profile) st_profile = [];

    context.clearRect(0, 0, cw, ch);
    drawAxis(context);
    idPos = [];
    // console.log(objects)
    objects.forEach((_st_profile)=>{
      drawObstacleObejtLine(_st_profile, context);
    })
    drawSpeedLine(st_profile, context);
  }

  useEffect(()=> {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    drawGraph(context, {})
  }, [])

  return (
    <>
      <PanelToolbar />
      <Stack fullHeight
             overflowY="auto"
             gap={2}
             paddingY={2}
             paddingX={3}>
        <div className={"st-poligon-graph-content"}>
          <div className={"lenged"}>
            <div className={"lenged-item"}>
              <span>st-曲线</span>
            </div>
            <div className={"lenged-item"}>
              <span>IGNORE</span>
            </div>
            <div className={"lenged-item"}>
              <span>FOLLOW</span>
            </div>
            <div className={"lenged-item"}>
              <span>YIELD</span>
            </div>
            <div className={"lenged-item"}>
              <span>OVERTAKE</span>
            </div>
          </div>
          <canvas id="stCanvas" ref={canvasRef}></canvas>
      </div>
      </Stack>
    </>
  );
}

StPoligonGraph.panelType = "StPoligonGraph";
StPoligonGraph.defaultConfig = {};

export default Panel(StPoligonGraph);
