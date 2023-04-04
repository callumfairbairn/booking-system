import { Slot, SlotStatus } from "@/types/slot.d"
import { booked_slot } from "@prisma/client"

const addHours = (date: Date, hours: number) => {
  const newDate = new Date(date)
  newDate.setTime(newDate.getTime() + (hours * 60 * 60 * 1000))
  return newDate
}

const bookedSlotToDateTimeInterval = (bookedSlot: booked_slot): DateTimeInterval => ({
  from: bookedSlot.start_time,
  to: bookedSlot.end_time,
})

interface DateTimeInterval {
  from: Date
  to: Date
}

const dateOverlaps = (interval1: DateTimeInterval, interval2: DateTimeInterval) => 
  (interval1.from < interval2.from && interval1.to > interval2.from) ||
  (interval1.from < interval2.to && interval1.to > interval2.to)
  

// Should make gap between from and two a multiple of slotLength for optimal number of slots
interface WorkingHours {
  from: number
  to: number
}

interface Config {
  slotLength: number
  days: number
  workingHours: WorkingHours
}

interface GetSlotsArgs {
  startDate: Date,
  bookedSlots: booked_slot[]
  config: Config,
}

export const getSlots = ({ startDate, bookedSlots, config }: GetSlotsArgs): Slot[] => {
  const { slotLength, days, workingHours } = config;
  const slotIsBooked = (slot: DateTimeInterval, bookedSlots: booked_slot[]) =>
    bookedSlots.some(bookedSlot => dateOverlaps(slot, bookedSlotToDateTimeInterval(bookedSlot)))

  const slots: Slot[] = []

  for (let nextHour = workingHours.from; nextHour < 24 * days; nextHour += slotLength) {
    const nextSlotStart = addHours(startDate, nextHour)
    const nextSlot: DateTimeInterval = { from: nextSlotStart, to: addHours(nextSlotStart, slotLength) }

    if (nextSlot.from.getHours() >= workingHours.from && nextSlot.to.getHours() <= workingHours.to && nextSlot.from.getHours() < nextSlot.to.getHours() ) {
      const status = slotIsBooked(nextSlot, bookedSlots) ? SlotStatus.CLOSED : SlotStatus.OPEN
      slots.push({ dateTime: nextSlot.from, status })
    }
  }

  return slots
}
