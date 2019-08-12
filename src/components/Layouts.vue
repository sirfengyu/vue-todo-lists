<template>
    <section class="container">
        <!--最外层容器-->
        <section class="menu">
            <!--左边的容器-->
            <Menus></Menus>
        </section>
        <section class="content-container">
            <!--右边的容器-->
            <todo></todo>
        </section>
    </section>
</template>

<script>
    import Menus from './Menus'; // * 导入刚才我们创建的 menus组件
    import Todo from './Todo'
    export default {
        components: { // * 注册menus组件，让其可以在template调用
            Menus,
            Todo
        }
    };
</script>

<style lang="less">
    @import '../assets/style/layouts.less';
</style>