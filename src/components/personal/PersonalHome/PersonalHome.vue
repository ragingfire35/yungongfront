<style lang="less" scoped>
	h1.tt{
		margin-top: 30px;
		font-size: 24px;
		color: #19be6b;
	}
	.personalHome{
		width: 75%;
		margin: 30px auto 0 auto;
	}
</style>
<style lang="less">
	form{
		text-align: left;
		button{
			width: 100%;
		}
		.ivu-form-item{
			margin-bottom: 30px;
		}
	}
	.ivu-tabs-bar{
		margin-bottom: 0;
	}
	.bt0{
		border-top: 0;
	}
</style>
<template>
	<div>
		<h1 class="tt">个人主页</h1>
		<Tabs type="card" class="personalHome" @on-click="info">
			<Tab-pane label="账户资料" name="personalInfo">
				<personal-info/>
			</Tab-pane>
			<Tab-pane label="真实信息" name="personalReal">
				<personal-real/>
			</Tab-pane>
			<Tab-pane label="兼职详情" name="personalPartTime">
				<personal-part-time/>
			</Tab-pane>
		</Tabs>

	</div>

</template>
<script>
	import PersonalInfo from "@/components/personal/PersonalInfo/PersonalInfo.vue";
	import PersonalReal from "@/components/personal/PersonalReal/PersonalReal.vue";
	import PersonalPartTime from "@/components/personal/PersonalPartTime/PersonalPartTime.vue";


	export default({
		data(){
			return{
			}
		},
		components:{
			PersonalInfo : PersonalInfo,
			PersonalReal : PersonalReal,
			PersonalPartTime : PersonalPartTime
		},
		mounted(){

		},
		methods:{
			info(name){
				this.$router.push({path:'/personalHome', query: {name:name}})
			}
		}
	})
</script>