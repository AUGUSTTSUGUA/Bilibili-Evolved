import { registerAndGetData } from '@/plugins/data'
import { Executable } from '@/core/common-types'
import { getHook } from '@/plugins/hook'
import { isUserComponent } from '@/core/settings'
import { ComponentMetadata } from '../../types'
import { uninstallComponent } from '../../user-component'

export type ComponentAction = (metadata: ComponentMetadata) => {
  name: string
  displayName: string
  action: Executable
  icon: string
  title?: string
  condition?: () => boolean
}

const builtInActions: ComponentAction[] = [
  metadata => ({
    name: 'uninstall',
    displayName: '卸载',
    icon: 'mdi-trash-can-outline',
    condition: () => isUserComponent(metadata),
    action: async () => {
      const { before, after } = getHook('userComponents.remove', metadata)
      await before()
      await uninstallComponent(metadata.name)
      await after()
    },
  }),
]
export const [componentActions] = registerAndGetData('settingsPanel.componentActions', builtInActions)
