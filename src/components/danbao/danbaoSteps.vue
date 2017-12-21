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
    .form-steps{
        margin: 0 8%;
    }
}
</style>
<template>
	<div class="dbSteps">
	    <Steps :current="current" class="nextSteps">
	        <Step title="签订合同"></Step>
	        <Step title="提供项目资料"></Step>
	        <Step title="项目进行中"></Step>
	        <Step title="项目交付"></Step>
            <Step title="付款，交易完成"></Step>

	    </Steps>
        <Form class="form-steps">
            <Upload
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
            </Upload>
        </Form>
	    <i-button type="primary" @click="next">下一步</i-button>
	</div>

</template>
<script>
    export default {
        data () {
            return {
                current: 0
            }
        },
        methods: {
            next () {
                if (this.current == 6) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            }
        }
    }
</script>