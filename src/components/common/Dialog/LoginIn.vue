<style lang="less" scoped>
    .loginInBox{
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
    }
</style>
<template>
	<div>
	    <Modal
            :mask-closable="false"
	        v-model="$store.state.show_loginInBox"
	        title="登录"
            class="loginInBox"
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
                <div v-if="firstPassError">
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
                </div>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">重置</Button>
                <Button type="primary" size="large" @click="ok">
                    <span v-if="!loading">确定</span>
                    <span v-else>Loading...</span>
                </Button>
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
                loading: false,
                isPhoneRule : true,
                firstPassError : false,
                formInline: {
                    user: 'aa',
                    passwd: 'aaaaaa',
                    phone: '',//17602130354
                    validateCode: ''//1031a
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' },
                        { type: 'string', max: 10, message: '用户名不能多于10字符', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6字符', trigger: 'blur' }
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
                        this.loginIn();
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
               let bcrypt = require('bcryptjs');    //引入bcryptjs库
               let salt = bcrypt.genSaltSync(12);    //定义密码加密的计算强度,默认10
               let hash = bcrypt.hashSync(this.formInline.passwd, salt);    //把自己的密码(this.formInline.passWord)带进去,变量hash就是加密后的密码
               return bcrypt;
            },
            loginIn() {
                const _this = this;
                const bcrypt = _this.bcrypt();
                _this.loading = true;
                _this.qs = require('querystring')
                 _this.$ajax.post(
                    _this.API_ROOT + '/loginIn.php',
                    _this.qs.stringify({"username": _this.formInline.user})
                ).then((response) => {
                    if(response.data.status == "nameerror"){
                        _this.$Message.error(response.data.msg)
                    } else{
                        if( bcrypt.compareSync(_this.formInline.passwd, response.data.pass) ){

                             //若是密码相同则返回true
                             //this.formInline.passWord为用户输入的密码,hash为后台返回的密码
                              _this.checkLoginin();
                        } else {
                              _this.$Message.error("密码输入不正确");
                              _this.firstPassError = true;
                        }
                    }
                })
            },
            checkLoginin (){

                this.$ajax.post(
                    this.API_ROOT + '/CheckLogin.php',
                    this.qs.stringify({"username": this.formInline.user, "checkLogin" : "1" })
                ).then((response) => {
                    if(response.data.status == "success"){
                        this.$store.state.show_loginInBox = false;
                        this.$store.dispatch("login", response.data.userinfo);
                    }
                })
            }
        }
    }
</script>
