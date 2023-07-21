import { Button, Stack } from "@mui/material";
import assert from "assert";
import { useEffect, useState } from "react";
import {
  LayoutID,
  LayoutState,
  useCurrentLayoutActions,
  useCurrentLayoutSelector,
} from "@foxglove/studio-base/context/CurrentLayoutContext";
import { useDebounce } from "use-debounce";
import { migratePanelsState } from "@foxglove/studio-base/services/migrateLayout";
import { LayoutData } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
import { defaultLayout } from "@foxglove/studio-base/providers/CurrentLayoutProvider/defaultLayout";
import Log from "@foxglove/log";


function selectLayoutData(state: LayoutState) {
  return state.selectedLayout?.data;
}

const log = Log.getLogger(__filename);

const KEY = "studio.layout";

export default function UploadButton() {

  const [selectedSource, setSelectedSource] = useState({});

  const handleFileChange = (e) => {
    if(e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsText(e.target.files[0], "UTF-8");

      reader.onload = function (e) {
        const file_string: any = e.target.result;
        const file_json = JSON.parse(file_string);

        setSelectedSource(file_json);
      }
    }
  }

  const { setCurrentLayoutState } = useCurrentLayoutActions();
  const currentLayoutData = useCurrentLayoutSelector(selectLayoutData);

  useEffect(() => {
    if (selectedSource) {
      setCurrentLayoutState({
        selectedLayout: {
          id: "default" as LayoutID,
          data: selectedSource,
        }
      });
    }
  }, [selectedSource, setCurrentLayoutState]);

  const [debouncedLayoutData] = useDebounce(currentLayoutData, 250, { maxWait: 500 });

  useEffect(() => {
    if (!debouncedLayoutData) {
      return;
    }

    const serializedLayoutData = JSON.stringify(debouncedLayoutData);
    assert(serializedLayoutData);
    localStorage.setItem(KEY, serializedLayoutData);
  }, [debouncedLayoutData]);

  useEffect(() => {
    log.debug(`Reading layout from local storage: ${KEY}`);

    const serializedLayoutData = localStorage.getItem(KEY);

    if (serializedLayoutData) {
      log.debug("Restoring layout from local storage");
    } else {
      log.debug("No layout found in local storage. Using default layout.");
    }

    const layoutData = migratePanelsState(
      serializedLayoutData ? (JSON.parse(serializedLayoutData) as LayoutData) : defaultLayout,
    );
    setCurrentLayoutState({
      selectedLayout: {
        id: "default" as LayoutID,
        data: layoutData,
      },
    });
  }, [setCurrentLayoutState]);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Layout
        <input hidden accept=".json" type="file" onChange={handleFileChange} />
      </Button>
    </Stack>
  );
}