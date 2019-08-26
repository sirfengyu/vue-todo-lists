import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeTodoId: 'todo-2',
        todoList: [
            {
                id: 'todo-1',  //单条待办项唯一标示
                title: '第一条代办事项', // 标题
                count: 10,  // 未完成待办项数目
                isDelete: false, // 是否删除(物理删除)
                locked: false, // 是否锁定
                record: [  // 代办项纪录列表
                    {
                        id: '1',
                        text: '第1条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    },
                    {
                        id: '2',
                        text: '第2条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    }
                ]
            },
            {
                id: 'todo-2',  //单条待办项唯一标示
                title: '第二条代办事项', // 标题
                count: 12,  // 未完成待办项数目
                isDelete: false, // 是否删除(物理删除)
                locked: false, // 是否锁定
                record: [  // 代办项纪录列表
                    {
                        id: '3',
                        text: '第3条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    },
                    {
                        id: '4',
                        text: '第4条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    }
                ]
            },
            {
                id: 'todo-3',  //单条待办项唯一标示
                title: '第三条代办事项', // 标题
                count: 12,  // 未完成待办项数目
                isDelete: false, // 是否删除(物理删除)
                locked: false, // 是否锁定
                record: [  // 代办项纪录列表
                    {
                        id: '5',
                        text: '第5条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    },
                    {
                        id: '6',
                        text: '第6条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    }
                ]
            },
            {
                id: 'todo-4',  //单条待办项唯一标示
                title: '第四条代办事项', // 标题
                count: 12,  // 未完成待办项数目
                isDelete: false, // 是否删除(物理删除)
                locked: false, // 是否锁定
                record: [  // 代办项纪录列表
                    {
                        id: '7',
                        text: '第5条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    },
                    {
                        id: '8',
                        text: '第6条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    }
                ]
            },
            {
                id: 'todo-5',  //单条待办项唯一标示
                title: '第五条代办事项', // 标题
                count: 12,  // 未完成待办项数目
                isDelete: false, // 是否删除(物理删除)
                locked: false, // 是否锁定
                record: [  // 代办项纪录列表
                    {
                        id: '9',
                        text: '第5条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    },
                    {
                        id: '10',
                        text: '第6条代办单项',  // 文字内容
                        isDelete: false, // 是否删除(物理删除)
                        checked: false // 是否完成
                    }
                ]
            },
        ],
        record: [  // 代办项纪录列表
        ]
    },

    getters: {

    },

    mutations: {
        setActiveTodoId(state, value) {
            state.activeTodoId = value
        },
        setRecord(state, value){
            state.record = value
        },
        addTodo(state, value) {
            state.todoList.push(value)
        },
        setTodoList(state, value){
            state.todoList = value
        }
    },
    actions: {

    }
})
