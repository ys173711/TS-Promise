// Promise类
import type { ResolveType, RejectType, ExecutorType } from './actionType';

class Promise<T=any> { // 一般类泛型和函数泛型都建议带上！
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string
  public resolveValue!: any
  public rejectValue!: any
  constructor(executor: ExecutorType) {
    this.status = 'pending'; // 默认状态，等待状态
    this.resolve = (value: any): any => {
      if (this.status !== 'pending') return; 
      this.status = 'fulfilled'; // 成功状态
      value[10] = 100
      this.resolveValue = value;
    };
    this.reject = (err: any): any => {
      if (this.status !== 'pending') return;
      this.status = 'rejected'; // 失败状态
      this.rejectValue = err;
      console.log('失败的: ', this.rejectValue);
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
    if (this.status === 'fulfilled') {
      onFulfilled(this.resolveValue);
    } else if (this.status === 'rejected') {
      onRejected(this.rejectValue);
    }
  }
}

export default Promise;