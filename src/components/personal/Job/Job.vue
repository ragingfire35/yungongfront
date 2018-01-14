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
  							v-for="(item, index) in Place.cityJson"
  							:type="formValidate.city == item.value ? 'success' : 'text'"
  							:key="index"
  							:value="item.value"
  							@click="formValidate.city = item.value, Place.areaJson = item.children"
  							v-if= "index < Place.cityShowNum"
  						>{{item.label}}</Button>
  					</p>
  					<p class="moreBtn">
  						<Button type="text" icon="chevron-down" @click.native="Place.cityShowNum = Place.cityShowNum == 8 ? 1000:8">更多</Button>
  					</p>
  				</div>

  				<div
	  				class="artic region"
  				>
  					<p slot="title"><b>所属区域</b></p><!-- 区域 -->
  					<p class="listBtn">
  						<Button
			  				v-for="(item, index) in Place.areaJson"
			  				:type="formValidate.area == item.value ? 'success' : 'text'"
			  				:key="index"
			  				:value="item.value"
			  				@click="formValidate.area = item.value"
			  				v-if= "index < Place.areaShowNum"
  						>{{item.label}}</Button>
  					</p>
  					<p class="moreBtn" v-if="Place.areaJson && Place.areaJson.length > 8">
  						<Button type="text" icon="chevron-down" @click.native="Place.areaShowNum = Place.areaShowNum == 8 ? 1000:8">更多</Button>
  					</p>
  					<p v-if="formValidate.city == ''" class="noValue" >
  						请先选择一个工作地点
  					</p>
  				</div>

				<div class="artic jobClass">
  					<p slot="title"><b>顾问角色</b></p>
  					<p class="listBtn">
						<Button
							v-for="(item, index) in JobClass.roleJson"
							:key="index"
							:value = "item.value"
							:type="formValidate.role == item.value ? 'primary' : 'text'"
							@click="formValidate.role = item.value"
							v-if="index < JobClass.roleShowNum"
						>
							{{ item.label }}
						</Button>
					</p>
  					<p class="moreBtn" v-if="JobClass.roleJson.length > 5">
  						<Button type="text" icon="chevron-down" @click.native="JobClass.roleShowNum = JobClass.roleShowNum == 5 ? 1000:5">更多</Button>
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
									<h5 v-text="item.projectDesc"></h5>
									<Tag class="badge" v-text="item.payWay"></Tag>
								</div>
								<p class="text" v-html="item.projectDesc"></p>
							</router-link>
						</div>
						<div class="user-info">
							<router-link to="">
								<img :src="item.userhead" alt="">
								<span v-text="item.username"></span>
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
									<span>{{ item.projectScheme}}天</span>
								</li>
								<li>
									<span>预算：</span>
									<span>20000元</span>
								</li>
								<li>
									<span>开工时间：</span>
									<span v-text="item.workTimeStart"></span>
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
  			job_public: [],
			ruleIndex : 0,
  			Place : {
  				cityJson : [{value:"", label:"全国",children:[]}].concat( this.cityJson ),
  				areaJson : {},
  				roleJson : this.roleJson,
  				cityShowNum : 8,
  				areaShowNum : 8
  			},
  			JobClass : {
  				roleJson : this.roleJson,
  				roleShowNum : 5
  			},

  			formValidate:{
  				city : "",
  				area : "",
  				role : ""
  			},

  			sortRule: ["默认",  "最新职位",  "无人投递",  "接受远程"]
  		}
  	},
    mounted(){
    	var _this = this;
        _this.$ajax({
            url: 'api/website/publicJob.php',
            method: 'POST',
            data : {status : 'get'}
        }).then((response) => {
            if(response.data.status == 'success'){
               _this.job_public = response.data.info;
            };
        });
    },
    components:{
    	switchProcess : switchProcess
    }
  }
</script>
