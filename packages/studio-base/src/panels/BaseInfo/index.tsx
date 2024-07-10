// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";

import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import Stack from "@foxglove/studio-base/components/Stack";
import { RosPath } from "@foxglove/studio-base/components/MessagePathSyntax/constants";
import parseRosPath from "@foxglove/studio-base/components/MessagePathSyntax/parseRosPath";
import { useMessagesByTopic } from "@foxglove/studio-base/PanelAPI";
import { useCachedGetMessagePathDataItems } from "@foxglove/studio-base/components/MessagePathSyntax/useCachedGetMessagePathDataItems";
import { useEffect, useState } from "react";
import { planningPath, taskManagePath } from "./info";
import {get} from "lodash";

const useStyles = makeStyles()({
  overline: {
    opacity: 0.6,
  },
});

// const getDataValueByFieldName = (data: unknown, path: string) => {
//   if (!data || !path || typeof path !== "string") {
//     return "N/A";
//   }
//   const keys = path.split(".");
//   keys.shift();
//   if (!keys.length) {
//     return "N/A";
//   }
//   let copyData: unknown = data;
//   for (let i = 0; i < keys.length; i++) {
//     let key = keys[i];
//     if (Array.isArray(copyData)) {
//       if (/^\[\d{1,}\]$/.test(key)) {
//         key = key.substring(1, key.length - 1);
//       } else {
//         copyData = copyData[0];
//       }
//     }
//     if (copyData && copyData[key] !== undefined) {
//       copyData = copyData[key];
//     } else {
//       copyData = "N/A";
//       break;
//     }
//   }
//
//   return copyData;
// }

function BaseInfo(): JSX.Element {
  const { classes } = useStyles();
  const planningTopicPath = "/planning/planning_visualization";
  const taskManagerTopicPath = "/task_manager/task_visualization";
  const newTaskManagerTopicPath = "/task_manager/task_request_list";

  const pTopicRosPath: RosPath | undefined = React.useMemo(
    () => parseRosPath(planningTopicPath),
    [planningTopicPath],
  );

  const tTopicRosPath: RosPath | undefined = React.useMemo(
    () => parseRosPath(taskManagerTopicPath),
    [taskManagerTopicPath],
  );

  const ntTopicRosPath: RosPath | undefined = React.useMemo(
    () => parseRosPath(newTaskManagerTopicPath),
    [newTaskManagerTopicPath],
  );

  const pTopicName = pTopicRosPath?.topicName ?? "";
  const tTopicName = tTopicRosPath?.topicName ?? "";
  const ntTopicName = ntTopicRosPath?.topicName ?? "";
  const pMsgs = useMessagesByTopic({ topics: [pTopicName], historySize: 1 })[pTopicName];
  const tMsgs = useMessagesByTopic({ topics: [tTopicName], historySize: 1 })[tTopicName];
  const ntMsgs = useMessagesByTopic({ topics: [ntTopicName], historySize: 1 })[ntTopicName];
  const pCachedGetMessagePathDataItems = useCachedGetMessagePathDataItems([planningTopicPath]);
  const tCachedGetMessagePathDataItems = useCachedGetMessagePathDataItems([taskManagerTopicPath]);
  const ntCachedGetMessagePathDataItems = useCachedGetMessagePathDataItems([newTaskManagerTopicPath]);
  const pMsg = pMsgs?.[0];
  const tMsg = tMsgs?.[0];
  const ntMsg = ntMsgs?.[0];
  const pCachedMessages = pMsg ? pCachedGetMessagePathDataItems(planningTopicPath, pMsg) ?? [] : [];
  const tCachedMessages = tMsg ? tCachedGetMessagePathDataItems(taskManagerTopicPath, tMsg) ?? [] : [];
  const ntCachedMessages = ntMsg ? ntCachedGetMessagePathDataItems(newTaskManagerTopicPath, ntMsg) ?? [] : [];
  const pMessages = pCachedMessages[0]?.value;
  const tMessages = tCachedMessages[0]?.value;
  const ntMessages = ntCachedMessages[0]?.value;

  const [pInfoList, setPInfoList] = useState([
    {
      label: "车辆类型",
      value: "N/A",
    },
    {
      label: "时间戳",
      value: "N/A",
    },
    {
      label: "Plan任务ID",
      value: "N/A",
    },
    {
      label: "Plan任务阶段",
      value: "N/A",
    },
    {
      label: "Plan任务终点类型",
      value: "N/A",
    },
    {
      label: "剩余距离",
      value: "N/A",
    },
    {
      label: "规划内部场景",
      value: "N/A",
    },
    {
      label: "规划内部任务阶段",
      value: "N/A",
    },
    {
      label: "规划当前执行的task",
      value: "N/A",
    },
    {
      label: "规划绕行调试信息",
      value: "N/A",
    },
  ]);
  const [tInfoList, setTInfoList] = useState([
    {
      label: "TaskMgr任务ID",
      value: "N/A",
    },
    {
      label: "TaskMgr任务",
      value: "N/A",
    },
    {
      label: "终点港口",
      value: "N/A",
    },
    {
      label: "终点类型",
      value: "N/A",
    },
    {
      label: "终点库位ID",
      value: "N/A",
    },
    {
      label: "去缓冲区原因",
      value: "N/A",
    },
    {
      label: "任务状态",
      value: "N/A",
    }]);

  useEffect(() => {
    if (pMessages) {
      const newPInfoList: {label: string, value: any}[] = planningPath.map(item => {
        return {
          label: item.label,
          value: item.format ? item.format(get(pMessages, item.path, "N/A")) : get(pMessages, item.path, "N/A")
        }
      })

      setPInfoList(newPInfoList);
    }
  }, [pMessages]);

  useEffect(() => {
    let newTInfoList: {label: string, value: any}[] = []
    if (tMessages || ntMessages) {
      newTInfoList = taskManagePath.map(item => {
        return {
          label: item.label,
          value: get(tMessages, item.path, "N/A")
        }
      })
      // console.log(ntMessages, 'ntMessages');
      const aff = '(重构)'
      if (ntMessages?.task_requests[0]?.task_id) {
        newTInfoList[0].value = ntMessages?.task_requests[0]?.task_id + aff
      }

      if (ntMessages?.task_requests[0]?.driving_assist_request) {
        newTInfoList[1].value = 'driving_assist_request'+ aff
      } else if (ntMessages?.task_requests[0]?.parking_request) {
        newTInfoList[1].value = 'parking_request'+ aff
      } else if (ntMessages?.task_requests[0]?.target_driving_request) {
        newTInfoList[1].value = 'target_driving_request'+ aff
      } else if (ntMessages?.task_requests[0]?.emergency_parking_request) {
        newTInfoList[1].value = 'emergency_parking_request'+ aff
      } else if (ntMessages?.task_requests[0]?.data_construction_request) {
        newTInfoList[1].value = 'data_construction_request'+ aff
      }
      setTInfoList(newTInfoList);
    }
  }, [tMessages, ntMessages]);

  return (
    <>
      <PanelToolbar />
      <Stack fullHeight
             overflowY="auto"
             gap={2}
             paddingY={2}
             paddingX={3}>
        {
          pInfoList.map((info, key) => {
            return (
              <div key={key}>
                <Typography className={classes.overline} variant="overline">{info.label}</Typography>
                <Typography variant="inherit" style={{
                  whiteSpace: 'pre-line'
                }}>{info.value}</Typography>
              </div>
            );
          })
        }
        {
          tInfoList.map((info, key) => {
            return (
              <div key={key}>
                <Typography className={classes.overline} variant="overline">{info.label}</Typography>
                <Typography variant="inherit">{info.value}</Typography>
              </div>
            );
          })
        }
      </Stack>
    </>
  );
}

BaseInfo.panelType = "BaseInfo";
BaseInfo.defaultConfig = {};

export default Panel(BaseInfo);
