import { booked_slot, employee } from "@prisma/client"

export interface Slot {
    from: booked_slot["from"]
    to: booked_slot["to"]
    employee: employee
}

export interface FromAndTo {
    from: booked_slot["from"]
    to: booked_slot["to"]
}

// Should make gap between from and two a multiple of slotLength for optimal number of slots
export interface WorkingHours {
    from: number
    to: number
  }
