<style lang="less" scoped>
	.danbao{
		background:#fef8f8;
		margin-bottom: -100px;
		padding-bottom: 100px;
	}
	.banner{
		width: 100%;
		height: 300px;
		background: url("./image/danbao.jpg") center no-repeat;
		background-size: cover;
		position: relative;
		&:after{
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background:#3399ff;
			opacity: .6;
			z-index: 1;
		}
		.inner{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 2;
			color: #fff;
			font-family: "Hiragino Sans GB";
			text-align: left;
			padding: 2% 0 0 15%;
			letter-spacing: 2px;
			h2{
				font-size: 48px;
			}
			p{
				font-size: 18px;
				margin: 2% 0;
				span{
					color: #FAFFA5;
				}
			}
			button{
				color: #fff;
				border-width:2px;
				width: 200px;
				height: 50px;
				font-size: 20px;
			}
		}
	}
	.advantage{
		.detail{
			border-top: 1px solid #eee;
    		border-bottom: 1px solid #eee;
    		margin: 30px 0 30px 0;
    		.card{

	   			h4{
	    			font-size: 16px;
	    			padding: 10px 4%;
	    		}
	    		.tishi{
	    			padding: 10px 4%;
	    		}
    		}
		}
	}
	h3.tt{
		margin: 30px 10%;
		padding-bottom: 2px;
		font-size: 26px;
		color: #3399ff;
		font-weight: normal;
		border-bottom: 1px solid #d7d7d7;
		text-align: left;
		background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 128, 0, 1)), to(rgba(51, 51, 51, 1)));
 		-webkit-background-clip: text;
 		-webkit-text-fill-color: transparent;
	}
	.process{
		overflow: hidden;
		ol{
			padding: 0 5%;
			width: 100%;
			height: auto;
			li{
				width: 100%;
				overflow: hidden;
				margin-bottom: 40px;
				span.num{
				    width: 6%;
				    height: 68px;
				    float: left;
				    line-height: 68px;
				    font-size: 32px;
				    color: #fff;
				    background-color: #3399ff;
				    border-radius: 50%;
				    text-align: center;
				}
				.content{
					width: 94%;
					text-align: left;
					float: left;
					padding: 0 40px;
					h5{
						width: 100%;
						height: 40px;
						line-height: 40px;
						font-size: 16px;
						position: relative;
						&:after{
							content: "";
							display: block;
							width: 100%;
							height: 100%;
							background: #f8b7b7;
							position: absolute;
							left: 0;
							top: 0;
							transform: skew(-30deg);
							z-index: 1;
						}
						span{
							display: block;
							position: absolute;
							z-index: 2;
							padding-left: 30px;
							color: #fff;
						}
					}
					p{
						font-size: 14px;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="danbao">
		<div class="banner">
			<div class="inner">
				<h2>担保交易</h2>
				<p>国内领先的互联网交易第三方担保平台！<span>超低服务费！！！</span></p>
				<Button type="dashed" size="large" @click="$router.push({path: '/DBsteps'})">
					申请担保交易
				</Button>
			</div>
		</div>
		<div class="advantage">
			<h3 class="tt">我们的优势</h3>
			<Row type="flex" class="detail" :gutter=16>
				<Col :lg="6" :md="12" :sm="12" :xs="24" class="card">
					<Card>
						<img src="./image/escrow_01.png">
						<h4>交易安全-保护甲方</h4>
						<p class="tishi">只要在云工网确认收到项目后甲方才会被通知付款</p>
					</Card>
				</Col>
				<Col :lg="6" :md="12" :sm="12" :xs="24" class="card" >
					<Card>
						<img src="./image/escrow_02.png">
						<h4>交易安全-保护乙方</h4>
						<p class="tishi">只有在乙方确认收到付款后云工网才会把项目转交给甲方</p>
					</Card>
				</Col>
				<Col :lg="6" :md="12" :sm="12" :xs="24" class="card">
					<Card>
						<img src="./image/escrow_03.png">
						<h4>交易保障</h4>
						<p class="tishi">如交易因故无法正常完成，甲方将获得全额退款，而乙方也不会丢失项目</p>
					</Card>
				</Col>
				<Col :lg="6" :md="12" :sm="12" :xs="24" class="card">
					<Card>
						<img src="./image/escrow_04.png">
						<h4>保密措施</h4>
						<p class="tishi">云工网严格保护甲乙双方的交易内容未经许可不会泄露任何交易信息</p>
					</Card>
				</Col>
			</Row>
		</div>
		<div class="process">
			<h3 class="tt">
				担保交易流程
			</h3>
			<ol>
				<li>
					<span class="num">一</span>
					<div class="content">
						<h5><span>甲乙双方达成协议</span></h5>
						<p>甲方与乙方达成交易协议，同意使用云工网做为担保交易平台，由乙方发起担保交易申请。</p>
					</div>
				</li>
				<li>
					<span class="num">二</span>
					<div class="content">
						<h5><span>甲方付款到托管帐户</span></h5>
						<p>甲方在三个工作日内将款项汇入指定云工网账户中。</p>
					</div>
				</li>
				<li>
					<span class="num">三</span>
					<div class="content">
						<h5><span>甲方提供项目资料</span></h5>
						<p>核实支付款项后，云工网通知甲方提供项目资料。</p>
					</div>
				</li>
				<li>
					<span class="num">四</span>
					<div class="content">
						<h5><span>乙方确认收到项目资料开发</span></h5>
						<p>乙方检查完成项目资料的准确性，核实无误点击确认收到项目资料，开始开发。</p>
					</div>
				</li>
				<li>
					<span class="num">五</span>
					<div class="content">
						<h5><span>付款，交易完成</span></h5>
						<p>甲方确认收到项目后，云工网付款给乙方，完成交易。</p>
					</div>
				</li>
			</ol>
		</div>

	</div>
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

		}

	})
</script>