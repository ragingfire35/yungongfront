
<style lang="less" scoped>
	@import '../../common/commonLess/personalReal.less';
</style>

<template>
	<Card class="info bt0"  dis-hover>
		<Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate">
	        <Form-item label="真实姓名" prop="idCard.realInfo.realname"  class="name">
	            <Input v-model="formValidate.idCard.realInfo.realname" disabled placeholder="真实姓名不必填，稍候验证获取"></Input>
	        </Form-item>
	        <Form-item label="联系电话" prop="phoneNum">
	            <Input v-model="formValidate.phoneNum" placeholder="请输入联系电话"></Input>
	        </Form-item>
	        <Form-item label="邮箱" prop="mail">
	            <Input v-model="formValidate.mail" placeholder="仅用于运营人员联系您，及重要事项通知"></Input>
	        </Form-item>
	        <Form-item label="支付宝账号" prop="zhifubao">
	            <Input v-model="formValidate.zhifubao" placeholder="仅用于兼职后云工向您打款"></Input>
	        </Form-item>
	        <Form-item label="微信号" prop="weixinNum">
	            <Input v-model="formValidate.weixinNum" placeholder="仅用于运营人员联系您，进行相关推荐"></Input>
	        </Form-item>
	        <Form-item label="请上传二代身份证正面" prop="" class="iDCard">
	        	<div style="overflow:hidden; margin-bottom:30px; display: flex;justify-content:center;">
			        <div class="demo-upload-list imgbox" v-if="formValidate.idCard.idCardImg">
			            <img :src="formValidate.idCard.idCardImg">
			            <Spin size="large" fix  v-if="formValidate.idCard.loading"></Spin>
			            <div class="demo-upload-list-cover">
			                <Icon type="ios-trash-outline" @click.native="handleRemove(formValidate.idCard.idCardImg)"></Icon>
			            </div>
			        </div>
			        <div class=" demo-upload-list realInfoShow"
			        	 v-if="formValidate.idCard.realInfoShow"
			        >
						<p><em>姓名 : </em><span v-html="formValidate.idCard.realInfo.realname"></span></p>
						<p><em>性别 :</em><span v-html="formValidate.idCard.realInfo.sex"></span></p>
						<p><em>民族 : </em><span v-html="formValidate.idCard.realInfo.nation"></span></p>
						<p><em>出生 : </em><span v-html="formValidate.idCard.realInfo.birth"></span></p>
						<p><em>住址 : </em><span v-html="formValidate.idCard.realInfo.address"></span></p>
						<p><em>身份证号 : </em><span v-html="formValidate.idCard.realInfo.idCardNum"></span></p>
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
			            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff">assa</Icon>
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
			return{
				qianming:"",
				formValidate : {
					phoneNum : "",
					mail : "",
					zhifubao : "",
					weixinNum : "",
					idCard:{
						loading: false,
						realInfoShow: false,
						idCardImg:'',
						realInfo :{
							realname : "",
							sex: "",
							nation : "",
							birth : "",
							address : "",
							idCardNum: ""
						},
					}
				},
                ruleValidate: {
                    phoneNum: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号输入不正确', trigger: 'blur' }
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
				this.youtuQM();
		        this.getInfo();
		},
		methods:{
     		handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid && this.formValidate.idCard.realInfoShow) {
                        this.saveInfo();
                    } else {
                    	this.formValidate.idCard.realInfoShow == false ?
	                    	this.$Message.error('身份证校验失败!') :
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
		           _this.formValidate.idCard.idCardImg = file.url;
		           _this.uploadFn();
		        };
				return false;
			},
		    handleRemove(file) {
		        this.formValidate.idCard.idCardImg = '';
		        this.formValidate.idCard.realInfoShow = false;
		    },
			uploadFn(){
				const _this = this;
		        const data ={//---> http://open.youtu.qq.com/#/develop/api-ocr-card
		            "app_id": "10114621",
		            "image": _this.formValidate.idCard.idCardImg.slice(23, -1),
		            "card_type": 0,//0 正面 //1反面
		            //"session_id": "1",
		            //"border_check_flag": false,
		        }
 				this.$Notice.open({
                    title: '身份证校验中，稍候显示结果',
                    duration: 2
                });
                _this.formValidate.idCard.loading = true;
		        _this.$ajax({
		            url: 'https://api.youtu.qq.com/youtu/ocrapi/idcardocr',
		            method: 'POST',
		            data : data,
		            headers: {
		                  //'Host' : 'api.youtu.qq.com',
		                  //'Content-Length' : "",
		                  'Content-Type': 'text/json',
		                  'Authorization' : _this.qianming
		            }
		        }).then((response) => {
					_this.formValidate.idCard.loading = false;
	          	    if(response.data.errorcode == "0"){
	          	    	_this.formValidate.idCard.idCardImg = "data:image/png;base64,"+response.data.frontimage;
	          	    	_this.formValidate.idCard.realInfo = {
							realname : response.data.name,
							sex: response.data.sex,
							nation : response.data.nation,
							birth : response.data.birth,
							address : response.data.address,
							idCardNum: response.data.id
	          	    	}
		 				this.$Notice.success({
		                    title: '身份校验成功',
		                    duration: 2
		                });
		                _this.formValidate.idCard.realInfoShow = true;
		                return;
	          	    } else {
	          	    	_this.formValidate.idCard.realInfo = "";
		 				this.$Notice.error({
		                    title: '身份校验失败',
		                    desc : '身份证画面占比率低,请重新拍摄',
		                    duration: 2
		                });
	          	    }
		        })
			},
			getInfo(){
				var _this = this;
				_this.qs = require('querystring');
		        _this.$ajax({
		            url: _this.API_ROOT + '/personal/personalReal.php',
		            method: 'POST',
		            data : _this.qs.stringify({status: 'get'})
		        }).then((response) => {
		        	if(response.data.status == 'success'){
		        		var info = response.data.realInfo;
						_this.formValidate = {
							phoneNum : info.phoneNum,
							mail : info.mail,
							zhifubao : info.zhifubao,
							weixinNum : info.weixinNum,
							idCard:{
								loading: false,
								realInfoShow: info.idCard == "" ? false : true,
								idCardImg: info.idCard,
								realInfo :{
									realname : info.realname,
									sex: info.sex,
									nation : info.nation,
									birth : info.birth,
									address : info.address,
									idCardNum: info.idCardNum
								},
							}
						}

		        	};
		        });
			},
			saveInfo(){
				var _this = this;
				var data = {
					status : 'save',
					phoneNum : _this.formValidate.phoneNum,
					mail : _this.formValidate.mail,
					zhifubao : _this.formValidate.zhifubao,
					weixinNum : _this.formValidate.weixinNum,
					idCard : _this.formValidate.idCard.idCardImg,
					realname : _this.formValidate.idCard.realInfo.realname,
					sex : _this.formValidate.idCard.realInfo.sex,
					nation : _this.formValidate.idCard.realInfo.nation,
					birth : _this.formValidate.idCard.realInfo.birth,
					address :  _this.formValidate.idCard.realInfo.address,
					idCardNum : _this.formValidate.idCard.realInfo.idCardNum
				};
				_this.qs = require('querystring');
		        _this.$ajax({
		            url: _this.API_ROOT + '/personal/personalReal.php',
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