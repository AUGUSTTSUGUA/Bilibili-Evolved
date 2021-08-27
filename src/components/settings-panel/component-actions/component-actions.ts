import { registerAndGetData } from '@/plugins/data'
import { ExecutableWithParameter } from '@/core/common-types'
import { getHook } from '@/plugins/hook'
import { isUserComponent } from '@/core/settings'
import { ComponentMetadata } from '../../types'
import { uninstallComponent } from '../../user-component'

export interface ComponentAction {
  name: string
  displayName: string
  action: ExecutableWithParameter<[ComponentMetadata], void>
  icon: string
  condition?: (metadata: ComponentMetadata) => boolean
}

export const [componentActions] = registerAndGetData('settingsPanel.componentActions', [{
  name: 'uninstall',
  displayName: '卸载',
  icon: 'mdi-trash-can-outline',
  condition: isUserComponent,
  action: async metadata => {
    const { before, after } = getHook('userComponents.remove', metadata)
    await before()
    await uninstallComponent(metadata.name)
    await after()
  },
}] as ComponentAction[])
