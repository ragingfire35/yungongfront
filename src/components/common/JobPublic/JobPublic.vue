<style lang="less" scoped>
	.card{
		margin-bottom: 30px;
		height: auto;
		position: relative;
	}
	.lt-det{
		float: left;
		text-align: left;
		padding: 0 8px;
		a{
			color: #777;
		}
	}
	.detail-inner{
		width: 100%;
	}
	div.job-main{
		width: 100%;

		div.title{
			height: 24px;
			line-height: 24px;
			&>h5{
				float: left;
				font-size: 16px;
				font-weight: normal;
				color: #000
			}
			.badge{
				float: left;
				margin: 0 0 0 18px;
				color: #ccc;
				cursor: default;
			}
		}
		p.text{
			text-align: justify;
			margin: 20px 0;
		}
	}
	.user-info{
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: absolute;
		left: 0;
		bottom: 0;
		&>a{
			&>img{
				width: 50px;
				height: 50px;
				border-radius: 50px;
				float: left;
			}
			&>span{
				float: left;
				margin: 0 20px;
				color: #2d8cf0;
			}
			&>i{
				float: left;
			}
		}
	}
	hr.split-line{
		float: left;
		width: 1px;
		height: 100%;
		border: 0;
		border-left: 1px solid #eee;
	}

	.rt-det{

	}
	.about-num{
		padding-left: 10%;
		text-align: left;
		&>p{
			font-size: 18px;
			color: #2d8cf0;
			margin-top: 5px;
			word-break: break-all;
		}
		&>ol{
			margin:  16% 0;
			li{
				margin-bottom: 10px;
				span:nth-of-type(1){
					width: 50%;
					float: left;
				}
			}
		}
		&>button{
			width: 100%;
			display: block;
			font-size: 14px;
		}
	}
	@media (max-width : 1200px) {
		.about-num{
			&>ol{
				margin:  40% 0;
			}
		}
	}
	@media (max-width : 992px) {
		.job{
			margin-left: 0;
			margin-right: 0;
		}
		hr.split-line{
			float: none;
			width: 100%;
			height: 1px;
			border: 0;
			border-top: 1px solid #eee;
			margin: 3% 0;
		}
		.about-num{
			padding-left: 0;
			&>ol{
				margin:  2% 0;
			}
		}
	}
</style>
<template>
	<div>

        <Card class="card jobDetail"
              v-for="(item, index) in job_public"
              :key = index
        >
			<Row type="flex" justify="center" class="detail-inner">
				<Col
					class="lt-det"
					:xs="24"
					:sm="24"
					:md="16"
					:lg="16"
				>
					<div class="job-main">
						<router-link to="/JobDetail">
							<div class="title">
								<h5 v-text="item.projectName"></h5>
								<Tag class="badge" v-text="item.payWay"></Tag>
							</div>
							<p class="text" v-html="item.projectDesc"></p>
						</router-link>
					</div>
					<div class="user-info">
						<router-link to="">
							<img :src="item.userhead" alt="">
							<span v-text="item.username"></span>
							<i>{{item.timeAgo | timeAgo}}发布</i>
						</router-link>
					</div>

				</Col>

				<Col
					class="rt-det"
					:xs="24"
					:sm="24"
					:md="8"
					:lg="8"
				>
					<hr class="split-line"/>
					<div class="about-num">
						<p>
							预估&nbsp;
							<span v-if="item.projectScheme!=''">{{ JSON.parse( item.projectScheme ).total }}&nbsp;元</span>
							<span v-else>{{ JSON.parse( item.dailyWageSystem || "" ).oneDay }}&nbsp;元&nbsp;/&nbsp;天</span>
						</p>
						<ol>
							<li>
								<span>工期：</span>
								<span>{{ JSON.parse( item.projectScheme || item.dailyWageSystem ).date }}天</span>
							</li>
							<li>
								<span>预算：</span>
								<span>{{ JSON.parse( item.projectScheme || item.dailyWageSystem ).total }}元</span>
							</li>
							<li>
								<span>开工时间：</span>
								<span v-text="item.workTimeStart"></span>
							</li>
						</ol>
						<Button type="primary" @click="delivery(item)" v-if="!item.deliveryBool">投递职位</Button>
						<Button disabled  v-else>已投递</Button>
					</div>
				</Col>
			</Row>
        </Card>
	</div>
</template>
<script>
	export default({
		data(){
			return{
				job_public: []
			}
		},
		mounted(){

		},
		methods:{
			delivery(item){
				this.$emit('delivery', {"status":"save", "item": item});
			}
		}
	})
</script>