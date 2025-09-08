import { themeService } from '@/shared/stores'

import { UIStore } from './ui-store'

export function createUIStore() {
  return new UIStore(themeService)
}

export { UIStore }
