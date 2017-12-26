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
			<Tab-pane label="账户资料" name="websiteInfo">
				<website-info/>
			</Tab-pane>
			<Tab-pane label="真实信息" name="websiteReal">
				<website-real/>
			</Tab-pane>
			<Tab-pane label="公司信息" name="websiteCompany">
				<website-company/>
			</Tab-pane>
		</Tabs>

	</div>

</template>
<script>
	import WebsiteInfo from "@/components/personal/PersonalInfo/PersonalInfo.vue";
	import WebsiteReal from "@/components/personal/PersonalReal/PersonalReal.vue";
	import WebsiteCompany from "@/components/website/WebsiteCompany/WebsiteCompany.vue";

	export default({
		data(){
			return{
			}
		},
		components:{
			WebsiteInfo : WebsiteInfo,
			WebsiteReal : WebsiteReal,
			WebsiteCompany : WebsiteCompany
		},
		mounted(){

		},
		methods:{
			info(name){
				this.$router.push({path:'/WebsiteHome', query: {name:name}})
			}
		}
	})
</script>