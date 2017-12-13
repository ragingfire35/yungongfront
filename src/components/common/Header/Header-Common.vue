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
				<router-link to="/">
					<div class="logoInner">
						<img width="70%" alt="云工网" title="云工网" src="./image/logo.png">
						<span>云工网</span>
					</div>

				</router-link>
			</Col>
			<Col :xs="24" :sm="20" :md="18" :lg="18">
				<Row type="flex" justify="center" align="middle" class="nav-menu">

				    <Menu mode="horizontal" theme="primary" :active-name="active" @on-select="locaHref">
				    	<Col :xs="24" :sm="4" :md="4" :lg="3">
					        <Menu-item name="/Consultant">
					            技术顾问
					        </Menu-item>
				        </Col>
				        <Col :xs="24" :sm="4" :md="3" :lg="3">
					        <Menu-item name="/Job">
					            兼职需求
					        </Menu-item>
				        </Col>
				        <Col :xs="24" :sm="4" :md="3" :lg="3">
					        <Menu-item name="3">
					            标准服务
					        </Menu-item>
				        </Col>
				        <Col :xs="24" :sm="4" :md="3" :lg="3">
					        <Menu-item name="4">
					            小团队
					        </Menu-item>
				        </Col>
				        <Col :xs="24" :sm="4" :md="3" :lg="3">
					        <Menu-item name="5">
					            成功案例
					        </Menu-item>
						</Col>
						<Col
							:xs="{span: 24, push: 0, class:'personal'}"
							:sm="{span: 4, pull: 0}"
							:md="{span: 4, push: 4}"
							:lg="{span: 4, push: 4}"
							class="menu-personal"
						>
					        <Submenu name="6" :open-names="this.$route.path">
					            <template slot="title">
					            	<img src="../../Job/image/user.png" alt="">
					            	<span>云工网之最</span>
					            </template>
					            <Menu-group title="使用" >
					                <Menu-item name="6-1">成为技术顾问</Menu-item>
					                <Menu-item name="6-2">发布兼职需求</Menu-item>
					                <Menu-item name="6-3">聘用方认证</Menu-item>
					            </Menu-group>
					            <Menu-group title="个人">
					            	<Menu-item name="/Pay">
					            		账户充值
					            	</Menu-item>
					            	<Menu-item name="/PersonalInfo">
					            		修改个人资料
					            	</Menu-item>
					                <Menu-item name="6-6">退出</Menu-item>
					            </Menu-group>
					        </Submenu>
				        </Col>
				    </Menu>
				</Row>
			</Col>
		</Row>
	</div>
</template>
<script>
	export default({
		name : "HomeHeader",

		data(){
			return{
				active :  ""
			}
		},
		mounted(){
			this.active = this.$route.path;
		},
		methods:{
			locaHref(name){
				this.$router.push({"path" : name});
			}
		}
	})
</script>