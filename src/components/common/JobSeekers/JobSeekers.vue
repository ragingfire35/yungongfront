<style lang="less">
	.job_seekers{
		.card{
			margin-bottom: 30px;
			height: auto;
		}
		.lt-det{
			float: left;
			text-align: left;
		    padding:0 8px;
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
					margin-top: 10px;
					font-size: 14px;
					color: #666;
					position: relative;
					padding-left: 10px;
					&:before{
						content: "";
						display: block;
						height: 1em;
						width: 4px;
						background: #19be6b;
						position: absolute;
						top: 0;
						bottom: 0;
						margin: auto 0;
						left: 0;
					}
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
			&>img{
				width: 50px;
				height: 50px;
				border-radius: 50px;
				float: left;
			}
			&>span{
				float: left;
				margin-left: 6%;
				color: #19be6b;
			}
			&>i{
				float: left;
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
		    padding:0 8px;
		}
		.about-num{
			padding-left: 10%;
			text-align: left;
			&>p{
				font-size: 18px;
				color: #19be6b;
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
	}
</style>
<template>
	<div class="job_seekers">
	    <Card class="card"
	          v-for="(item, index) in job_seekers"
	          :key = index
	          v-if="job_seekers.length != 0"
	    >
			<Row type="flex" justify="center" class="detail-inner">
				<Col
					class="lt-det"
					:xs="24"
					:sm="24"
					:md="16"
					:lg="16"
				>
				<router-link :to="{ path: '/ConsultantDetail', query: { userid: item.userid }}">
					<div class="user-info">
						<img :src="item.userhead" alt="">
						<span v-text="item.username"></span>
						<span><Icon type="settings"></Icon>&nbsp;{{ JSON.parse(item.job_exe)[0].value2}}</span>
						<span>高级顾问</span>
						<span>{{item.job_timelimit}}年</span>
					</div>
					<div class="job-main">
						<div class="title">
							<h5>擅长技能</h5>
						</div>
						<Tag type="dot"
							v-for="(tag, tagIndex) in JSON.parse(item.user_skills)"
							:key="tagIndex"
						>
							{{tag}}
						</Tag>
						<p class="text" v-html="item.user_skillsexe"></p>
					</div>
				</router-link>

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
						<p><span>￥{{ item.job_priceday }}</span>&nbsp;/&nbsp;8小时</p>
						<ol>
							<li>
								<span>被预约次数</span>
								<span>2</span>
							</li>
							<li>
								<span>可兼职时间</span>
								<span
									v-for="(time, timeIndex) in JSON.parse(item.job_timecan)"
									:key="timeIndex"
								>
								 {{time+'&nbsp;'}}
								</span>
							</li>
							<li>
								<span>可兼职地点</span>
								<span>{{ JSON.parse(item.job_addresscan).city + '&nbsp;' + JSON.parse(item.job_addresscan).area }}</span>
							</li>
						</ol>
						<Button type="success" @click.native="yuyue(item.userid)">立即预约</Button>
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
				job_seekers : []
			}
		}
	})
</script>