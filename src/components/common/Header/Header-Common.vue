<style lang="less" scoped>
	@import "less/head-common.less";
</style>
<template>
	<div class='head-common'>
		<Row type="flex" justify="center" align="middle" class="nav-bar">
			<Col
				:xs="24"
				:sm="{span: 2, pull: 1, class:'logo'}"
				:md="{span: 2, pull: 1}"
				:lg="{span: 2, pull: 1}"
				class="logo"
			>
				<router-link :to="$store.state.is_login==='true' ? '/Consultant' : '/'" >
					<div class="logoInner">
						<img width="70%" alt="云工网" title="云工网" src="./image/logo.png">
						<span>云工网</span>
					</div>
				</router-link>
			</Col>
			<Col :xs="24" :sm="20" :md="18" :lg="18">
				<Row type="flex" justify="center" align="middle" class="nav-menu">

				    <Menu mode="horizontal" theme="primary" :active-name="$route.path" @on-select="locaHref">
				    	<Col :xs="24" :sm="4" :md="4" :lg="3">
					        <Menu-item name="/Consultant">
					            我要雇佣
					        </Menu-item>
				        </Col>
				        <Col :xs="24" :sm="4" :md="3" :lg="3">
					        <Menu-item name="/Job">
					            我要兼职
					        </Menu-item>
				        </Col>
				        <Col :xs="24" :sm="4" :md="3" :lg="3">
					        <Menu-item name="/StandardService">
					            标准服务
					        </Menu-item>
				        </Col>
				        <Col :xs="24" :sm="4" :md="3" :lg="3">
					        <Menu-item name="/StandardServiceF">
					            成功案例
					        </Menu-item>
				        </Col>
				        <Col :xs="24" :sm="4" :md="3" :lg="3">
					        <Menu-item name="/DanBao">
					            *&nbsp;担保交易
					        </Menu-item>
						</Col>
						<Col
							:xs="{span: 24, push: 0, class:'personal'}"
							:sm="{span: 4, pull: 0}"
							:md="{span: 4, push: 4}"
							:lg="{span: 4, push: 4}"
						>
					        <Submenu
						        name="6"
						        :open-names="this.$route.path"
						        class="menu-personal"
						        v-if="$store.state.is_login === 'true'"
					        >
					            <template slot="title">
					            	<img :src="this.$store.state.LoginedUser.userhead" alt="">
					            	<span>{{this.$store.state.LoginedUser.username}}</span>
					            </template>
					            <div v-if="$store.state.userClassify.userClass">
						            <Menu-group title="使用">
						            	<div v-if="$store.state.userClassify.userClass == 'personal'">
						            		 <Menu-item name="/PartTime">我要兼职</Menu-item>
						            		 <Menu-item name="/personalHome?name=personalPartTime">兼职详情</Menu-item>
						            	</div>
						               	<div v-else>
							                <Menu-item name="/PublicJob">我要雇佣</Menu-item>
							            	<Menu-item name="/WebsiteHome?name=websiteHire">雇佣详情</Menu-item>
							            	<Menu-item name="/WebsiteHome?name=websiteFollow">我的关注</Menu-item>
						               	</div>
						            </Menu-group>
						            <Menu-group title="个人">

						            	<Menu-item name="/Pay">
						            		账户充值
						            	</Menu-item>
						            	<div v-if="$store.state.userClassify.userClass == 'personal'">
							            	<Menu-item name="/PersonalHome?name=personalInfo">
							            		修改账户资料
							            	</Menu-item>
							            	<Menu-item name="/PersonalHome?name=personalLevel" >
							            		职业等级
							            	</Menu-item>
						            	</div>
						            	<div v-else>
							            	<Menu-item name="/WebsiteHome?name=websiteInfo">
							            		修改账户资料
							            	</Menu-item>
						            	</div>

						                <Menu-item name="/" @click.native=" loginOut">退出</Menu-item>
						            </Menu-group>
					            </div>
								<div v-else>
 									<p style="color:#999;">选择一个版本进入</p>
								</div>
					        </Submenu>
							<div class="loginBox" v-else>
								<span class="login" @click="$store.state.show_loginUpBox = true">
									账号注册
								</span>
								&nbsp;/&nbsp;
								<span class="login" @click="$store.state.show_loginInBox = true">
									登录
								</span>
							</div>
				        </Col>
				    </Menu>
				</Row>
			</Col>
		</Row>
	    <login-up/>
		<login-in/>
	</div>
</template>
<script>
	import loginIn from "@/components/common/Dialog/loginIn.vue";
	import loginUp from "@/components/common/Dialog/loginUp.vue";
	export default({
		name : "HomeHeader",

		data(){
			return{
			}
		},
		watch:{

		},
		components:{
			loginIn : loginIn,
			loginUp : loginUp
		},
		mounted(){

		},
		methods:{
			locaHref(name){
				if (name == '/') return;
				this.$router.push({"path" : name});
			},
			loginOut(){
				let _this = this;
				_this.qs = require('querystring');
	            _this.$ajax.post(
	                _this.API_ROOT + '/CheckLogin.php',
	                _this.qs.stringify({"username": _this.$store.state.LoginedUser.username, "checkLogin" : "0" })
	            ).then((response) => {
	                if(response.data.status == "success"){
						_this.$store.dispatch('logout');
	                }
	            })
			}
		}
	})
</script>