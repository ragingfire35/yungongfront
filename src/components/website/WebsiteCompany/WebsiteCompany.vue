
<style lang="less" scoped>
	@import '../../common/commonLess/personalReal.less';
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
	        <Form-item label="公司官网" prop="website">
	            <Input v-model="formValidate.website" placeholder="请输入公司官网地址 , 以http或https开头"></Input>
	        </Form-item>
	        <Form-item label="认证资料" class="company">
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
			        	v-if="formValidate.license.hasValue"
			        >
						<p v-for="(list, index) in formValidate.license.companyInfo" :key="index">
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
					:max-size = '2048'
					class="uploadBox"
			    >
			        <div style="padding: 20px 0">
			            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
			            <p>上传你的公司营业执照等能明确证明您企业身份的材料， 不超过2MB（.jpg/.jpeg 或 .png 格式）</p>
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
				qianming:"",
                formValidate: {
                	website : "",
					license:{
						loading: false,
						hasValue : false,
						uploadImg:'',
						companyInfo :[]
					}
                },
                ruleValidate: {
                    website : [
                    	{ required: true, message: '公司官网输入不能为空', trigger: 'blur' },
                    	{ pattern: '^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+', message: "网址输入不正确", trigger: 'blur'}
                    ]
                }
			}
		},
		mounted(){
				this.youtuQM();
				this.getInfo();
		},
		methods:{
     		handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid && this.formValidate.license.hasValue) {
                        this.saveInfo();
                    } else {
                        if(!this.formValidate.license.hasValue){
                        	this.$Message.error('营业执照校验失败！');
                        } else{
                        	 this.$Message.error('表单验证失败!');
                        }
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
				//return false;
			},
		    handleRemove(file) {
		        this.formValidate.license.uploadImg = '';
		        this.formValidate.license.hasValue = false;
		    },

			handleMaxSize(){
				this.$Message.error('文件最大2m, 请压缩或更换图片!');
				this.handleRemove();
				return false;
			},
			uploadFn(){
				if(this.formValidate.license.uploadImg.length > 2048 * 1024){
					this.handleMaxSize();
				}
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
                _this.formValidate.license.companyInfo = [];
		        _this.$ajax({
		            url: 'https://api.youtu.qq.com/youtu/ocrapi/bizlicenseocr',
		            method: 'POST',
		            data : data,
		            headers: {
		                  //'Content-Length' : "",
		                  //'Host' : 'api.youtu.qq.com',
		                  'Content-Type': 'text/json',
		                  'Authorization' : _this.qianming
		            }
		        }).then((response) => {
					_this.formValidate.license.loading = false;
	          	    if(response.data.errorcode == "0"){
	          	    	for(var i in response.data.items){
	          	    		 _this.formValidate.license.companyInfo.push({
	          	    			item : response.data.items[i].item,
	          	    			itemstring : response.data.items[i].itemstring
	          	    		})
	          	    	};
	          	        if(_this.formValidate.license.companyInfo.length == 5){
			        		_this.formValidate.license.hasValue = true;
			 				this.$Notice.success({
			                    title: '营业执照校验成功',
			                    duration: 2
			                });
	          	        }

		                return;
	          	    } else {
	          	    	_this.formValidate.license.companyInfo = [];
		 				this.$Notice.error({
		                    title: '营业执照校验失败',
		                    desc : '营业执照画面占比率低,请重新拍摄',
		                    duration: 2
		                });
	          	    }
		        })
			},
			getInfo(){
				var _this = this;
				_this.qs = require('querystring');
		        _this.$ajax({
		            url: _this.API_ROOT + '/website/websiteCompany.php',
		            method: 'POST',
		            data : _this.qs.stringify({status: 'get'})
		        }).then((response) => {
		        	if(response.data.status == 'success'){
		        		var companyInfo = response.data.info.companyInfo.split(",");
		        		if(companyInfo != ""){
			        		for(var i in companyInfo){
			        			if(companyInfo[i] != ""){
				        			_this.formValidate.license.companyInfo.push({
				        				item : companyInfo[i].split(":")[0],
				        				itemstring : companyInfo[i].split(":")[1]
				        			})
			        			}
			        		}
			        		_this.formValidate.license.hasValue = true;
			        		_this.formValidate.license.uploadImg = response.data.info.license;
			        		_this.formValidate.website = response.data.info.website;
		        		}
		        	};
		        });
			},
			saveInfo(){
				var _this = this;
				_this.qs = require('querystring');
				var companyInfo = _this.formValidate.license.companyInfo;
				var endInfo = "";
				for(var i in companyInfo){
					endInfo += companyInfo[i].item +":"+ companyInfo[i].itemstring+","
				}
				var data = {
					status : 'save',
					companyInfo : endInfo,
					website : _this.formValidate.website,
					license : _this.formValidate.license.uploadImg
				};
		        _this.$ajax({
		            url: _this.API_ROOT + '/website/websiteCompany.php',
		            method: 'POST',
		            data : _this.qs.stringify(data)
		        }).then((response) => {
		        	if(response.data.status == 'success'){
                        _this.$Message.success(response.data.msg);
		        	};
		        });
			}
		}
	})
</script>