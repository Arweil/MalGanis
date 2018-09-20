/**
 * 包装promise能够支持取消promise的执行
 * @param {Promise} promise 被包装的promise
 */
export function makeCancelablePromise(promise) {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) => {
      hasCanceled ? reject(new Error({ isCanceled: true })) : resolve(val);
    });
    promise.catch((error) => {
      hasCanceled ? reject(new Error({ isCanceled: true })) : reject(error);
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
export function handlePromiseQueue(runOnlyLast = false) {
  let queue = []
  let status = Promise.resolve()
  function execPromise() {
    if (queue.length > 0) {
      return queue.shift()()
    }
    return Promise.resolve()
  }
  return {
    push: (promise) => {
      runOnlyLast ? queue = [promise] : queue.push(promise)
      if (queue.length > 0) {
        status = status.then(execPromise)
      }
    }
  }
}
