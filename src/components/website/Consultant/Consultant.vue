<style lang="less" scoped>
	@import "Consultant.less";
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
  					<p slot="title"><b>工作地点</b></p>
  					<p class="listBtn">
  						<Button
  							v-for="(item, index) in Place.cityJson"
  							:type="formValidate.city == item.label ? 'primary' : 'text'"
  							:key="index"
  							:value="item.label"
  							@click="formValidate.city = item.label,
  									Place.areaJson =  [{value:'', label:'不限',children:[]}].concat( item.children ),
  									selectPersonal()"
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
			  				:type="formValidate.area == item.label ? 'primary' : 'text'"
			  				:key="index"
			  				:value="item.label"
			  				@click="formValidate.area = item.label, selectPersonal()"
			  				v-if= "index < Place.areaShowNum"
  						>{{item.label}}</Button>
  					</p>
  					<p class="moreBtn" v-if="Place.areaJson && Place.areaJson.length > 8">
  						<Button type="text" icon="chevron-down" @click.native="Place.areaShowNum = Place.areaShowNum == 8 ? 1000:8">更多</Button>
  					</p>
  					<p v-if="formValidate.city == '不限'" class="noValue" >
  						请先选择一个工作地点
  					</p>
  				</div>

				<div class="artic jobClass">
  					<p slot="title"><b>雇佣角色</b></p>
  					<p class="listBtn">
						<Button
							v-for="(item, index) in JobClass.roleJson"
							:key="index"
							:value = "item.label"
							:type="formValidate.role == item.label ? 'primary' : 'text'"
							@click="formValidate.role = item.label, selectPersonal()"
							v-if="index < JobClass.roleShowNum"
						>
							{{ item.label }}
						</Button>
					</p>
  					<p class="moreBtn" v-if="JobClass.roleJson.length > 5">
  						<Button type="text" icon="chevron-down" @click.native="JobClass.roleShowNum = JobClass.roleShowNum == 5 ? 1000:5">更多</Button>
  					</p>
				</div>

				<div class="artic sortRule">
  					<p slot="title"><b>排序方式</b></p>
  					<div class="listBtn">
						<div
							style="float:left;"
							v-for="(item, index) in sortRule"
							:key="index"
						>
							<strong>{{item.sortName}}</strong>

						  	<Dropdown class="dropDown-menu">
						        <Button type="primary" >
						            <Icon type="arrow-down-b"></Icon>
						            <span>{{item.optionName[ item.checkedIndex ] }}</span>
						        </Button>
						        <Dropdown-menu slot="list" >
						            <Dropdown-item
						            	v-for="(ITEM, INDEX) in item.optionName"
						            	:key="INDEX"
										:name="ITEM"
										@click.native="item.checkedIndex = INDEX, selectPersonal()"
						            >
						            	{{ITEM}}
						        	</Dropdown-item>
						        </Dropdown-menu>
						    </Dropdown>
						</div>

					</div>
				</div>

				<div class="artic level">
  					<p slot="title"><b>雇佣级别</b></p>
  					<p class="listBtn">
						<Button
							v-for="(item, index) in level"
							:key="index"
							:type="formValidate.level == item? 'primary' : 'text'"
							@click="formValidate.level = item,  selectPersonal()"
						>
							{{item}}
						</Button>
					</p>
				</div>

            </Card>

            <Card class="card jobDetail"
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
							<Button type="success" @click="$router.push({'path': '/GetTalent'})">立即预约</Button>
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
  			job_seekers : [],
  			spinShow : false,
  			formValidate:{
  				"city" : "不限",
  				"area" : "不限",
  				"role" : "不限",
  				"sortRule" : "",
  				"level" : "不限"
  			},
			websiteIndex : 0,
  			Place : {
  				cityJson : [{value:"", label:"不限", children:[]}].concat( this.cityJson ),//this.cityJson main.js全局
  				areaJson : {},
  				roleJson : this.roleJson,
  				cityShowNum : 8,
  				areaShowNum : 8
  			},

  			JobClass : {
  				roleJson : [{value:"", label:"不限", children:[]}].concat( this.roleJson ),
  				roleShowNum : 5
  			},

  			sortRule: [
  				{
  					sortName :  "日薪",
  					optionName : ["不限", "700及以下", "800-1200", "1300-1600", "1700以上"],
  					checkedIndex : 0
  				},
  				{
  					sortName :  "经验",
  					optionName : ["不限", "2年及以下", "3-6年", "7-10年", "10年以上"],
  					checkedIndex : 0
  				},
  				{
  					sortName :  "评价",
  					optionName : ["不限", "优先"],
  					checkedIndex : 0
  				},
  				{
  					sortName :  "自由职业者",
  					optionName : ["不限", "优先"],
  					checkedIndex : 0
  				}
  			],

  			level: ["不限", "初级", "中级", "高级", "专家", "高级顾问"]
  		}
  	},
    mounted(){
    	this.getPersonal();
    },
    components:{
    	switchProcess : switchProcess
    },
    methods: {
    	getPersonal(){
	    	var _this = this;
	        _this.$ajax({
	            url: 'api/personal/jobSeekers.php',
	            method: 'POST',
	            data : {status : 'get'}
	        }).then((response) => {
	            if(response.data.status == 'success'){
	               _this.job_seekers = response.data.info;
	            };
	        });
    	},
    	selectPersonal(){
	    	var _this = this;
	    	var data = JSON.parse(JSON.stringify(_this.formValidate));
	    	data['status'] = 'check';
	    	_this.spinShow = true;
	        _this.$ajax({
	            url: 'api/personal/jobSeekers.php',
	            method: 'POST',
	            data : data
	        }).then((response) => {
	        	_this.spinShow = false;
	            if(response.data.status == 'success'){
	               _this.job_seekers = response.data.info;
	            };
	        });
    	}
    }
  }
</script>
