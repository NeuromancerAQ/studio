import { format } from "date-fns";

export function formatTime(timestamp: number) {
  return format(new Date(timestamp / 1000 / 1000), "yyyy-MM-dd HH:mm:ss");
}

export function formatTime2(timestamp: number) {
  return format(new Date(timestamp / 1000 / 1000), "MM-dd HH:mm:ss");
}