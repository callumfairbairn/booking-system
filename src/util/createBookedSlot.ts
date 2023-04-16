import { Slot, TimeOfDay } from "@/types";

export const createBookedSlot = (slots: Slot[], timeOfDay: TimeOfDay): Slot => {
  return slots.find(slot => {
    const timeZoneOffset = slot.from.getTimezoneOffset()
    const hour = slot.from.getHours() + timeZoneOffset / 60
    return timeOfDay === TimeOfDay.AM ? hour < 12 : hour >= 12
  })!
} 