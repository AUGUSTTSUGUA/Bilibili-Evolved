import { attributes } from '@/core/observer'
import { select } from '@/core/spin-query'

const playerModePolyfill = async () => {
  const bpxContainer = await select('.bpx-player-container') as HTMLElement
  if (!bpxContainer) {
    console.warn('[bpx player polyfill] bpxContainer not found')
    return
  }
  attributes(bpxContainer, () => {
    const dataScreen = bpxContainer.getAttribute('data-screen')
    document.body.classList.toggle('player-mode-webfullscreen', dataScreen === 'full' || dataScreen === 'web')
    document.body.classList.toggle('player-mode-widescreen', dataScreen === 'wide')
  })
}
const idPolyfill = async () => {
  const pbp = await select(() => unsafeWindow.$pbp)
  if (!pbp) {
    console.warn('[bpx player polyfill] pbp not found')
    return
  }
  const idData = {
    aid: pbp.options.aid.toString(),
    cid: pbp.options.cid.toString(),
    bvid: pbp.options.bvid,
  }
  if (Object.values(idData).some(it => it === '' || parseInt(it) <= 0)) {
    console.warn('[bpx player polyfill] invalid pbp data')
  }
  Object.assign(unsafeWindow, idData)
}
export const bpxPlayerPolyfill = lodash.once(async () => {
  if (!document.URL.startsWith('https://www.bilibili.com/bangumi/play/')) {
    return
  }
  playerModePolyfill()
  idPolyfill()
})
