customElements.define(
  "inline-circle",
  class InlineCircle extends HTMLElement {
    connectedCallback() {
      this.style.display = "inline-block";
      this.style.borderRadius = "50%";
      this.style.border = "1px solid black";
      this.style.transform = "translateY(10%)";

      // 大きさがまだ設定されていない場合、現在のフォントサイズをもとにデフォルトの大きさを設定する。
      if (!this.style.width) {
        this.style.width = "0.8em";
        this.style.height = "0.8em";
      }

      // 初期表示の際に、border-color属性値をスタイルに反映させる
      if (this.hasAttribute("border-color")) {
        this.style.borderColor = this.getAttribute("border-color");
      }
    }

    // 監視する属性を指定
    static get observedAttributes() {
      return ["border-color"];
    }

    // カスタム要素が初めて解釈される時や、その後解釈された時に、border-colorが変化するとコールバックが呼ばれる
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "border-color") {
        this.style.borderColor = newValue;
      }
    }

    // 要素の属性に対応するjavaScriptプロパティを定義する。ここで定義したゲッターとセッターは属性を読み出したり設定したりするだけ。
    // JavaScriptのプロパティが設定されると、属性が設定される。そしてattributeChangedCallbackが呼ばれる。
    get borderColor() {
      return this.getAttribute("border-color");
    }

    set borderColor(value) {
      this.setAttribute("border-color", value);
    }
  }
);
