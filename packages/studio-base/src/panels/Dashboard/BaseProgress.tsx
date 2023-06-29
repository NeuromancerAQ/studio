import "./baseProgress.css"
import { useCallback, useEffect, useLayoutEffect, useReducer, useState } from "react";

export function BaseProgress (props) {

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