import axios from 'axios';

export const getTodoList = params => {
    return axios.get(`/todo/list`, {
        params: params
    });
};

export const getTodo = (params) => {
    return axios.get(`/todo/listId`, {
        params: params
    });
};

export const addTodo = params => {
    return axios.post(`/todo/addTodo`, params).then(res => res.data);
};

export const editTodo = params => {
    return axios.post(`/todo/editTodo`, params).then(res => res.data);
};

// export const replaceRecord = params => {
//     return axios.post(`/todo/record`, params).then(res => res.data);
// };


