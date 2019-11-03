import { uniqueId } from 'lodash-es'

export interface Resource<T> {
  id: string,
  read(): T
}

type PromiseState <T> = {
  status: 'pending'
} | {
  status: 'success'
  result: T
} | {
  status: 'error'
  result: Error
}


/**
 * Taken from code sandbox link referenced in official React docs.
 * https://codesandbox.io/s/frosty-hermann-bztrp
 *
 * They say not to copy / paste, but you only YOLO once.
 */
export const wrapPromise = <T> (
  promise: Promise<T>
): Resource<T> => {
  let state: PromiseState<T> = {
    status: 'pending'
  };
  const id = uniqueId('wrapped_promise_')
  const suspender = promise.then(
    r => {
      state = {
        status: 'success',
        result: r
      }
    },
    e => {
      state = {
        status: 'error',
        result: e
      }
    }
  );

  return {
    id,
    read() {
      switch (state.status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw state.result;
        case 'success':
          return state.result;
      }
    }
  };
}
