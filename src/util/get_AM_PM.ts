import { Slot } from "@/types/slot";

export interface AM_PM {
  AM: boolean,
  PM: boolean,
}

export const get_AM_PM = (slots: Slot[]): AM_PM => {
  const AM = slots.some(slot => slot.from.getHours() < 12)
  const PM = slots.some(slot => slot.from.getHours() >= 12)

  return { AM, PM }
}