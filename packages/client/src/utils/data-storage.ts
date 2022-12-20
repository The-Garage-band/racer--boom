export class DataStorage<T extends Record<string, any>> {
  private readonly _data: T
  private readonly _namespace: string

  constructor(namespace: string, initialData: T) {
    this._data = {} as T
    this._namespace = namespace
    if (typeof window !== "undefined" && window.localStorage) {
      Object.entries(initialData).forEach(([key, value]: [keyof T, any]) => {
        const storageValue = localStorage.getItem(
          `${this._namespace}.${key.toString()}`
        )
        if (storageValue !== null) {
          this._data[key] = JSON.parse(storageValue)
        } else {
          this._setToStorage(key, value)
          this._data[key] = value
        }
      })
    } else {
      this._data = initialData
    }
  }

  private _setToStorage(key: keyof T, value: unknown) {
    localStorage.setItem(
      `${this._namespace}.${key.toString()}`,
      JSON.stringify(value)
    )
  }

  get<R>(key: keyof T): R {
    return this._data[key]
  }

  set(key: keyof T, newValue: T[keyof T]) {
    this._data[key] = newValue
    this._setToStorage(key, newValue)
  }
}
