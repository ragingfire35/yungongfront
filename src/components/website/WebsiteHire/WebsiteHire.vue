<style lang="less" scoped>
	.partTime{
		.inner{
			margin-top: 20px;
			text-align: left;
		}
	}
	.not-style{
		text-align: center;
		color: #3399FF;
	}
</style>
<template>
	<Card class="partTime bt0" dis-hover>
		云工网提供支付中间担保，在合同签署后，再提供项目资料，以保障您的权益。
		如有问题请联系客服。客服微信号 yungongteam
	  	<Collapse v-model="value2" accordion class="inner">

	        <Panel
	        	v-for="item, index in detail"
	        	:key="index"
	         	:name="item.ref"
			>
				{{item.text}}
	            <div slot="content">

	            	<Collapse v-model="value" accordion class="inner">
				        <Panel
				        	v-for="ITEM, INDEX in xiangmu"
				        	:key="INDEX"
				         	:name="'zhiwei'+INDEX"
						>

							{{ITEM.projectName}}
						  	<div slot="content">
						  		<div>
									{{ITEM.projectDesc}}
									<Button @click="toudizhe_fn(INDEX)">有{{toudizhe_num}}位投递者，点击查看</Button>
						  		</div>
						  		<job-seekers ref="job_s"></job-seekers>
						  	</div>
						</Panel>
					</Collapse>
	            </div>
	        </Panel>
	    </Collapse>
	</Card>
</template>
<script>
	import JobSeekers from "@/components/common/JobSeekers/JobSeekers.vue";
	export default({
		data(){
			return{
				value2 : "job_s0",
				value: "zhiwei0",
				detail : [
					{"ref":"job_s0", "status": 0, text: "被投递"}
				],
				xiangmu : [],
				toudizhe_num : 0,
				toudizhe : []
			}
		},
		mounted(){
	    	var _this = this;
	        _this.$ajax({
	            url: _this.API_ROOT + '/website/WebsiteHire.php',
	            method: 'POST'
	        }).then((response) => {
	            if(response.data.status == 'success'){
	            	var j = 0;
	            	for (var i = 0; i < response.data.detail.length; i++) {
						_this.xiangmu.push( response.data.detail[i] );
						_this.toudizhe_num = response.data.detail[i].qiuzhiInfo.length;
						_this.toudizhe.push(response.data.detail[i].qiuzhiInfo);
	            	};
	            };
	        });
		},
		methods:{
				toudizhe_fn(i){
					this['$refs']['job_s'][i]['job_seekers'] = this.toudizhe[i];
				}
		},
		components:{
			JobSeekers : JobSeekers
		}
	})
</script>