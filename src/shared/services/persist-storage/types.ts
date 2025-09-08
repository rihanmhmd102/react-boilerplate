export type PersistStorage = {
  get: (key: string) => string | null
  getAsString: (key: string) => string
  getAsInt: (key: string) => number
  getAsFloat: (key: string) => number
  getAsBoolean: (key: string) => boolean
  getAsObject: <T extends object = object>(key: string) => T
  has: (key: string) => boolean
  set: (key: string, value: string) => void
  setPrimitive: (key: string, value: number | string | boolean | null) => void
  setObject: (key: string, value: object) => void
  remove: (key: string) => void
  clear: () => void
}
