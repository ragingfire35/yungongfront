<style lang="less" scoped>
	.home-footer{
		width: 100%;
		min-height: 154px;
		background: #fff;
		margin-top: 100px;
		text-align: left;
		.footer-main{
			width: 80%;
			height: auto;
			margin: 0 auto;
			overflow: hidden;
		}
		.footer-t{
			border-bottom: 1px solid #999;
			padding-bottom: 40px;
		}
		.lt-contactInfo{
			float: left;
			li{
				float: left;
				margin-right: 60px;
				&:last-of-type{
					span{
						display: inline-block;
						line-height: 14px;
						position: relative;
						padding: 0 8px;
						&:before{
							content: "";
							display: inline-block;
							width: 1px;
							height: 14px;
							background : #666;
							position: absolute;
							top: 0;
							bottom: 0;
							margin: auto 0;
							left: 0;
						}
					}

				}
			}
		}
		.rt-about{
			float: right;
		}
		.footer-b{
			padding-top: 20px;
			img.logo_f{
				width: 80px;
				height: auto;
				float: left;
			}
			p,em,span{
				float: left;
				height: 50px;
				line-height: 50px;
			}
			p{
				margin-left: 50px;
				&:nth-of-type(1){
					margin-left: 0;
				}
			}
		}
	}
</style>
<template>
	<Card class="home-footer">
		<div class="footer-main">
			<div class="footer-t">
				<ul class="lt-contactInfo">
					<li>
						<Icon type="ios-telephone"></Icon>
						<span>182-1009-3282</span>
					</li>
					<li>
						<Icon type="android-mail"></Icon>
						<span>2565557657@qq.com</span>
					</li>
					<li>
						<span>北京</span>
						<span>上海</span>
						<span>武汉</span>
					</li>
				</ul>
				<div class="rt-about">
					<router-link to="/">
						关于我们&nbsp;
					</router-link>
				</div>
			</div>
			<div class="footer-b">
				<p>
					<em><img class="logo_f" src="../Header/image/logo.png" height="348" width="600" alt=""></em>
					<span>云工网</span>
				</p>
				<p>©Copyright 2016 烈火天使科技 京ICP备 16003656 号 </p>
				<p>
					<em><img src="./image/beian.png" height="20" width="20" alt="" style="margin-top:15px;"></em>
					<span>京公网安备 42018502000531 号</span>
				</p>
			</div>
		</div>
	</Card>
</template>
<script>
	export default({
		data(){
			return{

			}
		}
	})
</script>