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

import cx from "classnames";
import { $Values } from "utility-types";

export const PROGRESS_DIRECTION = Object.freeze({
  HORIZONTAL: "horizontal",
  PULSE: "pulse",
  VERTICAL: "vertical",
});
export type ProgressDirection = $Values<typeof PROGRESS_DIRECTION>;

let keyframesInjected = false;
function injectKeyframes() {
  if (keyframesInjected) {
    return;
  }
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes cruise-automation-button-pulse {
      0%,
      100%  {
        opacity: 0.9;
      }
      50% {
        opacity: 0.2;
      }
    }
  `;
  if (!document.body) {
    throw new Error("no document.body");
  }
  document.body.appendChild(style);
  keyframesInjected = true;
}

type ProgressProps = {
  customStyle?: {
    [key: string]: any;
  };
  direction?: ProgressDirection;
  percentage: number;
};

function getProgressStyle(props: ProgressProps) {
  const { direction, percentage, customStyle } = props;
  if (direction === PROGRESS_DIRECTION.PULSE) {
    return {
      ...customStyle,
      width: "100%",
      height: "100%",
    };
  }
  return {
    ...customStyle,
    width: direction === PROGRESS_DIRECTION.HORIZONTAL ? `${percentage}%` : "100%",
    height: direction !== PROGRESS_DIRECTION.HORIZONTAL ? `${percentage}%` : "100%",
  };
}

type Props = {
  id?: string;
  small?: boolean;
  large?: boolean;
  primary?: boolean;
  warning?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  onMouseUp?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  progressClassName?: string;
  progressDirection?: ProgressDirection;
  progressStyle?: {
    [key: string]: any;
  };
  style?: {
    [key: string]: any;
  };
  tooltip?: string;
};

type State = {
  mouseDown: boolean;
  progressPercentage: number;
};

export default class Button extends React.Component<Props, State> {
  animationId?: ReturnType<typeof requestAnimationFrame>;
  cancelTimeoutId?: ReturnType<typeof setTimeout>;

  static defaultProps = {
    progressDirection: PROGRESS_DIRECTION.VERTICAL,
  };

  state = {
    mouseDown: false,
    progressPercentage: 0,
  };

  componentWillUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.cancelTimeoutId) {
      clearTimeout(this.cancelTimeoutId);
    }
  }

  onDelayFinished = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    // slightly delay reseting to a non-progress state
    // this allows the consumer to apply some kind of 'toggled on' class to the button
    // and also makes the interaction slightly less jarring
    this.cancelTimeoutId = setTimeout(this.cancelDown, 100);
    if (!onClick) {
      return;
    }
    onClick(e);
  };

  onMouseUp = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { onMouseUp } = this.props;
    this.cancelDown();
    if (onMouseUp) {
      onMouseUp(e);
    }
  };

  onMouseLeave = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { onMouseLeave } = this.props;
    this.cancelDown();
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  onMouseDown = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { delay } = this.props;
    if (!delay) {
      return;
    }
    // we need to remove the event from the pool to use it after a delay
    e.persist();
    // call animate after state change because this.setState is async
    const onComplete = () => this.onDelayFinished(e);
    const start = Date.now();
    this.setState({ mouseDown: true }, () => this.animate(start, onComplete));
  };

  animate(startStamp: number, doneCallback: () => void) {
    const { mouseDown } = this.state;
    const { delay } = this.props;
    if (!mouseDown || !delay) {
      return;
    }
    // if just finshed a previous click there might be a pending cancel operation
    // so clear it out
    if (this.cancelTimeoutId) {
      clearTimeout(this.cancelTimeoutId);
    }

    this.animationId = requestAnimationFrame(() => {
      const tickStamp = Date.now();
      const progressPercentage = Math.min(((tickStamp - startStamp) / delay) * 100, 100);
      this.setState({ progressPercentage });
      if (progressPercentage < 100) {
        this.animate(startStamp, doneCallback);
        return;
      }
      doneCallback();
    });
  }

  onClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { onClick, delay } = this.props;
    e.stopPropagation();
    e.preventDefault();
    if (onClick && !delay) {
      onClick(e);
    }
  };

  cancelDown = () => {
    this.setState({ mouseDown: false, progressPercentage: 0 });
  };

  renderProgressBar() {
    const { delay, progressClassName, progressStyle, progressDirection } = this.props;
    const { mouseDown, progressPercentage } = this.state;
    // don't render a bar if we aren't a delay button
    if (!delay || !mouseDown) {
      return null;
    }

    if (progressDirection === PROGRESS_DIRECTION.PULSE) {
      injectKeyframes();
    }

    // allow user supplied classname to supercede built in class
    return (
      <span
        style={{
          content: "",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          animation:
            progressDirection === PROGRESS_DIRECTION.PULSE
              ? "cruise-automation-button-pulse 1s linear infinite"
              : undefined,
          ...getProgressStyle({
            direction: progressDirection,
            percentage: progressPercentage,
            customStyle: progressStyle,
          }),
        }}
        className={progressClassName}
      />
    );
  }

  render() {
    const {
      children,
      id,
      small,
      large,
      primary,
      danger,
      warning,
      disabled,
      className,
      style,
      tooltip,
      onFocus,
    } = this.props;
    const classes = cx("button", className || "", {
      // support some bulma classes to be supplied in consumer either through bulma or custom classes
      // these provide backwards compatibility with webviz
      "is-small": small,
      "is-large": large,
      "is-primary": primary,
      "is-warning": warning,
      "is-danger": danger,
    });

    return (
      <button
        type="button"
        className={classes}
        id={id}
        onClick={this.onClick}
        onFocus={onFocus}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onMouseUp}
        style={{ position: "relative", zIndex: 0, overflow: "hidden", ...style }}
        title={tooltip}
        disabled={disabled}
      >
        {children}
        {this.renderProgressBar()}
      </button>
    );
  }
}
