// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import {
  ArrowRepeatAll20Regular,
  ArrowRepeatAllOff20Regular,
  Info20Regular,
  Next20Filled,
  Next20Regular,
  Pause20Filled,
  Pause20Regular,
  Play20Filled,
  Play20Regular,
  Previous20Filled,
  Previous20Regular,
} from "@fluentui/react-icons";
import { Tooltip } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { Time, compare } from "@foxglove/rostime";
import { CreateEventDialog } from "@foxglove/studio-base/components/CreateEventDialog";
import { DataSourceInfoView } from "@foxglove/studio-base/components/DataSourceInfoView";
import EventIcon from "@foxglove/studio-base/components/EventIcon";
import EventOutlinedIcon from "@foxglove/studio-base/components/EventOutlinedIcon";
import HoverableIconButton from "@foxglove/studio-base/components/HoverableIconButton";
import KeyListener from "@foxglove/studio-base/components/KeyListener";
import {
  MessagePipelineContext,
  useMessagePipeline,
} from "@foxglove/studio-base/components/MessagePipeline";
import PlaybackSpeedControls from "@foxglove/studio-base/components/PlaybackSpeedControls";
import Stack from "@foxglove/studio-base/components/Stack";
import { useCurrentUser } from "@foxglove/studio-base/context/BaseUserContext";
import { EventsStore, useEvents } from "@foxglove/studio-base/context/EventsContext";
import {
  WorkspaceContextStore,
  useWorkspaceStore,
} from "@foxglove/studio-base/context/Workspace/WorkspaceContext";
import { useWorkspaceActions } from "@foxglove/studio-base/context/Workspace/useWorkspaceActions";
import { Player, PlayerPresence } from "@foxglove/studio-base/players/types";

import PlaybackTimeDisplay from "./PlaybackTimeDisplay";
import { RepeatAdapter } from "./RepeatAdapter";
import Scrubber from "./Scrubber";
import FailRange from "./FailRange";
import MetricSelect from "./MetricSelect";
import { DIRECTION, jumpSeek } from "./sharedHelpers";
import { parseAppURLState } from "@foxglove/studio-base/util/appURLState";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0.5, 1, 1, 1),
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    zIndex: 100000,
  },
  disabled: {
    opacity: theme.palette.action.disabledOpacity,
  },
  popper: {
    "&[data-popper-placement*=top] .MuiTooltip-tooltip": {
      margin: theme.spacing(0.5, 0.5, 0.75),
    },
  },
  dataSourceInfoButton: {
    cursor: "default",
  },
}));
const mcapUrl = parseAppURLState(new URL(window.location.href))?.dsParams?.url || "";
const selectPresence = (ctx: MessagePipelineContext) => ctx.playerState.presence;
const selectEventsSupported = (store: EventsStore) => store.eventsSupported;
const selectPlaybackRepeat = (store: WorkspaceContextStore) => store.playbackControls.repeat;

export default function PlaybackControls(props: {
  play: NonNullable<Player["startPlayback"]>;
  pause: NonNullable<Player["pausePlayback"]>;
  seek: NonNullable<Player["seekPlayback"]>;
  seekForward: NonNullable<Player["seekForward"]> | undefined;
  seekBackward: NonNullable<Player["seekBackward"]> | undefined;
  playUntil?: Player["playUntil"];
  isPlaying: boolean;
  getTimeInfo: () => { startTime?: Time; endTime?: Time; currentTime?: Time };
  ds: string | undefined;
}): JSX.Element {
  const { play, pause, seek, isPlaying, getTimeInfo, playUntil, seekForward, seekBackward, ds } = props;
  const presence = useMessagePipeline(selectPresence);
  const [rangeType, setRangeType] = useState([])
  const [range, setRange] = useState([])
  const [total, setTotal] = useState(0)
  const [metriclevel, setMetriclevel] = useState(0)
  const [selectName, setSelectName] = useState('')

  useEffect(()=> {
    if (mcapUrl && mcapUrl.endsWith(".mcap")) {
      const gradingUrl = mcapUrl.replace("data.mcap", "grading.json");
      fetch(gradingUrl)
        .then(response => response.json())
        .then(data => {
          if (data.metrics) {
            setRangeType(data.metrics)
            setRange(data.metrics[0]?.ranges || [])
            setMetriclevel(data.metrics[0]?.metriclevel || 0)
            setSelectName(data.metrics[0]?.metric || '')
            setTotal(data.total_time)
          }
        });
    }
  }, [])

  const handleMetricRange = (item) => {
    setRange(item.ranges)
    setMetriclevel(item.metriclevel || 0)
  }

  const { classes, cx } = useStyles();
  const repeat = useWorkspaceStore(selectPlaybackRepeat);
  const [createEventDialogOpen, setCreateEventDialogOpen] = useState(false);
  const { currentUserType } = useCurrentUser();
  const eventsSupported = useEvents(selectEventsSupported);

  const {
    playbackControlActions: { setRepeat },
  } = useWorkspaceActions();

  const toggleRepeat = useCallback(() => {
    setRepeat((old) => !old);
  }, [setRepeat]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      const { startTime: start, endTime: end, currentTime: current } = getTimeInfo();
      // if we are at the end, we need to go back to start
      if (current && end && start && compare(current, end) >= 0) {
        seek(start);
      }
      play();
    }
  }, [isPlaying, pause, getTimeInfo, play, seek]);

  let seekForwardAction = useCallback(
    (ev?: KeyboardEvent) => {
      const { currentTime } = getTimeInfo();
      if (!currentTime) {
        return;
      }

      // If playUntil is available, we prefer to use that rather than seek, which performs a jump
      // seek.
      //
      // Playing forward up to the desired seek time will play all messages to the panels which
      // mirrors the behavior panels would expect when playing without stepping. This behavior is
      // important for some message types which convey state information.
      //
      // i.e. Skipping coordinate frame messages may result in incorrectly rendered markers or
      // missing markers altogther.
      const targetTime = jumpSeek(DIRECTION.FORWARD, currentTime, ev);

      if (playUntil) {
        playUntil(targetTime);
      } else {
        seek(targetTime);
      }
    },
    [getTimeInfo, playUntil, seek],
  );

  let seekBackwardAction = useCallback(
    (ev?: KeyboardEvent) => {
      const { currentTime } = getTimeInfo();
      if (!currentTime) {
        return;
      }
      seek(jumpSeek(DIRECTION.BACKWARD, currentTime, ev));
    },
    [getTimeInfo, seek],
  );

  // websocket 模式下的操作
  if (ds && ds === 'foxglove-websocket') {
    seekForwardAction = useCallback(
      (ev?: KeyboardEvent) => {
        console.log(ev);
        const { currentTime } = getTimeInfo();
        if (!currentTime) {
          return;
        }
        seekForward && seekForward()
      },
      [getTimeInfo, seekForward],
    );

    seekBackwardAction = useCallback(
      (ev?: KeyboardEvent) => {
        console.log(ev);
        const { currentTime } = getTimeInfo();
        if (!currentTime) {
          return;
        }
        seekBackward && seekBackward()
      },
      [getTimeInfo, seekBackward],
    );
  }

  const keyDownHandlers = useMemo(
    () => ({
      " ": togglePlayPause,
      ArrowLeft: (ev: KeyboardEvent) => {
        seekBackwardAction(ev);
      },
      ArrowRight: (ev: KeyboardEvent) => {
        seekForwardAction(ev);
      },
    }),
    [seekBackwardAction, seekForwardAction, togglePlayPause],
  );

  const toggleCreateEventDialog = useCallback(() => {
    pause();
    setCreateEventDialogOpen((open) => !open);
  }, [pause]);

  const disableControls = presence === PlayerPresence.ERROR;

  return (
    <>
      <RepeatAdapter play={play} seek={seek} repeatEnabled={repeat} />
      <KeyListener global keyDownHandlers={keyDownHandlers} />
      <div className={classes.root}>
        <Scrubber onSeek={seek} />
        <FailRange range={range} total={total} metriclevel={metriclevel}/>
        <Stack direction="row" alignItems="center" flex={1} gap={1} overflowX="auto">
          <Stack direction="row" alignItems="center" flex={1} gap={0.5}>
            {currentUserType !== "unauthenticated" && eventsSupported && (
              <HoverableIconButton
                size="small"
                title="Create event"
                icon={<EventOutlinedIcon />}
                activeIcon={<EventIcon />}
                onClick={toggleCreateEventDialog}
              />
            )}
            <Tooltip
              // A desired workflow is the ability to copy data source info text (start, end, duration)
              // from the tooltip. However, there's a UX quirk where the tooltip will close if the user
              // clicks on the <HoverableIconButton> and then goes to copy text from the tooltip.
              //
              // Disabling the focus listener fixes this quirk and the tooltip behaves as expected.
              // https://mui.com/material-ui/api/tooltip/#prop-disableFocusListener
              disableFocusListener
              classes={{ popper: classes.popper }}
              title={
                <Stack paddingY={0.75}>
                  <DataSourceInfoView disableSource />
                </Stack>
              }
            >
              <HoverableIconButton
                className={cx(classes.dataSourceInfoButton, {
                  [classes.disabled]: disableControls,
                })}
                size="small"
                icon={<Info20Regular />}
              />
            </Tooltip>
            <PlaybackTimeDisplay onSeek={seek} onPause={pause} />
            <MetricSelect handleMetricRange={handleMetricRange} rangeType={rangeType} selectName={selectName} />
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <HoverableIconButton
              disabled={disableControls}
              size="small"
              title="Seek backward"
              icon={<Previous20Regular />}
              activeIcon={<Previous20Filled />}
              onClick={() => {
                seekBackwardAction();
              }}
            />
            <HoverableIconButton
              disabled={disableControls}
              size="small"
              title={isPlaying ? "Pause" : "Play"}
              onClick={togglePlayPause}
              icon={isPlaying ? <Pause20Regular /> : <Play20Regular />}
              activeIcon={isPlaying ? <Pause20Filled /> : <Play20Filled />}
            />
            <HoverableIconButton
              disabled={disableControls}
              size="small"
              title="Seek forward"
              icon={<Next20Regular />}
              activeIcon={<Next20Filled />}
              onClick={() => {
                seekForwardAction();
              }}
            />
          </Stack>
          <Stack direction="row" flex={1} alignItems="center" justifyContent="flex-end" gap={0.5}>
            <HoverableIconButton
              size="small"
              title="Loop playback"
              color={repeat ? "primary" : "inherit"}
              onClick={toggleRepeat}
              icon={repeat ? <ArrowRepeatAll20Regular /> : <ArrowRepeatAllOff20Regular />}
            />
            <PlaybackSpeedControls />
          </Stack>
        </Stack>
        {createEventDialogOpen && eventsSupported && (
          <CreateEventDialog onClose={toggleCreateEventDialog} />
        )}
      </div>
    </>
  );
}
