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
  							:type="formValidate.city == item.label ? 'success' : 'text'"
  							:key="index"
  							:value="item.label"
  							@click="formValidate.city = item.label,
  									Place.areaJson =  [{value:'', label:'不限',children:[]}].concat( item.children ),
  									selectJob()"
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
			  				:type="formValidate.area == item.label ? 'success' : 'text'"
			  				:key="index"
			  				:value="item.label"
			  				@click="formValidate.area = item.label, selectJob()"
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
  					<p slot="title"><b>顾问角色</b></p>
  					<p class="listBtn">
						<Button
							v-for="(item, index) in JobClass.roleJson"
							:key="index"
							:value = "item.label"
							:type="formValidate.role == item.label ? 'success' : 'text'"
							@click="formValidate.role = item.label,  selectJob()"
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
							:type="formValidate.sortRule == item ? 'success' : 'text'"
							@click="formValidate.sortRule = item, selectJob()"
						>
							{{item}}
						</Button>
					</p>
				</div>
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
  			Place : {
  				cityJson : [{value:"", label:"不限",children:[]}].concat( this.cityJson ),
  				areaJson : {},
  				cityShowNum : 8,
  				areaShowNum : 8
  			},
  			JobClass : {
  				roleJson : [{value:"", label:"不限",children:[]}].concat( this.roleJson ),
  				roleShowNum : 5
  			},

  			formValidate:{
  				"city" : "不限",
  				"area" : "不限",
  				"role" : "不限",
  				"sortRule" : "默认"
  			},

  			sortRule: ["默认",  "最新职位",  "无人投递",  "接受远程"]
  		}
  	},
    components:{
    	switchProcess : switchProcess
    },
    mounted(){
    	this.getJob();
    },
    methods:{
    	getJob(){
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
    	selectJob(){
	    	var _this = this;
	    	_this.spinShow = true;
	    	var data = JSON.parse(JSON.stringify(_this.formValidate));
	    	data['status'] = 'check';
	        _this.$ajax({
	            url: 'api/website/publicJob.php',
	            method: 'POST',
	            data : data
	        }).then((response) => {
	        	_this.spinShow = false;
	            if(response.data.status == 'success'){
	               _this.job_public = response.data.info;
	            };
	        });
    	}
    }
  }
</script>
