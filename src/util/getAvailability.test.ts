import { Slot } from "@/types/slot"
import { getAvailability } from "./getAvailability"
import { getEmployee } from "./test/getEmployee"

const workingHours = {
  from: 10,
  to: 18,
}

describe('getAvailability', () => {
  it('returns both AM and PM false if given zero slots', () => {
    const slots: Slot[] = []

    expect(getAvailability(slots, workingHours)).toEqual({ AM: false, PM: false })
  })

  it('returns AM as true if given only slots which start in the morning', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T11:00:00.000Z'), to: new Date('2021-01-01T13:00:00.000Z'), employee: getEmployee({ id: 1 }) },
    ]

    expect(getAvailability(slots, workingHours)).toEqual({ AM: true, PM: false })
  })

  it('returns PM as true if given only slots in the afternoon', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T14:00:00.000Z'), to: new Date('2021-01-01T15:00:00.000Z'), employee: getEmployee({ id: 1 })  },
    ]

    expect(getAvailability(slots, workingHours)).toEqual({ AM: false, PM: true })
  })

  it('returns both AM and PM as true if given slots in the afternoon and evening', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T10:00:00.000Z'), to: new Date('2021-01-01T11:00:00.000Z'), employee: getEmployee({ id: 1 })  },
      { from: new Date('2021-01-01T14:00:00.000Z'), to: new Date('2021-01-01T18:00:00.000Z'), employee: getEmployee({ id: 1 })  },
    ]

    expect(getAvailability(slots, workingHours)).toEqual({ AM: true, PM: true })
  })

  it('returns false for PM if the slot overlaps with the end of the working day', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T16:00:00.000Z'), to: new Date('2021-01-01T20:00:00.000Z'), employee: getEmployee({ id: 1 })  },
    ]

    expect(getAvailability(slots, workingHours)).toEqual({ AM: false, PM: false })
  })
})