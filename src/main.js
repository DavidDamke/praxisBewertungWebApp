import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'; // Correct path to your store file


// import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        }
      },
})

createApp(App).use(vuetify).use(router).use(store).mount('#app')