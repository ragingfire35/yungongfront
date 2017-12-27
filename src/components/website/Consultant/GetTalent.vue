<style lang="less">
	.appointment{
		width: 75%;
		margin: 0 auto;
		text-align: left;
		padding-top: 30px;
		.talentBox{
			background:#fff;
			overflow: hidden;
			box-shadow: 0 0 10px #19be6b;
		}
		.tt{
			font-size: 16px;
			font-weight: normal;
			color: #19be6b;
		}
		.headImg{
			border-radius: 50%;
			border: 1px solid #ccc;
			float: left;
		}
		.talent-content{
			color: #999;
			overflow: hidden;
			p{
				width: 30%;
				display: inline-block;
				margin-left: 3%;
				margin-top: 1.4%;
				&.position{
					.level{
						font-size: 14px;
						color: #2d8cf0;
					}
				}
			}
		}
		.workInfo{
			p{
				margin-top: 20px;
				position: relative;
				em{
					font-style: normal;
				}
				span{
					display: block;
					color: #999;
					position: absolute;
					left: 110px;
					top: 0;
				}
			}
		}
	}
</style>
<template>
	<div class="appointment">
		<Card shadow class="talentBox">
			<p slot="title" class="tt">被预约者信息</p>
			<div class="talent-content">
				<img src="../../personal/Job/image/user.png" height="80" width="80" class="headImg">
				<p class="name">云工网之最</p>
				<p class="workTime">6年工作经验</p>
				<br/>
				<p class="position">
					前端工程师&ensp;
					<span class="level">高级顾问</span>
				</p>
				<p class="price"><span>1100</span>/8小时</p>
			</div>
			<div class="workInfo">
				<p class="place"><em>可兼职时间：</em><span>周六全天 周六半天 周日全天 周日半天 工作日下班后</span></p>
				<p class="time"><em>可兼职地点：</em><span>北京海淀</span></p>
			</div>
		</Card>
		<Card>
			
		</Card>
	</div>
</template>
<script>
	export default({
		data(){
			return{

			}
		},
		mounted(){

		},
		methods:{

		}
	})
</script>