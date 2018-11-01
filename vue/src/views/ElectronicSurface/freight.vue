<template>
    <div>
        运费模板
    </div>
</template>

<script>
    export default {
        name: "freight",
        created(){
            $.ajax({
                url:'https://xxx.xxx.xxx/xxx/freight/goodsSetFreight',
                type:'post',
                success:function(){

                }
            })
        }
    }
</script>

<style scoped>

</style>
