import { Slot } from '@/types/slot.d';
import { booked_slot, employee } from '@prisma/client';
import { getSlots } from './getSlots'

describe('getSlots', () => {
  describe('when there are no booked slots', () => {
    it('returns an empty array when there are no employees', () => {
      const date = new Date('2023-01-01')
      const bookedSlots: booked_slot[] = []
      const employees: employee[] = []
      const slotLength = 3
      const workingHours = { from: 8, to: 8 }
  
      const expectedSlots: Slot[] = []
  
      expect(getSlots({ date, bookedSlots, employees, slotLength, workingHours })).toEqual(expectedSlots)
    })
  
    it('returns slots when there are available employees', () => {
      const date = new Date('2023-01-01')
      const bookedSlots: booked_slot[] = []
      const employees: employee[] = [
        {
          id: 1,
          email: 'bob.dole@cleaning.com',
          name: 'Bob Dole',
          created_at: new Date('2022-12-25'),
          phone_number: '123456789',
        }
      ]
      const slotLength = 3
      const workingHours = { from: 8, to: 16 }
  
      const expectedSlots: Slot[] = [
        { from: new Date('2023-01-01:08:00:00'), to: new Date('2023-01-01:11:00:00') },
        { from: new Date('2023-01-01:09:00:00'), to: new Date('2023-01-01:12:00:00') },
        { from: new Date('2023-01-01:10:00:00'), to: new Date('2023-01-01:13:00:00') },
        { from: new Date('2023-01-01:11:00:00'), to: new Date('2023-01-01:14:00:00') },
        { from: new Date('2023-01-01:12:00:00'), to: new Date('2023-01-01:15:00:00') },
        { from: new Date('2023-01-01:13:00:00'), to: new Date('2023-01-01:16:00:00') },
      ]
  
      expect(getSlots({ date, bookedSlots, employees, slotLength, workingHours })).toEqual(expectedSlots)
    })
  })
})