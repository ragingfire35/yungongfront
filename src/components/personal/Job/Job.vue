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
			<job-public ref="job_p" @delivery="delivery"></job-public>
		</Col>
		<switch-process/>
	</Row>
</template>
<script>
  import switchProcess from "@/components/common/SwitchClass/switchProcess.vue";
  import JobPublic from "@/components/common/JobPublic/JobPublic.vue";
  export default {
  	data(){
  		return {
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

  			sortRule: ["默认",  "最新职位",  "无人投递",  "接受远程"],

  		}
  	},
    components:{
    	JobPublic : JobPublic,
    	switchProcess : switchProcess
    },
    mounted(){
    	this.getJob();
    },
    methods:{
    	getJob(){
	    	var _this = this;
	        _this.$ajax({
	            url: _this.API_ROOT + '/website/publicJob.php',
	            method: 'POST',
	            data : {status : 'get'}
	        }).then((response) => {
	            if(response.data.status == 'success'){
	            	for (var i in response.data.info){
	            		response.data.info[i]['deliveryBool'] = false;
	            	}
	               _this.$refs.job_p.job_public = response.data.info;
	               _this.delivery({"status":"get", "item": {"public_id" : ""}});
	            };
	        });
    	},
    	selectJob(){
	    	var _this = this;
	    	_this.spinShow = true;
	    	var data = JSON.parse(JSON.stringify(_this.formValidate));
	    	data['status'] = 'check';
	        _this.$ajax({
	            url: _this.API_ROOT + '/website/publicJob.php',
	            method: 'POST',
	            data : data
	        }).then((response) => {
	        	_this.spinShow = false;
	            if(response.data.status == 'success'){
	               _this.$refs.job_p.job_public = response.data.info;
	            };
	        });
    	},
    	delivery(arg){
    		var _this = this;
	        if(_this.$store.state.is_login == "false"){
	        	 _this.$Message.error('请先登录');
	        } else {
		        _this.$ajax({
		            url: _this.API_ROOT + '/website/delivery.php',
		            method: 'POST',
		            data: {"status": arg.status,
		            	   "public_id" : arg.item.public_id,//职位id
		            	   "public_userid" : arg.item.userid//职位发布者id
		            }
		        }).then((response) => {
		        	if(arg.status == 'save'){
			            if(response.data.status == 'success'){
							_this.$Message.success(response.data.msg);
							arg.item.deliveryBool = true;
			            } else {
			            	var errCode = response.data.errCode
			            	if(errCode == "01"){
			            		_this.$Message.error(response.data.msg);
			            	} else if (errCode == "02"){
				                _this.$Modal.confirm({
				                    title: '温馨提示',
				                    content: response.data.msg,
				                    okText: '立即申请',
				                    cancelText: '返回',
				                    onOk: () => { _this.$router.push({path: "/PartTime"})}
				                });
			            	};

			            };
		        	} else {
		        		if(response.data.status == 'success'){
		        			for(var i in _this.$refs.job_p.job_public){
		        				for( var j in response.data.deliveryArr ){
		        					if (_this.$refs.job_p.job_public[i].public_id == response.data.deliveryArr[j]){
		        						_this.$refs.job_p.job_public[i]['deliveryBool'] = true;
		        					}
		        				}
		        			}
		        		};
		        	}

		        });
	        }
    	},
    }
  }
</script>
