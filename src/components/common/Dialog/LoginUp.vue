<style lang="less" scoped>
    .loginUpBox{
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
	        v-model="$store.state.show_loginUpBox"
	        title="注册"
            class="loginUpBox"
        >
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                        <Icon type="ios-person-outline" slot="prepend" class="icon"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="passwd">
                    <Input type="password" v-model="formInline.passwd" placeholder="请输入密码">
                        <Icon type="ios-locked-outline" slot="prepend" class="icon"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="passwdCheck">
                    <Input type="password" v-model="formInline.passwdCheck" placeholder="请再次输入密码">
                        <Icon type="ios-locked-outline" slot="prepend" class="icon"></Icon>
                        <Icon type="ios-locked-outline" slot="prepend" class="icon"></Icon>
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
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formInline.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formInline.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formInline.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formInline: {
                    user: '',
                    passwd: '',
                    passwdCheck: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' },
                        { type: 'string', max: 10, message: '用户名不能多于10字符', trigger: 'blur' }
                    ],
                    passwd: [
                        { validator: validatePass, trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6字符', trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6字符', trigger: 'blur' }
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
                        this.loginUp();
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
            },
            bcrypt () {
                var bcrypt = require('bcryptjs');    //引入bcryptjs库
                var salt = bcrypt.genSaltSync(12);    //定义密码加密的计算强度,默认10
                var hash = bcrypt.hashSync(this.formInline.passwd, salt);    //把自己的密码(this.formInline.passWord)带进去,变量hash就是加密后的密码
                return hash;
            },
            loginUp() {
                const _this = this;
                var qs = require('querystring');
                 _this.$ajax.post(
                    'api/loginUp.php',
                    qs.stringify({"username": _this.formInline.user, "pass" : _this.bcrypt() })
                ).then((response) => {
                    if(response.data.status == "repeat"){
                        _this.$Message.error(response.data.msg)
                    } else{
                        _this.$Message.success(response.data.msg);
                        _this.$store.state.show_loginUpBox = false;
                    }
                })
            }
        }
    }
</script>