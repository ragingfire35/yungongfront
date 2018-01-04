<style lang="less">
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

	}
	.iDCard,
	.name{
		.ivu-form-item-label{
			&:before{
			    content: '*';
			    display: inline-block;
			    margin-right: 4px;
			    line-height: 1;
			    font-family: SimSun;
			    font-size: 12px;
			    color: #ed3f14;
			}
		}
	}
	.realInfoShow{
		min-height: 1px;
	}
</style>

<template>
	<Card class="info bt0"  dis-hover>
		<Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate">
	        <Form-item label="真实姓名" prop="name"  class="name">
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
	        <Form-item label="请上传二代身份证正面" prop="iDCard" class="iDCard">
	        	<div v-if="uploadImg" style="overflow:hidden;">
			        <div class="demo-upload-list" >
			            <img :src="uploadImg" >
			            <Spin size="large" fix  v-if="aa"></Spin>
			            <div class="demo-upload-list-cover" v-if="!aa">
			                <Icon type="ios-trash-outline" @click.native="handleRemove(uploadImg)"></Icon>
			            </div>
			        </div>
			        <div class=" demo-upload-list realInfoShow" v-if="!aa">
						姓名 : {{realInfo.name}}
						性别：{{realInfo.sex}}
						民族：{{realInfo.nation}}
						出生：{{realInfo.birth}}
						住址：{{realInfo.address}}
						身份证号：{{realInfo.id}}
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
				aa : false,
				uploadImg:'',
				realInfo :{
					name : "",
					sex: "",
					nation : "",
					birth : "",
					address : "",
					id: ""
				},
				formValidate : {
					name : "",
					phone : "",
					mail : "",
					zhifubao : "",
					weixinNum : ""
				},
                ruleValidate: {
                    user: [
                        { required: true, pattern: '[\u4e00-\u9fa5]', message: '请填写真实姓名', trigger: 'blur' },
                        { type:'string',  min: 2, message: '姓名不能少于俩个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, type:'number', message: '手机号不能为空', trigger: 'blur' },
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
                        { required: true, message: '请输入微信号', trigger: 'blur' }
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
            },
			handleBeforeUpload(file){
				const _this = this;
		        let reader = new FileReader();
		        reader.readAsDataURL(file);

		        reader.onloadend = function (e) {
		           file.url = reader.result;
		           _this.uploadImg = file.url;
		           _this.uploadFn();
		        };
				return false;
			},
		    handleRemove(file) {
		        this.uploadImg = '';
		    },
			uploadFn(){
				const _this = this;
		        const data ={//---> http://open.youtu.qq.com/#/develop/api-ocr-card
		            "app_id": "10114621",
		            "image": _this.uploadImg.slice(23, -1),
		            "card_type": 0,
		            //"session_id": "1",
		            //"border_check_flag": false,
		        }
		        _this.aa = true;
		        _this.$ajax({
		            url: 'https://api.youtu.qq.com/youtu/ocrapi/idcardocr',
		            method: 'POST',
		            data : data,
		            headers: {
		                  //'Host' : 'api.youtu.qq.com',
		                  //'Content-Length' : "",
		                  'Content-Type': 'text/json',
		                  'Authorization' : 'S6oUy2Wi2+qYYelligGZ2jd7j35hPTEwMDA5NjMzJms9QUtJRGpYQmR1ek9hNlF1SlpmNUpxQk5PSzdqOVBhZFhqbDhKJmU9MTUxNTEzNjE3NCZ0PTE1MTUwNDk3NzQmcj0yMTM2NTgwODEwJnU9MzI1NTIwNTg3Mg=='
		            }
		        }).then((response) => {
	          		_this.aa = false;
	          	    if(response.data.errorcode == "0"){
	          	    	_this.uploadImg = "data:image/png;base64,"+response.data.frontimage;
	          	    	_this.realInfo = {
							name : response.data.name,
							sex: response.data.sex,
							nation : response.data.nation,
							birth : response.data.birth,
							address : response.data.address,
							id: response.data.id
	          	    	}
	          	    	return;
	          	    } else {
	          	    }
		        })
			}
		}
	})
</script>