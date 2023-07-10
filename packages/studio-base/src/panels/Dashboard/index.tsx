// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { last, round, cloneDeep } from "lodash";
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
  const { topicPath } = defaultConfig;

  const vehicleDrivingInfo = {
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
      break_light: false,
      dangerous_warning_light: false,
      dipped_beam: false,
      front_fog_light: false,
      left_turn_light: false,
      main_beam: false,
      rear_fog_light: false,
      reverse_direction_light: false,
      right_turn_light: false,
      width_lamp: false,
    },
    self: {
      dtc: "N/A",
      lateral_control_mode: -1,
      longitudinal_control_mode: -1,
      road_error: "N/A",
    },
  };
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

  const [vehicleInfo, setVehicleInfo] = useState(vehicleDrivingInfo);

  useEffect(()=> {
    if (firstCachedMessage) {
      const metaMessage = cloneDeep(firstCachedMessage)
      // console.log(firstCachedMessage, 'firstCachedMessage');
      metaMessage.speed = round(Number(firstCachedMessage.speed), 2)
      metaMessage.accel = round(Number(firstCachedMessage.accel), 2)

      if(firstCachedMessage.expected) {
        metaMessage.expected.expected_speed = round(Number(firstCachedMessage.expected?.expected_speed * 3.6), 3)
        metaMessage.expected.design_speed_limit = round(Number(firstCachedMessage.expected?.design_speed_limit * 3.6), 2)
        metaMessage.expected.expected_accel = round(Number(firstCachedMessage.expected?.expected_accel), 3)
      }

    if(firstCachedMessage.drive_info) {
      metaMessage.drive_info.euler_angle = round(Number(firstCachedMessage.drive_info.euler_angle), 1)
      metaMessage.drive_info.steering_wheel_angle = round(Number(firstCachedMessage.drive_info.steering_wheel_angle), 1)
      metaMessage.drive_info.trailer_transfer = round(Number(firstCachedMessage.drive_info.trailer_transfer), 3)
      metaMessage.drive_info.acc_y = round(Number(firstCachedMessage.drive_info.acc_y), 3)
      metaMessage.drive_info.yaw_rate = round(Number(firstCachedMessage.drive_info.yaw_rate), 4)
    }

      // console.log(metaMessage, 'metaMessage');
      setVehicleInfo(metaMessage);
    }

    // console.log(formatMessage, 'asdasdasdas');
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
                  vehicleInfo.light.left_turn_light ? <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/leftTurnLightActive.svg?url")}
                  /> : <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/leftTurnLight.svg?url")}
                  />
                }
                <span className={"tadviz-turning-angle"}>{vehicleInfo.drive_info.euler_angle}°</span>
                {
                  vehicleInfo.light.right_turn_light ? <img
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
                    return <span className={`${vehicleInfo.drive_info.gear === i ? "tadviz-active" : ''}`} key={i}>{ gear }</span>;
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
                    vehicleInfo.self.lateral_control_mode
                  }
                </div>
              </div>
              <div className={"tadviz-row"}>
                <div className={"tadviz-label"}>纵向控制</div>
                <div className={"tadviz-value"}>
                  {
                    vehicleInfo.self.longitudinal_control_mode
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
                    <BaseProgress percentage={vehicleInfo.drive_info.braking} />
                  </div>
                </div>
                <div className={"tadviz-row tadviz-align-item-center"}>
                  <div className={"tadviz-label tadviz-width-2"}>油门</div>
                  <div className={"tadviz-value tadviz-flex-1"}>
                    <BaseProgress percentage={vehicleInfo.drive_info.throttle} />
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
          <div style={{
            padding: '10px'
          }}>
            <div className={"tadviz-car-light-info tadviz-row tadviz-between tadviz-align-item-center"}>
              <div className={"tadviz-front-distance tadviz-row tadviz-align-item-center"}>
                <span style={{width: '30px'}}>箱锁</span>
                {
                  !vehicleInfo.drive_info.box_locked_on ? <img style={{width: '24px',height: '24px'}}
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/boxLockedOn.svg?url")}
                  />   : <img style={{width: '24px',height: '24px'}}
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/boxLockedOnActive.svg?url")}
                  />
                }
              </div>
              <div className={"tadviz-front-distance tadviz-row tadviz-align-item-center"}>
                <span>idc: </span>
                <span className={`tadviz-idc-point ${ vehicleInfo.idc_ready ? 'tadviz-idc-active': null }`}
                ></span>
                <span>Ready</span>
              </div>
              <div className={"tadviz-indicator-light-list tadviz-row"}>
                {
                  vehicleInfo.light.main_beam ? <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/mainBeamActive.svg?url")}
                  /> : <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/mainBeam.svg?url")}
                  />
                }

                {
                  vehicleInfo.light.dipped_beam ?  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/dippedBeamActive.svg?url")}
                  /> :  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/dippedBeam.svg?url")}
                  />
                }

                {
                  vehicleInfo.light.rear_fog_light ?  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/rearFogLightActive.svg?url")}
                  /> :  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/rearFogLight.svg?url")}
                  />
                }

                {
                  vehicleInfo.light.front_fog_light ?  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/frontFogLightActive.svg?url")}
                  /> :  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/frontFogLight.svg?url")}
                  />
                }


                {
                  vehicleInfo.light.width_lamp ?  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/widthLampActive.svg?url")}
                  /> :  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/widthLamp.svg?url")}
                  />
                }

                {
                  vehicleInfo.light.dangerous_warning_light ?  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/dangerousWarningLightActive.svg?url")}
                  /> :  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/dangerousWarningLight.svg?url")}
                  />
                }

                {
                  vehicleInfo.light.break_light ?  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/breakLightActive.svg?url")}
                  /> :  <img
                    src={require("@foxglove/studio-base/assets/images/VehicleDrivingInformation/breakLight.svg?url")}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </>
  );
}

Dashboard.panelType = "Dashboard";
Dashboard.defaultConfig = defaultConfig;

export default Panel(Dashboard);
