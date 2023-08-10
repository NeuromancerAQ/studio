// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { LayoutData } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
import { defaultPlaybackConfig } from "@foxglove/studio-base/providers/CurrentLayoutProvider/reducers";

/**
 * Overridden default layout that may have been provided when self-hosting via Docker
 * */
const staticDefaultLayout = (globalThis as { FOXGLOVE_STUDIO_DEFAULT_LAYOUT?: LayoutData })
  .FOXGLOVE_STUDIO_DEFAULT_LAYOUT;

/**
 * This is loaded when the user has no layout selected on application launch
 * to avoid presenting the user with a blank layout.
 */
// export const defaultLayout: LayoutData =
//   staticDefaultLayout ??
//   ({
//     configById: {
//       "3D!18i6zy7": {
//         layers: {
//           "845139cb-26bc-40b3-8161-8ab60af4baf5": {
//             visible: true,
//             frameLocked: true,
//             label: "Grid",
//             instanceId: "845139cb-26bc-40b3-8161-8ab60af4baf5",
//             layerId: "foxglove.Grid",
//             size: 10,
//             divisions: 10,
//             lineWidth: 1,
//             color: "#248eff",
//             position: [0, 0, 0],
//             rotation: [0, 0, 0],
//             order: 1,
//           },
//         },
//       },
//       "RawMessages!os6rgs": {},
//       "Image!3mnp456": {},
//     },
//     globalVariables: {},
//     userNodes: {},
//     playbackConfig: { ...defaultPlaybackConfig },
//     layout: {
//       first: "3D!18i6zy7",
//       second: {
//         first: "Image!3mnp456",
//         second: "RawMessages!os6rgs",
//         direction: "column",
//         splitPercentage: 30,
//       },
//       direction: "row",
//       splitPercentage: 70,
//     },
//   } as const);

export const defaultLayout: LayoutData =
  staticDefaultLayout ??
  ({
    "configById": {
      "3D!mm4c9j": {
        "cameraState": {
          "perspective": false,
          "distance": 75.89554049203123,
          "phi": 45.217670494108305,
          "thetaOffset": 67.70164220755257,
          "targetOffset": [
            9.60864183022714,
            5.302787515265507,
            -2.290271183936789e-16
          ],
          "target": [
            0,
            0,
            0
          ],
          "targetOrientation": [
            0,
            0,
            0,
            1
          ],
          "fovy": 45,
          "near": 0.5,
          "far": 5000
        },
        "followMode": "follow-pose",
        "scene": {},
        "transforms": {
          "frame:EGO": {
            "visible": false
          },
          "frame:EGO_SHADOW": {
            "visible": false
          }
        },
        "topics": {
          "/map": {
            "visible": true
          },
          "/locator/vehicle_pose": {
            "visible": true
          },
          "/locator/vehicle_pose_org": {
            "visible": true
          },
          "/perception/cam_bcb/image/compressed_org": {
            "visible": false
          },
          "/perception/cam_fcf/image/compressed_org": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/perception/fused_objects_org": {
            "visible": true
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "distance",
            "colorMode": "colormap",
            "colorMap": "rainbow"
          },
          "/perception/perception_gates": {
            "visible": true
          },
          "/perception/perception_parking_slots": {
            "visible": true
          },
          "/perception/perception_traffic_signals": {
            "visible": true
          },
          "/perception/predicted_objects": {
            "visible": true
          },
          "/perception/predicted_objects_org": {
            "visible": true
          },
          "/planning/planning_visualization/base": {
            "visible": true
          },
          "/planning/planning_visualization_org/base": {
            "visible": true
          },
          "/task_manager/task_path": {
            "visible": true
          },
          "/utosim/trailer/pose": {
            "visible": true
          },
          "/utosim/trailer/pose_org": {
            "visible": true
          }
        },
        "layers": {},
        "publish": {
          "type": "point",
          "poseTopic": "/move_base_simple/goal",
          "pointTopic": "/clicked_point",
          "poseEstimateTopic": "/initialpose",
          "poseEstimateXDeviation": 0.5,
          "poseEstimateYDeviation": 0.5,
          "poseEstimateThetaDeviation": 0.26179939
        },
        "imageMode": {},
        "followTf": "EGO"
      },
      "RawMessages!2gb4krm": {
        "diffEnabled": false,
        "diffMethod": "custom",
        "diffTopicPath": "",
        "showFullMessageForDiff": false,
        "topicPath": "/planning/planning_result.old_control_command"
      },
      "Table!oldmmq": {
        "topicPath": "/utosim/agent_service_info"
      },
      "RosOut!3ag34y6": {
        "searchTerms": [],
        "minLogLevel": 1
      },
      "StateTransitions!16nc52k": {
        "paths": [
          {
            "value": "/utosim/dashboard.drive_info.drive_mode",
            "timestampMethod": "receiveTime"
          }
        ],
        "isSynced": true
      },
      "Tab!kijew7": {
        "activeTabIdx": 0,
        "tabs": [
          {
            "title": "3D Viz",
            "layout": "3D!mm4c9j"
          },
          {
            "title": "Dev Debug",
            "layout": {
              "first": "RawMessages!2gb4krm",
              "second": {
                "first": "Table!oldmmq",
                "second": {
                  "first": "RosOut!3ag34y6",
                  "second": "StateTransitions!16nc52k",
                  "direction": "column",
                  "splitPercentage": 77.04347826086956
                },
                "direction": "column"
              },
              "direction": "row",
              "splitPercentage": 31.68762483472586
            }
          }
        ]
      },
      "Image!3mnp456": {
        "cameraState": {
          "distance": 20,
          "perspective": true,
          "phi": 60,
          "target": [
            0,
            0,
            0
          ],
          "targetOffset": [
            0,
            0,
            0
          ],
          "targetOrientation": [
            0,
            0,
            0,
            1
          ],
          "thetaOffset": 45,
          "fovy": 45,
          "near": 0.5,
          "far": 5000
        },
        "followMode": "follow-pose",
        "scene": {},
        "transforms": {},
        "topics": {},
        "layers": {},
        "publish": {
          "type": "point",
          "poseTopic": "/move_base_simple/goal",
          "pointTopic": "/clicked_point",
          "poseEstimateTopic": "/initialpose",
          "poseEstimateXDeviation": 0.5,
          "poseEstimateYDeviation": 0.5,
          "poseEstimateThetaDeviation": 0.26179939
        },
        "imageMode": {
          "imageTopic": "/hal/sensor_raw/cam_fcf_jpeg_org"
        }
      },
      "Dashboard!2p3l8b8": {},
      "StPoligonGraph!42u2mvn": {}
    },
    "globalVariables": {},
    "userNodes": {},
    "playbackConfig": {
      "speed": 1
    },
    "layout": {
      "first": "Tab!kijew7",
      "second": {
        "first": "Image!3mnp456",
        "second": {
          "first": "Dashboard!2p3l8b8",
          "second": "StPoligonGraph!42u2mvn",
          "direction": "column",
          "splitPercentage": 63.17991631799165
        },
        "direction": "column",
        "splitPercentage": 19.915254237288135
      },
      "direction": "row",
      "splitPercentage": 69.13730255164035
    }
  } as const);
