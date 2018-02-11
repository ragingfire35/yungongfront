<style lang="less" scoped>
	.BugReward{
		width: 75%;
		margin: 0 auto;
		h1.tt{
		    margin: 30px auto;
		    font-size: 24px;
		    color: #2d8cf0;
		}
	}
	.bugClassify{
		margin-top: 20px;
	}
	.BugContent{
		.split_line{
			margin: 30px 0;
			border: 0;
			border-bottom: 1px solid #ddd;
		}
	}
	.infoInner{
		height: 200px;
		margin-bottom: 30px;
		position: relative;
		cursor: pointer;
		.content{
			background: #fff;
			text-align: left;
			padding: 0 20px;
			.bug_name{
				font-size: 14px;
				font-weight: bold;
				overflow: hidden;
				word-break: break-all;
				text-overflow: ellipsis;
			}
			.bug_desc{
				margin-top: 10px;
				color: #ccc;
				word-break:break-all;
				display:-webkit-box;
				-webkit-line-clamp:4;
				-webkit-box-orient:vertical;
				overflow:hidden;
			}
			.user_info{
				width: 100%;
				position: absolute;
				padding: 0 36px;
				left: 0;
				bottom: 15px;
				img{
					width: 30px;
					height: 30px;
					border-radius: 50%;
					border: 1px solid #ccc;
					float: left;
				}
				span{
					float: right;
					line-height: 24px;
					color: #2d8cf0;
				}
			}
		}
	}
</style>
<template>
	<div class="BugReward">
		<h1 class="tt">Bug悬赏</h1>
		<Card class="BugContent">
			<div class="bugClassify">
				分类：<Button
						  v-for="(item, index) in bugClassify"
						  :type="Bug == item ? 'success' : 'text'"
						  :key="index"
						  v-html="item"
						  @click="Bug = item"
					  ></Button>
			</div>

			<hr class="split_line"/>

			<Row  type="flex" :gutter="16">
				<Col
					:xs="24"
					:sm="24"
					:md="16"
					:lg="6"
					v-for="(item, index) in bugContent"
					:key= "index"
				>
					<Tooltip placement="bottom">
						<Card class="infoInner">
							<div class="content">
								<p class="bug_name">{{item.name}}</p>
								<p class="bug_desc">
									{{item.desc}}
								</p>
								<p class="user_info">
									<img :src="item.userhead" alt="" :title="item.username">
									<span class="price">¥{{item.price}}</span>
								</p>
							</div>
						</Card>
						<div slot="content" style="white-space : normal;">
							<p>
								{{item.desc}}
							</p>
							<p style="margin: 10px 0;">
								<Button type="success" long>
									立即投递
								</Button>
							</p>
						</div>
					</Tooltip>
				</Col>
			</Row>
		</Card>


		<!--
			{{item.name}}<br/>
			{{item.desc}}<br/>
			{{item.price}}<br/>
			{{item.url}}<br/>
			{{item.timeAgo | timeAgo}}
		-->

	</div>
</template>
<script>
	export default({
		data(){
			return{
				bugContent: [],
				Bug : "PHP",
				bugClassify : ["PHP", "JAVA", "HTML", "CSS", "JAVASCRIPT"]
			}
		},
		mounted(){
			this.getBug();
		},
		methods:{
			getBug(){
            	var _this = this;
	            _this.$ajax({
	                url: _this.API_ROOT + '/activity/activity_bug.php',
	                method: 'POST',
	                data : {"status" : "get"}
	            }).then((response) => {
	                if(response.data.status == 'success'){
	                	_this.bugContent = response.data.info;
	                } else {
	                }
	            });
			}

		}
	})
</script>