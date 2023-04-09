import { Slot } from "@/types/slot";

export interface Availability {
  AM: boolean,
  PM: boolean,
}

export const getAvailability = (slots: Slot[]): Availability => {
  const AM = slots.some(slot => slot.from.getHours() < 12)
  const PM = slots.some(slot => slot.from.getHours() >= 12)

  return { AM, PM }
}