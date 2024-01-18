// Promise类
import type { ResolveType, RejectType, ExecutorType } from './actionType';

class Promise<T=any> { // 一般类泛型和函数泛型都建议带上！
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string
  public resolveValue!: any
  public rejectValue!: any
  // 处理异步
  private resolveCbs: Array<()=>void> = []
  private rejectCbs: Array<()=>void> = []

  constructor(executor: ExecutorType) {
    this.status = 'pending'; // 初始状态，等待状态
    this.resolve = (value: any): any => {
      if (this.status !== 'pending') return; 
      this.status = 'fulfilled'; // 成功状态
      this.resolveValue = value;

      // 处理异步
      this.resolveCbs.forEach(cb => cb())
    };
    this.reject = (err: any): any => {
      if (this.status !== 'pending') return;
      this.status = 'rejected'; // 失败状态
      this.rejectValue = err;

      // 处理异步
      this.rejectCbs.forEach(cb => cb())
    };
    
    try {
      executor(this.resolve, this.reject);
    } catch (error: any) {
      this.status = 'pending'
      // 将执行期间错误传递给reject，并中止程序。
      this.reject(error.toString()); 
      throw new Error('程序中止...');
    }
  }

  then(onFulfilled: ResolveType, onRejected: RejectType) {
    return new Promise((resolve, reject) => {
      let res: any;
      if (this.status === 'fulfilled') {
        res = onFulfilled(this.resolveValue);
        resolve(res);
      } else if (this.status === 'rejected') {
        res = onRejected(this.rejectValue);
        reject(res);
      } else if (this.status === 'pending') { // 处理异步
        this.processManyAsyncAndSync(onFulfilled, onRejected, resolve, reject)
      }
    });
  }

  processManyAsyncAndSync(onFulfilled: ResolveType, onRejected: RejectType, resolve: ResolveType, reject: RejectType) {
    let res: any;
    this.resolveCbs.push(() => {
      res = onFulfilled(this.resolveValue);
      if(isPromise(res)) {
        res.then((resolveRes) => {
          resolve(resolveRes)
        }, (rejectRes) => {
          reject(rejectRes)
        })
      } else {
        resolve(res);
      }
    })
    this.rejectCbs.push(() => {
      res = onRejected(this.rejectValue);
      if(isPromise(res)) {
        res.then((resolveRes) => {
          resolve(resolveRes)
        }, (rejectRes) => {
          reject(rejectRes)
        })
      } else {
        reject(res);
      }
    })
  } 
}

// 自定义守卫isPromise  Vue3源码片段
function isPromise(val: any): val is Promise {
  return isObject(val) && isFunction(val.then);
}
// 自定义守卫isObject
function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === 'object';
}
// 自定义守卫isFunction
function isFunction(val: any): val is Function {
  return typeof val === 'function';
}

export default Promise;