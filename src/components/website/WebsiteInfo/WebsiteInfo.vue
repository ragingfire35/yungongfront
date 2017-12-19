<style lang="less">
	.info{
		width: 75%;
		margin: 30px auto 0 auto;
		h2{
			margin-bottom:30px;
		}
		form{
			text-align: left;
			button{
				width: 100%;
			}
			.ivu-form-item{
				margin-bottom: 5%;
			}
		}
	}
	@media (max-width: 768px){
		.info{
			width: 100%;
		}
	}
</style>
<template>
 	<Card class="info">
		<h2>修改个人资料</h2>
		<Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate" >
	        <Form-item label="昵称" prop="name">
	            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
	        </Form-item>
	        <Form-item label="微信号" prop="weixinNum">
	            <Input v-model="formValidate.weixinNum" placeholder="仅用于运营人员联系您"></Input>
	        </Form-item>
	        <Form-item label="头像" prop="userImg">
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
	            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        	</Form-item>
		</Form>
 	</Card>
</template>
<script>
	export default({
		data(){
			return{
                formValidate: {
                    name: '',
                    weixinNum: '',
/*                    userImg: ''*/
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
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