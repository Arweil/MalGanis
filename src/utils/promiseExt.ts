/**
 * 包装promise能够支持取消promise的执行
 * @param {Promise} promise 被包装的promise
 */
export function makeCancelablePromise(promise: Promise<any>) {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) => {
      hasCanceled ? reject({ isCanceled: true }) : resolve(val);
    });
    promise.catch((error) => {
      hasCanceled ? reject({ isCanceled: true }) : reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
}

/**
 * 处理Promise队列，按照顺序依次处理Promise
 * exp:
 *  const promiseQueue = handlePromiseQueue();
 *  promiseQueue.push(promiseA);
 *  promiseQueue.push(promiseB);
 * @param {boolean} runOnlyLast 如果设置为true, 当队列中第一个Promise执行完毕会直接执行最后一个Promise
 */
export function handlePromiseQueue(runOnlyLast: boolean = false) {
  let queue: Array<() => Promise<void>> = [];
  let status = Promise.resolve();
  function execPromise(): Promise<void> {
    // https://github.com/Microsoft/TypeScript/issues/26963
    if (queue.length > 0) {
      // @ts-ignore
      return queue.shift()();
    }
    return Promise.resolve();
  }
  return {
    push: (promise: () => Promise<void>) => {
      runOnlyLast ? queue = [promise] : queue.push(promise);
      if (queue.length > 0) {
        status = status.then(execPromise);
      }
    },
  };
}
