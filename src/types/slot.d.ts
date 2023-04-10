import { booked_slot } from "@prisma/client"

export interface Slot extends Partial<booked_slot> {
    from: Date
    to: Date
    employee_id: number
}

export interface FromAndTo extends Partial<booked_slot> {
    from: Date
    to: Date
}

// Should make gap between from and two a multiple of slotLength for optimal number of slots
export interface WorkingHours {
    from: number
    to: number
  }
