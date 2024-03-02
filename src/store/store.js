import { createStore } from "vuex"

const store = createStore({
    state:{
        name: "Vue",
        initiativeList: []
    },
    getters: {
       getName(state){
           return state.initiativeList[0].name
       },
       getArray(state){
           return state.initiativeList
       }
    },
    mutations: {
        setName(state, payLoad){
            state.name = payLoad
        },
        initiativeAssigned(state, payLoad){
            state.initiativeList.push(payLoad)
        },
        nextTurn(state){
            state.initiativeList.unshift(state.initiativeList.pop())
        }
    }
})

export default store