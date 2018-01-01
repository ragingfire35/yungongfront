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
			span{
				color: red;
				font-size: 12px;
				display: inline-block;
				margin-left: 20px;
			}
		}
		.headImg{
			border-radius: 100%;
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
		.process{
			margin-top: 30px;
			height: 1000px;
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
		<Card class="process">
		   <p slot="title" class="tt">预约流程<span>**可以先与兼职者电聊沟通，联系方式查看请前往&nbsp;=></span></p>
		   <Tabs>
		        <Tab-pane label="项目制">
		            <Form label-position="top"><!-- ref="formInline1" :model="formInline1" :rules="ruleInline1" -->
		                <Form-item label="交付时间" >
 							<Date-picker
	 							:value="formInline1.time"
	 							format="yyyy/MM/dd"
	 							type="date"
	 							placement="bottom-start"
	 							placeholder="选择日期"
 							>
 							</Date-picker>
		                </Form-item>
						<Form-item label="工作地点">
							<Input v-model="formInline1.place" type="text" placeholder="请输入工作地点" style="width:100%;"></Input>
						</Form-item>
						<Form-item label="交付要求">
							<Input v-model="formInline1.requirements" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入交付要求" style="width:100%;"></Input>
						</Form-item>
						<Form-item label="项目金额">
							 <Input-number v-model="formInline1.price" size="large" style="width:98%;"></Input-number>
							 <span>&nbsp;元</span>
						</Form-item>
						<Button type="primary" size="large" long>提交预约</Button>
		            </Form>
		        </Tab-pane>
		        <Tab-pane label="日薪制">
		            <Form label-position="top"><!-- ref="formInline1" :model="formInline1" :rules="ruleInline1" -->

						<Form-item label="开始工作日期">
 							<Date-picker
	 							:value="formInline2.startTime"
	 							format="yyyy/MM/dd"
	 							type="date"
	 							placement="bottom-start"
	 							placeholder="选择日期"
 							>
 							</Date-picker>
						</Form-item>
						<Form-item label="工作地点">
							<Input v-model="formInline2.place" type="text" placeholder="请输入工作地点" style="width:100%;"></Input>
						</Form-item>
						<Form-item label="预约工时">
							 <Input-number v-model="formInline2.time" size="large" style="width:98%;"></Input-number>
							 <span>&nbsp;天</span>
						</Form-item>
						<Form-item label="费用">
							￥金额<span>&nbsp;{{formInline2.price}}&nbsp;</span>元
						</Form-item>
						<Button type="primary" size="large" long>提交预约</Button>
		            </Form>
		        </Tab-pane>

		    </Tabs>
		</Card>
	</div>
</template>
<script>
	export default({
		data(){
			return{
				formInline1 : {
					time: "2016-01-0",
					place : "",
					requirements : "",
					price : 0
				},
				formInline2 : {
					startTime: "2016-01-0",
					place: "",
					time : 0,
					price : 0
				}
			}
		},
		mounted(){

		},
		methods:{

		}
	})
</script>