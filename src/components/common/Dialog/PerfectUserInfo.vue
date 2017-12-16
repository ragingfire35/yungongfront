<style lang="less" >
	.modalBox{
        text-align: center;
        .ivu-form-item{
        	width: 80%;
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
    }
</style>
<template>
	<div>
	    <Modal
            :mask-closable="false"
	        v-model="value1"
	        title="这是您第一次申请兼职，请先完善您的个人信息"
            class="modalBox"
        >
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入真实姓名">
                        <Icon type="ios-person-outline" slot="prepend" class="icon"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="phone" class="phone">
                    <Input type="text"  v-model="formInline.phone" placeholder="请输入手机号" number long>
                        <Icon type="iphone" slot="prepend" class="icon"></Icon>
                    </Input>
                </Form-item>
				<Form-item  prop="mail">
		            <Input v-model="formInline.mail" placeholder="请输入邮箱">
                        <Icon type="android-mail" slot="prepend" class="icon"></Icon>
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
                    mail : ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
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