<style lang="less" scoped>
	
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
						<Button type="primary" @click.native="delivery('save', item)" v-if="!item.deliveryBool">投递职位</Button>
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

			}
		},
		mounted(){

		},
		methods:{

		}
	})
</script>