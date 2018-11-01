<template>
    <div style="width:90vw ; padding:10px" >


        <div class="container-fluid" style="height:80vh; overflow-x: scroll">
            <div class="row">
                <table class="table table-bordered width:90vw">
                    <colgroup>
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                        <col width="200">
                    </colgroup>
                    <thead>
                    <tr>
                        <!--<td v-for="item in title">{{item}}</td>-->
                        <td v-for="item in title">{{item}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(lists,index) in returned" :key="index">
                        <td v-for="(list,index) in lists.attribute_columns" :key="index" >
                            {{list[1]}}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                returned: null,
                title: [
                    '接口名',
                    'header',
                    'info',
                    'ip',
                    'method',
                    'param',
                    'return',
                    'return_type',
                    'type',
                    'url',
                    'username'
                ],

            }
        },
        created() {
            $.ajax({
                url: 'http://xxx.xxx.xxx/xxx/pubc/log',
                type: 'post',

                success: res => {
                    console.log(res);
                    if (res.code === 1) {
                        this.returned = res.data.rows

                    }
                }
            })
        }
    }
</script>

<style scoped>

</style>
