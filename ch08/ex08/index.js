export const counterGroup = () => {
  const counters = [];

  return {
    newCounter: () => {
      // 新しいカウンターオブジェクトを作成し、内部状態を管理する
      const state = { value: 0 };
      counters.push(state);
      return {
        count: () => state.value++,
        reset: () => (state.value = 0),
      };
    },
    total: () => counters.reduce((sum, c) => sum + c.value, 0),
    average: () => {
      if (counters.length === 0) throw new TypeError("No counters exist");
      return counters.reduce((sum, c) => sum + c.value, 0) / counters.length;
    },
    variance: () => {
      if (counters.length < 2)
        throw new TypeError("Less than 2 counters exist");
      const avg =
        counters.reduce((sum, c) => sum + c.value, 0) / counters.length;
      return (
        // 偏差の二乗の平均
        counters.reduce((sum, c) => sum + Math.pow(c.value - avg, 2), 0) /
        counters.length
      );
    },
  };
};
