<!-- 公共less 在 PersonalReal.vue -->
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
	        	<div style="overflow:hidden; margin-bottom:30px; display: flex;justify-content:center;">
			        <div class="demo-upload-list imgbox" v-if="formValidate.license.uploadImg">
			            <img :src="formValidate.license.uploadImg" >
			            <Spin size="large" fix  v-if="formValidate.license.loading"></Spin>
			            <div class="demo-upload-list-cover">
			                <Icon type="ios-trash-outline" @click.native="handleRemove(formValidate.license.uploadImg)"></Icon>
			            </div>
			        </div>
			        <div
			        	class=" demo-upload-list realInfoShow"
			        	v-if="formValidate.license.hasValue == true"
			        >
						<p v-for="(list, index) in formValidate.license.realInfo" :key="index">
							<em>{{list.item}}</em><span>{{list.itemstring}}</span>
						</p>
			        </div>
		       	</div>
				<Upload
			        type="drag"
					action=""
					:format="['jpg', 'jpeg', 'png']"
					accept="image/jpg, image/jpeg, image/png"
					:before-upload="handleBeforeUpload"
					class="uploadBox"
			    >
			        <div style="padding: 20px 0">
			            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
			            <p>上传你的公司营业执照等能明确证明您企业身份的材料， 不超过5MB（.jpg/.jpeg 或 .png 格式）</p>
			        </div>
			    </Upload>
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
                	website : "",
					license:{
						loading: true,
						hasValue : false,
						uploadImg:'',
						realInfo :[]
					}
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
			handleBeforeUpload(file){
				const _this = this;
		        let reader = new FileReader();
		        reader.readAsDataURL(file);

		        reader.onloadend = function (e) {
		           file.url = reader.result;
		           _this.formValidate.license.uploadImg = file.url;
		           _this.uploadFn();
		        };
				return false;
			},
		    handleRemove(file) {
		        this.formValidate.license.uploadImg = '';
		        this.formValidate.license.hasValue = false;
		    },
			uploadFn(){
				const _this = this;
		        const data ={//---> http://open.youtu.qq.com/#/develop/api-ocr-card
		            "app_id": "10009633",
		            "image": _this.formValidate.license.uploadImg.slice(23, -1),
		            "session_id": "0011",
		        }
 				this.$Notice.open({
                    title: '营业执照校验中，稍候显示结果',
                    duration: 2
                });
                _this.formValidate.license.loading = true;
		        _this.$ajax({
		            url: 'https://api.youtu.qq.com/youtu/ocrapi/bizlicenseocr',
		            method: 'POST',
		            data : data,
		            headers: {
		                  //'Host' : 'api.youtu.qq.com',
		                  //'Content-Length' : "",
		                  'Content-Type': 'text/json',
		                  'Authorization' : 'lwL2wDRPGIUhLv34wRiQRt+lurVhPTEwMDA5NjMzJms9QUtJRGpYQmR1ek9hNlF1SlpmNUpxQk5PSzdqOVBhZFhqbDhKJmU9MTUxNTIxOTgwNSZ0PTE1MTUxMzM0MDUmcj0yMTA5NzcyMzg2JnU9MzI1NTIwNTg3Mg=='
		            }
		        }).then((response) => {
					_this.formValidate.license.loading = false;
	          	    if(response.data.errorcode == "0"){
	          	    	console.log(response.data);
	          	    	for(var i in response.data.items){
	          	    		 _this.formValidate.license.realInfo.push({
	          	    			item : response.data.items[i].item,
	          	    			itemstring : response.data.items[i].itemstring
	          	    		})
	          	    	};









		        		_this.formValidate.license.hasValue = true;
		 				this.$Notice.success({
		                    title: '营业执照校验成功',
		                    duration: 2
		                });
		                return;
	          	    } else {
	          	    	_this.formValidate.license.realInfo = "";
		 				this.$Notice.error({
		                    title: '营业执照校验失败',
		                    desc : '营业执照画面占比率低,请重新拍摄',
		                    duration: 2
		                });
	          	    }
		        })
			}
		}
	})
</script>