const makeSameVariableName = () => {
  // 文ブロックを使って同じ関数内に同じ変数名の const を複数宣言
  {
    const name = "Sato";
    console.log(name); // Sato
  }
  {
    const name = "Suzuki";
    console.log(name); // Suzuki
  }
  {
    const name = "Tanaka";
    console.log(name); // Tanaka
  }
};

makeSameVariableName();
