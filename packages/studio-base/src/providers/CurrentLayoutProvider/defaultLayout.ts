// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { LayoutData } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
// import { defaultPlaybackConfig } from "@foxglove/studio-base/providers/CurrentLayoutProvider/reducers";

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
          "distance": 163.81821098847266,
          "perspective": false,
          "phi": 44.133157129555585,
          "target": [
            0,
            0,
            0
          ],
          "targetOffset": [
            29.138822067599175,
            -0.01890365867590854,
            1.330928237019518e-16
          ],
          "targetOrientation": [
            0,
            0,
            0,
            1
          ],
          "thetaOffset": 0.23642880022607546,
          "fovy": 45,
          "near": 0.5,
          "far": 5000
        },
        "followMode": "follow-pose",
        "scene": {
          "transforms": {
            "editable": false,
            "axisScale": 1
          },
          "labelScaleFactor": 1
        },
        "transforms": {
          "frame:EGO": {
            "visible": false
          },
          "frame:EGO_SHADOW": {
            "visible": false
          },
          "frame:map": {
            "visible": false
          },
          "frame:/cam_bcb": {
            "visible": false
          },
          "frame:/cam_fcf": {
            "visible": false
          },
          "frame:/cam_fcf_far": {
            "visible": false
          },
          "frame:/cam_flb": {
            "visible": false
          },
          "frame:/cam_flf": {
            "visible": false
          },
          "frame:/cam_frb": {
            "visible": false
          },
          "frame:/cam_frf": {
            "visible": false
          },
          "frame:F": {
            "visible": false
          },
          "frame:F_Org": {
            "visible": false
          },
          "frame:Per": {
            "visible": false
          },
          "frame:Per_Org": {
            "visible": false
          },
          "frame:Plan": {
            "visible": false
          },
          "frame:PlanOrg": {
            "visible": false
          },
          "frame:Freespace": {
            "xyzOffset": [
              0,
              null,
              null
            ],
            "visible": false
          },
          "frame:LidarFS": {
            "visible": false
          },
          "frame:F_Truth_Org": {
            "visible": false
          },
          "frame:FreespaceTruth": {
            "visible": false
          },
          "frame:Gate": {
            "visible": false
          },
          "frame:ParkingLot": {
            "visible": false
          },
          "frame:PLS": {
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
            "colorField": "_auto_distance",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 5
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
          },
          "/perception/fused_objects_truth": {
            "visible": true
          },
          "/prediction/prediction_obstacles": {
            "visible": true
          },
          "/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/calib/cam_fcf_org": {
            "visible": false
          },
          "/hal/sensor/cam_fcf_jpeg_org": {
            "visible": false
          },
          "/perception/camera_locator_sign": {
            "visible": true
          },
          "/perception/lidar_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "turbo",
            "flatColor": "#24ff00ff",
            "pointSize": 5
          },
          "/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/utosim/task_manager/task_request_list": {
            "visible": true
          },
          "/utosim/multi_ego": {
            "visible": true
          },
          "/perception/freespace_truth": {
            "visible": false,
            "colorField": "z",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/planning/planning_visualization_org/interactive_decision_org": {
            "visible": true
          },
          "/region/task_manager/task_request_list": {
            "visible": true
          },
          "/router/routing": {
            "visible": true
          },
          "/utosim/perception/perception_traffic_signals": {
            "visible": true
          },
          "/utosim/task_manager/task_path": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose_org": {
            "visible": true
          },
          "/sim_viz/perception/camera_locator_sign": {
            "visible": true
          },
          "/sim_viz/perception/freespace_truth": {
            "visible": false,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/fused_objects": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_org": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_truth": {
            "visible": true
          },
          "/sim_viz/perception/lidar_freespace": {
            "visible": false
          },
          "/sim_viz/perception/perception_freespace": {
            "visible": true,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/sim_viz/perception/perception_gates": {
            "visible": true
          },
          "/sim_viz/perception/perception_parking_slots": {
            "visible": true
          },
          "/sim_viz/perception/perception_traffic_signals": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization": {
            "visible": false
          },
          "/sim_viz/planning/planning_visualization/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/path": {
            "visible": false
          },
          "/sim_viz/planning/planning_visualization_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/interactive_decision": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/sim_viz/region/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/router/routing": {
            "visible": true
          },
          "/sim_viz/task_manager/task_path": {
            "visible": true
          },
          "/sim_viz/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/trailer_angle": {
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
      "3D!wwlbug": {
        "cameraState": {
          "perspective": true,
          "distance": 108.6803481878678,
          "phi": 69.4493384006952,
          "thetaOffset": 84.71462759744888,
          "targetOffset": [
            24.585204732890308,
            4.766618460608199,
            1.7588491581190615e-15
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
        "followTf": "EGO",
        "scene": {},
        "transforms": {
          "frame:map": {
            "visible": false
          },
          "frame:EGO": {
            "visible": false
          },
          "frame:F": {
            "visible": false
          },
          "frame:F_Truth_Org": {
            "visible": false
          },
          "frame:Freespace": {
            "visible": false
          },
          "frame:FreespaceTruth": {
            "visible": false
          },
          "frame:Gate": {
            "visible": false
          },
          "frame:ParkingLot": {
            "visible": false
          },
          "frame:Per": {
            "visible": false
          },
          "frame:Plan": {
            "visible": false
          },
          "frame:PLS": {
            "visible": false
          }
        },
        "topics": {
          "/utosim/trailer/pose_org": {
            "visible": true
          },
          "/utosim/trailer/pose": {
            "visible": true
          },
          "/task_manager/task_path": {
            "visible": true
          },
          "/planning/planning_visualization_org/base": {
            "visible": true
          },
          "/planning/planning_visualization/base": {
            "visible": true
          },
          "/perception/predicted_objects_org": {
            "visible": true
          },
          "/perception/predicted_objects": {
            "visible": true
          },
          "/perception/perception_traffic_signals": {
            "visible": true
          },
          "/perception/perception_parking_slots": {
            "visible": true
          },
          "/perception/perception_gates": {
            "visible": true
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 4
          },
          "/perception/fused_objects_truth": {
            "visible": true
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/map": {
            "visible": true
          },
          "/perception/fused_objects_org": {
            "visible": true
          },
          "/locator/vehicle_pose_org": {
            "visible": true
          },
          "/locator/vehicle_pose": {
            "visible": true
          },
          "/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/planning/planning_visualization/path": {
            "visible": false
          },
          "/planning/planning_visualization_org/interactive_decision_org": {
            "visible": true
          },
          "/prediction/prediction_obstacles": {
            "visible": true
          },
          "/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/region/task_manager/task_request_list": {
            "visible": true
          },
          "/router/routing": {
            "visible": true
          },
          "/sensor_table/sensor_table": {
            "visible": true
          },
          "/utosim/perception/perception_traffic_signals": {
            "visible": true
          },
          "/utosim/task_manager/task_path": {
            "visible": true
          },
          "/utosim/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose_org": {
            "visible": true
          },
          "/sim_viz/perception/camera_locator_sign": {
            "visible": true
          },
          "/sim_viz/perception/freespace_truth": {
            "visible": false,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/fused_objects": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_org": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_truth": {
            "visible": true
          },
          "/sim_viz/perception/perception_freespace": {
            "visible": true,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/sim_viz/perception/perception_gates": {
            "visible": true
          },
          "/sim_viz/perception/perception_parking_slots": {
            "visible": true
          },
          "/sim_viz/perception/perception_traffic_signals": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/trailer_angle": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/interactive_decision": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/sim_viz/region/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/router/routing": {
            "visible": true
          },
          "/sim_viz/task_manager/task_path": {
            "visible": true
          },
          "/sim_viz/task_manager/task_request_list": {
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
        "imageMode": {}
      },
      "Image!i6n8z6": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_flf_jpeg_org",
          "calibrationTopic": "/calib/cam_flf_org",
          "annotations": {
            "/perception/cam_flf/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_flf/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!repnyh": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_fcf_far_jpeg_org",
          "calibrationTopic": "/calib/cam_fcf_far_org",
          "annotations": {
            "/perception/cam_fcf_far/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_fcf_far/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!3e2nwm8": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_frf_jpeg_org",
          "calibrationTopic": "/calib/cam_frf_org",
          "annotations": {
            "/perception/cam_frf/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_frf/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!2kzik9r": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_fcf_jpeg_org",
          "calibrationTopic": "/calib/cam_fcf_org",
          "annotations": {
            "/perception/cam_fcf/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_fcf/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!gi5pm6": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_flb_jpeg_org",
          "calibrationTopic": "/calib/cam_flb_org",
          "annotations": {
            "/perception/cam_flb/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_flb/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!4kmlfdq": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_bcb_jpeg_org",
          "annotations": {
            "/perception/cam_bcb/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_bcb/camera_obstacle_ori_org": {
              "visible": true
            }
          },
          "calibrationTopic": "/calib/cam_bcb_org"
        }
      },
      "Image!3kxnfkq": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_frb_jpeg_org",
          "calibrationTopic": "/calib/cam_frb_org",
          "annotations": {
            "/perception/cam_frb/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_frb/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "3D!49s3i8s": {
        "cameraState": {
          "perspective": true,
          "distance": 88.52082285122253,
          "phi": 42.85718470982174,
          "thetaOffset": 129.34285714285792,
          "targetOffset": [
            1.9469135875157775,
            -0.31272300709162704,
            2.2482280961763336e-16
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
          "frame:map": {
            "visible": false
          },
          "frame:EGO": {
            "visible": false
          },
          "frame:F": {
            "visible": false
          },
          "frame:F_Truth_Org": {
            "visible": false
          },
          "frame:Freespace": {
            "visible": false
          },
          "frame:FreespaceTruth": {
            "visible": false
          },
          "frame:Gate": {
            "visible": false
          },
          "frame:ParkingLot": {
            "visible": false
          },
          "frame:Per": {
            "visible": false
          },
          "frame:Plan": {
            "visible": false
          },
          "frame:PLS": {
            "visible": false
          }
        },
        "topics": {
          "/locator/vehicle_pose": {
            "visible": true
          },
          "/locator/vehicle_pose_org": {
            "visible": true
          },
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/perception/fused_objects_org": {
            "visible": true
          },
          "/perception/fused_objects_truth": {
            "visible": true
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 4
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
          },
          "/calib/cam_bcb": {
            "visible": true
          },
          "/calib/cam_bcb_far": {
            "visible": true
          },
          "/calib/cam_blf": {
            "visible": true
          },
          "/calib/cam_brf": {
            "visible": true
          },
          "/calib/cam_fcf": {
            "visible": true
          },
          "/calib/cam_fcf_far": {
            "visible": true
          },
          "/calib/cam_flb": {
            "visible": true
          },
          "/calib/cam_frb": {
            "visible": true
          },
          "/calib/cam_flf": {
            "visible": true
          },
          "/calib/cam_frf": {
            "visible": true
          },
          "/perception/camera_locator_sign": {
            "visible": false
          },
          "/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/planning/planning_visualization/path": {
            "visible": false
          },
          "/planning/planning_visualization_org/interactive_decision_org": {
            "visible": true
          },
          "/prediction/prediction_obstacles": {
            "visible": true
          },
          "/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/region/task_manager/task_request_list": {
            "visible": true
          },
          "/router/routing": {
            "visible": true
          },
          "/sensor_table/sensor_table": {
            "visible": true
          },
          "/utosim/perception/perception_traffic_signals": {
            "visible": true
          },
          "/utosim/task_manager/task_path": {
            "visible": true
          },
          "/utosim/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose_org": {
            "visible": true
          },
          "/sim_viz/perception/camera_locator_sign": {
            "visible": true
          },
          "/sim_viz/perception/freespace_truth": {
            "visible": false,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/fused_objects": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_org": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_truth": {
            "visible": true
          },
          "/sim_viz/perception/lidar_freespace": {
            "visible": false
          },
          "/sim_viz/perception/perception_freespace": {
            "visible": true,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/perception_gates": {
            "visible": true
          },
          "/sim_viz/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/sim_viz/perception/perception_parking_slots": {
            "visible": true
          },
          "/sim_viz/perception/perception_traffic_signals": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/trailer_angle": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/interactive_decision": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/sim_viz/region/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/router/routing": {
            "visible": true
          },
          "/sim_viz/task_manager/task_path": {
            "visible": true
          },
          "/sim_viz/task_manager/task_request_list": {
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
      "Image!2mz6cb4": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_bcb_jpeg_org",
          "calibrationTopic": "/calib/cam_flb_org",
          "annotations": {
            "/perception/cam_flb/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_flb/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!9hs9zm": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_fcf_jpeg_org",
          "calibrationTopic": "/calib/cam_fcf_org",
          "annotations": {
            "/perception/cam_fcf/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_fcf/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!2vlf9ib": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_fcf_far_jpeg_org",
          "calibrationTopic": "/calib/cam_fcf_far_org",
          "annotations": {
            "/perception/cam_fcf_far/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_fcf_far/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!1kjeuld": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_frb_jpeg_org",
          "calibrationTopic": "/calib/cam_frb_org",
          "annotations": {
            "/perception/cam_frb/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_frb/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!225jk63": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
          },
          "/perception/fused_objects_org": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_bcb_jpeg_org",
          "calibrationTopic": "/calib/cam_blf_org",
          "annotations": {
            "/perception/cam_blf/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_blf/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!2y8qhxs": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_bcb_jpeg_org",
          "calibrationTopic": "/calib/cam_bcb_org",
          "annotations": {
            "/perception/cam_bcb/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_bcb/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!4dwjouo": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_bcb_jpeg_org",
          "calibrationTopic": "/calib/cam_bcb_far_org",
          "annotations": {
            "/perception/cam_bcb_far/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_bcb_far/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "Image!1c6s63j": {
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
        "topics": {
          "/map": {
            "visible": false
          },
          "/perception/fused_objects": {
            "visible": false
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_brf_jpeg_org",
          "calibrationTopic": "/calib/cam_brf_org",
          "annotations": {
            "/perception/cam_brf/camera_obstacle_ori": {
              "visible": true
            },
            "/perception/cam_brf/camera_obstacle_ori_org": {
              "visible": true
            }
          }
        }
      },
      "3D!1jfwpeu": {
        "cameraState": {
          "distance": 147.8459354183339,
          "perspective": true,
          "phi": 59.35048352397627,
          "target": [
            0,
            0,
            0
          ],
          "targetOffset": [
            11.219916331202567,
            -8.34335282583491,
            7.202267331698459e-16
          ],
          "targetOrientation": [
            0,
            0,
            0,
            1
          ],
          "thetaOffset": 133.66035182679366,
          "fovy": 45,
          "near": 0.5,
          "far": 5000
        },
        "followMode": "follow-pose",
        "followTf": "EGO",
        "scene": {},
        "transforms": {
          "frame:map": {
            "visible": false
          },
          "frame:EGO": {
            "visible": false
          },
          "frame:F": {
            "visible": false
          },
          "frame:F_Truth_Org": {
            "visible": false
          },
          "frame:Freespace": {
            "visible": false
          },
          "frame:FreespaceTruth": {
            "visible": false
          },
          "frame:Gate": {
            "visible": false
          },
          "frame:ParkingLot": {
            "visible": false
          },
          "frame:Per": {
            "visible": false
          },
          "frame:Plan": {
            "visible": false
          },
          "frame:PLS": {
            "visible": false
          }
        },
        "topics": {
          "/utosim/trailer/pose_org": {
            "visible": true
          },
          "/utosim/trailer/pose": {
            "visible": true
          },
          "/task_manager/task_path": {
            "visible": true
          },
          "/planning/planning_visualization_org/base": {
            "visible": true
          },
          "/planning/planning_visualization/base": {
            "visible": true
          },
          "/perception/predicted_objects_org": {
            "visible": true
          },
          "/perception/predicted_objects": {
            "visible": true
          },
          "/perception/perception_traffic_signals": {
            "visible": true
          },
          "/perception/perception_parking_slots": {
            "visible": true
          },
          "/perception/perception_gates": {
            "visible": true
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 4
          },
          "/perception/fused_objects_truth": {
            "visible": true
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/map": {
            "visible": true
          },
          "/perception/fused_objects_org": {
            "visible": true
          },
          "/locator/vehicle_pose_org": {
            "visible": true
          },
          "/locator/vehicle_pose": {
            "visible": true
          },
          "/perception/camera_locator_sign": {
            "visible": true
          },
          "/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/planning/planning_visualization_org/interactive_decision_org": {
            "visible": true
          },
          "/prediction/prediction_obstacles": {
            "visible": true
          },
          "/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/region/task_manager/task_request_list": {
            "visible": true
          },
          "/router/routing": {
            "visible": true
          },
          "/utosim/perception/perception_traffic_signals": {
            "visible": true
          },
          "/utosim/task_manager/task_path": {
            "visible": true
          },
          "/utosim/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose_org": {
            "visible": true
          },
          "/sim_viz/perception/camera_locator_sign": {
            "visible": true
          },
          "/sim_viz/perception/freespace_truth": {
            "visible": false,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/fused_objects": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_org": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_truth": {
            "visible": true
          },
          "/sim_viz/perception/lidar_freespace": {
            "visible": false
          },
          "/sim_viz/perception/perception_freespace": {
            "visible": true,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/sim_viz/perception/perception_gates": {
            "visible": true
          },
          "/sim_viz/perception/perception_parking_slots": {
            "visible": true
          },
          "/sim_viz/perception/perception_traffic_signals": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/path": {
            "visible": false
          },
          "/sim_viz/planning/planning_visualization/trailer_angle": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/interactive_decision": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/sim_viz/region/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/router/routing": {
            "visible": true
          },
          "/sim_viz/task_manager/task_path": {
            "visible": true
          },
          "/sim_viz/task_manager/task_request_list": {
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
        "imageMode": {}
      },
      "Image!9p0wuh": {
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
        "topics": {
          "/map": {
            "visible": true,
            "color": "#00000052"
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_flf_jpeg",
          "calibrationTopic": "/calib/cam_flf",
          "annotations": {
            "/perception/cam_flf/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!1de0o1a": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_fcf_far_jpeg",
          "calibrationTopic": "/calib/cam_fcf_far",
          "annotations": {
            "/perception/cam_fcf_far/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!whutwm": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_frf_jpeg",
          "calibrationTopic": "/calib/cam_frf",
          "annotations": {
            "/perception/cam_frf/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!3duv6b0": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_fcf_jpeg",
          "calibrationTopic": "/calib/cam_fcf",
          "annotations": {
            "/perception/cam_fcf/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!23tz4rd": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_flb_jpeg",
          "calibrationTopic": "/calib/cam_flb",
          "annotations": {
            "/perception/cam_flb/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!2clqs82": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_bcb_jpeg",
          "annotations": {
            "/perception/cam_bcb/camera_obstacle_ori": {
              "visible": true
            }
          },
          "calibrationTopic": "/calib/cam_bcb"
        }
      },
      "Image!3s7s353": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_frb_jpeg",
          "calibrationTopic": "/calib/cam_frb",
          "annotations": {
            "/perception/cam_frb/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "3D!nodaym": {
        "cameraState": {
          "distance": 88.52082285122258,
          "perspective": true,
          "phi": 42.85718470982174,
          "target": [
            0,
            0,
            0
          ],
          "targetOffset": [
            1.8695588684909588,
            -0.4070879067037742,
            2.2482280961763336e-16
          ],
          "targetOrientation": [
            0,
            0,
            0,
            1
          ],
          "thetaOffset": 129.34285714285792,
          "fovy": 45,
          "near": 0.5,
          "far": 5000
        },
        "followMode": "follow-pose",
        "scene": {},
        "transforms": {
          "frame:map": {
            "visible": false
          },
          "frame:EGO": {
            "visible": false
          }
        },
        "topics": {
          "/locator/vehicle_pose": {
            "visible": true
          },
          "/locator/vehicle_pose_org": {
            "visible": true
          },
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/perception/fused_objects_org": {
            "visible": true
          },
          "/perception/fused_objects_truth": {
            "visible": true
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 4
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
          },
          "/calib/cam_bcb": {
            "visible": true
          },
          "/calib/cam_bcb_far": {
            "visible": true
          },
          "/calib/cam_blf": {
            "visible": true
          },
          "/calib/cam_brf": {
            "visible": true
          },
          "/calib/cam_fcf": {
            "visible": true
          },
          "/calib/cam_fcf_far": {
            "visible": true
          },
          "/calib/cam_flb": {
            "visible": true
          },
          "/calib/cam_frb": {
            "visible": true
          },
          "/calib/cam_flf": {
            "visible": true
          },
          "/calib/cam_frf": {
            "visible": true
          },
          "/perception/camera_locator_sign": {
            "visible": true
          },
          "/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/planning/planning_visualization/path": {
            "visible": true
          },
          "/planning/planning_visualization_org/interactive_decision_org": {
            "visible": true
          },
          "/prediction/prediction_obstacles": {
            "visible": true
          },
          "/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/region/task_manager/task_request_list": {
            "visible": true
          },
          "/router/routing": {
            "visible": true
          },
          "/sensor_table/sensor_table": {
            "visible": false
          },
          "/utosim/perception/perception_traffic_signals": {
            "visible": true
          },
          "/utosim/task_manager/task_path": {
            "visible": true
          },
          "/utosim/task_manager/task_request_list": {
            "visible": true
          },
          "/perception/freespace_truth": {
            "visible": true,
            "colorField": "z",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/locator/vehicle_pose": {
            "visible": true
          },
          "/sim_viz/locator/vehicle_pose_org": {
            "visible": true
          },
          "/sim_viz/perception/camera_locator_sign": {
            "visible": true
          },
          "/sim_viz/perception/freespace_truth": {
            "visible": false,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/fused_objects": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_org": {
            "visible": true
          },
          "/sim_viz/perception/fused_objects_truth": {
            "visible": true
          },
          "/sim_viz/perception/lidar_freespace": {
            "visible": false
          },
          "/sim_viz/perception/perception_freespace": {
            "visible": true,
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
          },
          "/sim_viz/perception/perception_freespace_boundary_layers": {
            "visible": true
          },
          "/sim_viz/perception/perception_gates": {
            "visible": true
          },
          "/sim_viz/perception/perception_parking_slots": {
            "visible": true
          },
          "/sim_viz/perception/perception_traffic_signals": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects": {
            "visible": true
          },
          "/sim_viz/perception/predicted_objects_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/interactive_decision": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization/path": {
            "visible": false
          },
          "/sim_viz/planning/planning_visualization/trailer_angle": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/base": {
            "visible": true
          },
          "/sim_viz/planning/planning_visualization_org/interactive_decision": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles": {
            "visible": true
          },
          "/sim_viz/prediction/prediction_obstacles_org": {
            "visible": true
          },
          "/sim_viz/region/task_manager/task_request_list": {
            "visible": true
          },
          "/sim_viz/router/routing": {
            "visible": true
          },
          "/sim_viz/task_manager/task_path": {
            "visible": true
          },
          "/sim_viz/task_manager/task_request_list": {
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
      "Image!zzavpv": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 4
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_flb_jpeg",
          "calibrationTopic": "/calib/cam_flb",
          "annotations": {
            "/perception/cam_flb/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!4kn0h3y": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 4
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_fcf_jpeg",
          "calibrationTopic": "/calib/cam_fcf",
          "annotations": {
            "/perception/cam_fcf/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!25vbvgx": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_fcf_far_jpeg",
          "calibrationTopic": "/calib/cam_fcf_far",
          "annotations": {
            "/perception/cam_fcf_far/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!36iouqc": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_frb_jpeg",
          "calibrationTopic": "/calib/cam_frb",
          "annotations": {
            "/perception/cam_frb/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!27oyuvu": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/perception/fused_objects_org": {
            "visible": false
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 4
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_blf_jpeg",
          "calibrationTopic": "/calib/cam_blf",
          "annotations": {
            "/perception/cam_blf/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!3xz74v7": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
            "visible": true
          },
          "/perception/perception_freespace": {
            "visible": true,
            "colorField": "z",
            "colorMode": "flat",
            "colorMap": "rainbow",
            "flatColor": "#ff8b00ff",
            "pointSize": 4
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_bcb_jpeg",
          "calibrationTopic": "/calib/cam_bcb",
          "annotations": {
            "/perception/cam_bcb/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!3uun123": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_bcb_jpeg",
          "calibrationTopic": "/calib/cam_bcb_far",
          "annotations": {
            "/perception/cam_bcb_far/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "Image!leswn4": {
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
        "topics": {
          "/map": {
            "visible": true
          },
          "/perception/fused_objects": {
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
        "imageMode": {
          "imageTopic": "/hal/sensor/cam_brf_jpeg",
          "calibrationTopic": "/calib/cam_brf",
          "annotations": {
            "/perception/cam_brf/camera_obstacle_ori": {
              "visible": true
            }
          }
        }
      },
      "BaseInfo!wqqmjo": {},
      "Image!qkdcbe": {
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
          "imageTopic": "/hal/sensor/cam_fcf_jpeg_org",
          "annotations": {
            "/perception/cam_fcf/camera_obstacle_ori_org": {
              "visible": true
            }
          },
          "calibrationTopic": "/calib/cam_fcf_org"
        }
      },
      "Tab!kijew7": {
        "activeTabIdx": 0,
        "tabs": [
          {
            "title": "Base",
            "layout": "3D!mm4c9j"
          },
          {
            "title": "Log_Cam_GT",
            "layout": {
              "first": "3D!wwlbug",
              "second": {
                "first": {
                  "first": {
                    "first": "Image!i6n8z6",
                    "second": {
                      "first": "Image!repnyh",
                      "second": "Image!3e2nwm8",
                      "direction": "row"
                    },
                    "direction": "row",
                    "splitPercentage": 34.938270828104635
                  },
                  "second": "Image!2kzik9r",
                  "direction": "column"
                },
                "second": {
                  "first": "Image!gi5pm6",
                  "second": {
                    "first": "Image!4kmlfdq",
                    "second": "Image!3kxnfkq",
                    "direction": "row"
                  },
                  "direction": "row",
                  "splitPercentage": 36.504254147954555
                },
                "direction": "column",
                "splitPercentage": 65.8632760648662
              },
              "direction": "row"
            }
          },
          {
            "title": "Log_Cam_AIV",
            "layout": {
              "first": "3D!49s3i8s",
              "second": {
                "first": {
                  "first": {
                    "first": "Image!2mz6cb4",
                    "second": "Image!9hs9zm",
                    "direction": "row"
                  },
                  "second": {
                    "first": "Image!2vlf9ib",
                    "second": "Image!1kjeuld",
                    "direction": "row"
                  },
                  "direction": "row"
                },
                "second": {
                  "first": {
                    "first": "Image!225jk63",
                    "second": "Image!2y8qhxs",
                    "direction": "row"
                  },
                  "second": {
                    "first": "Image!4dwjouo",
                    "second": "Image!1c6s63j",
                    "direction": "row"
                  },
                  "direction": "row"
                },
                "direction": "column"
              },
              "direction": "column"
            }
          },
          {
            "title": "Fusion_GT",
            "layout": {
              "first": "3D!1jfwpeu",
              "second": {
                "first": {
                  "first": {
                    "first": "Image!9p0wuh",
                    "second": {
                      "first": "Image!1de0o1a",
                      "second": "Image!whutwm",
                      "direction": "row"
                    },
                    "direction": "row",
                    "splitPercentage": 34.938270828104635
                  },
                  "second": "Image!3duv6b0",
                  "direction": "column"
                },
                "second": {
                  "first": "Image!23tz4rd",
                  "second": {
                    "first": "Image!2clqs82",
                    "second": "Image!3s7s353",
                    "direction": "row"
                  },
                  "direction": "row",
                  "splitPercentage": 36.504254147954555
                },
                "direction": "column",
                "splitPercentage": 65.8632760648662
              },
              "direction": "row",
              "splitPercentage": 32.75783198311863
            }
          },
          {
            "title": "Fusion_AIV",
            "layout": {
              "first": "3D!nodaym",
              "second": {
                "first": {
                  "first": {
                    "first": "Image!zzavpv",
                    "second": "Image!4kn0h3y",
                    "direction": "row"
                  },
                  "second": {
                    "first": "Image!25vbvgx",
                    "second": "Image!36iouqc",
                    "direction": "row"
                  },
                  "direction": "row"
                },
                "second": {
                  "first": {
                    "first": "Image!27oyuvu",
                    "second": "Image!3xz74v7",
                    "direction": "row"
                  },
                  "second": {
                    "first": "Image!3uun123",
                    "second": "Image!leswn4",
                    "direction": "row"
                  },
                  "direction": "row"
                },
                "direction": "column"
              },
              "direction": "column"
            }
          }
        ]
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
      "direction": "row",
      "first": {
        "first": "BaseInfo!wqqmjo",
        "second": "Image!qkdcbe",
        "direction": "column",
        "splitPercentage": 76.4788715958099
      },
      "second": {
        "first": "Tab!kijew7",
        "second": {
          "first": "Dashboard!2p3l8b8",
          "second": "StPoligonGraph!42u2mvn",
          "direction": "column",
          "splitPercentage": 71.73913043478261
        },
        "direction": "row",
        "splitPercentage": 59.95044608373108
      },
      "splitPercentage": 11.981865284974093
    }
  } as const);
