export enum TimeOfDay {
  AM = 'AM',
  PM = 'PM',
}

export type Availability = Record<TimeOfDay, boolean>

