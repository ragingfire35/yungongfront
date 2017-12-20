<style lang="less" scoped>
	@import "job.less";
</style>
<template>
	<Row type="flex" class="job" justify="center" :gutter="16">
		<Col
			class="left-section"
			:xs="24"
			:sm="13"
			:md="13"
			:lg="13"
		>
  			<Card class="card conditions">
  				<div class="artic city">
  					<p slot="title"><b>工作省份</b></p>
  					<p class="listBtn">
  						<Button
  							v-for="(item, index) in Place"
  							:type="index == PlaceIndex ? 'success' : 'text'"
  							:key="index"
  							@click="PlaceIndex = index, secPlaceIndex = -1"
  						>{{item.provinces}}</Button>
  					</p>
  				</div>

  				<div
	  				class="artic region"
	  				v-for="(item, index) in Place"
	  				:key="index"
	  				v-if="PlaceIndex == index && item.area.length != 0"
  				>
  					<p slot="title"><b><small></small></b></p><!-- 区域 -->
  					<p class="listBtn">
  						<Button
  							size="small"
  							v-for="(ITEM, INDEX) in item.area"
							:key="INDEX"
  							:type="INDEX == secPlaceIndex ? 'success' : 'text'"
  							@click="secPlaceIndex = INDEX"
  						>{{ITEM}}</Button>
  					</p>
  				</div>

				<div class="artic jobClass">
  					<p slot="title"><b>顾问角色</b></p>
  					<p class="listBtn">
						<Button
							v-for="(item, index) in jobClass"
							:key="index"
							:type="index == jobIndex ? 'success' : 'text'"
							@click="jobIndex = index"
						>
							{{item}}
						</Button>
					</p>
				</div>

				<div class="artic jobClass">
  					<p slot="title"><b>排序方式</b></p>
  					<p class="listBtn">
						<Button
							v-for="(item, index) in sortRule"
							:key="index"
							:type="index == ruleIndex ? 'success' : 'text'"
							@click="ruleIndex = index"
						>
							{{item}}
						</Button>
					</p>
				</div>
            </Card>
            <Card class="card jobDetail">
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
									<h5>交易平台功能完善</h5>
									<Tag class="badge">日薪制</Tag>
								</div>
								<p class="text">
									1、加多币种交易，前台同样显示（目前后台有加币种功能，前台无法显示）。 例：目前网站只支持玩客币交易，如果要添加其它币种交易，后台直接添加，前台会显示这个币的交易链接，点击可进入交易页面。 2、转币入帐加一个表单。 例：客户向我们钱包转帐后，在网站可以提交表单，表单内容为客户钱包帐号、转帐金额、转帐时间（精确到
								</p>
							</router-link>
						</div>
						<div class="user-info">
							<router-link to="">
								<img src="./image/user.png" alt="">
								<span>大好时光</span>
								<i>21分钟前发布</i>
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
							<p>预估&nbsp;<span>20000</span>&nbsp;元</p>
							<ol>
								<li>
									<span>工期：</span>
									<span>20天</span>
								</li>
								<li>
									<span>预算：</span>
									<span>20000元</span>
								</li>
								<li>
									<span>开工时间：</span>
									<span>2017-12-05</span>
								</li>
							</ol>
							<Button type="primary">投递职位</Button>
						</div>
					</Col>
				</Row>
            </Card>
		</Col>

		<switch-process/>
	</Row>
</template>
<script>
  import switchProcess from "@/components/common/SwitchClass/switchProcess.vue";
  export default {
  	data(){
  		return {
  			PlaceIndex : 0,
			secPlaceIndex : -1,
			jobIndex : 0,
			ruleIndex : 0,
  			Place : [
  				{
  					provinces : "全国",
  					area : []
  				},

  				{
  					provinces : "北京",
  					area : ["海淀","昌平","朝阳","东城","西城","石景山","通州","丰台","房山","大兴"]
  				},
  				{
  					provinces : "上海",
  					area : ["1212"]
  				},
  			],

  			jobClass : ["全部", "iOS工程师", "Android工程师"],

  			sortRule: ["默认",  "最新职位",  "无人投递",  "接受远程"]
  		}
  	},
    mounted(){
    },
    components:{
    	switchProcess : switchProcess
    }
  }
</script>
