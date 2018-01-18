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
			.ivu-tabs{
				padding-left: 1px;
			}
		}
	}
</style>
<template>
	<div class="appointment">
		<Card shadow class="talentBox" v-if="detail != ''">
			<p slot="title" class="tt">被预约者信息</p>
			<div class="talent-content">
				<img :src="detail.userhead" height="80" width="80" class="headImg">
				<p class="name">{{ detail.username }}</p>
				<p class="workTime">{{ detail.job_timelimit }}年工作经验</p>
				<br/>
				<p class="position">
					{{ JSON.parse(detail.job_exe)[0].value2 }}&ensp;
					<span class="level">高级顾问</span>
				</p>
				<p class="price"><span>{{ detail.job_priceday }}</span>/8小时</p>
			</div>
			<div class="workInfo">
				<p class="place">
					<em>可兼职时间：</em>
					<span
						v-for="(time, timeIndex) in JSON.parse(detail.job_timecan)"
						:key="timeIndex"
					>
					 {{time+'&nbsp;'}}
					</span>
				</p>
				<p class="time"><em>可兼职地点：</em><span>{{ JSON.parse(detail.job_addresscan).city + '&nbsp;' + JSON.parse(detail.job_addresscan).area }}</span></p>
			</div>
		</Card>
		<Card class="process">
		   <p slot="title" class="tt">预约流程<span>**可以先与兼职者电聊沟通，联系方式查看请前往&nbsp;=></span></p>
		   <Tabs>
		        <Tab-pane label="项目制">
		            <Form label-position="top" ref="formValidate1" :model="formValidate1" :rules="ruleValidate1">
		                <Form-item label="交付时间" prop="time">
 							<Date-picker
	 							:value="formValidate1.time"
	 							format="yyyy/MM/dd"
	 							type="date"
	 							placement="bottom-start"
	 							placeholder="选择日期"
 							>
 							</Date-picker>
		                </Form-item>
						<Form-item label="工作地点">
							<Input v-model="formValidate1.place" type="text" placeholder="请输入工作地点" style="width:100%;"></Input>
						</Form-item>
						<Form-item label="项目金额">
							 <Input-number v-model="formValidate1.price" size="large" style="width:98%;"></Input-number>
							 <span>&nbsp;元</span>
						</Form-item>
						<Form-item label="交付要求">
							<Input v-model="formValidate1.requirements" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入交付要求" style="width:100%;"></Input>
						</Form-item>
						<Button type="primary" size="large" long>提交预约</Button>
		            </Form>
		        </Tab-pane>
		        <Tab-pane label="日薪制">
		            <Form label-position="top" ref="formValidate2" :model="formValidate2" :rules="ruleValidate2">

						<Form-item label="开始工作日期">
 							<Date-picker
	 							:value="formValidate2.startTime"
	 							format="yyyy/MM/dd"
	 							type="date"
	 							placement="bottom-start"
	 							placeholder="选择日期"
 							>
 							</Date-picker>
						</Form-item>
						<Form-item label="工作地点">
							<Input v-model="formValidate2.place" type="text" placeholder="请输入工作地点" style="width:100%;"></Input>
						</Form-item>
						<Form-item label="预约天数，8小时为一天">
							 <Input-number v-model="formValidate2.time" size="large" style="width:98%;"></Input-number>
							 <span>&nbsp;天</span>
						</Form-item>
						<Form-item label="交付要求">
							<Input v-model="formValidate2.requirements" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入交付要求" style="width:100%;"></Input>
						</Form-item>
						<Form-item label="费用">
							￥金额<span>&nbsp;{{formValidate2.price}}&nbsp;</span>元
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
				detail: "",
				formValidate1 : {
					time: "2016-01-0",
					place : "",
					requirements : "",
					price : 0
				},
				formValidate2 : {
					startTime: "2016-01-0",
					place: "",
					time : 0,
					price : 0
				},
				ruleValidate1:{
       				time: [
                        { required: true, message: '请选择交付时间', trigger: 'change' }
                    ],
				},
				ruleValidate2:{

				}
			}
		},
		mounted(){
	    	var _this = this;
	        _this.$ajax({
	            url: _this.API_ROOT + '/personal/jobSeekers.php',
	            method: 'POST',
	            data : {status : 'one', userid: _this.$route.query.userid}
	        }).then((response) => {
	            if(response.data.status == 'success'){
	               _this.detail = response.data.info;
	            };
	        });
		},
		methods:{

		}
	})
</script>