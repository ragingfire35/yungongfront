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
		<Tabs type="card" class="personalHome" @on-click="info" :value="$route.query.name">
			<Tab-pane label="账户资料" name="personalInfo">
				<personal-info v-if="base.personalInfo" ></personal-info>
			</Tab-pane>
			<Tab-pane label="职业等级" name="personalLevel">
				<personal-level v-if="base.personalLevel"></personal-level>
			</Tab-pane>
			<Tab-pane label="真实信息" name="personalReal">
				<personal-real v-if="base.personalReal"></personal-real>
			</Tab-pane>
			<Tab-pane label="兼职详情" name="personalPartTime">
				<personal-part-time v-if="base.personalPartTime"></personal-part-time>
			</Tab-pane>
		</Tabs>

	</div>

</template>
<script>
	import PersonalInfo from "@/components/personal/PersonalInfo/PersonalInfo.vue";
	import PersonalReal from "@/components/personal/PersonalReal/PersonalReal.vue";
	import PersonalPartTime from "@/components/personal/PersonalPartTime/PersonalPartTime.vue";
	import PersonalLevel from "@/components/personal/PersonalLevel/PersonalLevel.vue";


	export default({
		data(){
			return{
				base : {
					personalInfo : this.$route.query.name == 'personalInfo' || false,
					personalLevel : this.$route.query.name == 'personalLevel' || false,
					personalReal : this.$route.query.name == 'personalReal' || false,
					personalPartTime : this.$route.query.name == 'personalPartTime' || false
				}
			}
		},
		components:{
			PersonalInfo : PersonalInfo,
			PersonalReal : PersonalReal,
			PersonalPartTime : PersonalPartTime,
			PersonalLevel : PersonalLevel
		},
		mounted(){
		},
		methods:{
			info(name){
				this.base[name] = true;
				this.$router.push({path:'/PersonalHome', query: {name:name}})
			}
		}
	})
</script>