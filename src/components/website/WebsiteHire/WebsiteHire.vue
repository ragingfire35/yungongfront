<style lang="less" scoped>
	.partTime{
		.inner{
			margin-top: 20px;
			text-align: left;
		}
	}
	.not-style{
		text-align: center;
		color: #3399FF;
	}
</style>
<template>
	<Card class="partTime bt0" dis-hover>
		云工网提供支付中间担保，在合同签署后，再提供项目资料，以保障您的权益。
		如有问题请联系客服。客服微信号 yungongteam
	  	<Collapse v-model="value2" accordion class="inner">

	        <Panel
	        	v-for="item, index in detail"
	        	:key="index"
	         	:name="item.ref"
			>
	        </Panel>
	    </Collapse>
	</Card>
</template>
<script>
	import JobSeekers from "@/components/common/JobSeekers/JobSeekers.vue";
	export default({
		data(){
			return{
				value2 : "",
				detail:[
				]
			}
		},
		mounted(){
	    	var _this = this;
	        _this.$ajax({
	            url: _this.API_ROOT + '/website/WebsiteHire.php',
	            method: 'POST'
	        }).then((response) => {
	            if(response.data.status == 'success'){
	            };
	        });
		},
		methods:{

		},
		components:{
			JobSeekers : JobSeekers
		}
	})
</script>