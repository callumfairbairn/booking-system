import { Slot, TimeOfDay } from "@/types";

export const createBookedSlot = (slots: Slot[], timeOfDay: TimeOfDay): Slot => {
  return slots.find(slot => {
    const timeZoneOffset = slot.from.getTimezoneOffset() / 60
    const hour = slot.from.getHours() + timeZoneOffset
    return timeOfDay === TimeOfDay.AM ? hour < 12 : hour >= 12
  })!
} 