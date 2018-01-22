<style lang="less" scoped>
	.service{
		width: 75%;
		margin: 0 auto;
		h1.tt{
		    margin: 30px auto;
		    font-size: 24px;
		    color: #19be6b;
		}
	}
	.ServiceDesc{
		width: 100%;
		padding: 30px 0;
		min-height: 140px;
		p.text{
			float: left;
			width: 80%;
			text-align: left;
			font-size: 16px;
			color: #999;
		}
		.btn{
			float: left;
			height: 40px;
			font-size: 16px;
			width: 20%;
		}
	}
	.serviceContainer{
		margin-top: 30px;
		.serviceInfo{
			margin-bottom: 16px;
			.imgBox{
				width: 100%;
				min-height: 160px;
				position: relative;
				&:hover{
					.mask{
						opacity: 1;
					}
				}
				.mask{
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					background:rgba(0,0,0,.6);
					opacity: 0;
					transition: opacity .2s;
					.goDetail{
						width: 50%;
						height: 20%;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
					}
				}
			}
			.content{
				background: #fff;
				text-align: left;
				padding: 0 20px;
				p{
					padding: 8px 0;
				}
				.se_t{
					font-size: 14px;
				}
				.se_detail{
				}
				.user_info{
					overflow: hidden;
					img{
						width: 30px;
						height: 30px;
						border-radius: 50%;
						float: left;
					}
					span{
						float: right;
						line-height: 24px;
						color: #2d8cf0;
					}
				}
			}
		}
	}

</style>
<template>
	<div class="service">
		<h1 class="tt">标准服务</h1>
		<Card class="ServiceDesc">
			<p class="text">
				平台汇总过往成交数据，精选各品类互联网服务，整理成服务内容明确、交付明确、价格明确的“标准服务”。 让买卖双方在透明、可控的范围内降低沟通成本和交易风险 -- 选我所想，一键购买。
			</p>
			<Button class="btn" type="primary">
				申请入驻
			</Button>
		</Card>
		<Card>
			分类：<Button class="serviceClassify"
						  v-for="(item, index) in serviceClassify"
						  :type="formValidate.service == item ? 'success' : 'text'"
						  :key="index"
						  v-html="item"
						  @click="formValidate.service = item"
				  ></Button>
		</Card>
		<Row class="serviceContainer"  type="flex" :gutter="16">
			<Col
				:xs="24"
				:sm="24"
				:md="16"
				:lg="6"
				class="serviceInfo"
				v-for = "i in 8"
				:key= "i"
			>
				<Card class="infoInner">
					<div class="imgBox" style="background:url('https://cdn.shixian.com/upload/service/cover/453/d40df47722fdf9d8cb3b2b9bd29040a5.jpg') no-repeat center; background-size: cover;">
						<div class="mask">
							<Button type="success" class="goDetail">查看详情</Button>
						</div>
					</div>
					<div class="content">
						<p class="se_t">web网页设计-移动APP设计</p>
						<p class="se_detail">
							<Tag>UI设计</Tag>
						</p>
						<p class="user_info">
							<img src="https://cdn.shixian.com/upload/user/avatar/80727/small_c72605035850202f495ee6f480c025f3.jpeg" alt="">
							<span class="price">10000元/套</span>
						</p>
					</div>
				</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	export default({
		data(){
			return{
				serviceClassify: ['全部', '技术', '产品', '设计', '运营', '咨询', '其他'],
				formValidate:{
					service: "全部",
				}
			}
		},
		mounted(){

		},
		methods:{

		}
	})
</script>