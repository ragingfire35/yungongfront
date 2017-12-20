<style lang="less" scoped>
	.Pay{
	    width: 75%;
	    height: auto;
	    margin: 30px auto 0 auto;
	    background: #fff;
	    h2{
	    	margin-bottom: 30px;
	    }
	}
	.payWay{
		width: 70%;
		margin: 0 auto;
		word-break: break-all;
		margin-bottom: 60px;
		.pay-title{
			width: 100%;
			height: auto;
			overflow: hidden;
			padding-bottom: .5%;
			border-bottom: 1px solid #ddd;
			text-align: left;
			position: relative;
			&:before{
				content: '';
				float: left;
				height: 30px;
				width: 4px;
				background: #19be6b;
				position: absolute;
				left: 0;
				top: 0;
			}
			&>span{
				display: inline-block;
				margin-left: 3%;
				clear: right;
			}
		}
		p.prompt{
			font-weight: normal;
			text-align: left;
			color: #999;
			padding-right:60px;
			padding: 20px 0  10px 0;
		}
		.pay-detail{
			background: #f3f4f8;
			color: #a3a3af;
			text-align: left;
			padding: 20px 14px;
			span{
				font-weight: bold;
			}
			strong{
				color: #19be6b;
				opacity: .8;
			}
			p{
				margin-bottom: 5px;
			}
			.noteInfo{
				margin-top: 20px;
			}
		}
	}
 	@media (max-width: 768px){
 		.Pay{
 			width: 100%;
 			.payWay{
 				width: 90%;
 			}
 		}
 	}
</style>

<template>
	<Card class="Pay">
		<h2>账户充值</h2>
		<div class="payWay">
			<p class="balance">
				<span>账户余额：</span>
				<strong>900000&nbsp;元</strong>
			</p>
		</div>

		<div class="payWay">
			<h4 class="pay-title">
				<span>
					<img src="./image/pay_Y.svg" alt="">
				</span>
			</h4>
			<p class="prompt">银行转账目前只支持线下转账方式。<br/>转账时务必备注信息，并在转账后联系云工客服人员为您及时确认并处理。</p>

			<div class="pay-detail">
				<p><span>户&nbsp;名：</span><strong>北京烈火天使科技有限公司</strong></p>
				<p><span>账&nbsp;号：</span><strong>1279&nbsp;0878&nbsp;7010&nbsp;801</strong></p>
				<p><span>开户行：</span><strong> 招商银行股份有限北京阳光科技支行</strong></p>
				<div class="noteInfo">
					<p>请在转账时备注以下信息：</p>
					<p style="color:#3399ff;">云工账户充值 + 您的云工账号</p>
				</div>
				<div class="noteInfo">
					<p>请在转账后联系云工客服：</p>
					<p>客服电话：&nbsp;182-1009-3282 或将凭证截图发送至2565557657@qq.com</p>
				</div>
			</div>
		</div>
		<div class="payWay">
			<h4 class="pay-title">
				<span>
					<img src="./image/pay_W.svg" alt="">
				</span>
			</h4>
			<div class="pay-detail" style="height:200px;">
			</div>
		</div>
		<div class="payWay">
			<h4 class="pay-title">
				<span>关于发票</span>
			</h4>
			<div class="pay-detail" style="height:200px;">
			</div>
		</div>
	</Card>
</template>
<script>
	export default({
		data(){
			return{

			}
		},
		mounted(){

		},
		methods:{

		},

	})
</script>