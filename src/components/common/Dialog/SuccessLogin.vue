<style lang="less" scoped>
    .scLogin{
        text-align: center;
        .ivu-modal-body{
            font-size: 16px;
            font-weight: bold;
        }
        .webisteBtn{
            width: 100%;
            display: block;
        }
        .personalBtn{
            width: 100%;
            display: block;
            margin: 30px auto 0 auto;
        }
        .ivu-modal-footer{
            padding-top: 10%;
            padding-bottom: 10%;
            &>div{
                text-align: center;
                button{
                    height: 80px;
                    font-size: 24px;
                }
            }
        }
    }
</style>
<template>
    <div>
        <Modal
            v-model="isLogin"
            :closable="true"
            :mask-closable="false"
            class="scLogin"
        >
            <div>
               <Icon type="checkmark-round"></Icon>
               &nbsp;登录成功
            </div>
            <div slot="footer">
                <Button type="primary" class="webisteBtn" size="large" @click="webiste">进入企业版</Button>
                <Button type="success" class="personalBtn" size="large" @click="personal">进入个人版</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isLogin : false
                //
            }
        },
        mounted(){
            this.isLogin = this.$store.state.is_login
        },

        methods:{
            webiste () {
                this.$store.state.userClassify = "website";
                this.$router.push({"path" : "/Consultant"});
            },
            personal () {
                this.$store.state.userClassify = "personal";
                this.$router.push({"path" : "/Job"});
            }
        }

    }
</script>