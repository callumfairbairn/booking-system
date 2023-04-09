import { Slot } from "@/types/slot"
import { get_AM_PM } from "./get_AM_PM"

describe('get_AM_PM', () => {
  it('returns both AM and PM false if given zero slots', () => {
    const slots: Slot[] = []

    expect(get_AM_PM(slots)).toEqual({ AM: false, PM: false })
  })

  it('returns AM as true if given only slots which start in the morning', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T11:00:00.000Z'), to: new Date('2021-01-01T13:00:00.000Z') },
    ]

    expect(get_AM_PM(slots)).toEqual({ AM: true, PM: false })
  })

  it('returns PM as true if given only slots in the afternoon', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T14:00:00.000Z'), to: new Date('2021-01-01T15:00:00.000Z') },
    ]

    expect(get_AM_PM(slots)).toEqual({ AM: false, PM: true })
  })

  it('returns both AM and PM as true if given slots in the afternoon and evening', () => {
    const slots: Slot[] = [
      { from: new Date('2021-01-01T10:00:00.000Z'), to: new Date('2021-01-01T11:00:00.000Z') },
      { from: new Date('2021-01-01T14:00:00.000Z'), to: new Date('2021-01-01T15:00:00.000Z') },
    ]

    expect(get_AM_PM(slots)).toEqual({ AM: true, PM: true })
  })
})