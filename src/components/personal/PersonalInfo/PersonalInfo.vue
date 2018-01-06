<style lang="less" scoped>

	.info{
		h2{
			margin-bottom:30px;
			font-weight: normal;
			font-size: 18px;
		}

	}
	@media (max-width: 768px){
		.info{
			width: 100%;
		}
	}
</style>
<template>
	<Card class="info bt0"  dis-hover>
		<Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate" >
	        <Form-item label="用户登录名" prop="name">
	            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
	        </Form-item>
	        <Form-item label="头像" prop="userhead">
			   <crpopper ref="crpopper" ></crpopper>
	        </Form-item>
			<Form-item>
	            <Button type="success" @click="handleSubmit('formValidate')">保存修改</Button>
        	</Form-item>
		</Form>
	</Card>
</template>
<script>
	import crpopper from '@/components/personal/PersonalInfo/crpopper.vue';
	export default({
		data(){
			return{
                formValidate: {
                    name: this.$store.state.LoginedUser.username,
                    userhead: this.$store.state.LoginedUser.userhead
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '用户登录名不能为空', trigger: 'blur' },
                        { type: 'string', max: 7, message: '用户名不能多于6字符', trigger: 'blur' }
                    ]
                }
			}
		},
		created(){
		},
		mounted(){
		},
		components:{
			crpopper : crpopper
		},
		methods:{
     		handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.savePersonalInfo();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            savePersonalInfo (){
            	var _this = this;
                var qs = require('querystring');
                 _this.$ajax.post(
                    'api/common/personalInfo.php',
                    qs.stringify(
                    	{
                    		"username": _this.formValidate.name,
                    		"userhead" : _this.$refs.crpopper.imgDataUrl
                    	}
                    )
                ).then((response) => {
                    if(response.data.code == 1){
                        if(response.data.status == 'success'){
                            this.$store.dispatch("username", response.data.userinfo.username);
                            this.$store.dispatch("userhead", response.data.userinfo.userhead);
                            this.$Message.success(response.data.msg);
                        }
                    } else {
                        this.$Message.error(response.data.msg);
                    }

                })
            }
		}
	})
</script>