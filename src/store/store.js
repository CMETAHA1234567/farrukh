import { createStore } from "vuex"

const store = createStore({
    state:{
        name: "Vue",
        initiativeList: [],
        deletedInit: '1',
    },
    getters: {
       getName(state){
           return state.initiativeList[0].name
       },
       getArray(state){
           return state.initiativeList
       },
        getDeleteInit(state){
           return state.deletedInit
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
            state.initiativeList.push(state.initiativeList.shift())
        },
        deleteCharacter (state, payLoad) {
            for (let i = 0; i < state.initiativeList.length; i++){
                if (state.initiativeList[i].name === payLoad.name) {
                    state.initiativeList.splice(i, 1)
                }
            }
        },
        addDeletedInit (state, payLoad) {
            state.deletedInit = payLoad.name
            /*console.log(payLoad.name)
            console.log(store.getters.getDeleteInit)*/
        }
    }
})

export default store