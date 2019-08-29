<template>
    <div class="list-todos">
        <a @click="clickMenu(item.id)" class="list-todo list activeListClass" :class="{'active': item.id === activeTodoId}" v-for="item in todoList" v-bind:key="item.index">
            <!-- v-for 列表渲染-->
            <span class="icon-lock" v-if="item.locked"></span>
            <!-- v-if 条件渲染-->
            <span class="count-list" v-if="item.count > 0">{{item.count}}</span> {{item.title}}
            <!-- 数据绑定，看模板语法-->
        </a>
        <a class=" link-list-new" @click="addTodoList">
            <!--新增菜单-->
            <span class="icon-plus"></span> 新增
        </a>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations,
        mapActions
    } from 'vuex'
    export default {
        data() { //data函数
            return {}
        },
    
        computed: {
            // ...mapState([
            //     'todoList'
            // ]),
            ...mapState({
                // todoList: state => state.todoList,
                // activeTodoId: state => state.activeTodoId
            }),
            activeTodoId: {
                get: function() {
                    return this.$store.state.activeTodoId
                },
                set: function(value) {
                    // this.setActiveTodoId(value)
                    this.$store.commit('setActiveTodoId', value)
                }
            },
            todoList: {
                get: function() {
                    return this.$store.state.todoList;
                }
            },
            todo: {
                get: function() {
                    return this.$store.state.todo;
                },
                set: function(value) {
                    this.setTodo(value)
                }
            }
        },
        methods: {
            ...mapMutations([
                'setActiveTodoId'
            ]),
            clickMenu(id) {
                this.activeTodoId = id
            },
            addTodoList() {
                this.addTodoAction().then(res => {
                    this.activeTodoId = res.data.id
                })
            },
            init() {
               this.getTodoListAction().then(res => {
                    this.getTodoAction().then(res => {})
                }).catch(err => {
                    console.log(err);
                })
                this.isUpdate = false
            },
            ...mapActions([
                'getTodoListAction',
                'getTodoAction',
                'addTodoAction',
            ])
        },
        created() {
            this.init()
        },
        watch: {
            activeTodoId: function() {
                // this.init()
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/style/menu.less';
</style>
