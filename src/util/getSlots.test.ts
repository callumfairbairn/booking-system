import { SlotStatus } from '@/types/slot.d';
import { booked_slot } from '@prisma/client';
import { getSlots } from './getSlots'

describe('get slots', () => {
  it('returns slots after date based on config', async () => {
    const startDate = new Date('2023-01-01')
    const bookedSlots: booked_slot[] = []
    const config = {
      slotLength: 3,
      days: 2,
      workingHours: { from: 6, to: 21 }
    }

    const expectedSlots = [
      { dateTime: new Date('2023-01-01:06:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:09:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:12:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:15:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:18:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-02:06:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-02:09:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-02:12:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-02:15:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-02:18:00:00'), status: SlotStatus.OPEN },
    ]
    expect(getSlots({ startDate, bookedSlots, config })).toEqual(expectedSlots)
  })

  it('works with working hours which are not multiples of slotLength', () => {
    const startDate = new Date('2023-01-01')
    const bookedSlots: booked_slot[] = []
    const config = {
      slotLength: 3,
      days: 1,
      workingHours: { from: 8, to: 18 }
    }

    const expectedSlots = [
      { dateTime: new Date('2023-01-01:08:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:11:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:14:00:00'), status: SlotStatus.OPEN },
    ]

    expect(getSlots({ startDate, bookedSlots, config })).toEqual(expectedSlots)
  })

  it('returns closed slots when they overlap with booked slots', () => {
    const startDate = new Date('2023-01-01')
    const bookedSlots: booked_slot[] = [
      {
        id: 1,
        created_at: new Date('2022-12-25'),
        start_time: new Date('2023-01-01:13:00:00'),
        end_time: new Date('2023-01-01:15:00:00'),
        user_email: 'bob.dole@gmail.com',
        employee_id: 1
      }
    ]
    const config = {
      slotLength: 3,
      days: 1,
      workingHours: { from: 6, to: 21 }
    }

    const expectedSlots = [
      { dateTime: new Date('2023-01-01:06:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:09:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:12:00:00'), status: SlotStatus.CLOSED },
      { dateTime: new Date('2023-01-01:15:00:00'), status: SlotStatus.OPEN },
      { dateTime: new Date('2023-01-01:18:00:00'), status: SlotStatus.OPEN },
    ]
    expect(getSlots({ startDate, bookedSlots, config })).toEqual(expectedSlots)
  })
});