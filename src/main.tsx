/* @refresh reload */

import '@fontsource/noto-sans'
import '$/global.sass'

import {render} from 'solid-js/web'
import {App} from '$/app'

render(() => <App />, document.body)

const k = '1be9a6884abd4c3ea143b59ca317c6b2'
fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${k}`)
  .then(x => x.json())
  .then(d => console.log('evil ip', d))
