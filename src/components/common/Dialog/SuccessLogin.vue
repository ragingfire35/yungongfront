<style lang="less">
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
<style lang="less">
.scLogin{
    .ivu-modal-mask{
        background-color: rgba(51, 51, 51, 1);
    }
}

</style>
<template>
    <div>
        <Modal
            v-model="$store.state.is_login === 'true'"
            :closable="false"
            :mask-closable="false"
            class="scLogin"
        >
            <div>
               <Icon type="checkmark-round"></Icon>
               &nbsp;登录成功
            </div>
            <div slot="footer">
                <Button type="primary" class="webisteBtn" size="large" @click="webisteFn">进入企业版</Button>
                <Button type="success" class="personalBtn" size="large" @click="personalFn">进入个人版</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        mounted(){
        },

        methods:{
            webisteFn () {
                this.$store.dispatch("userClassify", 'website');
                this.$router.push({"path" : "/Consultant"});
            },
            personalFn () {
                this.$store.dispatch("userClassify", 'personal');
                this.$router.push({"path" : "/Job"});
            }
        }

    }
</script>
