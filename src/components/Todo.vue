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
                        <span class="icon-trash" @click="deleteTodo"></span>
                    </a>
                </div>
            </div>
    
            <div class=" form todo-new input-symbol">
                <span class="icon-add"></span>
                <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
                <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked" />
            </div>
        </nav>
        <div class="content-scrollable list-items">
            <!--容器下半部分-->
            <div v-for="item in record" v-bind:key="item.index">
                <!-- 这里`v-for`会循环我们在 `data`函数 事先定义好的 ’items‘模拟数据，循环后拿到单个对象，在通过prop把数据传输给子组件 item -->
                <item :item="item" :locked="todo.locked" @deleteRecordEvent="deleteRecord" @editRecordEvent="editRecord"></item>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item';
    import Mock from 'mockjs'; // 导入mockjs 模块
    import {
        mapMutations
    } from 'vuex';
    export default {
        data() {
            return {
                todo: {
                    //详情内容
                    title: "星期一",
                    count: 13,
                    locked: false
                },
                //新增代办单项绑定的值
                text: "",
                // activeTodoId: 'todo-2',
                isUpdate: false
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
            record: {
                get: function() {
                    return this.$store.state.record;
                },
                set: function(value) {
                    this.setRecord(value)
                    // this.$store.commit('setRecord',value)
                }
            }
        },
        methods: {
            // 当用户点击回车时候 ，给items的值新增一个对象，this.text 即输入框绑定的值
            onAdd() {
                this.record.push({
                    id: Mock.Random.guid(),
                    checked: false,
                    text: this.text,
                    isDelete: false
                });
                //初始化输入框的值。
                this.text = "";
            },
            init() {
                this.todo = this.todoList.find(i => i.id == this.activeTodoId)
                this.record = this.todo.record
                this.isUpdate = false
            },
            updateTitle() {
                if(!this.todo.locked){
                this.isUpdate = true
                }
            },
            finishUpdateTitle(){
                this.isUpdate = false
            },
            deleteTodo() {
                for (let i in this.todoList) {
                    if (this.todoList[i].id === this.activeTodoId) {
                        this.todoList.splice(i, 1)
                    }
                }
                if (this.todoList.length > 0) {
                    this.activeTodoId = this.todoList[0].id
                    this.init
                } else {
                    this.todo = {
                        title: '未命名',
                        count: 0
                    }
                    this.addTodo(this.todo)
                    this.record = []
                }
            },
            deleteRecord(item) {
                // console.log(item)
                for (let i in this.record) {
                    if (this.record[i].id === item.id) {
                        this.record.splice(i, 1)
                    }
                }
            },
            editRecord(item) {
                // console.log(item)
                for (let i in this.record) {
                    if (this.record[i].id === item.id) {
                        this.record[i].text = item.text
                    }
                }
            },
            onLock() {
                this.todo.locked = !this.todo.locked
            },
            ...mapMutations([
                'setRecord',
                'setTodoList',
                'setActiveTodoId',
                'addTodo'
            ])
        },
        components: {
            Item
        },
        created() {
            this.init()
        },
        watch: {
            activeTodoId: function() {
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
