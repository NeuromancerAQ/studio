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
import { useCallback, useMemo, useContext } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { redoLayoutChange, undoLayoutChange } from "@foxglove-studio/app/actions/layoutHistory";
import { ScreenshotsContext } from "@foxglove-studio/app/components/Screenshots/ScreenshotsProvider";
import useEventListener from "@foxglove-studio/app/hooks/useEventListener";
import { downloadFiles } from "@foxglove-studio/app/util";

const inNativeUndoRedoElement = (eventTarget: EventTarget) => {
  if (eventTarget instanceof HTMLTextAreaElement) {
    let element: Element | null | undefined = eventTarget;
    // It's not always convenient to set the data property on the textarea itself, but we can set
    // it on a nearby ancestor.
    while (element) {
      if (element instanceof HTMLElement && element.dataset.nativeundoredo) {
        return true;
      }
      element = element.parentElement;
    }
  }
  return false;
};

type Props = {
  openSaveLayoutModal?: () => void;
  openLayoutModal?: () => void;
  openShortcutsModal?: () => void;
  history: any;
};

export default function GlobalKeyListener({
  openSaveLayoutModal,
  openLayoutModal,
  history,
}: Props) {
  const dispatch = useDispatch();
  const actions = useMemo(
    () => bindActionCreators({ redoLayoutChange, undoLayoutChange }, dispatch),
    [dispatch],
  );
  const { takeScreenshot } = useContext(ScreenshotsContext);

  const keyDownHandler: (arg0: KeyboardEvent) => void = useCallback(
    (e) => {
      const target = e.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        // The user is typing in an editable field; ignore the event.
        return;
      }

      const lowercaseEventKey = e.key.toLowerCase();
      if (e.key === "?") {
        history.push(`/help${window.location.search}`);
      }

      if (!(e.ctrlKey || e.metaKey)) {
        return;
      }
      if (lowercaseEventKey === "z") {
        // Don't use ctrl-Z for layout history actions inside the Monaco Editor. It isn't
        // controlled, and changes inside it don't result in updates to the Redux state. We could
        // consider making the editor controlled, with a separate "unsaved state".
        if (inNativeUndoRedoElement(e.target as any)) {
          return;
        }

        // Use e.shiftKey instead of e.key to decide between undo and redo because of capslock.
        e.stopPropagation();
        e.preventDefault();
        if (e.shiftKey) {
          actions.redoLayoutChange();
        } else {
          actions.undoLayoutChange();
        }
      } else if (lowercaseEventKey === "s" && openSaveLayoutModal) {
        e.preventDefault();
        openSaveLayoutModal();
      } else if (lowercaseEventKey === "e" && openLayoutModal) {
        e.preventDefault();
        openLayoutModal();
      } else if (lowercaseEventKey === "/") {
        e.preventDefault();
        history.push(`/shortcuts${window.location.search}`);
      } else if (lowercaseEventKey === "j" && process.env.NODE_ENV !== "production") {
        // TODO (DWinegar): Remove this key listener once we get the screenshots for comments working.
        e.preventDefault();
        const element = document.querySelector(".PanelLayout-root");
        if (!element) {
          throw new Error(
            `takeScreenshot could not find element with selector ".PanelLayout-root"`,
          );
        }
        takeScreenshot(element as any)
          .then((blob) => {
            if (blob) {
              downloadFiles([{ blob, fileName: "screenshot.png" }]);
            }
          })
          .catch((error) => console.warn(error));
      }
    },
    [openSaveLayoutModal, openLayoutModal, history, actions, takeScreenshot],
  );

  // Not using KeyListener because we want to preventDefault on [ctrl+z] but not on [z], and we want
  // to handle events when text areas have focus.
  useEventListener(document, "keydown", true, keyDownHandler, [keyDownHandler]);

  return null;
}
