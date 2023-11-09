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
          "perspective": true,
          "distance": 55.79019635006845,
          "phi": 51.99827387090736,
          "thetaOffset": 118.70280193583298,
          "targetOffset": [
            1.0207604496032214,
            1.22692630016979,
            1.5198946052318686e-15
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
          },
          "frame:map": {
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
          },
          "/perception/fused_objects_truth": {
            "visible": false
          },
          "/prediction/prediction_obstacles": {
            "visible": true
          },
          "/prediction/prediction_obstacles_org": {
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
      "Image!19ukbt": {
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
          "imageTopic": "/hal/sensor/cam_fcf_far_jpeg_org"
        }
      },
      "Image!34j6eqm": {
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
          "imageTopic": "/hal/sensor/cam_bcb_jpeg_org"
        }
      },
      "Image!454vw00": {
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
          "imageTopic": "/hal/sensor/cam_flf_jpeg_org"
        }
      },
      "Image!3jf393y": {
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
          "imageTopic": "/hal/sensor/cam_flb_jpeg_org"
        }
      },
      "Image!60czti": {
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
          "imageTopic": "/hal/sensor/cam_frf_jpeg_org"
        }
      },
      "Image!h14sve": {
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
          "imageTopic": "/hal/sensor/cam_frb_jpeg_org"
        }
      },
      "3D!1jfwpeu": {
        "cameraState": {
          "perspective": false,
          "distance": 58.7265224737616,
          "phi": 63.815685452426344,
          "thetaOffset": 48.94838581569195,
          "targetOffset": [
            8.439809494968346,
            7.712279465019141,
            8.834076372725915e-15
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
            "visible": false
          },
          "/perception/predicted_objects": {
            "visible": false
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
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
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
      "3D!nodaym": {
        "cameraState": {
          "perspective": true,
          "distance": 88.52082285122258,
          "phi": 42.85718470982174,
          "thetaOffset": 129.34285714285792,
          "targetOffset": [
            1.8695588684909588,
            -0.4070879067037742,
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
            "colorField": "x",
            "colorMode": "colormap",
            "colorMap": "turbo"
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
      "Tab!kijew7": {
        "activeTabIdx": 0,
        "tabs": [
          {
            "title": "Base",
            "layout": {
              "first": "3D!mm4c9j",
              "second": {
                "first": {
                  "first": "Image!19ukbt",
                  "second": "Image!34j6eqm",
                  "direction": "column"
                },
                "second": {
                  "first": {
                    "first": "Image!454vw00",
                    "second": "Image!3jf393y",
                    "direction": "column"
                  },
                  "second": {
                    "first": "Image!60czti",
                    "second": "Image!h14sve",
                    "direction": "column"
                  },
                  "direction": "row"
                },
                "direction": "column"
              },
              "direction": "row",
              "splitPercentage": 63.566883885847524
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
                  "direction": "column",
                  "splitPercentage": 40.16821114273705
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
              "splitPercentage": 59.45098039215686
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
      "Dashboard!17772p9": {},
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
        "first": "Dashboard!17772p9",
        "second": "StPoligonGraph!42u2mvn",
        "direction": "column",
        "splitPercentage": 63.17991631799165
      },
      "direction": "row",
      "splitPercentage": 73.31249440670055
    }
  } as const);
