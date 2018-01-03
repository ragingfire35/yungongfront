<style lang="less">
	.userHead{
		width: 100px;
		height: 100px;
		display: block;
		border-radius: 50%;
		border: 1px solid #ccc;
		margin: 30px auto;

	}
	.vue-image-crop-upload{
		.vicp-wrap{
			width: 100%!important;
			height: 80%!important;
		}
		.vicp-step1{
			margin-top: 10%;
		}
		.vicp-crop{
			text-align: center;
			.vicp-crop-left{
				float: none!important;
				.vicp-img-container,
				.vicp-range,
				.vicp-rotate
				{
					margin: 15px auto!important;
				}
			}
			.vicp-crop-right{
				float: none!important;
				display: inline-block!important;
			}
		}
		.vicp-operate{
			width: 30%;
			left: 0;
			right: 0!important;
			margin: 0 auto;
			text-align: center;
			&>a{
				float: none!important;
				display: inline-block!important;
			}
		}
	}

</style>
<template>
	<div id="crppper">
		<img :src="imgDataUrl" class="userHead">
		<Button class="btn" @click="toggleShow">点击设置头像</Button>
		<my-upload
			v-if="show === true"
			field="img"
	        @crop-success="cropSuccess"
	        @crop-upload-success="cropUploadSuccess"
	        @crop-upload-fail="cropUploadFail"
	        v-model="show"
			:width="100"
			:height="100"
			url=""
			:params="params"
			:headers="headers"
			:noRotate="false"
			img-format="png"></my-upload>
	</div>
</template
>

<script>
	import myUpload from 'vue-image-crop-upload';
	export default({
		data() {
			return{
				show: false,
				params: {
					token: '123456798',
					name: 'avatar'
				},
				headers: {
					smail: '*_~'
				},
				imgDataUrl: this.$store.state.LoginedUser.userhead // the datebase64 url of created image
			}
		},
		components: {
			'my-upload': myUpload
		},
		watch:{
		},
		methods: {
			toggleShow() {
				this.show = !this.show;
			},
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
			},
			/**
			 * upload success
			 *
			 * [param] jsonData   服务器返回数据，已进行json转码
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			}
		}
	});

</script>