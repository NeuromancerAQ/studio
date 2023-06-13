// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Divider, Skeleton, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";

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

const useStyles = makeStyles<void, "copyIcon">()((theme, _params, classes) => ({
  overline: {
    opacity: 0.6,
  },
}));

const infoList = [
  {
    label: '车辆类型',
    value: 'N/A'
  },
  {
    label: '时间戳',
    value: 'N/A'
  },
  {
    label: 'Plan任务ID',
    value: 'N/A'
  },
  {
    label: 'Plan任务阶段',
    value: 'N/A'
  },
  {
    label: 'Plan任务终点类型',
    value: 'N/A'
  },
  {
    label: '剩余距离',
    value: 'N/A'
  },
  {
    label: '规划内部场景',
    value: 'N/A'
  },
  {
    label: '规划内部任务阶段',
    value: 'N/A'
  },
  {
    label: '规划当前执行的task',
    value: 'N/A'
  },
  {
    label: '规划绕行调试信息',
    value: 'N/A'
  },
  {
    label: 'TaskMgr任务ID',
    value: 'N/A'
  },
  {
    label: 'TaskMgr任务',
    value: 'N/A'
  },
  {
    label: '终点港口',
    value: 'N/A'
  },
  {
    label: '终点类型',
    value: 'N/A'
  },
  {
    label: '终点库位ID',
    value: 'N/A'
  },
  {
    label: '去缓冲区原因',
    value: 'N/A'
  },
  {
    label: '任务状态',
    value: 'N/A'
  }
];


function BaseInfo(): JSX.Element {
  const { classes } = useStyles();

  return (
    <>
      <PanelToolbar />
      <Stack fullHeight
             overflowY="auto"
             gap={2}
             paddingY={2}
             paddingX={3}>
        {
          infoList.map((info, key) => {
            return (
              <div>
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
