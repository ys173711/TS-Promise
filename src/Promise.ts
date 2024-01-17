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
      console.log('resolve: ', value);
      this.resolveValue = value;
    };
    this.reject = (value: any): any => {
      if (this.status !== 'pending') return;
      this.status = 'rejected'; // 失败状态
      console.log('reject: ', value);
      this.rejectValue = value;
    };
    
    executor(this.resolve, this.reject);
  }

  then(onFulfilled: ResolveType, onRejected: RejectType) {
    if (this.status === 'fulfilled') {
      console.log('then-resolveValue: ', this.resolveValue);
      onFulfilled(this.resolveValue);
    } else if (this.status === 'rejected') {
      console.log('then-rejectValue: ', this.rejectValue);
      onRejected('error');
    }
  }
}

export default Promise;