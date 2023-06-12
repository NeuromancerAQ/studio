import "./baseProgress.css"
import { useCallback, useEffect, useLayoutEffect, useReducer, useState } from "react";

export function BaseProgress () {

  const [percentage, setPercentage] = useState(0)

  return (
    <div className={"tadviz-progress"}>
      <div className={"tadviz-outer"}>
        <div className={"tadviz-inner"}></div>
      </div>
      <div className={"tadviz-progress-percentage"}>{ percentage.toFixed(2) }%</div>
    </div>
  )
}