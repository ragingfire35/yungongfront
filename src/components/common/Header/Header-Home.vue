<style lang="less" scoped>
	@import "less/head-home.less";
</style>
<template>
	<div class='head-home'>
	 	<Row type="flex" justify="center" align="middle" class-name = "nav-bar">

			<Col :xs="24" :sm="24" :md="24" :lg="4" class="logo">
				<router-link to="/" hover="false">
					<img width="100%" alt="云工网" title="云工网" src="./image/logo.png">
					<span>云工网</span>
				</router-link>				
			</Col>	      
    		<Col :xs="24" :sm="6" :md="6" :lg="2" class="">
    			<router-link to="/Consultant">
    				技术顾问
    			</router-link>
	        </Col>
    		<Col :xs="24" :sm="6" :md="6" :lg="2" class="">
    			<router-link to="/Job">
    				兼职需求
    			</router-link>
	        </Col>
    		<Col :xs="24" :sm="6" :md="6" :lg="2" class="">
    			<router-link to="/">
    				标准服务
    			</router-link>
	        </Col>
    		<Col :xs="24" :sm="6" :md="6" :lg="2" class="">
    			<router-link to="/">
    				成功案例
    			</router-link>
	        </Col>      
			<Col :xs="20" :sm="24" :md="24" :lg="6" >
				<span class="login" @click="modalShow.loginUp = true">
					账号注册
				</span>
				&nbsp;/&nbsp;
				<span class="login">
					登录
				</span>
			</Col>

	    </Row>
	    <dialog-box :modalShow="modalShow"> </dialog-box>	

	</div>
</template>
<script>
	import DialogBox from "@/components/common/Dialog/Dialog.vue";
	export default({
		name : "HomeHeader",

		data(){
			return{
				modalShow : {
					loginUp : false,
					loginIn : false
				}
			}
		},
		watch:{
/*			modalShow(aa)  {
				console.log(aa)
			}*/
		},
		mounted(){
		},
		components:{
			DialogBox : DialogBox
		},
		methods:{
		}
	})
</script>