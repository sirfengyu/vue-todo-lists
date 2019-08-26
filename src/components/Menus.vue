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
            <span class="icon-plus" ></span> 新增
        </a>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
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
                    this.$store.commit('setActiveTodoId',value)
                }
            },
            todoList: {
                get: function() {
                    return this.$store.state.todoList;
                }
            },
        },
        methods: {
            ...mapMutations([
                'setActiveTodoId',
                'addTodo'
            ]),
            clickMenu(id) {
                this.activeTodoId = id
            },
            addTodoList() {
                this.addTodo({
                    id: 'todo-undifine',  //单条待办项唯一标示
                    title: '未命名', // 标题
                    count: 0,  // 未完成待办项数目
                    isDelete: false, // 是否删除(物理删除)
                    locked: false, // 是否锁定
                    record: []
                });
                this.activeTodoId = 'todo-undifine'
            }
        }
    };
</script>

<style lang="less">
    @import '../assets/style/menu.less';
</style>
