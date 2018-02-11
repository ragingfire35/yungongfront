<style lang="less" scoped>
    .dbSteps{
    	width: 100%;
    	background: #fff;

        .nextSteps{
            width: 70%;
            margin: 0 auto;
            text-align: justify;
            padding: 50px 0;
            transform :  scale(1.2);
            .ivu-steps-item{
                line-height: 26px;
            }
        }
        .fileInput{
            text-align: left;
        }
        .form-steps{
            margin: 0 8%;
        }
    }
</style>
<template>
	<div class="dbSteps">
	    <Steps :current="current" class="nextSteps">
	        <Step title="提供项目资料"></Step>
            <Step title="等待乙方确认资料"></Step>
	        <Step title="项目进行中"></Step>
            <Step title="甲乙双方交易完成"></Step>
	    </Steps>

        <Form class="form-steps" label-position="top" v-if="current == 0">

            <Form-item class="fileInput" label="请将项目资料打包压缩，指定格式为*.zip">
                <Upload
                    type="drag"
                    action=""
                    accept="aplication/zip"
                    :format= "['zip']"
                    :on-format-error="handleFormatError"
                >
                    <div style="padding: 20px 0;">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将项目资料拖拽到这里上传，指定格式为*.zip</p>
                    </div>
                </Upload>
                <Button
                    :type=" sendZL === true ? 'default' : sendZL === '' ? 'success' : 'warning'"
                    long
                    size="large"
                    @click="sendZL = true"
                    v-html="sendZL === true ? '已提交项目资料' ? '已提交项目资料' : '确认无误，提交'"
                    :disabled="sendZL === true ? true : false"
                >
                </Button>
            </Form-item>
            <Button @click="sendZL = ''">激活下一步（临时）</Button>
            <i-button type="primary" @click="next" :disabled="sendZL === '' ? false : true">下一步</i-button>
        </Form>

        <Form class="form-steps" label-position="top" v-if="current == 1">
            云工app正在制作中...<br/>
            <i-button type="primary" @click="next" :disabled="sendZL === '' ? false : true">下一步</i-button>
        </Form>

        <Form class="form-steps" label-position="top" v-if="current == 2">
            <Form-item class="fileInput" label="请将已完成的项进行打包，指定格式为*.zip">
                <Upload
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/"
                    accept="application/msword"
                >
                    <div style="padding: 20px 0;">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将已完成的项目拖拽到这里上传</p>
                    </div>
                </Upload>
                <Button
                    :type="sendXM === true ? 'default' : sendXM === '' ? 'success' : 'warning'"
                    long
                    size="large"
                    @click="sendXM = true"
                    v-html="sendXM === true ? '等待甲方接收...' : sendXM === '' ? '甲方接收成功' : '确认无误，发送给甲方'"
                    :disabled="sendXM === true ? true : false"
                >
                </Button>
            </Form-item>
            <Button @click="sendXM = ''">激活下一步（临时）</Button>
            <i-button type="primary" @click="next" :disabled="sendXM === '' ? false : true">下一步</i-button>
        </Form>


        <Form class="form-steps" label-position="top" v-if="current == 3">
            <Button
                :type="pay === true ? 'default' : pay === '' ? 'success' : 'warning'"
                long
                size="large"
                @click="pay = true, $router.push({'path': '/Pay'})"
                v-html="pay === true ? '付款中...' : pay === '' ? '交易完成' : '去付款'"
                :disabled="pay === true ? true : false"
            >
            </Button>
        </Form>
        <i-button type="primary" v-if="current !== 0" @click="prev">上一步</i-button>

	</div>

</template>
<script>
    export default {
        data () {
            return {
                current: 0,
                sendHT: false, //合同是否发送 false，true ，'',
                sendZL : false,//甲方发送项目资料
                sendXM : false,//乙方提交项目
                pay : false //付款
            }
        },
        methods: {
            handleFormatError(file){
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 *.zip的项目资料。'
                });
            },
            next () {
                if (this.current == 5) {
                    this.current = 5;
                } else {
                    this.current += 1;
                }
            },
            prev(){
                if (this.current > 0) {
                    this.current --;
                } else {
                    this.current = 0;
                }
            }
        }
    }
</script>