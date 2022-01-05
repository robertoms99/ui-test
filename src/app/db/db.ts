export interface DB {
  onSubscribe: (storeName: string, fn: Function) => Unsubscribe
  add: <T = any>(storeName: string, item: T) => Promise<void>
  findAll: <T extends unknown>(storeName: string) => Promise<T[]>
  findByPk: <T extends unknown>(storeName: string, id: string) => Promise<T>
  updateByPk: (storeName: string, item: any, id: string) => Promise<void>
}

type Unsubscribe = Function
