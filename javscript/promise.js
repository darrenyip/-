class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    this.callbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.FULFILLED;
      this.value = value;

      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFulfilled(value);
        });
      });
    }
  }
  reject(reason) {
    if (this.status == HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = reason;

      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(reason);
        });
      });
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != "function") {
      onFulfilled = () => this.value;
    }
    if (typeof onRejected != "function") {
      onRejected = () => this.value;
    }

    let promise = new HD((resolve, reject) => {
      if (this.status == HD.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            this.parse(promise, onFulfilled(value), resolve, reject);
          },
          onRejected: (value) => {
            this.parse(promise, onRejected(value), resolve, reject);
          },
        });
      }

      if (this.status == HD.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        });
      }

      if (this.status == HD.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        });
      }
    });
    return promise;
  }

  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError("Chaining cycle detected");
    }

    try {
      if (result instanceof HD) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

  static resolve(value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(value) {
    return new HD((resolve, reject) => {
      reject(value);
    });
  }

  static all(promises) {
    const values = [];
    return new HD((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            values.push(value);
            if (values.length == promises.length) {
              resolve(values);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static race(promises) {
    return new HD((resolve, reject) => {
      promises.map((promise) => {
        promise.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
}
let myP = new HD((resolve, reject) => {
  // resolve("resolved!");
  // reject("rejected!");
});

myP.then(
  (e) => {
    console.log(e);
  },
  (err) => {
    console.log(err);
  }
);

const promise = new Promise((resovlve, reject) => {
  resovlve("this is resolved!");
});

class myPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(run) {
    this.value = null;
    this.status = myPromise.PENDING;
    this.callbacks = [];
    run(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(result) {
    if (this.status == myPromise.PENDING) {
      this.status = myPromise.FULFILLED;
      this.value = result;
      setTimeout(() => {
        this.callbacks.map((cb) => {
          cb.onFulfilled(result);
        });
      });
    }
  }
  reject(err) {
    if (this.status == myPromise.PENDING) {
      this.status = myPromise.REJECTED;
      this.value = err;
      setTimeout(() => {
        this.callbacks.map((cb) => {
          cb.onRejected(err);
        });
      });
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != "function") onFulfilled = () => this.value;
    if (typeof onRejected != "function") onRejected = () => this.value;
    let promise = new myPromise((resolve, reject) => {
      // pending
      if (this.status == myPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            this.parse(promise, onFulfilled(value), resolve, reject);
          },
          onRejected: (value) => {
            this.parse(promise, onRejected(value), resolve, reject);
          },
        });
      }
      // fulfilled
      if (this.status == myPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        });
      }
      // rejected
      if (this.status == myPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        });
      }
    });
    return promise;
  }
  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError("channing promise found");
    }
    try {
      if (result instanceof myPromise) {
        result.then(resolve, reject);
      }
    } catch (error) {
      reject(error);
    }
  }
}
console.log("first step 1️⃣");
let ownP = new myPromise((resolve, reject) => {
  console.log("second step 2️⃣");
  setTimeout(() => {
    console.log("fourth step 4️⃣");
    resolve("pass 🤨");
  });
  // reject("err");
});
ownP.then((e) => console.log(e));
console.log("third step 3️⃣");
