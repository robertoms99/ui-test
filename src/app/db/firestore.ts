import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  getFirestore,
  onSnapshot,
  updateDoc,
  WhereFilterOp
} from 'firebase/firestore'

import { DB } from './db'

export class FirestoreDB implements DB {
  constructor(private readonly db = getFirestore()) {}

  onSubscribe(storeName: string, fn: Function) {
    const unsubscribe = onSnapshot(collection(this.db, storeName), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      fn(data)
    })
    return unsubscribe
  }

  async add<T = any>(storeName: string, item: T) {
    await addDoc(collection(this.db, storeName), item)
  }

  async findAll<T extends unknown>(storeName: string) {
    const querySnapshot = await getDocs(collection(this.db, storeName))
    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      } as unknown as T
    })
  }

  async findOne<T extends unknown>(
    storeName: string,
    basicConditions: Array<{ fieldName: string; opStr: WhereFilterOp; value: string }>
  ) {
    const q = query(
      collection(this.db, storeName),
      ...basicConditions.map(({ fieldName, opStr, value }) => where(fieldName, opStr, value))
    )

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      } as unknown as T
    })
  }

  async findByPk<T extends any>(storeName: string, id: string) {
    const ref = doc(this.db, storeName, id)
    const snapshot = await getDoc(ref)
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as unknown as T
  }

  async updateByPk(storeName: string, item: any, id: string) {
    const ref = doc(this.db, storeName, id)
    await updateDoc(ref, item)
  }
}

export default () => new FirestoreDB()
