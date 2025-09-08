import type { PersistStorage } from './types'

/**
 * Local storage service error
 */
export class LocalStorageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LocalStorageError'
  }
}

const notSupportedError = new LocalStorageError('localStorage is not supported')

/**
 * Service for working with localStorage implementing PersistStorage
 */
class LocalStorageService implements PersistStorage {
  private readonly storage: Storage | undefined

  constructor() {
    this.storage = typeof window !== 'undefined' ? window.localStorage : undefined
  }

  /**
   * Gets data from localStorage
   *
   * @param {string} key - Key to get data
   * @returns {string | null} Data or null if data not found
   */
  get(key: string): string | null {
    try {
      if (!this.storage) {
        throw notSupportedError
      }
      return this.storage.getItem(key)
    }
    catch (error) {
      console.error(`Error getting data from localStorage (${key}):`, error)
      return null
    }
  }

  /**
   * Gets data from localStorage as string
   *
   * @param {string} key - Key to get data
   * @returns {string} Data as string or empty string if data not found
   */
  getAsString(key: string): string {
    return this.get(key) || ''
  }

  /**
   * Gets data from localStorage as integer
   *
   * @param {string} key - Key to get data
   * @returns {number} Data as integer or 0 if data not found or cannot be converted
   */
  getAsInt(key: string): number {
    const value = this.get(key)
    if (!value)
      return 0

    try {
      const num = Number.parseInt(value, 10)
      return Number.isNaN(num) ? 0 : num
    }
    catch {
      return 0
    }
  }

  /**
   * Gets data from localStorage as float
   *
   * @param {string} key - Key to get data
   * @returns {number} Data as float or 0.0 if data not found or cannot be converted
   */
  getAsFloat(key: string): number {
    const value = this.get(key)
    if (!value)
      return 0.0

    try {
      const num = Number.parseFloat(value)
      return Number.isNaN(num) ? 0.0 : num
    }
    catch {
      return 0.0
    }
  }

  /**
   * Gets data from localStorage as boolean
   *
   * @param {string} key - Key to get data
   * @returns {boolean} Data as boolean (true if value equals string "true", otherwise false)
   */
  getAsBoolean(key: string): boolean {
    return this.get(key) === 'true'
  }

  /**
   * Gets data from localStorage as object
   *
   * @param {string} key - Key to get data
   * @returns {T} Deserialized object or empty object if data not found or cannot be deserialized
   */
  getAsObject<T extends object = object>(key: string): T {
    const value = this.get(key)
    if (!value)
      return {} as T

    try {
      return JSON.parse(value) as T
    }
    catch {
      console.error(`Error parsing JSON from localStorage (${key})`)
      return {} as T
    }
  }

  /**
   * Checks if data exists in localStorage by key
   *
   * @param {string} key - Key to check
   * @returns {boolean} true if data exists, otherwise false
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Saves primitive value to localStorage
   *
   * @param {string} key - Key to save data
   * @param {number | string | boolean | null} value - Value to save
   * @throws {LocalStorageError} In case of saving error
   */
  setPrimitive(key: string, value: number | string | boolean | null): void {
    try {
      if (!this.storage) {
        throw notSupportedError
      }
      if (value === null) {
        this.storage.removeItem(key)
      }
      else {
        this.storage.setItem(key, String(value))
      }
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`Error saving data to localStorage (${key}):`, error)

      if (errorMessage.includes('QuotaExceededError') || errorMessage.includes('quota_exceeded')) {
        throw new LocalStorageError('localStorage quota exceeded. Please free up space by deleting unnecessary data.')
      }
      else {
        throw new LocalStorageError(`Failed to save data to localStorage: ${errorMessage}`)
      }
    }
  }

  /**
   * Saves object to localStorage
   *
   * @param {string} key - Key to save data
   * @param {object} value - Object to save
   * @throws {LocalStorageError} In case of saving or serialization error
   */
  setObject(key: string, value: object): void {
    try {
      const serialized = JSON.stringify(value)
      this.setPrimitive(key, serialized)
    }
    catch (error) {
      console.error(`Error serializing object for localStorage (${key}):`, error)
      throw new LocalStorageError('Failed to serialize object for localStorage saving')
    }
  }

  /**
   * Removes data from localStorage by key
   *
   * @param {string} key - Key of data to remove
   */
  remove(key: string): void {
    try {
      if (!this.storage) {
        throw notSupportedError
      }
      this.storage.removeItem(key)
    }
    catch (error) {
      console.error(`Error removing data from localStorage (${key}):`, error)
    }
  }

  /**
   * Clears entire localStorage
   */
  clear(): void {
    try {
      if (!this.storage) {
        throw notSupportedError
      }
      this.storage.clear()
    }
    catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }

  /**
   * Sets string value to localStorage
   *
   * @param {string} key - Key to save data
   * @param {string} value - Value to save
   * @throws {LocalStorageError} In case of saving error
   */
  set(key: string, value: string): void {
    try {
      if (!this.storage) {
        throw notSupportedError
      }
      this.storage.setItem(key, value)
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`Error saving data to localStorage (${key}):`, error)

      if (errorMessage.includes('QuotaExceededError') || errorMessage.includes('quota_exceeded')) {
        throw new LocalStorageError('localStorage quota exceeded. Please free up space by deleting unnecessary data.')
      }
      else {
        throw new LocalStorageError(`Failed to save data to localStorage: ${errorMessage}`)
      }
    }
  }
}

export const localStorageService = new LocalStorageService()
