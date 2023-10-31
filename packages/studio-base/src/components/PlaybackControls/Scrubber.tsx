// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Fade, PopperProps, Tooltip } from "@mui/material";
import type { Instance } from "@popperjs/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLatest } from "react-use";
import { makeStyles } from "tss-react/mui";
import { v4 as uuidv4 } from "uuid";

import {
  subtract as subtractTimes,
  add as addTimes,
  toSec,
  fromSec,
  Time,
} from "@foxglove/rostime";
import {
  MessagePipelineContext,
  useMessagePipeline,
} from "@foxglove/studio-base/components/MessagePipeline";
import Stack from "@foxglove/studio-base/components/Stack";
import {
  useClearHoverValue,
  useSetHoverValue,
} from "@foxglove/studio-base/context/TimelineInteractionStateContext";
import { PlayerPresence } from "@foxglove/studio-base/players/types";

import { EventsOverlay } from "./EventsOverlay";
import PlaybackBarHoverTicks from "./PlaybackBarHoverTicks";
import { PlaybackControlsTooltipContent } from "./PlaybackControlsTooltipContent";
import { ProgressPlot } from "./ProgressPlot";
import Slider, { HoverOverEvent } from "./Slider";
import { parseAppURLState } from "@foxglove/studio-base/util/appURLState";

const useStyles = makeStyles()((theme) => ({
  marker: {
    backgroundColor: theme.palette.text.primary,
    position: "absolute",
    height: 16,
    borderRadius: 1,
    width: 2,
    transform: "translate(-50%, 0)",
  },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: theme.palette.action.focus,
  },
  trackDisabled: {
    opacity: theme.palette.action.disabledOpacity,
  },
}));

const selectStartTime = (ctx: MessagePipelineContext) => ctx.playerState.activeData?.startTime;
const selectCurrentTime = (ctx: MessagePipelineContext) => ctx.playerState.activeData?.currentTime;
const selectEndTime = (ctx: MessagePipelineContext) => ctx.playerState.activeData?.endTime;
const selectRanges = (ctx: MessagePipelineContext) =>
  ctx.playerState.progress.fullyLoadedFractionRanges;
const selectPresence = (ctx: MessagePipelineContext) => ctx.playerState.presence;

const selectA2M = (ctx: MessagePipelineContext) => ctx.playerState.activeData?.A2M;
const selectM2A = (ctx: MessagePipelineContext) => ctx.playerState.activeData?.M2A;

const mcapUrl = parseAppURLState(new URL(window.location.href))?.dsParams?.url || "";

type Props = {
  onSeek: (seekTo: Time) => void;
};

function formatFoxgloveTime(value: string | undefined): Time {
  if (value) {
    const sec = Math.trunc(Number(value) / 1e9);
    const nsec = Number(value) % 1e9;
    return {
      sec: sec,
      nsec: nsec,
    };
  } else {
    return {
      sec: 0,
      nsec: 0,
    };
  }
}

export default function Scrubber(props: Props): JSX.Element {
  const { onSeek } = props;
  const { classes, cx } = useStyles();

  const [hoverComponentId] = useState<string>(() => uuidv4());

  const startTime = useMessagePipeline(selectStartTime);
  const currentTime = useMessagePipeline(selectCurrentTime);
  const endTime = useMessagePipeline(selectEndTime);
  const presence = useMessagePipeline(selectPresence);
  const ranges = useMessagePipeline(selectRanges);
  const A2M = useMessagePipeline(selectA2M) || "";
  const M2A = useMessagePipeline(selectM2A) || "";

  const [a2mArray, setA2mArray] = useState(A2M.split(" ").map(val => {
    const time = formatFoxgloveTime(val);
    return time && startTime && endTime
      ? toSec(subtractTimes(time, startTime)) / toSec(subtractTimes(endTime, startTime)) : undefined;
  }));
  const [m2aArray, setM2aArray] = useState(M2A.split(" ").map(val => {
    const time = formatFoxgloveTime(val);
    return time && startTime && endTime
      ? toSec(subtractTimes(time, startTime)) / toSec(subtractTimes(endTime, startTime)) : undefined;
  }));

  useEffect(()=> {
    if (mcapUrl && mcapUrl.endsWith(".mcap")) {
      const infoUrl = mcapUrl.replace("data.mcap", "info.json");
      const gradingUrl = mcapUrl.replace("data.mcap", "grading.json");
      fetch(infoUrl)
        .then(response => response.json())
        .then(data => {
          const start = formatFoxgloveTime(data.start_time)
          const end = formatFoxgloveTime(data.end_time)
          if(data.a_to_m) {
            const a2m = data.a_to_m.join(" ") || "";
            console.log(a2m, 'a2m');
            if (a2m) {
              const a2mArr = a2m.split(" ").map(val => {
                const time = formatFoxgloveTime(val);
                return time && start && end
                  ? toSec(subtractTimes(time, start)) / toSec(subtractTimes(end, start)) : undefined;
              });
              console.log(a2mArr, 'a2mArr');
              setA2mArray(a2mArr);
            }
          }
          if(data.m_to_a) {
            const m2a = data.m_to_a.join(" ") || "";
            console.log(m2a, 'm2a');
            if (m2a) {
              const m2aArr = m2a.split(" ").map(val => {
                const time = formatFoxgloveTime(val);
                return time && start && end
                  ? toSec(subtractTimes(time, start)) / toSec(subtractTimes(end, start)) : undefined;
              });
              console.log(m2aArr, 'm2aArr');
              setM2aArray(m2aArr);
            }
          }
        });
    }
  }, [])

  const setHoverValue = useSetHoverValue();
  type HoverInfo = {
    stamp: Time;
    clientX: number;
    clientY: number;
  };
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | undefined>();
  const latestHoverInfo = useLatest(hoverInfo);

  const latestStartTime = useLatest(startTime);
  const latestEndTime = useLatest(endTime);

  const onChange = useCallback(
    (fraction: number) => {
      if (!latestStartTime.current || !latestEndTime.current) {
        return;
      }
      onSeek(
        addTimes(
          latestStartTime.current,
          fromSec(fraction * toSec(subtractTimes(latestEndTime.current, latestStartTime.current))),
        ),
      );
    },
    [onSeek, latestEndTime, latestStartTime],
  );

  const onHoverOver = useCallback(
    ({ fraction, clientX, clientY }: HoverOverEvent) => {
      if (!latestStartTime.current || !latestEndTime.current) {
        return;
      }
      const duration = toSec(subtractTimes(latestEndTime.current, latestStartTime.current));
      const timeFromStart = fromSec(fraction * duration);
      setHoverInfo({ stamp: addTimes(latestStartTime.current, timeFromStart), clientX, clientY });
      setHoverValue({
        componentId: hoverComponentId,
        type: "PLAYBACK_SECONDS",
        value: toSec(timeFromStart),
      });
    },
    [hoverComponentId, latestEndTime, latestStartTime, setHoverValue],
  );

  const clearHoverValue = useClearHoverValue();

  const onHoverOut = useCallback(() => {
    clearHoverValue(hoverComponentId);
    setHoverInfo(undefined);
  }, [clearHoverValue, hoverComponentId]);

  // Clean up the hover value when we are unmounted -- important for storybook.
  useEffect(() => onHoverOut, [onHoverOut]);

  const renderSlider = useCallback(
    (val?: number) => {
      if (val == undefined) {
        return undefined;
      }
      return <div className={classes.marker} style={{ left: `${val * 100}%` }} />;
    },
    [classes.marker],
  );

  const min = startTime && toSec(startTime);
  const max = endTime && toSec(endTime);
  const fraction =
    currentTime && startTime && endTime
      ? toSec(subtractTimes(currentTime, startTime)) / toSec(subtractTimes(endTime, startTime))
      : undefined;

  const loading = presence === PlayerPresence.INITIALIZING || presence === PlayerPresence.BUFFERING;

  const popperRef = React.useRef<Instance>(ReactNull);

  const isHovered = hoverInfo != undefined;
  const popperProps: Partial<PopperProps> = useMemo(
    () => ({
      open: isHovered, // Keep the tooltip visible while dragging even when the mouse is outside the playback bar
      popperRef,
      modifiers: [
        {
          name: "computeStyles",
          options: {
            gpuAcceleration: false, // Fixes hairline seam on arrow in chrome.
          },
        },
        {
          name: "offset",
          options: {
            // Offset popper to hug the track better.
            offset: [0, 4],
          },
        },
      ],
      anchorEl: {
        getBoundingClientRect: () => {
          return new DOMRect(
            latestHoverInfo.current?.clientX ?? 0,
            latestHoverInfo.current?.clientY ?? 0,
            0,
            0,
          );
        },
      },
    }),
    [isHovered, latestHoverInfo],
  );

  useEffect(() => {
    if (popperRef.current != undefined) {
      void popperRef.current.update();
    }
  }, [hoverInfo]);

  return (
    <Tooltip
      title={
        hoverInfo != undefined ? <PlaybackControlsTooltipContent stamp={hoverInfo.stamp} /> : ""
      }
      placement="top"
      disableInteractive
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 0 }}
      PopperProps={popperProps}
    >
      <Stack
        direction="row"
        flexGrow={1}
        alignItems="center"
        position="relative"
        style={{ height: 32 }}
      >
        <div className={cx(classes.track, { [classes.trackDisabled]: !startTime })} />
        <Stack position="absolute" flex="auto" fullWidth style={{ height: 6 }}>
          <ProgressPlot loading={loading} availableRanges={ranges} />
        </Stack>
        <Stack fullHeight fullWidth position="absolute" flex={1}>
          <Slider
            disabled={min == undefined || max == undefined}
            fraction={fraction}
            onHoverOver={onHoverOver}
            onHoverOut={onHoverOut}
            onChange={onChange}
            renderSlider={renderSlider}
            A2M={a2mArray}
            M2A={m2aArray}
          />
        </Stack>
        <EventsOverlay />
        <PlaybackBarHoverTicks componentId={hoverComponentId} />
      </Stack>
    </Tooltip>
  );
}
