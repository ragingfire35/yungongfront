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
	.demo-upload-list {
	    display: inline-block;
	    width: 48%;
	    text-align: center;
	    line-height: 60px;
	    border-radius: 4px;
	    overflow: hidden;
	    background: #fff;
	    position: relative;
	    margin: 0 0 30px 0;
/* 	    border: 1px solid transparent;
box-shadow: 0 1px 1px rgba(0, 0, 0, .2); */
	    margin-right: 4px;
		&:nth-of-type(2n-1){
			float: left;
		}
		&:nth-of-type(2n){
			float: right;
		}
	}

	.demo-upload-list img {
	    width: 100%;
	    height: 100%;
	    display: block;
	}

	.demo-upload-list-cover {
	    display: none;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: rgba(0, 0, 0, .6);
	}

	.demo-upload-list:hover .demo-upload-list-cover {
	    display: block;
	}

	.demo-upload-list-cover i {
	    color: #fff;
	    font-size: 3em;
	    width: 1em;
	    height: 1em;
	    cursor: pointer;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
	}
	.uploadBox{
		clear:left;
	}
	.rzValidate{
		color: #ed3f14;
		font-size: 12px;
	}
</style>
<template>
	<Card class="info bt0"  dis-hover>
		<Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate">
	        <Form-item label="公司名称" prop="name">
	            <Input v-model="formValidate.name" placeholder="请输入公司名称"></Input>
	        </Form-item>
	        <Form-item label="公司地址" prop="way">
	            <Input v-model="formValidate.way" placeholder="请输入公司地址"></Input>
	        </Form-item>
	        <Form-item label="公司官网" prop="website">
	            <Input v-model="formValidate.website" placeholder="请输入公司官网地址"></Input>
	        </Form-item>
	        <Form-item label="认证资料" >
		        <div class="demo-upload-list" v-for="item in uploadList">
		            <img :src="item.url">
		            <div class="demo-upload-list-cover">
		                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
		            </div>
		        </div>
				<Upload
			        type="drag"
			        accept="image/jpg, image/jpeg, image/png"
			        :format="['jpg', 'jpeg', 'png']"
			        action="//jsonplaceholder.typicode.com/posts/"
			        :on-format-error="handleFormatError"
			        :on-exceeded-size="handleMaxSize"
			        :before-upload="handleBeforeUpload"
			        :max-size="2048"
			        class="uploadBox"
			        >
			        <div style="padding: 20px 0">
			            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
			            <p>上传你的公司营业执照等能明确证明您企业身份的材料， 不超过5MB（.jpg/.jpeg 或 .png 格式）</p>
			        </div>
			    </Upload>
			    <p class="rzValidate" v-if="uploadList.length === 0">*认证资料必传*</p>
	        </Form-item>
			<Form-item>
	            <Button type="success" @click="handleSubmit('formValidate')">提交申请</Button>
        	</Form-item>
		</Form>
	</Card>
</template>
<script>
	export default({
		data(){
			return{
				uploadList: [],
                formValidate: {
                	name : "",
                	way : "",
                	website : ""
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '公司名称输入不能为空', trigger: 'blur' }
                    ],
                    way: [
                    	{ required: true, message: '公司地址输入不能为空', trigger: 'blur' }
                    ],
                    website : [
                    	{ required: true, message: '公司官网输入不能为空', trigger: 'blur' }
                    ]
                }
			}
		},
		mounted(){

		},
		methods:{
     		handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid && uploadList.length!==0) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
			handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
		    handleBeforeUpload(file) {
		        let reader = new FileReader();
		        reader.readAsDataURL(file);

		        const _this = this;
		        reader.onloadend = function (e) {
		            file.url = reader.result
		            _this.uploadList.push(file)
		        };
		        return false;
	    	},
		    handleRemove(file) {
		        this.uploadList.splice(this.uploadList.indexOf(file), 1);
		    },
            handleMaxSize(){

            }
		}
	})
</script>