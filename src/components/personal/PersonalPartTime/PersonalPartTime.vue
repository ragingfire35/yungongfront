<style lang="less" scoped>
	.partTime{
		.inner{
			margin-top: 20px;
			text-align: left;
		}
	}
</style>
<template>
	<Card class="partTime bt0" dis-hover>
		云工网提供支付中间担保，请在对方支付完成后，才开始工作，以保障您的劳动利益。
		如有问题请联系客服。客服微信号 yungongteam
	  	<Collapse v-model="value2" accordion class="inner">
	        <Panel name="1">
	            进行中
	            <div slot="content">
	            	
	            </div>
	        </Panel>
	        <Panel name="2">
	            待确认完工
	            <div slot="content"></div>
	        </Panel>
	        <Panel name="3">
	            待退款
	            <div slot="content"></div>
	        </Panel>
	        <Panel name="4">
	            已取消
	            <div slot="content"></div>
	        </Panel>
	    </Collapse>
	</Card>
</template>
<script>
	export default({
		data(){
			return{
				value2 : "1"
			}
		},
		mounted(){

		},
		methods:{

		}
	})
</script>