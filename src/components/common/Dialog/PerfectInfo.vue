<style lang="less" >
    .perfectInfoBox{
        .ivu-modal-header-inner{
            text-align: center;
        }
        .inner-text{
            height: 50px;
            line-height: 50px;
            color:#666;
            text-align:center;
            font-size: 14px;
            .countDown{
                font-size: 16px;
                color: red;
            }
        }
        .ivu-modal-footer{
            text-align: center;
            button{
                width: 45%;
                &:nth-of-type(1){
                    display: none;
                }
            }
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
            @on-ok = "onOk"
        >
            <p class="inner-text"><span class="countDown">{{ time }}</span>{{ ltHref }}</p>
	    </Modal>
	</div>

</template>
<script>
    export default ({
        data () {
            return {
                t: null,//fn
            	value1 : true,
                time : 3,
                ltHref : "\ns自动跳转到个人信息页",
                path : this.$store.state.userClassify.userClass == "personal" ? "/PersonalHome?name=personalReal" : "/WebsiteHome?name=websiteCompany"
            }
        },
        mounted(){
            var _this = this;
            _this.t = setInterval(function(){
                if( _this.time == 0 ){
                    _this.time = 3;
                    _this.$router.push({path: _this.path});
                    clearInterval(_this.t);
                } else {
                    _this.time--;
                }
            } ,1000)
        },
        methods: {
            onOk(){
                this.$router.push({path: this.path});
                clearInterval(this.t);
            }
        }
    })
</script>
