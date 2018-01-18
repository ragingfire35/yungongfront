<style lang="less" scoped>
	@import "JobDetail.less";
</style>
<template>
	<Row type="flex" class="JobDetail" justify="center" :gutter="16">
		<Col
			:xs="24"
			:sm="13"
			:md="13"
			:lg="13"
		>

			<Card
				class="card"
			>
				<p class="importantInfo">
					项目需求：<span>深圳</span>&nbsp;&nbsp;/&nbsp;<span>Android工程师</span>
				</p>

				<div class="projectInfo">
					<p>
						<span>交易平台功能完善</span>
						<Tag type="dot" class="badge" color="green">日薪制</Tag>
						<span class="price">预估5000元</span>
					</p>
					<ul class="all-list">
						<li>项目类型：<span>APP开发</span></li>
						<li>预估工时：<span>3天</span></li>
						<li>工作方式：<span>远程</span></li>
						<li>开工时间：<span>2017-12-20</span></li>
						<li class="introduction">
							<em>项目介绍：</em>
							<div>
								一、需求描述<br/>
									开发区块链底层功能
									<br/>
									二、参考产品<br/>
									实现下面这个网站的部分功能
									https://blockchain.info/zh-cn/api/blockchain_wallet_api
									<br/>
									三、人才要求<br/>
									懂区块链技术
									<br/>
									四、其他要求<br/>
									坐班要求：能坐班最好，不能坐班再具体商量每周来公司几次。要求人在北京。
									项目周期：总周期约15天。
							</div>
						</li>
					</ul>
				</div>

				<div class="about-next">
					<Button type="primary" long class="confirm">
						投递职位
					</Button>
				</div>
			</Card>


		</Col>

		<Col
			:xs="24"
			:sm="5"
			:md="5"
			:lg="5"
		>
			<Card
				class="card employers"
			>
				<div class="main-info">
					<router-link to="">
						<img src="http://yungong.cow8.cn/static/image/user.png" height="50" width="50" alt="" class="info-headerImg">
						<p class="info-rt">
							<span class="info-name">大好时光</span><br/>
							<span class="public-time">大约&nbsp;4小时&nbsp;前</span>
						</p>
					</router-link>
					<div class="company">
						<p>公司地址&nbsp;&nbsp;<span>深圳古田</span></p>
						<p>产品介绍<br/><span class="not-style">暂无介绍</span></p>
					</div>
				</div>
			</Card>
		</Col>
	</Row>
</template>
<script>
	export default ({
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