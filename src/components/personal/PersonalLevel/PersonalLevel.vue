<style lang="less" >
	.level{
		background: #fff;
	}
	.sliderBar{
		width: 80%;
		margin: 100px auto 36px auto;
	}
	.tooltip{
		width: 80%;
		margin-left: 18%;

		li{
			float: left;
			width: 20%;
			text-align: center;
			border-right: 0;
			height: 40px;
			line-height: 40px;
			color: #999;
			position: relative;
			&:after{
				content: "";
				display: block;
				width: 0;
				height: 0;
				border : 15px solid #eee;
				border-left-color: #fff;
				border-right-color: #fff;
				border-top: 0;
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				top: -15px;
			}
			span{
				display: inline-block;
				border:1px solid #eee;
				background: #eee;
				border-radius: 5px;
				padding: 0 6%;

			}
		}
	}
	.levelContent{
		text-align: left;
		padding-left: 120px;
		margin: 0 0 120px 0;
		p{
			color: #666;
			margin-top: 30px;
			&.ts{
				color: #ff6161;
			}
		}
	}
	.level-tt{
		width: 80%;
	    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#008000), to(#333333));
	    -webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;
	}
	.nowLevel{
		text-align: left;
		padding-left: 120px;
		margin: 120px 0 30px 0;
		p{
			font-size: 20px;
			margin-top: 20px;
			span{
				display: inline-block;
				padding: 0 15px;
				font-weight: bold;
				color: #ff6161;
			}
		}
	}
</style>
<style lang="less">
	.ivu-slider-disabled {
		.ivu-slider-bar
		{
			background-color: #19be6b;
		}
		.ivu-slider-button{
			background-color: #fff;
			border-color: #19be6b;
		}
		.ivu-slider-stop{
			background-color: #fff;
		}
	}

</style>
<template>
	<Card class="level bt0"  dis-hover>
	  <div class="levelBox">
		  <Slider
		  	  class="sliderBar"
			  v-model="value1"
			  :step="20"
			  :tip-format="format"
			  show-stops
			  show-tip="always"
			  disabled
		  ></Slider>
		  <ul class="tooltip">
		  	<li><span>初级工程师</span></li>
		  	<li><span>中级工程师</span></li>
		  	<li><span>高级工程师</span></li>
		  	<li><span>专家</span></li>
		  	<li><span>高级顾问</span></li>
		  </ul>
	  </div>

	  <div class="nowLevel">
	  	<h2 class="level-tt">当前进度</h2>
	  	<p>已完成<span>10</span>个项目,好评平均分达到<span>4</span>分, 有<span>3</span>个项目好评分达到 4.5分</p>
	  </div>

	  <div class="levelContent">
	  	<h2 class="level-tt">等级攻略</h2>
	  	<p class="ts">*该等级职称只适用于云工网</p>
		<p>初级工程师  完成三个项目</p>

		<p>2. 中级工程师  完成5个项目 && 好评平均分 达到 4 分</p>

		<p>3. 高级工程师  完成10个项目 && 好评平均分 达到 4 分 && 有个3个项目好评分 达到 4.5分</p>

		<p>4. 专家 	   完成20个项目 && 好评平均分 达到 4 分 && 有个10个项目好评分 达到 4.5分</p>

		<p>5. 高级顾问    完成50个项目 && 好评平均分 达到 4 分 && 有个30个项目好评分 达到 4.5分</p>
	  </div>

	</Card>
</template>
<script>
	export default({
		data(){
			return{
				value1 : 20
			}
		},
		mounted(){

		},
		methods:{
			format(val){
				switch(val){
					case 20 : return "初级工程师" ;
					case 40 : return "中级工程师";
					case 60 : return "高级工程师";
					case 80 : return "专高级顾问家";
					case 100 : return "";
				}
			}
		}
	})
</script>