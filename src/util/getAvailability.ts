import { Slot, WorkingHours } from "@/types/slot";

export interface Availability {
  AM: boolean,
  PM: boolean,
}

export const getAvailability = (slots: Slot[], workingHours: WorkingHours): Availability => {
  if (slots.length === 0) {
    return { AM: false, PM: false }
  }
  const timeZoneOffset = slots[0].from.getTimezoneOffset() / 60
  const AM = slots.some(slot => slot.from.getHours() + timeZoneOffset < 12)
  const PM = slots.some(slot => slot.from.getHours() + timeZoneOffset >= 12 && slot.to.getHours() + timeZoneOffset <= workingHours.to)

  return { AM, PM }
}