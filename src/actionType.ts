type ResolveType = (value: any) => any;
type RejectType = (value: any) => any;
type ExecutorType = (resolve: ResolveType, reject: RejectType) => any;


export type { 
  ResolveType,
  RejectType,
  ExecutorType
}