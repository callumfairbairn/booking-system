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
      const workingHours = { from: 8, to: 23 }

      const expectedSlots: Slot[] = [
        { from: new Date('2023-01-01:08:00:00'), to: new Date('2023-01-01:11:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:09:00:00'), to: new Date('2023-01-01:12:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:10:00:00'), to: new Date('2023-01-01:13:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:11:00:00'), to: new Date('2023-01-01:14:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:12:00:00'), to: new Date('2023-01-01:15:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:13:00:00'), to: new Date('2023-01-01:16:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:14:00:00'), to: new Date('2023-01-01:17:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:15:00:00'), to: new Date('2023-01-01:18:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:16:00:00'), to: new Date('2023-01-01:19:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:17:00:00'), to: new Date('2023-01-01:20:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:18:00:00'), to: new Date('2023-01-01:21:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:19:00:00'), to: new Date('2023-01-01:22:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:20:00:00'), to: new Date('2023-01-01:23:00:00'), employee_id: 1 },
      ]

      expect(getSlots({ date, bookedSlots, employees, slotLength, workingHours })).toEqual(expectedSlots)
    })
  })

  describe('when there are booked slots', () => {
    it('does not return slots wich overlap with booked slots', () => {
      const date = new Date('2023-01-01')
      const bookedSlots: booked_slot[] = [
        {
          id: 1,
          date: new Date('2023-01-01'),
          from: new Date('2023-01-01:09:00:00'),
          to: new Date('2023-01-01:12:00:00'),
          employee_id: 1,
          created_at: new Date('2022-12-25'),
          user_email: 'leeroy.jenkins@gmail.com',
        }
      ]
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
        /* These slots are not returned because they overlap with the booked slot */
        // { from: new Date('2023-01-01:08:00:00'), to: new Date('2023-01-01:11:00:00'), employee_id: 1 },
        // { from: new Date('2023-01-01:09:00:00'), to: new Date('2023-01-01:12:00:00'), employee_id: 1 },
        // { from: new Date('2023-01-01:10:00:00'), to: new Date('2023-01-01:13:00:00'), employee_id: 1 },
        // { from: new Date('2023-01-01:11:00:00'), to: new Date('2023-01-01:14:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:12:00:00'), to: new Date('2023-01-01:15:00:00'), employee_id: 1 },
        { from: new Date('2023-01-01:13:00:00'), to: new Date('2023-01-01:16:00:00'), employee_id: 1 },
      ]

      expect(getSlots({ date, bookedSlots, employees, slotLength, workingHours })).toEqual(expectedSlots)
    })

    it('returns slots which overlap with booked slots if there is a free employee', () => {
      const date = new Date('2023-01-01')
      const bookedSlots: booked_slot[] = [
        {
          id: 1,
          date: new Date('2023-01-01'),
          from: new Date('2023-01-01:08:00:00'),
          to: new Date('2023-01-01:20:00:00'),
          employee_id: 1,
          created_at: new Date('2022-12-25'),
          user_email: 'leeroy.jenkins@gmail.com',
        }
      ]
      const employees: employee[] = [
        {
          id: 1,
          email: 'bob.dole@cleaning.com',
          name: 'Bob Dole',
          created_at: new Date('2022-12-25'),
          phone_number: '123456789',
        },
        {
          id: 2,
          email: 'troy.mcclure@cleaning.com',
          name: 'Troy McClure',
          created_at: new Date('2022-12-25'),
          phone_number: '123456789',
        },
      ]
      const slotLength = 2
      const workingHours = { from: 8, to: 16 }

      const expectedSlots: Slot[] = [
        { from: new Date('2023-01-01:08:00:00'), to: new Date('2023-01-01:10:00:00'), employee_id: 2 },
        { from: new Date('2023-01-01:09:00:00'), to: new Date('2023-01-01:11:00:00'), employee_id: 2 },
        { from: new Date('2023-01-01:10:00:00'), to: new Date('2023-01-01:12:00:00'), employee_id: 2 },
        { from: new Date('2023-01-01:11:00:00'), to: new Date('2023-01-01:13:00:00'), employee_id: 2 },
        { from: new Date('2023-01-01:12:00:00'), to: new Date('2023-01-01:14:00:00'), employee_id: 2 },
        { from: new Date('2023-01-01:13:00:00'), to: new Date('2023-01-01:15:00:00'), employee_id: 2 },
        { from: new Date('2023-01-01:14:00:00'), to: new Date('2023-01-01:16:00:00'), employee_id: 2 },
      ]

      expect(getSlots({ date, bookedSlots, employees, slotLength, workingHours })).toEqual(expectedSlots)
    })
  })
})