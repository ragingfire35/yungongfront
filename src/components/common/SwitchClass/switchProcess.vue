<style lang="less" scope>
	.right-section{
		margin-top: 30px;
		div{
		}
	}
	.situation{
		p{
			margin: 15px 0;
			font-size: 16px;
			color: #ccc;
		}
		button{
			font-size: 15px;
		}
	}
	.situation-1,
	.situation-2{
		margin: 30px 0;
	}
</style>
<template>
	<Col
		:xs="24"
		:sm="5"
		:md="5"
		:lg="5"
		class="right-section"
	>
		<Card class="situation">
			<div class="situation-1">
				<p>我是技术人才<br/>我在寻找兼职工作</p>
				<i-button type="success" style="width:80%;" @click.narive="partTime">申请成为技术顾问</i-button>
			</div>
			<div class="situation-2" v-if="$store.state.userClassify.userClass == 'website' || !$store.state.userClassify.userClass">
				<p>我是创业者<br/>我在寻找技术人才</p>
				<i-button type="primary" style="width:80%;" @click.narive="publicJob">发布用人需求</i-button>
			</div>
		</Card>
		<Activity>
		</Activity>
	</Col>
</template>
<script>
	import Activity from "@/components/common/Activity/Activity.vue";
	export default({
		data(){
			return{

			}
		},
		mounted(){

		},
		methods:{
			checkStatus(){
				if(this.$store.state.is_login == "false"){
					this.$Message.error('请先登录');
					return false;
				} else if(!this.$store.state.userClassify.userClass){
		            this.$Notice.warning({
	                   title: "请先选择一个版本进入",
	                   duration : 1,
	                   key: 'bb'
		            });
		            return false;
				} else {
					return true;
				}
			},
			partTime(){
				if (this.checkStatus()){
					this.$router.push({path: "/PartTime"});
				}
			},
			publicJob(){
				if (this.checkStatus()){
					this.$router.push({path: "/PublicJob"});
				}
			}
		},
		components:{
			Activity : Activity
		}
	})
</script>