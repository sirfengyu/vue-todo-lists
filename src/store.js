import Vue from 'vue'
import Vuex from 'vuex'
import {
    getTodoList,
    getTodo,
    addTodo,
    editTodo,
} from './api'; // 引入api接口函数getTodoList，请求最新的代办事项列表数据
import { reject } from 'any-promise';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeTodoId: '',
        todoList: [],
        todo: [],
        record: []
    },

    mutations: {
        setActiveTodoId(state, value) {
            state.activeTodoId = value
        },
        setTodoList(state, value) {
            state.todoList = value
        },
        setTodo(state, value) {
            state.todo = value
        },
        addTodo(state, value) {
            state.todoList.push(value)
        },
        addRecord(state, value) {
            state.todo.record.push(value)
        },
    },
    actions: {
        // 查询menu
        getTodoListAction({ commit, state }) {
            return new Promise((resolve, reject) => {
                getTodoList().then(res => {
                    console.log('getTodoListAction:')
                    console.log(res)
                    commit('setTodoList', res.data)
                    if (!(state.todoList.find(todo => todo.id === state.activeTodoId)) || !(state.activeTodoId)) {
                        commit('setActiveTodoId', res.data[0].id)
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 查询todo
        getTodoAction({ commit, state }) {
            return new Promise((resolve, reject) => {
                getTodo({ id: state.activeTodoId }).then(res => {
                    console.log('getTodoAction:')
                    console.log(res.data)
                    commit('setTodo', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 添加todo
        addTodoAction({ commit }) {
            return new Promise((resolve, reject) => {
                addTodo().then(res => {
                    commit('addTodo', res.data)
                    commit('setActiveTodoId', res.data.id)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 修改todo
        editTodoAction({ state }) {
            return new Promise((resolve, reject) => {
                editTodo(state.todo).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
})
