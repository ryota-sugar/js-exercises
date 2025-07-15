import { AlarmClock } from "./index.js";

describe("AlarmClock Check State", () => {
  test("initialState: NormalState", () => {
    const clock = new AlarmClock();
    expect(clock.state.getName()).toBe("NormalState");
  });

  test("NormalState → AlarmSetState", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    expect(clock.state.getName()).toBe("AlarmSetState");
  });

  test("AlarmSetState → AlarmSoundingState", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    expect(clock.state.getName()).toBe("AlarmSoundingState");
  });

  test("AlarmSoundingState → SnoozingState", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    clock.snooze();
    expect(clock.state.getName()).toBe("SnoozingState");
  });

  test("SnoozingState → AlarmSoundingState", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    clock.snooze();
    clock.elapseSnoozeTime();
    expect(clock.state.getName()).toBe("AlarmSoundingState");
  });

  test("AlarmSoundingState → NormalState", () => {
    const clock = new AlarmClock();
    clock.setAlarm();
    clock.reachedToAlarmTime();
    clock.cancelAlarm();
    expect(clock.state.getName()).toBe("NormalState");
  });
});
