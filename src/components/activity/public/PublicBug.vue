<style lang="less" scoped>
	.PublicBug{
		width: 75%;
		margin: 0 auto;
		h1.tt{
		    margin: 30px auto;
		    font-size: 24px;
		    color: #2d8cf0;
		}
		.BugForm{
			text-align: left;
			.ivu-form-item{
				margin-bottom: 50px;
			}
		}
		[long]{
			width: 100%;
		}
	}
</style>
<template>
	<div class="PublicBug">
		<h1 class="tt">发布Bug</h1>
		<Card class="BugForm">
			<Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate">
		        <Form-item label="要解决的问题网址" prop="url">
		            <Input v-model="formValidate.url" placeholder=" 以 https | http | ftp | rtsp | mms开头, 请输入要解决的问题网址，如果没有可不填"></Input>
		        </Form-item>

				<Form-item label="Bug名称" prop="name">
 						<Input v-model="formValidate.name" placeholder="请概括Bug名称"></Input>
				</Form-item>

				<Form-item label="Bug问题详情" prop="desc">
					<Input v-model="formValidate.desc" placeholder="请简写Bug问题" type="textarea" :autosize="{minRows: 5,maxRows: 20}"></Input>
				</Form-item>

                <Form-item label="Bug解决悬赏金额 货币：￥" prop="price">
                	<Input-number :step="10" :min="10" v-model="formValidate.price" long></Input-number>
                </Form-item>

				<Form-item label="提交申请">
		            <Button type="primary" @click="handleSubmit('formValidate')" long>确定发布</Button>
	        	</Form-item>



			</Form>
		</Card>
	</div>
</template>
<script>
	export default({
		data(){
			return{
                formValidate: {
                	url : "",
                	name : "",
                	desc : "",
                	price : 10
                },
                ruleValidate: {
                    website : [
                    	{ pattern: '^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+', message: "网址输入不正确", trigger: 'blur'}
                    ],
                    name : [
                    	{ required: true, message: '请概括Bug名称', trigger: 'blur' }
                    ],
                    desc : [
                    	{ required: true, message: '请简写Bug问题', trigger: 'blur' }
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
                        this.publicBug();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            publicBug(){
            	var _this = this;
            	var data = _this.formValidate;
            	data['status'] = "save";
                _this.$ajax({
                    url: _this.API_ROOT + '/activity/activity_bug.php',
                    method: 'POST',
                    data : data
                }).then((response) => {
                    if(response.data.status == 'success'){
                        _this.$Message.success(response.data.msg);
                    };
                });
            }
		}
	})
</script>