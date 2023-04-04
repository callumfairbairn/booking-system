export enum SlotStatus {
    OPEN = 'open',
    CLOSED = 'closed',
}

export interface Slot {
    dateTime: Date
    status: SlotStatus
}