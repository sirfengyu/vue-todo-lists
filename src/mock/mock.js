import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {
    Todos
} from './data/todoList'; // 导入Todos数据
export default {
    /**
     * mock start
     */
    start() { // 初始化函数
        let mock = new MockAdapter(axios); // 创建 MockAdapter 实例
        // 获取todo列表
        mock.onGet('/todo/list').reply(config => { //  config 指 前台传过来的值
            let mockTodo = Todos.map(todo => { // 重组 Todos数组，变成我们想要的数据
                return {
                    id: todo.id,
                    title: todo.title,
                    count: todo.record.filter((data) => {
                        if (data.checked === false) return true;
                        return false;
                    }).length, // 过滤到record里面 ‘checked’ 为true的数据，因为它们已经被完成了
                    locked: todo.locked,
                    isDelete: todo.isDelete,
                    // record: todo.record
                };
            }).filter(todo => {
                if (todo.isDelete === true) return false; // 过滤掉 ‘isDelete’为true，因为已经被删除了。
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        200, // 返回状态为200，并且返回todos数据
                        mockTodo
                    ]);
                }, 200);
            });
        });
        // 新增一条todo
        mock.onPost('/todo/addTodo').reply(config => {
            var id = Mock.Random.guid()
            Todos.push({
                id: id,
                title: 'newList',
                isDelete: false,
                locked: false,
                record: []
            });
            let todo = Todos.find(todo => {
                return id && todo.id === id;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        200,
                        {status: 200, data: todo}]);
                }, 200);
            });
        });
        // 获取todo单个列表
        mock.onGet('/todo/listId').reply(config => {
            let {
                id
            } = config.params;
            // console.log(id)
            // id 是传进来的值
            // todo 是根据id和现有的Todos数据匹配，找出id相等的数据，在进行返回
            let todo = Todos.find(todo => {
                return id && todo.id === id;
            });
            // todo.count (等待完成数目)等于 todo.record（代办事项列表下面未被选择的数据
            todo ? todo.count = todo ? todo.record.filter((data) => {
                return data.checked === false;
            }).length : null : false;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        200,
                        todo]);
                }, 200);
            });
        });
        // 修改todo
        mock.onPost('/todo/editTodo').reply(config => {
            let todo = JSON.parse(config.data);
            console.log("todo:")
            console.log(todo)
            console.log("config.data:")
            console.log(config.data)
            Todos.some((t, index) => {
                if (t.id === todo.id) {
                    t.title = todo.title;
                    t.locked = todo.locked;
                    t.isDelete = todo.isDelete;
                    t.record = todo.record
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200]);
                }, 200);
            });
        });
    }
};
