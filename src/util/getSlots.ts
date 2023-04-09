import { Slot, WorkingHours } from "@/types/slot.d"
import { booked_slot, employee } from "@prisma/client"
import { addHours, slotsOverlaps } from "./slots"

interface GetSlotsArgs {
  date: Date,
  bookedSlots: booked_slot[],
  employees: employee[],
  slotLength: number,
  workingHours: WorkingHours
}

// Return slots (start datetime +  end datetime) for a given date
// Slots are an hour apart of a given length
// Don't return slots which overlap with booked slots
export const getSlots = ({ date, bookedSlots, employees, slotLength, workingHours }: GetSlotsArgs): Slot[] => {
  const slotOverlapsWithBooked = (slot: Slot, bookedSlots: booked_slot[]) =>
    // refactor booked_slot type to have from and to
    bookedSlots.some(bookedSlot => slotsOverlaps(slot, { from: bookedSlot.start_time, to: bookedSlot.end_time }))

  const slots: Slot[] = []

  for (let nextFromHour = workingHours.from; nextFromHour + slotLength <= workingHours.to; nextFromHour++) {
    const nextFrom = addHours(date, nextFromHour)
    const nextTo = addHours(nextFrom, slotLength)
    const nextSlot: Slot = { from: nextFrom, to: nextTo }

    if (nextFrom.getHours() < nextTo.getHours() && !slotOverlapsWithBooked(nextSlot, bookedSlots)) {
      slots.push(nextSlot)
    }
  }
  return slots
}
