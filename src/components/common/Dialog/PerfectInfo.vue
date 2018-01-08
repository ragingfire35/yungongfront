<style lang="less" scoped>
    .perfectInfoBox{
        text-align: center;
        .ivu-form-item{
            width: 80%!important;
        }
        .ivu-input-group-prepend{
            width: 20%;
        }
        .ivu-input{
            width: 100%;
        }
        .ivu-icon{
            font-size: 16px;
        }
        .phone{

        }

        .ivu-modal-footer{
            button{
                width: 45%;
            }
        }
        .countDown{
            font-size: 14px;
            color: red;
        }
        .ivu-modal-footer{
            text-align: center;
        }
    }
</style>
<template>
	<div>
	    <Modal
            :closable="false"
            :mask-closable="false"
	        v-model="value1"
	        title="这是您第一次发布信息，请先完善您的个人基本信息"
            class="perfectInfoBox"
            ok-text="立即跳转"
        >
            <router-link to="/" style="color:#999;"><span class="countDown">{{ time }}</span>{{ ltHref }}</router-link>
	    </Modal>
	</div>

</template>
<script>
    export default {
        data () {
            return {
            	value1 : true,
                time : 3,
                ltHref : "\ns自动跳转到个人信息页",
                path : this.$route.path == "/PartTime" ? "/PersonalHome?name=personalInfo" : "/WebsiteHome?name=personalInfo"
            }
        },
        mounted(){
            var _this = this;
/*            var t = setInterval(function(){
                if( _this.time == 0 ){
                    _this.time = 3;
                    _this.$router.push({path: _this.path});
                } else {
                    _this.time--;
                }
            } ,1000)*/
        },
        methods: {

        }
    }
</script>
