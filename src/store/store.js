import { createStore } from "vuex"

const store = createStore({
    state:{
        initiativeList: [],
        deletedInit: '1',
        columns: [],
        rows: [],
        fieldMapBackground: 'https://celes.club/uploads/posts/2022-06/1655669027_45-celes-club-p-tekstura-travi-besshovnaya-krasivo-56.jpg',
        ifTableWindow: true,
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
        },
        getColumns(state){
           return state.columns
        },
        getRows(state){
           return state.rows
        },
        getIfTableWindow(state){
           return state.ifTableWindow
        },
        getFieldMapBackground(state){
           return state.fieldMapBackground
        }
    },
    mutations: {
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
        },
        clearColumns(state){
            state.columns.length = 0
        },
        clearRows(state){
            state.rows.length = 0
        },
        rowsPush(state){
            state.rows.push('')
        },
        columnsPush(state){
            state.columns.push(state.rows)
        },
        ifTableWindowSwitch(state, payLoad){
            state.ifTableWindow = payLoad
        },
        setFieldMapBackground(state, payLoad){
            state.fieldMapBackground = payLoad
        }
    }
})

export default store