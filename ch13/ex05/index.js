import { wait } from "../wait.js";

export function g1() {
  return wait(1000)
    .then(() => {
      console.log("A");
      return wait(2000);
    })
    .then(() => {
      console.log("B");
      return wait(3000);
    })
    .then(() => {
      console.log("C");
    });
}

export function g2() {
  return wait(1000)
    .then(() => {
      console.log("A");
      return wait(2000);
    })
    .then(() => {
      console.log("B");
      return wait(3000);
    })
    .then(() => {
      console.log("C");
    });
}

export function g3() {
  // 以下2つの関数が存在するとします (中身は適当)
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  // eslint-disable-next-line no-unused-vars
  function fetchUserFriends(user) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }
  //   書き方1
  //   return fetchUser().then((user) => {
  //     return fetchUserFriends(user).then((friends) => {
  //       console.log(`${user.name} has ${friends.length} friends!`);
  //     });
  //   });

  // 書き方2
  // ネストが深くならない書き方(user.nameを出力するためにuserも返す必要がある)
  return fetchUser()
    .then((user) => {
      return fetchUserFriends(user).then((friends) => {
        return { user, friends };
      });
    })
    .then(({ user, friends }) => {
      console.log(`${user.name} has ${friends.length} friends!`);
    });
}

export function g4() {
  function someFunction() {
    return 42;
  }

  // NOTE: この関数 g4 は Promise を返す必要があるものとする
  // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
  return Promise.resolve(someFunction());
}
