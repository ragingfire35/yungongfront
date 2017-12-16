<style lang="less" scope>
	.modalBox{
        text-align: center;
        .ivu-form-item{
            width: 80%;
        }
        .ivu-input-group-prepend{
            width: 20%;
            .icon{
                font-size: 16px;
            }
        }
        .phone{
            display: inline-block;
            width: 39%!important;
            margin-right: 0;
        }
        .send{
            display: inline-block;
            width: 20%!important;
            margin-right: 0;
            button{
                width: 100%;
                height: 32px;
            }
        }
        .validate-code{
            display: inline-block;
            width: 20%!important;
        }
        .ivu-modal-footer{
            button{
                width: 45%;
            }
        }
    }
</style>
<template>
	<div>
	    <Modal
            :mask-closable="false"
	        v-model="value1"
	        title="这是您第一次发布用户需求，请先完善您的个人信息"
            class="modalBox"
        >
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入真实姓名">
                        <Icon type="ios-person-outline" slot="prepend" class="icon"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="phone" class="phone">
                    <Input type="text"  v-model="formInline.phone" placeholder="请输入手机号" number>
                        <Icon type="iphone" slot="prepend" class="icon"></Icon>
                    </Input>
                </Form-item>
                <Form-item class="send">
                    <Button type="default" size="large">发送</Button>
                </Form-item>
                <Form-item prop="validateCode" class="validate-code">
                    <Input type="text"  v-model="formInline.validateCode" placeholder="请输入验证码" :disabled="isPhoneRule" number>
                    </Input>
                </Form-item>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">重置</Button>
                <Button type="primary" size="large" @click="ok">确定</Button>
            </div>
	    </Modal>
	</div>

</template>
<script>
    export default {
        data () {
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
                        callback(new Error('手机号输入不正确'));
                    } else{
                         this.isPhoneRule = false;
                    }
                    callback();
                }
            };
            return {
            	value1 : true,
            	isPhoneRule : true,
                formInline: {
                    user: '',
                    phone: '',
                    validateCode: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    validateCode: [
                        { required: true, message: '请输入手机验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        this.$Message.success('提交成功!');

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            ok (type) {
                this.handleSubmit('formInline');
            },
            cancel () {
                this.handleReset("formInline");
            }
        }
    }
</script>