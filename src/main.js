import Vue from 'vue'
import App from './App.vue'
import FormElements from "@/components/UI";

Vue.config.productionTip = false

Vue.use(FormElements)

new Vue({
    render: h => h(App),
}).$mount('#app')

