<style lang="less" scoped>
	.Rewards{
		margin-top: 30px;
		.inner{
			h2.tt{
				width: 100%;
				height: 36px;
				line-height: 36px;
				font-size: 16px;
				color: #fff;
				background: #ff3300;
				opacity: .8;
				position: absolute;
				top: 0;
				left: 0;
			}
			.content{
				margin-top: 20px;
				li{
					border-bottom: 1px solid #efefef;
					padding: 30px 0;
					&:last-of-type{
						border-bottom: 0;
					}
				}
				h6{
					width: 100%;
					height: 30px;
					line-height: 30px;
					color: #000;
					font-weight: normal;
					font-size: 15px;
				}
				.desc{
					text-align: left;
					padding: 0 10px;
					color: #aaa;
				}
				.Forward_btn{
					margin-top: 30px;
					color: #ccc;
				}
			}
		}
	}
</style>
<template>
	<div class="Rewards">
		<Card class="inner" v-if="$store.state.userClassify.userClass == 'personal'">
			<h2 class="tt">悬赏任务</h2>

			<ul class="content">
				<li>
					<h6>专家面试</h6>
					<div class="desc">
						我需要一个 xxx 工程师，希望你来帮忙面试。
					</div>
					<Button class="Forward_btn" type="dashed" long>
						立即前往&nbsp;
			            <Icon type="chevron-right"></Icon>
			        </Button>
				</li>

				<li>
					<h6>Bug悬赏</h6>
					<div class="desc">
						我这儿有一些bug，希望你来帮忙解决。
					</div>
					<Button class="Forward_btn" type="dashed" long>
						立即前往&nbsp;
			            <Icon type="chevron-right"></Icon>
			        </Button>
				</li>
			</ul>
		</Card>
		<Card class="inner" v-else-if="$store.state.userClassify.userClass == 'website'">
			<h2 class="tt">增值服务</h2>

			<ul class="content">
				<li>
					<h6>专家面试</h6>
					<div class="desc">
						你需要一个 xxx 工程，希望有人来帮你面试？
					</div>
					<Button class="Forward_btn" type="dashed" long>
						立即前往&nbsp;
			            <Icon type="chevron-right"></Icon>
			        </Button>
				</li>

				<li>
					<h6>Bug解决</h6>
					<div class="desc">
						你这儿有一些bug，希望有人来帮忙解决？
					</div>
					<Button class="Forward_btn" type="dashed" long>
						立即前往&nbsp;
			            <Icon type="chevron-right"></Icon>
			        </Button>
				</li>
			</ul>
		</Card>
	</div>
</template>，
<script>
	export default({
		data(){
			return{

			}
		},
		methods:{

		}
	})
</script>