// Promise类
import type { ResolveType, RejectType, ExecutorType } from './actionType';

class Promise<T=any> { // 一般类泛型和函数泛型都建议带上！
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string
  public resolveValue!: any
  public rejectValue!: any
  // 处理异步
  private solveCbs: Array<()=>void> = []
  private rejectCbs: Array<()=>void> = []

  constructor(executor: ExecutorType) {
    this.status = 'pending'; // 初始状态，等待状态
    this.resolve = (value: any): any => {
      console.log('执行resolve...')
      if (this.status !== 'pending') return; 
      this.status = 'fulfilled'; // 成功状态
      this.resolveValue = value;

      // 处理异步
      this.solveCbs.forEach(cb => cb())
    };
    this.reject = (err: any): any => {
      if (this.status !== 'pending') return;
      this.status = 'rejected'; // 失败状态
      this.rejectValue = err;
      console.log('执行失败: ', this.rejectValue);

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
    console.log('进入then...')
    return new Promise((resolve, reject) => {
      let res;
      if (this.status === 'fulfilled') {
        res = onFulfilled(this.resolveValue);
        resolve(res);
      } else if (this.status === 'rejected') {
        res = onRejected(this.rejectValue);
        reject(res);
      } else if (this.status === 'pending') { // 处理异步
        this.solveCbs.push(() => {
          res = onFulfilled(this.resolveValue);
          console.log('then-resolve-res: ', res);
          resolve(res);
        })
        this.rejectCbs.push(() => {
          res = onRejected(this.rejectValue);
          console.log('then-reject-res: ', res);
          reject(res);
        })
      }
    });
  }
}

export default Promise;