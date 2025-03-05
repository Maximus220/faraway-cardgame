import { createApp } from 'vue'
import App from './router.vue'
import router from './router.js';

import './assets/base.css'

let vue = createApp(App)
vue.use(router).mount('body');
router.app = vue;

// $.ajaxSetup({
//     beforeSend: function(xhr, options) {
//         options.url = "http://localhost:4500" + options.url;
//     }
// })

export default vue;
