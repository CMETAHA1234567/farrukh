import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/store"
import {createRouter, createWebHistory} from 'vue-router'
import FieldMapBroadcact from "@/components/field-map-broadcact.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        name: 'broadcast',
        path: '/broadcast',
        component: FieldMapBroadcact
    }]
    }
)
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')