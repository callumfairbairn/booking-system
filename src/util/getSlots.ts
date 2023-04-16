import { FromAndTo, Slot, WorkingHours } from "@/types"
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
// Don't return slots which have no available employees
export const getSlots = ({ date, bookedSlots, employees, slotLength, workingHours }: GetSlotsArgs): Slot[] => {
  const employeeIsAvailable = (employee: employee, slot: FromAndTo) => {
    const employeeBookedSlots = bookedSlots.filter(bookedSlot => bookedSlot.employee_id === employee.id)
    return !employeeBookedSlots.some(bookedSlot => slotsOverlaps(slot, bookedSlot))
  }

  const getAvailableEmployee = (slot: FromAndTo) =>
    employees.find(employee => employeeIsAvailable(employee, slot))

  const slots: Slot[] = []

  for (let nextFromHour = workingHours.from; nextFromHour + slotLength <= workingHours.to; nextFromHour++) {
    const nextFrom = addHours(date, nextFromHour)
    const nextTo = addHours(nextFrom, slotLength)
    const employee = getAvailableEmployee({ from: nextFrom, to: nextTo })

    if (nextFrom.getHours() < nextTo.getHours() && employee) {
      slots.push({ from: nextFrom, to: nextTo, employee: employee })
    }
  }
  return slots
}
