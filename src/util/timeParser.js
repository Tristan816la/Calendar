export const ParseTimeApm = (time, apm) => {
  if (apm === "pm") {
    let [tHour, tMin] = time.split(":");
    let hour = parseInt(tHour);
    if (hour !== 12) {
      hour += 12;
      time = `${hour.toString()}:${tMin}`;
    }
  } else {
    // 12:05AM in 24 hour is 00:05
    let [tHour, tMin] = time.split(":");
    let hour = parseInt(tHour);
    if (hour === 12) {
      hour -= 12;
      time = `${hour.toString()}:${tMin}`;
    }
  }
  return time;
};
