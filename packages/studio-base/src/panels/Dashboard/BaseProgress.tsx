import "./baseProgress.css"
import { useCallback, useEffect, useLayoutEffect, useReducer, useState } from "react";

type Props = {
  percentage: number;
}

export function BaseProgress (props: Props) {

  return (
    <div className={"tadviz-progress"}>
      <div className={"tadviz-outer"}>
        <div className={"tadviz-inner"} style={{
          width: props.percentage + '%'
        }}></div>
      </div>
      <div className={"tadviz-progress-percentage"}>{ props.percentage.toFixed(2) }%</div>
    </div>
  )
}