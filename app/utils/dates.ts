import moment from "moment";

// from date string to isoString
const newDate = moment('2016-01-01').toISOString();

// from isoString to date string
let iso80Date = "ISODate string" // like 2023-12-04T00:00:00.000Z
const newDate2 = iso80Date.split("T")[0]

export function fromIso(isoDate : string): string {
    const dateString = isoDate?.split("T")[0]
    return dateString
}

export function toIso(dateString : string): string {
    const isoString = moment(dateString).toISOString();
    return isoString
}

export const toISOStringWithTimezone = (date: Date): string => {
    if (!date || !(date instanceof Date)) {
      return '';
    }
    const pad = (n: any) => `${Math.floor(Math.abs(n))}`?.padStart(2, '0');
    return `${date?.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date?.getDate()
    )}T${pad(date?.getHours())}:${pad(date?.getMinutes())}:${pad(
      date?.getSeconds()
    )}`;
  };
