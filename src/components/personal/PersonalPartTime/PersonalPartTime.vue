<style lang="less" scoped>
	.partTime{
		.inner{
			margin-top: 20px;
			text-align: left;
		}
	}
	.linkBlock{
		cursor: pointer;
		border: 1px solid #D1E5FA;
		margin-bottom: 16px;
		&:last-of-type{
			margin-bottom: 0;
		}
		h6{
			color: #3399FF;
			font-weight: normal;
			font-size: 14px;
		}
		.thumbnail{
			color: #ccc;
			font-size: 12px;
		}
	}
	.not-style{
		text-align: center;
		color: #3399FF;
	}
</style>
<template>
	<Card class="partTime bt0" dis-hover>
		云工网提供支付中间担保，请在对方支付完成后，才开始工作，以保障您的劳动利益。
		如有问题请联系客服。客服微信号 yungongteam
	  	<Collapse v-model="value2" accordion class="inner">
	        <Panel name="0">
	            被预约
	            <div slot="content">
					<router-link to="" tag="Card" class="linkBlock">
						<h6>交易平台功能完善</h6>
						<p class="thumbnail">
							1、加多币种交易，前台同样显示（目前后台有加币种功能，前台无法显示）。...
						</p>
					</router-link>
					<router-link to="" tag="Card" class="linkBlock">
						<h6>交易平台功能完善</h6>
						<p class="thumbnail">
							1、加多币种交易，前台同样显示（目前后台有加币种功能，前台无法显示）。...
						</p>
					</router-link>
	            </div>
	        </Panel>
	        <Panel name="0">
	            已投递职位
	            <div slot="content">
					<router-link to="" tag="Card" class="linkBlock">
						<h6>交易平台功能完善</h6>
						<p class="thumbnail">
							1、加多币种交易，前台同样显示（目前后台有加币种功能，前台无法显示）。...
						</p>
					</router-link>
					<router-link to="" tag="Card" class="linkBlock">
						<h6>交易平台功能完善</h6>
						<p class="thumbnail">
							1、加多币种交易，前台同样显示（目前后台有加币种功能，前台无法显示）。...
						</p>
					</router-link>
	            </div>
	        </Panel>
	        <Panel name="1">
	            进行中
	            <div slot="content">
					<router-link to="" tag="Card" class="linkBlock">
						<h6>交易平台功能完善</h6>
						<p class="thumbnail">
							1、加多币种交易，前台同样显示（目前后台有加币种功能，前台无法显示）。...
						</p>
					</router-link>
					<router-link to="" tag="Card" class="linkBlock">
						<h6>交易平台功能完善</h6>
						<p class="thumbnail">
							1、加多币种交易，前台同样显示（目前后台有加币种功能，前台无法显示）。...
						</p>
					</router-link>
	            </div>
	        </Panel>
	        <Panel name="2">
	            待确认完工
	            <div slot="content">
	            	<p class="not-style">暂时没有记录~</p>
	            </div>
	        </Panel>
	        <Panel name="3">
	            待退款
	            <div slot="content">
	            	<p class="not-style">暂时没有记录~</p>
	            </div>
	        </Panel>
	        <Panel name="4">
	            已取消
	            <div slot="content">
	            	<p class="not-style">暂时没有记录~</p>
	            </div>
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