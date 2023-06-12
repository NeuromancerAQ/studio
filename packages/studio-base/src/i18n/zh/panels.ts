// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { TypeOptions } from "i18next";

export const panels: Partial<TypeOptions["resources"]["panels"]> = {
  "3D": "三维",
  newImage: "图像（Beta）",
  "3DPanelDescription": "在三维场景中显示标记、相机图像、网格、URDF 和其他内容。",
  dataSourceInfo: "数据源信息",
  dataSourceInfoDescription: "查看当前数据源的主题和时间戳等详细信息。",
  gauge: "仪表",
  gaugeDescription: "基于连续值显示彩色仪表。",
  dashboard: "仪表盘",
  dashboardDescription: "显示当前车辆信息的仪表盘",
  image: "图像",
  imageDescription: "显示带注释的图像。",
  indicator: "指示器",
  indicatorDescription: "基于阈值值显示彩色和/或文本指示器。",
  log: "日志",
  logDescription: "按节点和严重程度级别显示日志。",
  map: "地图",
  mapDescription: "在地图上显示点。",
  parameters: "参数",
  parametersDescription: "读取和设置数据源的参数。",
  plot: "图表",
  plotDescription: "绘制随时间或其他值变化的数字值。",
  publish: "发布",
  publishDescription: "向数据源发布消息（仅限实时连接）。",
  rawMessages: "原始消息",
  rawMessagesDescription: "检查主题消息。",
  ROSDiagnosticsDetail: "诊断 - 详细信息（ROS）",
  ROSDiagnosticsDetailDescription: "显示特定 hardware_id 的 ROS DiagnosticArray 消息。",
  ROSDiagnosticSummary: "诊断 - 概要（ROS）",
  ROSDiagnosticSummaryDescription: "显示所有 ROS DiagnosticArray 消息的摘要。",
  stateTransitions: "状态转换",
  stateTransitionsDescription: "跟踪值随时间变化的情况。",
  studioPlaybackPerformance: "Studio - 播放性能",
  studioPlaybackPerformanceDescription: "显示回放和数据流式处理性能统计信息。",
  tab: "选项卡",
  tabDescription: "将面板分组在选项卡界面中。",
  table: "表格",
  tableDescription: "以表格格式显示主题消息。",
  teleop: "远程操纵",
  teleopDescription: "通过实时连接远程操纵机器人。",
  topicGraph: "主题图",
  topicGraphDescription: "显示活动节点、主题和服务的图形。",
  userScripts: "用户脚本",
  userScriptsDescription: "使用 TypeScript 编写自定义数据转换。以前称为 Node Playground。",
  variableSlider: "变量滑块",
  variableSliderDescription: "更新布局的数字变量值。",
};
