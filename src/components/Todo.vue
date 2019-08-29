<template>
    <div class="page lists-show">
        <!--最外层容器-->
        <nav>
            <!--容器上半部分-->
            <div class="nav-group">
                <!--移动端的菜单图标-->
                <a class="nav-item">
                    <span class="icon-list-unordered"></span>
                </a>
            </div>
            <div class="form list-edit-form" v-if="isUpdate">
                <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
                <input type="text" v-model="todo.title" @keyup.enter="finishUpdateTitle">
            </div>
            <h1 class="title-page" v-if="!isUpdate" @click="updateTitle">
                <span class="title-wrapper">{{todo.title}}</span>
                <span class="count-list">{{todo.count}}</span>
            </h1>
            <div class="nav-group right">
                <!-- 右边的删除，锁定图标容器-->
                <div class="options-web">
                    <a class=" nav-item" @click="onLock">
                        <!-- 锁定图标-->
                        <span class="icon-lock" v-if="todo.locked"></span>
                        <span class="icon-unlock" v-else></span>
                    </a>
                    <a class=" nav-item">
                        <!-- 删除图标-->
                        <span class="icon-trash" @click="deleteTodo" v-if="!todo.locked"></span>
                    </a>
                </div>
            </div>
    
            <div class=" form todo-new input-symbol">
                <span class="icon-add"></span>
                <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
                <input type="text" v-model="text" placeholder='请输入' @keyup.enter="addRecordMethod" :disabled="todo.locked" />
            </div>
        </nav>
        <div class="content-scrollable list-items">
            <!--容器下半部分-->
            <div v-for="item in todo.record" v-bind:key="item.index">
                <!-- 这里`v-for`会循环我们在 `data`函数 事先定义好的 ’items‘模拟数据，循环后拿到单个对象，在通过prop把数据传输给子组件 item -->
                <item :item="item" :locked="todo.locked" @deleteRecordEvent="editRecord" @editRecordEvent="editRecord"></item>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item';
    import Mock from 'mockjs'; // 导入mockjs 模块
    import {
        mapMutations,
        mapActions
    } from 'vuex';
    export default {
        data() {
            return {
                text: "",
                isUpdate: false,
    
            };
        },
        computed: {
            todoList: {
                get: function() {
                    return this.$store.state.todoList;
                },
                set: function(value) {
                    this.setTodoList(value)
                }
            },
            activeTodoId: {
                get: function() {
                    return this.$store.state.activeTodoId;
                },
                set: function(value) {
                    this.setActiveTodoId(value)
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
            init() {
                this.getTodoAction()
            },
            // 当用户点击回车时候 ，给items的值新增一个对象，this.text 即输入框绑定的值
            addRecordMethod() {
                console.log("111111")
                this.addRecord({
                    checked: false,
                    text: this.text,
                })
                //初始化输入框的值。
                this.text = "";
                // this.repalceRecordAction()
                this.editTodoAction().then(res => {
                    this.getTodoAction()
                    this.getTodoListAction()
                })
            },
            updateTitle() {
                if (!this.todo.locked) {
                    this.isUpdate = true
                }
            },
            finishUpdateTitle() {
                this.isUpdate = false
                console.log('finishUpdateTitle:')
                console.log(this.todo.title)
                this.editTodoAction().then(res => {
                    this.getTodoListAction()
                })
            },
            deleteTodo() {
                if (!this.todo.locked) {
                    this.todo.isDelete = true
                    this.editTodoAction().then(res => {
                        this.getTodoListAction()
                    })
                }
            },
            editRecord(item) {
                console.log(item)
                for (let i in this.record) {
                    if (this.record[i].id === item.id) {
                        this.record[i] = item
                    }
                }
                this.editTodoAction().then(res => {
                    this.getTodoAction()
                })
            },
            onLock() {
                console.log(this.todo)
                this.todo.locked = !this.todo.locked
                console.log(this.todo)
                this.editTodoAction()
            },
            ...mapMutations([
                'setTodoList',
                'setActiveTodoId',
                'setTodo',
                'addRecord'
            ]),
            ...mapActions([
                'getTodoListAction',
                'getTodoAction',
                'repalceRecordAction',
                'editTodoAction'
            ])
        },
        components: {
            Item
        },
        created() {
            // this.init()
        },
        mounted() {},
        watch: {
            activeTodoId: function() {
                this.isUpdate = false
                this.init()
            }
        }
    };
</script>

<style lang = "less">
    @import "../assets/style/nav.less";
    @import "../assets/style/form.less";
    @import "../assets/style/todo.less";
</style>
