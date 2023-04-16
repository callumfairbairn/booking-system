import { Slot, TimeOfDay } from "@/types"
import { employee } from "@prisma/client"
import { createBookedSlot } from "./createBookedSlot"

const getEmployee = (id: number): employee => ({
  id,
  name: 'Bob Dole',
  email: 'bob.dole@gmail.com',
  phone_number: '1234567890',
  created_at: new Date(),
})

describe('createBookedSlot', () => {
  it('creates a slot with the time of the first AM if given AM as the time of day', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T10:00:00.000Z'), to: new Date('2021-01-01T11:00:00.000Z'), employee: getEmployee(1) },
      { from: new Date('2021-01-01T14:00:00.000Z'), to: new Date('2021-01-01T15:00:00.000Z'), employee: getEmployee(2) },
    ]

    expect(createBookedSlot(slots, TimeOfDay.AM)).toEqual(slots[0])
  })

  it('returns the first PM if given PM as the time of day', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T10:00:00.000Z'), to: new Date('2021-01-01T11:00:00.000Z'), employee: getEmployee(1) },
      { from: new Date('2021-01-01T14:00:00.000Z'), to: new Date('2021-01-01T15:00:00.000Z'), employee: getEmployee(2) },
    ]

    expect(createBookedSlot(slots, TimeOfDay.PM)).toEqual(slots[1])
  })
})