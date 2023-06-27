// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { last } from "lodash";
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  MessagePipelineContext,
  useMessagePipeline,
} from "@foxglove/studio-base/components/MessagePipeline";

import { MessageEvent, PanelExtensionContext, SettingsTreeAction } from "@foxglove/studio";
import { RosPath } from "@foxglove/studio-base/components/MessagePathSyntax/constants";
import parseRosPath from "@foxglove/studio-base/components/MessagePathSyntax/parseRosPath";
import { simpleGetMessagePathDataItems } from "@foxglove/studio-base/components/MessagePathSyntax/simpleGetMessagePathDataItems";
import { turboColorString } from "@foxglove/studio-base/util/colorUtils";
import { BaseProgress } from "./BaseProgress";

import { settingsActionReducer, useSettingsTree } from "./settings";
import type { Config } from "./types";
import Stack from "@foxglove/studio-base/components/Stack";
import "./dashboard.css";
import { Topic } from "@foxglove/studio-base/players/types";
// import { useDataSourceInfo } from "@foxglove/studio-base/PanelAPI";
import { useMessageDataItem } from "@foxglove/studio-base/components/MessagePathSyntax/useMessageDataItem";
import { useMessagesByTopic } from "@foxglove/studio-base/PanelAPI";
import { useCachedGetMessagePathDataItems } from "@foxglove/studio-base/components/MessagePathSyntax/useCachedGetMessagePathDataItems";
import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";

type Props = {
  context: PanelExtensionContext;
};

const defaultConfig: Config = {
  topicPath: "/utosim/dashboard",
};

type State = {
  path: string;
  parsedPath: RosPath | undefined;
  latestMessage: MessageEvent | undefined;
  latestMatchingQueriedData: unknown | undefined;
  error: Error | undefined;
  pathParseError: string | undefined;
};

type Action =
  | { type: "frame"; messages: readonly MessageEvent[] }
  | { type: "path"; path: string }
  | { type: "seek" };

function getSingleDataItem(results: unknown[]) {
  if (results.length <= 1) {
    return results[0];
  }
  throw new Error("Message path produced multiple results");
}

function reducer(state: State, action: Action): State {
  try {
    switch (action.type) {
      case "frame": {
        if (state.pathParseError != undefined) {
          return { ...state, latestMessage: last(action.messages), error: undefined };
        }
        let latestMatchingQueriedData = state.latestMatchingQueriedData;
        let latestMessage = state.latestMessage;
        if (state.parsedPath) {
          for (const message of action.messages) {
            if (message.topic !== state.parsedPath.topicName) {
              continue;
            }
            const data = getSingleDataItem(
              simpleGetMessagePathDataItems(message, state.parsedPath),
            );
            if (data != undefined) {
              latestMatchingQueriedData = data;
              latestMessage = message;
            }
          }
        }
        return { ...state, latestMessage, latestMatchingQueriedData, error: undefined };
      }
      case "path": {
        const newPath = parseRosPath(action.path);
        let pathParseError: string | undefined;
        if (
          newPath?.messagePath.some(
            (part) =>
              (part.type === "filter" && typeof part.value === "object") ||
              (part.type === "slice" &&
                (typeof part.start === "object" || typeof part.end === "object")),
          ) === true
        ) {
          pathParseError = "Message paths using variables are not currently supported";
        }
        let latestMatchingQueriedData: unknown | undefined;
        let error: Error | undefined;
        try {
          latestMatchingQueriedData =
            newPath && pathParseError == undefined && state.latestMessage
              ? getSingleDataItem(simpleGetMessagePathDataItems(state.latestMessage, newPath))
              : undefined;
        } catch (err) {
          error = err;
        }
        return {
          ...state,
          path: action.path,
          parsedPath: newPath,
          latestMatchingQueriedData,
          error,
          pathParseError,
        };
      }
      case "seek":
        return {
          ...state,
          latestMessage: undefined,
          latestMatchingQueriedData: undefined,
          error: undefined,
        };
    }
  } catch (error) {
    return { ...state, latestMatchingQueriedData: undefined, error };
  }
}

const gearObject = {
  0: "ERROR",
  1: "S",
  2: "W",
  3: "M",
  4: "NONE",
  5: "D",
  6: "N",
  7: "R",
  8: "P",
};
const gearList = Object.values(gearObject);

const lateralControlModeTxt = [
  "INVALID",
  "LANE_FOLLOW",
  "CRAB_DRIVE",
  "LANE_CHANGE",
];
const longitudinalControlModeTxt = [
  "INVALID",
  "SPEED_MODE",
  "ACC_MODE",
  "DISTANCE_MODE",
  "PRECISE_MOVE_MODE",
];
const behavior_typeTxt = {
  0: "INVALID",
  1: "LANE_KEEP",
  20: "BREAKTHROUGH",
  31: "LEFT_LANE_CHANGE_PREPARE",
  32: "RIGHT_LANE_CHANGE_PREPARE",
  41: "LEFT_LANE_CHANGE",
  42: "RIGHT_LANE_CHANGE",
  51: "LEFT_LANE_CHANGE_HOLD",
  52: "RIGHT_LANE_CHANGE_HOLD",
  61: "LEFT_LANE_CHANGE_CANCEL",
  62: "RIGHT_LANE_CHANGE_CANCEL",
};

const desiredGearTxt = [
  "GEAR_ERROR",
  "GEAR_SPORT",
  "GEAR_WINTER",
  "GEAR_M",
  "GEAR_NONE",
  "GEAR_DRIVE",
  "GEAR_NEUTRAL",
  "GEAR_REVERSE",
  "GEAR_PARK",
];

function keepDecimalPlaces(num: number | string, decimalPlaces = 3) {
  const copyNum = Number(num);
  if (isNaN(copyNum)) {
    return num;
  }
  const numStr = copyNum.toString();
  const index = numStr.indexOf(".");
  if (index > -1) {
    return numStr.substring(0, index + decimalPlaces + 1);
  }
  return num;
}

function Dashboard({ config, saveConfig }: Props): JSX.Element {
  const { topicPath } = config;
  saveConfig({ topicPath: defaultConfig });

  const topicRosPath: RosPath | undefined = React.useMemo(
    () => parseRosPath(topicPath),
    [topicPath],
  );
  const topicName = topicRosPath?.topicName ?? "";
  const msgs = useMessagesByTopic({ topics: [topicName], historySize: 1 })[topicName];
  const cachedGetMessagePathDataItems = useCachedGetMessagePathDataItems([topicPath]);
  const msg = msgs?.[0];
  const cachedMessages = msg ? cachedGetMessagePathDataItems(topicPath, msg) ?? [] : [];
  const firstCachedMessage = cachedMessages[0]?.value;

  const vehicleDrivingInfo = ({
    speed: "N/A",
    accel: "N/A",
    idc_ready: false,
    behavior_type: "N/A",
    car_info: {
      carId: "N/A",
      planner: "N/A",
    },
    drive_info: {
      auto_drive: false,
      drive_mode: 0,
      gear: "N/A",
      steering_wheel_angle: "N/A",
      trailer_transfer: "N/A",
      euler_angle: "N/A",
      braking: 0,
      throttle: 0,
      acc_y: 0,
      yaw_rate: 0,
      box_locked_on: false,
    },
    expected: {
      expected_speed: "N/A",
      expected_accel: "N/A",
      desired_gear: -1,
      design_speed_limit: "N/A",
    },
    front_distance: "N/A",
    light: {
      breakLight: false,
      dangerousWarningLight: false,
      dippedBeam: false,
      mainBeam: false,
      frontFogLight: false,
      rearFogLight: false,
      leftTurnLight: false,
      rightTurnLight: false,
      reverseDirectionLight: false,
      widthLamp: false,
    },
    self: {
      dtc: "N/A",
      lateral_control_mode: -1,
      longitudinal_control_mode: -1,
      road_error: "N/A",
    },
  })
  const [vehicleInfo, setVehicleInfo] = useState(vehicleDrivingInfo)

  useEffect(()=> {
    setVehicleInfo(firstCachedMessage || vehicleDrivingInfo)
  }, [firstCachedMessage])

  return (
    <>
      <PanelToolbar />
      <Stack fullHeight overflowY="auto">
        <div className={"tadviz-vehicle-driving-information"}>
          <div className={"tadviz-charts"}>
            <div className={"tadviz-speed-chart tadviz-row tadviz-align-item-center"}>
              <div className={"tadviz-speed"}>{vehicleInfo.speed}</div>
            </div>
            <div className={"tadviz-vehicle-angle-chart"}>
              <div className={"tadviz-turn-corner tadviz-row tadviz-between tadviz-align-item-center"}>
                {
                  vehicleInfo.light.leftTurnLight ? <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/leftTurnLightActive.svg?url")}
                  /> : <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/leftTurnLight.svg?url")}
                  />
                }
                <span className={"tadviz-turning-angle"}>{vehicleInfo.drive_info.euler_angle}°</span>
                {
                  vehicleInfo.light.rightTurnLight ? <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/rightTurnLightActive.svg?url")}
                  /> : <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/rightTurnLight.svg?url")}
                  />
                }
              </div>
              <div id={"selfScene"} className={"tadviz-heading-angle"}></div>
              <div className={"tadviz-gear tadviz-row tadviz-between"}>
                <img
                  className={"tadviz-curve"}
                  src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/curve.svg?url")}
                />
                {
                  gearList.map((gear, i) => {
                    return <span className={"tadviz-active"} key={i}>{ gear }</span>;
                  })
                }
              </div>
            </div>
            <div className={"tadviz-accel-chart"}>
              <div className={"tadviz-accel"}>{vehicleInfo.accel}</div>
            </div>
          </div>
          <div className={"tadviz-driving-info"}>
            <div className={"tadviz-car-info-left"}>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>Planner</div>
                <div className={"tadviz-value"}>
                  { vehicleInfo.car_info.planner }
                </div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>期望速度</div>
                <div className={"tadviz-value"}>
                  { vehicleInfo.expected.expected_speed } km/h
                </div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>期望加速度</div>
                <div className={"tadviz-value"}>
                  { vehicleInfo.expected.expected_accel } m/s²
                </div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>期望限速</div>
                <div className={"tadviz-value"}>
                  { vehicleInfo.expected.design_speed_limit } km/h
                </div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>期望挡位</div>
                <div className={"tadviz-value"}>
                  {
                    desiredGearTxt[vehicleInfo.expected.desired_gear] || "N/A"
                  }
                </div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>横向控制</div>
                <div className={"tadviz-value"}>
                  {
                    lateralControlModeTxt[
                      vehicleInfo.self.lateral_control_mode
                      ] || "N/A"
                  }
                </div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>纵向控制</div>
                <div className={"tadviz-value"}>
                  {
                    longitudinalControlModeTxt[
                      vehicleInfo.self.longitudinal_control_mode
                      ] || "N/A"
                  }
                </div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>DTC</div>
                <div className={"tadviz-value"}>{ vehicleInfo.self.dtc }</div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>换道信息</div>
                <div className={"tadviz-value"}>
                  { behavior_typeTxt[vehicleInfo.behavior_type] || "N/A" }
                </div>
              </div>
            </div>
            <div className={"tadviz-driving-info-right"}>
              <div className={"tadviz-info"}>
                <div className={"tadviz-row tadviz-between"}>
                  <div className={"steering-wheel"}>
                    <img
                      src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/steering-wheel/0.svg?url")}
                      style={{
                        transform: `rotateZ(${-vehicleInfo.drive_info
                          .steering_wheel_angle}deg)`
                      }}
                    />
                  </div>
                  <div className={"tadviz-angle-info"}>
                    <div className={"tadviz-row"}>
                      <div className={"tadviz-label"}>方向盘转角</div>
                      <div className={"tadviz-value"}>
                        { vehicleInfo.drive_info.steering_wheel_angle } °
                      </div>
                    </div>
                    <div className={"tadviz-row"}>
                      <div className={"tadviz-label"}>挂车转角</div>
                      <div className={"tadviz-value"}>
                        { vehicleInfo.drive_info.trailer_transfer } °
                      </div>
                    </div>
                    <div className={"tadviz-row"}>
                      <div className={"tadviz-label"}>横向误差</div>
                      <div className={"tadviz-value"}>
                        { keepDecimalPlaces(vehicleInfo.self.road_error) }
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"tadviz-row tadviz-align-item-center"}>
                  <div className={"tadviz-label tadviz-width-2"}>制动</div>
                  <div className={"tadviz-value tadviz-flex-1"}>
                    <BaseProgress />
                  </div>
                </div>
                <div className={"tadviz-row tadviz-align-item-center"}>
                  <div className={"tadviz-label tadviz-width-2"}>油门</div>
                  <div className={"tadviz-value tadviz-flex-1"}>
                    <BaseProgress />
                  </div>
                </div>
              </div>
              <div className={"tadviz-driving-expected"}>
                <div className={"tadviz-row"}>
                  <div className={"tadviz-label"}>横向加速度</div>
                  <div className={"tadviz-value"}>
                    { vehicleInfo.drive_info.acc_y } m/s²
                  </div>
                </div>
                <div className={"tadviz-row"}>
                  <div className={"tadviz-label"}>横摆角速度</div>
                  <div className={"tadviz-value"}>
                    { vehicleInfo.drive_info.yaw_rate } rad/s
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<div*/}
          {/*  className="tadviz-car-light-info tadviz-row tadviz-between tadviz-align-item-center"*/}
          {/*>*/}
          {/*  <div className="tadviz-front-distance tadviz-row tadviz-align-item-center">*/}
          {/*    <span>箱锁</span>*/}
          {/*    <el-icon>*/}
          {/*      <svg*/}
          {/*        v-if="!vehicleDrivingInfo.drivingInfo.box_locked_on"*/}
          {/*        t="1661839696953"*/}
          {/*        className="icon"*/}
          {/*        style="*/}
          {/*              vertical-align: middle;*/}
          {/*              fill: currentColor;*/}
          {/*              overflow: hidden;*/}
          {/*            "*/}
          {/*        viewBox="0 0 1024 1024"*/}
          {/*        version="1.1"*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        p-id="2376"*/}
          {/*        data-spm-anchor-id="a313x.7781069.0.i0"*/}
          {/*      >*/}
          {/*        <path*/}
          {/*          d="M753.845117 371.674021l-17.46272 0 0-83.669608c0-59.275012-22.62837-115.203812-63.715137-157.482731-42.170448-43.394323-99.369172-67.291592-161.058163-67.291592-126.040624 0-224.772276 98.731652-224.772276 224.7733l0 83.669608-16.680914 0c-62.788022 0-113.688295 50.900274-113.688295 113.688295L156.467611 842.961784c0 62.788022 50.900274 113.688295 113.688295 113.688295l483.690234 0c62.788022 0 113.688295-50.900274 113.688295-113.688295L867.534436 485.362316C867.532389 422.574295 816.633139 371.674021 753.845117 371.674021zM328.176344 288.005436c0-102.858646 80.573083-183.432753 183.431729-183.432753 50.423413 0 97.093339 19.447934 131.410935 54.762231 33.547047 34.519188 52.021817 80.214926 52.021817 128.670521l0 83.669608L328.176344 371.675044 328.176344 288.005436zM826.191842 842.961784c0 39.956014-32.390711 72.346725-72.346725 72.346725L270.154883 915.308509c-39.956014 0-72.346725-32.390711-72.346725-72.346725L197.808158 485.362316c0-39.956014 32.390711-72.346725 72.346725-72.346725l483.690234 0c39.956014 0 72.346725 32.390711 72.346725 72.346725L826.191842 842.961784z"*/}
          {/*          p-id="2377"*/}
          {/*        ></path>*/}
          {/*        <path*/}
          {/*          d="M509.932921 580.446905c-11.416004 0-20.670785 9.254781-20.670785 20.670785l0 109.554138c0 11.414981 9.254781 20.670785 20.670785 20.670785 11.416004 0 20.670785-9.254781 20.670785-20.670785L530.603707 601.116667C530.602683 589.701686 521.348925 580.446905 509.932921 580.446905z"*/}
          {/*          p-id="2378"*/}
          {/*        ></path>*/}
          {/*      </svg>*/}
          {/*      <svg*/}
          {/*        v-else*/}
          {/*        t="1661839748273"*/}
          {/*        className="icon tadviz-box-locked-active"*/}
          {/*        style="*/}
          {/*              vertical-align: middle;*/}
          {/*              fill: currentColor;*/}
          {/*              overflow: hidden;*/}
          {/*            "*/}
          {/*        viewBox="0 0 1024 1024"*/}
          {/*        version="1.1"*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        p-id="2517"*/}
          {/*      >*/}
          {/*        <path*/}
          {/*          d="M757.810429 373.751333 325.645708 373.751333l0-83.895759c0-103.694687 81.507362-184.922686 185.559183-184.922686 78.121242 0 146.053424 46.74565 173.062568 119.090329 3.865028 10.352789 15.384385 15.609513 25.742291 11.746532 10.351766-3.866051 15.609513-15.390525 11.744485-25.742291C688.844707 121.877815 606.198405 64.918545 511.204891 64.918545c-61.918211 0-119.246895 23.662933-161.423483 66.63156-41.3692 42.142819-64.151066 98.363262-64.151066 158.305469l0 83.895759-20.007683 0c-60.774155 0-110.042255 49.267077-110.042255 110.042255l0 366.139981c0 60.774155 49.267077 110.042255 110.042255 110.042255l492.187769 0c60.775178 0 110.042255-49.267077 110.042255-110.042255L867.852684 483.793588C867.852684 423.01841 818.585607 373.751333 757.810429 373.751333zM827.837318 849.933569c0 38.674834-31.352055 70.02689-70.02689 70.02689L265.62266 919.960459c-38.674834 0-70.02689-31.352055-70.02689-70.02689L195.59577 483.793588c0-38.674834 31.352055-70.02689 70.02689-70.02689l492.187769 0c38.674834 0 70.02689 31.352055 70.02689 70.02689L827.837318 849.933569z"*/}
          {/*          p-id="2518"*/}
          {/*        ></path>*/}
          {/*        <path*/}
          {/*          d="M509.715981 583.832002c-11.048637 0-20.007683 8.959046-20.007683 20.007683l0 110.042255c0 11.048637 8.958022 20.007683 20.007683 20.007683s20.007683-8.958022 20.007683-20.007683L529.723663 603.839685C529.723663 592.790024 520.765641 583.832002 509.715981 583.832002z"*/}
          {/*          p-id="2519"*/}
          {/*        ></path>*/}
          {/*      </svg>*/}
          {/*    </el-icon>*/}
          {/*  </div>*/}
          {/*  <div className="tadviz-front-distance tadviz-row tadviz-align-item-center">*/}
          {/*    <span>idc: </span>*/}
          {/*    <span*/}
          {/*      className="tadviz-idc-point"*/}
          {/*    :className="{ 'tadviz-idc-active': vehicleDrivingInfo.idc_ready }"*/}
          {/*  ></span>*/}
          {/*  <span>Ready</span>*/}
          {/*</div>*/}
          {/*<div className="tadviz-indicator-light-list tadviz-row">*/}
          {/*  <img*/}
          {/*    v-if="vehicleDrivingInfo.light.mainBeam"*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/mainBeamActive.svg"*/}
          {/*  />*/}
          {/*  <img*/}
          {/*    v-else*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/mainBeam.svg"*/}
          {/*  />*/}

          {/*  <img*/}
          {/*    v-if="vehicleDrivingInfo.light.dippedBeam"*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/dippedBeamActive.svg"*/}
          {/*  />*/}
          {/*  <img*/}
          {/*    v-else*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/dippedBeam.svg"*/}
          {/*  />*/}

          {/*  <img*/}
          {/*    v-if="vehicleDrivingInfo.light.rearFogLight"*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/rearFogLightActive.svg"*/}
          {/*  />*/}
          {/*  <img*/}
          {/*    v-else*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/rearFogLight.svg"*/}
          {/*  />*/}

          {/*  <img*/}
          {/*    v-if="vehicleDrivingInfo.light.frontFogLight"*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/frontFogLightActive.svg"*/}
          {/*  />*/}
          {/*  <img*/}
          {/*    v-else*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/frontFogLight.svg"*/}
          {/*  />*/}

          {/*  <img*/}
          {/*    v-if="vehicleDrivingInfo.light.widthLamp"*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/widthLampActive.svg"*/}
          {/*  />*/}
          {/*  <img*/}
          {/*    v-else*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/widthLamp.svg"*/}
          {/*  />*/}

          {/*  <img*/}
          {/*    v-if="vehicleDrivingInfo.light.dangerousWarningLight"*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/dangerousWarningLightActive.svg"*/}
          {/*  />*/}
          {/*  <img*/}
          {/*    v-else*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/dangerousWarningLight.svg"*/}
          {/*  />*/}

          {/*  <img*/}
          {/*    v-if="vehicleDrivingInfo.light.breakLight"*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/breakLightActive.svg"*/}
          {/*  />*/}
          {/*  <img*/}
          {/*    v-else*/}
          {/*    src="@/assets/images/VehicleDrivingInformation/breakLight.svg"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </Stack>
    </>
  );
}

Dashboard.panelType = "Dashboard";
Dashboard.defaultConfig = defaultConfig;

export default Panel(Dashboard);
