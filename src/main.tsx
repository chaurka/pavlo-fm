/* @refresh reload */

import '@fontsource/noto-sans'
import '$/global.sass'

import {render} from 'solid-js/web'
import {App} from '$/app'

// addEventListener('unhandledrejection', e => {
//   alert('An error occured:\n' + e.reason)
// })

render(() => <App />, document.body)
