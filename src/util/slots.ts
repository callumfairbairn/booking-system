import { Slot } from "@/types/slot"

export const addHours = (date: Date, hours: number) => {
    const newDate = new Date(date)
    newDate.setTime(newDate.getTime() + (hours * 60 * 60 * 1000))
    return newDate
  }
  
export const slotsOverlaps = (slot1: Slot, slot2: Slot) =>
  (slot1.from < slot2.from && slot1.to > slot2.from) ||
  (slot1.from < slot2.to && slot1.to > slot2.to) ||
  (slot2.from < slot1.from && slot2.to > slot1.from) ||
  (slot2.from < slot1.to && slot2.to > slot1.to) ||
  (slot1.from.getTime() === slot2.from.getTime() && slot1.to.getTime() === slot2.to.getTime())