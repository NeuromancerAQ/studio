// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Fragment, Suspense, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useSharedRootContext } from "@foxglove/studio-base/context/SharedRootContext";
import EventsProvider from "@foxglove/studio-base/providers/EventsProvider";
import ProblemsContextProvider from "@foxglove/studio-base/providers/ProblemsContextProvider";
import { StudioLogsSettingsProvider } from "@foxglove/studio-base/providers/StudioLogsSettingsProvider";
import TimelineInteractionStateProvider from "@foxglove/studio-base/providers/TimelineInteractionStateProvider";

import Workspace from "./Workspace";
import DocumentTitleAdapter from "./components/DocumentTitleAdapter";
import MultiProvider from "./components/MultiProvider";
import PlayerManager from "./components/PlayerManager";
import SendNotificationToastAdapter from "./components/SendNotificationToastAdapter";
import StudioToastProvider from "./components/StudioToastProvider";
import AppConfigurationContext from "./context/AppConfigurationContext";
import CurrentLayoutProvider from "./providers/CurrentLayoutProvider";
import PanelCatalogProvider from "./providers/PanelCatalogProvider";
import { LaunchPreference } from "./screens/LaunchPreference";
import { parseAppURLState } from "@foxglove/studio-base/util/appURLState";

// Suppress context menu for the entire app except on inputs & textareas.
function contextMenuHandler(event: MouseEvent) {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
    return;
  }

  event.preventDefault();
  return false;
}

export function StudioApp(): JSX.Element {
  const {
    dataSources,
    deepLinks,
    appConfiguration,
    enableLaunchPreferenceScreen,
    extraProviders,
    appBarLeftInset,
    customWindowControlProps,
    onAppBarDoubleClick,
    AppBarComponent,
  } = useSharedRootContext();

  const providers = [
    /* eslint-disable react/jsx-key */
    <TimelineInteractionStateProvider />,
    <CurrentLayoutProvider />,
    <PlayerManager playerSources={dataSources} />,
    <EventsProvider />,
    /* eslint-enable react/jsx-key */
  ];

  if (extraProviders) {
    providers.unshift(...extraProviders);
  }

  // The toast and logs provider comes first so they are available to all downstream providers
  providers.unshift(<StudioToastProvider />);
  providers.unshift(<StudioLogsSettingsProvider />);

  // Problems provider also must come before other, depdendent contexts.
  providers.unshift(<ProblemsContextProvider />);

  const MaybeLaunchPreference = enableLaunchPreferenceScreen === true ? LaunchPreference : Fragment;

  useEffect(() => {
    document.addEventListener("contextmenu", contextMenuHandler);
    return () => {
      document.removeEventListener("contextmenu", contextMenuHandler);
    };
  }, []);


  useEffect(() => {
    const params = parseAppURLState(new URL(window.location.href));
    const token = params?.token || ''
    fetch('http://36.99.116.208:30677/api/v1/uto/user/test', {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(data => {
        if (data.code === 'A1308') {
          window.location.href = 'http://somersault.utopilot.com.cn/login'
        }
      })
      .catch(error => {
        window.location.href = 'http://somersault.utopilot.com.cn/login'
      });
  }, []);

  return (
    <AppConfigurationContext.Provider value={appConfiguration}>
      <MaybeLaunchPreference>
        <MultiProvider providers={providers}>
          <DocumentTitleAdapter />
          <SendNotificationToastAdapter />
          <DndProvider backend={HTML5Backend}>
            <Suspense fallback={<></>}>
              <PanelCatalogProvider>
                <Workspace
                  deepLinks={deepLinks}
                  appBarLeftInset={appBarLeftInset}
                  onAppBarDoubleClick={onAppBarDoubleClick}
                  showCustomWindowControls={customWindowControlProps?.showCustomWindowControls}
                  isMaximized={customWindowControlProps?.isMaximized}
                  initialZoomFactor={customWindowControlProps?.initialZoomFactor}
                  onMinimizeWindow={customWindowControlProps?.onMinimizeWindow}
                  onMaximizeWindow={customWindowControlProps?.onMaximizeWindow}
                  onUnmaximizeWindow={customWindowControlProps?.onUnmaximizeWindow}
                  onCloseWindow={customWindowControlProps?.onCloseWindow}
                  AppBarComponent={AppBarComponent}
                />
              </PanelCatalogProvider>
            </Suspense>
          </DndProvider>
        </MultiProvider>
      </MaybeLaunchPreference>
    </AppConfigurationContext.Provider>
  );
}
