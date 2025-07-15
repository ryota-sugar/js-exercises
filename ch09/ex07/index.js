class LinkedList {
  #head = null;
  #tail = null;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  push(value) {
    const newNode = { value, next: null };
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
  }

  pushAll(...items) {
    items.forEach((item) => this.push(item));
  }

  toString() {
    let current = this.#head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return "[" + values.join(", ") + "]";
  }
}

// Composition形式
export class InstrumentedLinkedList {
  #pushCount = 0;

  constructor() {
    this.list = new LinkedList();
    this.#pushCount = 0;
  }

  get pushCount() {
    return this.#pushCount;
  }

  push(item) {
    this.list.push(item);
    this.#pushCount++;
  }

  pushAll(...items) {
    this.list.pushAll(...items);
    this.#pushCount += items.length;
  }
}
