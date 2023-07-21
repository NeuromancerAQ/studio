import { formatTime2 } from "@foxglove/studio-base/util/utoUtil"
import {isNumber} from "lodash"
const formatTime = (value) => {
  if (isNumber(value)) {
    return formatTime2(value)
  } else if (typeof(value) === 'bigint') {
    return formatTime2(Number(value))
  } else {
    return "N/A"
  }
}

const planningPath = [
  {
    label: '车辆类型',
    path: 'vehicle_info.vehicle_type'
  },
  {
    label: '时间戳',
    path: 'header.time_pub',
    format: formatTime
  },
  {
    label: 'Plan任务ID',
    path: 'planning_stage_info.task_id'
  },
  {
    label: 'Plan任务阶段',
    path: 'planning_stage_info.task_stage'
  },
  {
    label: 'Plan任务终点类型',
    path: 'planning_stage_info.destination_type'
  },
  {
    label: '剩余距离',
    path: 'planning_stage_info.distance_to_end'
  },
  {
    label: '规划内部场景',
    path: 'planning_stage_info.current_scenario'
  },
  {
    label: '规划内部任务阶段',
    path: 'planning_stage_info.current_stage'
  },
  {
    label: '规划当前执行的task',
    path: 'planning_stage_info.current_task'
  },
  {
    label: '规划绕行调试信息',
    path: 'debug_info.debug_info'
  }
]

const taskManagePath = [
  {
    label: 'TaskMgr任务ID',
    path: 'task_destination_info.task_id'
  },
  {
    label: 'TaskMgr任务',
    path: 'task_destination_info.current_task_type'
  },
  {
    label: '终点港口',
    path: 'task_destination_info.destination_id'
  },
  {
    label: '终点类型',
    path: 'task_destination_info.destination_type'
  },
  {
    label: '终点库位ID',
    path: 'task_destination_info.parking_id'
  },
  {
    label: '去缓冲区原因',
    path: 'fms_operation.park_reason'
  },
  {
    label: '任务状态',
    path: 'task_destination_info.task_stage'
  }
]

export { planningPath, taskManagePath }