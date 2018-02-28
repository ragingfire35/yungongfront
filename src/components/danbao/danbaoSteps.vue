<style lang="less" scoped>
    .dbSteps{
    	width: 100%;
    	background: #fff;
        overflow: hidden;
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
            .ivu-upload-list{
                display:block!important;
            }
        }
        .form-steps{
            margin: 0 8%;
        }
    }
</style>
<style lang="less">
    .fileInput,
    .projecrtName{
        .ivu-form-item-label{
            &:before{
                content: '*';
                display: inline-block;
                margin-right: 4px;
                line-height: 1;
                font-family: SimSun;
                font-size: 12px;
                color: #ed3f14;
            }
        }
    }
    .Yiname,
    .projecrtName{
        text-align: left;
    }
    .ivu-form-item{
        margin-bottom: 40px;
    }
    .fileInput{
        .mask{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(0,0,0,.8);
            button{
                width: 80%;
                height: 30%;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                font-size: 16px;
            }
        }
    }
    .radioText{
        color: #ccc;
        font-size: 16px!important;
        margin-bottom: 40px;
        &.Agree{
            color: #3399FF;
            .ivu-radio-inner{
                border-color: #3399FF;
                &::after{
                    background: #3399FF;
                }
            }
        }
    }
    .projectStep{
        margin-top: 40px;
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

        <Form
            class="form-steps"
            label-position="top"
            v-if="current == 0"
            ref="formValidate_SendZl"
            :model="formValidate_SendZl"
            :rules="ruleValidate_SendZl"
        >

            <Form-item class="fileInput" label="请将项目资料打包压缩，指定格式为*.zip">
                <Upload
                    ref="project_info"
                    type="drag"
                    :action= "API_ROOT +'/danbao/project_info.php'"
                    accept="aplication/zip"
                    :format= "['zip']"
                    :before-upload="handleBeforeUpload"
                    :on-format-error="handleFormatError"
                    :on-success="handSuccess"
                >
                    <div style="padding: 20px 0;">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将项目资料拖拽到这里上传，指定格式为*.zip</p>
                        <div class="mask" v-if="sendZL === true" @click.stop="">
                            <Button type="success" @click="reUpload">
                                <span style="font-size:14px;">'{{fileList[0].name}}'</span>
                                &nbsp;&nbsp;发送成功,重新上传
                            </Button>
                        </div>
                    </div>
                </Upload>
            </Form-item>

            <Form-item label="请简写项目名称" prop="projecrtName" class="projecrtName">
                <Input
                    v-model="formValidate_SendZl.projecrtName"
                    type="text"
                    placeholder="xxx"
                    long
                ></Input>
            </Form-item>

            <Form-item label="请输入乙方账户名称" prop="Yiname" class="Yiname">
                <Input
                    v-model="formValidate_SendZl.Yiname"
                    type="text"
                    placeholder="xxx"
                    long
                ></Input>
            </Form-item>
            <Form-item>
                <Button
                    :type=" sendZL === true ? 'success' : 'primary'"
                    long
                    size="large"
                    @click="SendZlSubmit('formValidate_SendZl')"
                    v-if = "sendZL === false"
                >
                    确认无误，提交
                </Button>
                <Button long type="success" v-else @click = "next()">
                    下一步
                </Button>
            </Form-item>
        </Form>

        <Form class="form-steps" label-position="top" v-if="current == 1">
            <Radio
                v-model = "saveZL"
                disabled
                class="radioText"
                size="large"
                v-if = "saveZL === false"
            >
                &nbsp;&nbsp;等待乙方确认资料
            </Radio>
            <Radio
                v-else
                v-model = "saveZL"
                disabled
                class="radioText Agree"
                size="large"
            >
                &nbsp;&nbsp;乙方已确认资料
            </Radio>
            <i-button long type="success" @click="saveZlFn()">下一步</i-button>
        </Form>












        <Form class="form-steps" label-position="top" v-if="current == 2">
            <Steps :current="1" direction="vertical" class="projectStep">
                <Step title="项目制作中" content=""></Step>
                <Step title="项目已完成, 待提交" >
                    <Button type="success" @click="modalShow = true">
                        提交项目
                    </Button>
                </Step>
                <Step title="项目已提交,结束" content=""></Step>
            </Steps>
            <Modal
                v-model="modalShow"
                title="上传完成的项目"
                @on-ok="ok"
                @on-cancel="cancel">
                <Form-item class="fileInput" label="请将已完成的项进行打包，指定格式为*.zip">
                    <Upload
                        type="drag"
                        :action= "API_ROOT +'/danbao/project.php'"
                        accept="application/msword"
                    >
                        <div style="padding: 20px 0;">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将已完成的项目拖拽到这里上传</p>
                        </div>
                    </Upload>
                    <div slot="footer">
                        <Button
                            :type="sendXM === true ? 'default' : sendXM === '' ? 'success' : 'warning'"
                            long
                            size="large"
                            @click="sendXM = true"
                            v-html="sendXM === true ? '等待甲方接收...' : sendXM === '' ? '甲方接收成功' : '确认无误，发送给甲方'"
                            :disabled="sendXM === true ? true : false"
                        >
                        </Button>
                    </div>

                </Form-item>
            </Modal>

            <i-button
                type="success"
                @click="next"
                long
            >下一步
            </i-button>
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
        <div style="margin: 40px 8%;">
            <i-button
                type="primary"
                v-if="current !== 0"
                @click="prev"
                long
            >上一步</i-button>
        </div>


	</div>











</template>
<script>
    export default {
        data () {
            return {
                current: 0,//当前进度
                sendZL : false,//甲方发送项目资料
                saveZL : false,//乙方确认资料
                sendXM : false,//乙方发送项目
                modalShow : false,//乙方上传项目弹窗
                fileList : [],
                formValidate_SendZl : {
                    projecrtName : "",
                    Yiname : ""
                },
                ruleValidate_SendZl :{
                    projecrtName : [
                        { required: true, message: '请简写项目名称', trigger: 'blur' }
                    ],
                    Yiname: [
                        { required: true, message: '请输入乙方账户名称', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleBeforeUpload(){
                this.fileList = [];
                this.$refs.project_info.fileList = [];
            },
            handleFormatError(file){
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 *.zip的项目资料。'
                });
            },
            handSuccess(){
                this.fileList = this.$refs.project_info.fileList;
            },
            SendZlSubmit (name) {
                if(this.$store.state.is_login == "false"){
                    this.$Message.error('请先登录');
                    return false;
                }
                if( this.fileList.length == 0 ){
                    this.$Message.warning('请先上传项目资料');
                    return;
                };
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.sendZlFn();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            sendZlFn(){
                var _this = this;
                _this.$ajax({
                    url: _this.API_ROOT + '/danbao/sendZL.php',
                    method: 'POST',
                    data : {
                        "projecrtName": _this.formValidate_SendZl.projecrtName ,
                        "receiveName" : _this.formValidate_SendZl.Yiname
                    }
                }).then((response) => {
                    this.$Message.success(response.data.msg);

                    if(response.data.status == "nameerror"){
                        _this.sendZL = false;
                    } else {
                        _this.next();
                        _this.sendZL = true;
                    }
                });
            },
            saveZlFn(){
                if( this.saveZL ){
                    this.next();
                } else {
                    this.$Message.warning('正在等待乙方确认资料(＾Ｕ＾)ノ~ＹＯ');
                }
            },
            reUpload(){
                this.$Modal.confirm({
                    title: '',
                    content: '重新上传?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.fileList = [];
                        this.$refs.project_info.handleClick();
                        this.sendZL = false;
                    },
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