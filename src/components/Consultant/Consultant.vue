<style lang="less" scope>
@selctedColor : #3399FF;

.left-section{
	margin-top: 30px;
}
.conditions{
	.artic{
		height: 32px;
		line-height: 32px;
		margin-bottom: 10px;
		&.region{
			[slot=title]{
				margin-right: 8px;
			}
		}
	}
	[slot=title]{
		float: left;
		width: 10%;
		height: 100%;
		font-size: 16px;
		text-align: right;
	}
	.listBtn {
		overflow: hidden;
		margin-left: 40px;
		float: left;
		button{
			display: inline-block;
			vertical-align: 2px;
			&.ivu-btn-primary{
				background: @selctedColor;
				border-color: @selctedColor;
			}
		}
	}
}
.card{
	margin-bottom: 30px;
	height: auto;
}
.lt-det{
	float: left;
	text-align: left;
	a{
		color: #777;
	}
}
.detail-inner{
	width: 100%;
}
div.job-main{
	width: 100%;

	div.title{
		height: 24px;
		line-height: 24px;
		&>h5{
			margin-top: 10px;
			font-size: 14px;
			color: #666;
			position: relative;
			padding-left: 10px;
			&:before{
				content: "";
				display: block;
				height: 1em;
				width: 4px;
				background: #19be6b;
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto 0;
				left: 0;
			}
		}
		.badge{
			float: left;
			margin: 0 0 0 18px;
			color: #ccc;
			cursor: default;
		}
	}
	p.text{
		text-align: justify;
		margin: 20px 0;
	}
}
.user-info{
	width: 100%;
	height: 50px;
	line-height: 50px;
	&>a{
		&>img{
			width: 50px;
			height: 50px;
			border-radius: 50px;
			float: left;
		}
		&>span{
			float: left;
			margin-left: 6%;
			color: #19be6b;
		}
		&>i{
			float: left;
		}
	}
}
hr.split-line{
	float: left;
	width: 1px;
	height: 100%;
	border: 0;
	border-left: 1px solid #eee;
}

.rt-det{

}
.about-num{
	padding-left: 10%;
	text-align: left;
	&>p{
		font-size: 18px;
		color: #19be6b;
		margin-top: 5px;
		word-break: break-all;
	}
	&>ol{
		margin:  16% 0;
		li{
			margin-bottom: 10px;
			span:nth-of-type(1){
				width: 50%;
				float: left;
			}
		}
	}
	&>button{
		width: 100%;
		display: block;
		font-size: 14px;
	}
}
.listBtn {
	&>div{
		margin-right: 10px;
	}
}
.dropDown-menu{
	margin-right: 10px;
}
@media (max-width : 1200px) {
	.about-num{
		&>ol{
			margin:  40% 0;
		}
	}
}
@media (max-width : 992px) {
	.job{
		margin-left: 0;
		margin-right: 0;
	}
	hr.split-line{
		float: none;
		width: 100%;
		height: 1px;
		border: 0;
		border-top: 1px solid #eee;
		margin: 3% 0;
	}
	.about-num{
		padding-left: 0;
		&>ol{
			margin:  2% 0;
		}
	}
}
</style>
<template>
	<Row type="flex" class="job" justify="center" :gutter="16">
		<Col
			class="left-section"
			:xs="24"
			:sm="13"
			:md="13"
			:lg="13"
		>
  			<Card class="card conditions">
  				<div class="artic city">
  					<p slot="title"><b>工作地点</b></p>
  					<p class="listBtn">
  						<Button
  							v-for="(item, index) in Place"
  							:type="index == PlaceIndex ? 'primary' : 'text'"
  							:key="index"
  							@click="PlaceIndex = index, secPlaceIndex = -1"
  						>{{item.provinces}}</Button>
  					</p>
  				</div>

  				<div
	  				class="artic region"
	  				v-for="(item, index) in Place"
	  				:key="index"
	  				v-if="PlaceIndex == index && item.area.length != 0"
  				>
  					<p slot="title"><b><small></small></b></p><!-- 区域 -->
  					<p class="listBtn">
  						<Button
  							size="small"
  							v-for="(ITEM, INDEX) in item.area"
							:key="INDEX"
  							:type="INDEX == secPlaceIndex ? 'primary' : 'text'"
  							@click="secPlaceIndex = INDEX"
  						>{{ITEM}}</Button>
  					</p>
  				</div>

				<div class="artic jobClass">
  					<p slot="title"><b>顾问角色</b></p>
  					<p class="listBtn">
						<Button
							v-for="(item, index) in jobClass"
							:key="index"
							:type="index == jobIndex ? 'primary' : 'text'"
							@click="jobIndex = index"
						>
							{{item}}
						</Button>
					</p>
				</div>

				<div class="artic sortRule">
  					<p slot="title"><b>排序方式</b></p>
  					<div class="listBtn">
						<div
							style="float:left;"
							v-for="(item, index) in sortRule"
							:key="index"
						>
							<strong>{{item.sortName}}</strong>

						  	<Dropdown class="dropDown-menu">
						        <Button type="primary" >
						            <Icon type="arrow-down-b"></Icon>
						            <span>{{item.optionName[ item.checkedIndex ] }}</span>
						        </Button>
						        <Dropdown-menu slot="list" >
						            <Dropdown-item
						            	v-for="(ITEM, INDEX) in item.optionName"
						            	:key="INDEX"
										:name="ITEM"
										@click.native="item.checkedIndex = INDEX"
						            >
						            	{{ITEM}}
						        	</Dropdown-item>
						        </Dropdown-menu>
						    </Dropdown>
						</div>

					</div>
				</div>

				<div class="artic websiteGroup">
  					<p slot="title"><b>知名企业</b></p>
  					<p class="listBtn">
						<Button
							v-for="(item, index) in websiteGroup"
							:key="index"
							:type="index == websiteIndex ? 'primary' : 'text'"
							@click="websiteIndex = index"
						>
							{{item}}
						</Button>
					</p>
				</div>

            </Card>
            <Card class="card jobDetail">
				<Row type="flex" justify="center" class="detail-inner">
					<Col
						class="lt-det"
						:xs="24"
						:sm="24"
						:md="16"
						:lg="16"
					>
						<div class="user-info">
							<router-link to="">
								<img src="../Job/image/user.png" alt="">
								<span>大好时光</span>
								<span><Icon type="settings"></Icon>&nbsp;web前端工程师</span>
								<span>6年</span>
							</router-link>
						</div>

						<div class="job-main">
							<router-link to="">
								<div class="title">
									<h5>擅长技能</h5>
								</div>
								<p class="text">
									毕业于河北石家庄某大学,目前正在中国石油大学读在职研究生,在校期间专业成绩优秀,目前就职于拉卡拉技术经理一职,从事java开发5年之久,参与公司的产品设计,系统架构,核心开发,主要应用技术有h5,c3,java,mysql,oracle,socket,mina,netty,io,线程,高并发,分布式.redis,js等.
								</p>
							</router-link>
						</div>

					</Col>

					<Col
						class="rt-det"
						:xs="24"
						:sm="24"
						:md="8"
						:lg="8"
					>
						<hr class="split-line"/>
						<div class="about-num">
							<p><span>￥700</span>&nbsp;/&nbsp;8小时</p>
							<ol>
								<li>
									<span>被预约次数</span>
									<span>2</span>
								</li>
								<li>
									<span>可兼职时间</span>
									<span> 周六、周日、工作日</span>
								</li>
								<li>
									<span>可兼职地点</span>
									<span>海淀</span>
								</li>
							</ol>
							<Button type="success">立即预约</Button>
						</div>
					</Col>
				</Row>
            </Card>
		</Col>

		<switch-process/>
	</Row>
</template>
<script>
  import switchProcess from "@/components/common/SwitchClass/switchProcess.vue";
  export default {
  	data(){
  		return {
  			PlaceIndex : 0,
			secPlaceIndex : -1,
			jobIndex : 0,
			ruleIndex : 0,
			websiteIndex : 0,
  			Place : [
  				{
  					provinces : "全国",
  					area : []
  				},

  				{
  					provinces : "北京",
  					area : ["海淀","昌平","朝阳","东城","西城","石景山","通州","丰台","房山","大兴"]
  				},
  				{
  					provinces : "上海",
  					area : ["1212"]
  				},
  			],

  			jobClass : ["全部", "iOS工程师", "Android工程师"],

  			sortRule: [
  				{
  					sortName :  "日薪",
  					optionName : ["不限", "700及以下", "800-1200", "1300-1600", "1700以上"],
  					checkedIndex : 0
  				},
  				{
  					sortName :  "经验",
  					optionName : ["不限", "2年及以下", "3-6年", "7-10年", "10年以上"],
  					checkedIndex : 0
  				},
  				{
  					sortName :  "评价",
  					optionName : ["不限", "优先"],
  					checkedIndex : 0
  				},
  				{
  					sortName :  "自由职业者",
  					optionName : ["不限", "优先"],
  					checkedIndex : 0
  				}
  			],

  			websiteGroup: ["不限", "百度", "阿里", "腾讯", "新浪", "华为", "京东", "小米", "网易", "360"]
  		}
  	},
    mounted(){
    },
    components:{
    	switchProcess : switchProcess
    },
    methods: {
    }
  }
</script>
