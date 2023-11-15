// 针对进度条功能，增加进度条下哪个时间段是失败时间段
import { Fade, Tooltip } from "@mui/material";
import Stack from "@foxglove/studio-base/components/Stack";
import * as _ from "lodash-es";

type Range = {
  start_s: number,
  end_s: number
}

type Props = {
  range: Range[],
  total: number,
  metriclevel: number
};

export default function FailRang (props: Props): JSX.Element {
  const { range, total, metriclevel } = props

  return (
    <div style={{
      position: 'relative',
      marginBottom: '10px'
    }}>
      <div style={{
        width: '100%',
        height: '5px',
        background: '#00a388',
        position: 'absolute'
      }}>
      </div>
      {range.map((item: Range, index) => {
        return (
          <Stack key={index}>
            <Tooltip
              title={
                <div>
                  {_.round(item.start_s, 2)} ~ {_.round(item.end_s,2)}
                </div>
              }
              placement="top"
              disableInteractive
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 0 }}
            >
              <div style={{
                width: (item.end_s - item.start_s) / total * 100 + '%',
                height: '15px',
                background: metriclevel === 1 ? '#d80100' : '#ff8b00',
                position: 'absolute',
                top: '-4px',
                left: item.start_s / total * 100 + '%',
                color: '#FFFFFF',
                textAlign: 'center',
                paddingTop: '5px',
                cursor: 'pointer'
              }}>
              </div>
            </Tooltip>
          </Stack>
        )
      })}
    </div>
  )
}