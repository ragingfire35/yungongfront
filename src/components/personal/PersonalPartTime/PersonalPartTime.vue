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
		云工网提供支付中间担保，请在对方支付完成后，才开始工作，以保障您的劳动利益。
		如有问题请联系客服。客服微信号 yungongteam
	  	<Collapse v-model="value2" accordion class="inner">

	        <Panel
	        	v-for="item, index in detail"
	        	:key="index"
	         	:name="item.ref"
	        >
	            {{item.text}}
	            <div slot="content">
	            	<job-public :ref="item.ref"></job-public>
	            </div>
	        </Panel>
	    </Collapse>
	</Card>
</template>
<script>
	import JobPublic from "@/components/common/JobPublic/JobPublic.vue";
	export default({
		data(){
			return{
				value2 : "job_p0",
				detail:[
					//{"ref":"job_p0", "status": -1, text: "暂时没有记录~"},
					{"ref":"job_p0", "status": 0, text: "已投递"},
					{"ref":"job_p1", "status": 1, text: "被预约"},
					{"ref":"job_p2", "status": 2, text: "进行中"},
					{"ref":"job_p3", "status": 3, text: "待确认完工"},
					{"ref":"job_p4", "status": 4, text: "待退款"},
					{"ref":"job_p5", "status": 5, text: "已取消"},
				]
			}
		},
		mounted(){
	    	var _this = this;
	        _this.$ajax({
	            url: _this.API_ROOT + '/personal/partTimeDetail.php',
	            method: 'POST'
	        }).then((response) => {
	            if(response.data.status == 'success'){
	            	for(var i in response.data.detail){
	            		var j = response.data.detail[i].partTime_status;
	            		if(j == 0){
	            			response.data.detail[i].deliveryBool = true;
	            		}
	            		switch(j){
	            			case j :
								_this['$refs']['job_p'+j][0]['job_public'].push(response.data.detail[i]);
	            		}
	            	}
	            };
	        });
		},
		methods:{

		},
		components:{
			JobPublic : JobPublic
		}
	})
</script>