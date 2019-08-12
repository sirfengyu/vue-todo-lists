<template>
    <div>
        <div class="list-item editingClass editing" :class="{checked: item.checked}" v-if="item.isDelete != true">
            <!-- 最外层容器-->
            <label class="checkbox"> <!--自定义的多选框-->
                                  <input type="checkbox" v-model="item.checked"> <!--item.checked-->
                                  <span class="checkbox-custom"></span>
                                </label>
            <input type="text" v-model="item.text" placeholder='写点什么。。。' :disabled=" item.checked || locked">
            <!--绑定item.text-->
            <a class="delete-item" v-if="!(item.checked || locked)">
                <!--删除图标-->
                <span class="icon-trash"></span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做 ’item‘的数据。
        props: {
            'item': {},
            'locked': {
                type: Boolean,
                default: false
            },
        }
    };
</script>

<style lang="less">
    @import '../assets/style/list-items.less';
</style>