// GoFのstateパターンでのコード

// 抽象クラスを定義する。各クラスの呼び出し時に関数を実装することを強制する。
class State {
  getName() {
    // 状態の名前を返すメソッド(テスト用)
    return this.constructor.name;
  }
  setAlerm() {
    throw new Error("setAlermメソッドは実装されていません");
  }
  cancelAlarm() {
    throw new Error("cancelAlarmメソッドは実装されていません");
  }
  reachedToAlarmTime() {
    throw new Error("reachedToAlarmTimeメソッドは実装されていません");
  }
  snooze() {
    throw new Error("snoozeメソッドは実装されていません");
  }
  elapseSnoozeTime() {
    throw new Error("elapseSnoozeTimeメソッドは実装されていません");
  }
}

// ConcreteStateの実装
// 各stateに対応するクラスを定義し、Stateクラスを継承する。
// 各メソッドは、setStateにより適切な状態に遷移するように
class NormalState extends State {
  setAlerm(context) {
    context.setState(new AlarmSetState());
  }
}

class AlarmSetState extends State {
  cancelAlarm(context) {
    context.setState(new NormalState());
  }
  reachedToAlarmTime(context) {
    context.setState(new AlarmSoundingState());
  }
}

class AlarmSoundingState extends State {
  snooze(context) {
    context.setState(new SnoozingState());
  }
  cancelAlarm(context) {
    context.setState(new NormalState());
  }
}

class SnoozingState extends State {
  elapseSnoozeTime(context) {
    context.setState(new AlarmSoundingState());
  }
  cancelAlarm(context) {
    context.setState(new NormalState());
  }
}

// Contextクラスの実装
export class AlarmClock {
  constructor() {
    this.state = new NormalState(); // 初期状態はNormalState
  }

  setState(state) {
    this.state = state;
  }

  setAlarm() {
    this.state.setAlerm(this);
  }
  cancelAlarm() {
    this.state.cancelAlarm(this);
  }
  reachedToAlarmTime() {
    this.state.reachedToAlarmTime(this);
  }
  snooze() {
    this.state.snooze(this);
  }
  elapseSnoozeTime() {
    this.state.elapseSnoozeTime(this);
  }
}
