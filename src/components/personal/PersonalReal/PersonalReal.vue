<style lang="less" scoped>

</style>

<template>
	<Card class="info bt0"  dis-hover>
		<Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate" >
	        <Form-item label="真实姓名" prop="name">
	            <Input v-model="formValidate.name" placeholder="请输入真实姓名"></Input>
	        </Form-item>
	        <Form-item label="联系电话" prop="phone">
	            <Input v-model="formValidate.phone" placeholder="请输入联系电话"></Input>
	        </Form-item>
	        <Form-item label="邮箱" prop="mail">
	            <Input v-model="formValidate.mail" placeholder="仅用于运营人员联系您，及重要事项通知"></Input>
	        </Form-item>
	        <Form-item label="支付宝账号" prop="zhifubao">
	            <Input v-model="formValidate.zhifubao" placeholder="仅用于兼职后云工向您打款"></Input>
	        </Form-item>
	        <Form-item label="微信号" prop="weixinNum">
	            <Input v-model="formValidate.weixinNum" placeholder="仅用于运营人员联系您，进行兼职推荐"></Input>
	        </Form-item>
	        <Form-item label="请上传二代身份证正面，反面" prop="iDCard">
				<Upload
			        type="drag"
			        action="//jsonplaceholder.typicode.com/posts/">
			        <div style="padding: 20px 0">
			            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
			            <p>点击或将文件拖拽到这里上传</p>
			        </div>
			    </Upload>
	        </Form-item>
			<Form-item>
	            <Button type="success" @click="handleSubmit('formValidate')">保存修改</Button>
        	</Form-item>
		</Form>
	</Card>
</template>
<script>
	export default({
		data(){
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
			return{
				formValidate : {
					name : "",
					phone : "",
					mail : "",
					zhifubao : "",
					weixinNum : ""
				},
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        {required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    zhifubao : [
 						{ required: true, message: '支付宝账号不能为空', trigger: 'blur' }
                    ],
                    weixinNum: [
                        { required: true, message: '请输入微信号', trigger: 'blur' },
                        { type: 'string', min: 6, message: '微信号少于6字符', trigger: 'blur' }
                    ]
                }
			}
		},
		mounted(){

		},
		methods:{
     		 handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
		}
	})
</script>