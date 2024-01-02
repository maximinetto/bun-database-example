export default interface Serializable<T> {
  toJSON(): T
}