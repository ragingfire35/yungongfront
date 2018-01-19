<style lang="less" scoped>
	@import "ConsultantDetail.less";
</style>
<template>
	<Row type="flex" class="ConDetail" justify="center" :gutter="16" v-if="detail != ''">
		<Col
			class="left-section"
			:xs="24"
			:sm="13"
			:md="13"
			:lg="13"
		>
			<Card class="ltCard">
				<p class="importantInfo">
					我：<span>{{ JSON.parse(detail.job_addresscan).city }}</span>&nbsp;&nbsp;/&nbsp;<span>{{ JSON.parse(detail.job_exe)[0].value2}}</span>
				</p>
				<div class="about-me">
					<img :src="detail.userhead" height="50" width="50" alt="" class="lt-img">
					<div class="rt-content">
						<ul>
							<li>
								<span>{{ detail.username }}</span>
							</li>
							<li>
								<span>{{ detail.job_priceday }}</span>&nbsp;/&nbsp;8小时
							</li>
							<li>
								{{detail.job_timelimit}}年工作经验
							</li>
							<li>
								{{ JSON.parse(detail.job_exe)[0].value2}}
							</li>
							<li>
								高级顾问
							</li>
						</ul>
						<Button
							:type="focusOn === false ? 'default' : 'error'"
							class="focusOn"
							long
							@click="follow('save')"
							:loading="loading"
						>
  							<span v-if="!loading" v-html="focusOn === false ? '关注' : '已关注'"></span>
       						<span v-else>Loading...</span>
						</Button>
					</div>
				</div>
				<div class="skills">
					<h4 class="my-tt">擅长技能</h4>
					<Tag
						class="skills-tag"
						type="dot"
						v-for="(tag, tagIndex) in JSON.parse(detail.user_skills)"
						:key="tagIndex"
					>
						{{tag}}
					</Tag>
					<!-- <div class="skills-main">
						主修前端，辅修 Web 开发相关的各种技能，认同 RoR 的开发理念；<br/>
						热爱开源，为多个开源项目提过 PR，如 Vue[1]、jQuery[2]、Async[3]；<br/>
						能胜任任何技术栈的开发，已有经验的包括常规前端技术外还有 Ruby(RoR)、PHP、Nodejs、Java 等；<br/>
						另外同样可以接受手机客户端开发或者 UI 设计工作，有与我类似资历的朋友可以随时代劳。<br/>

						[1]: https://github.com/vuejs/vue/pulls?q=is%3Apr+author%3Arhyzx+is%3Aclosed <br/>
						[2]: https://github.com/jquery/jquery/pull/1888 <br/>
						[3]: https://github.com/caolan/async/pull/216<br/>
					</div> -->
					<div class="skills-main" v-html="detail.user_skillsexe"></div>
				</div>
				<div class="exe">
					<h4 class="my-tt">项目经验</h4>
					<!-- <div class="exe-main">
						Treation https://treation.com<br/>
						主导该项目的前端工作，基于 Vue、BS4、Actioncable，主要精力花在表格的编辑功能开发与性能优化上；<br/>
						参与部分后端任务，基于 Rails。<br/><br/>

						有道云笔记 https://note.youdao.com<br/>
						参与云笔记 2.0 改版任务，推进部分技术迭代 (比如 SVG icons、组件化[1]等)，<br/>
						独立负责部分功能 (比如 PDF 预览、任务管理、日历等)，并使用 Node 完成其中一些功能的接口；<br/>
						负责一些效率工具的开发 (比如基于 mincer[2]) 的一个静态资源构建系统，<br/>
						用于快速开发静态网页)。<br/><br/>

						WolfeCareer https://angel.co/wolfe-career<br/>
						一个工作外参与的创业项目，主要负责部分技术选型和前后端开发任务。<br/>
						该项目后端主要基于 Pyramid (Python)，前端则是 Angular 和 Grunt，<br/>
						另外还使用了 Docker 进行开发环境部署[3]。<br/><br/>

						酷盘 https://kanbox.com<br/>
						类 Dropbox，基于 Rails 开发，负责前端开发和部分后端工作 (主要是 VC 层) 。<br/>
						前端技术上主要继承了 Rails 默认的体系，如 CoffeeScript、Sass、jQuery + UJS、Turbolinks、Sprockets (前端工具链)，<br/>
						另外主要还使用了 Backbone 和 Bootstrap，并使用 rails-assets 进行 Bower 的组件管理。<br/><br/>

						[1]: https://speakerdeck.com/rhyzx/xie-angular-de-zui-jia-shi-jian<br/>
						[2]: https://github.com/nodeca/mincer<br/>
						[3]: https://github.com/rhyzx/sample-pyramid-app-with-docker-and-fig
					</div> -->
					<div class="exe-main" v-html="detail.user_projectexe">
					</div>
				</div>
				<div class="comments">
					<h4 class="my-tt">
						雇主评论<span class="beizhu">*只有在订单确认完工后，雇主才能评价兼职者</span>
						<p class="commentsNum"><strong>2</strong>条评论</p>
					</h4>
					<ul class="comments-main" v-if="comments.length !== 0">
						<li v-for="(item, index) in comments">
							<img :src="item.head" height="50" width="50" alt="">
							<div class="detail">
								<p class="other"><span>{{item.name}}</span> <time>{{item.time}}</time></p>
								<p class="content">
									{{item.content}}
								</p>
							</div>
						</li>
					</ul>
					<p v-else class="not-comment">暂无评论~</p>
					<div class="comment-textarea" style="display:none;">
						<Input
							v-model="value7"
							type="textarea"
							:rows=3
							:maxlength=100
							:autosize="true"
							placeholder="请输入..."
							disabled
						></Input>
						<Button type="default" class="publicBtn">发表评论</Button>
					</div>
				</div>
			</Card>
		</Col>
		<Col
			class="left-section"
			:xs="24"
			:sm="5"
			:md="5"
			:lg="5"
		>
			<Card class="rt-card">
				<p class="other-rate">雇主评分：<span><Rate show-text allow-half disabled v-model="valueDisabled"></Rate></span></p>
				<p class="other-num">被预约：<span>1</span></p>
				<p class="other-num">被收藏：<span>2</span></p>
				<p class="other-info">可兼职时间<span class="span-ts">自由职业者，时间充裕</span></p>
				<p class="other-info">可兼职地点：<span>西湖</span></p>

				<Button type="primary" long class="yuyue" @click="$router.push({'path': '/GetTalent'})">
					立即预约
				</Button>
			</Card>
		</Col>
	</Row>
</template>
<script>
	export default({
		data(){
			return{
				detail: '',
				loading: false,
				focusOn : false,
				valueDisabled : 4.2,
				value7 : "",
				comments:[
						{
							head : "",
							name : "王鹏",
							time : "2015-12-22 11:58",
							content : "经验丰富，工作效率高，非常超值"
						}
				]
			}
		},
		mounted(){
			this.getInfo();
		},
		methods:{
			getInfo(){
		    	var _this = this;
		        _this.$ajax({
		            url: _this.API_ROOT + '/personal/jobSeekers.php',
		            method: 'POST',
		            data : {status : 'one', userid: _this.$route.query.userid}
		        }).then((response) => {
		            if(response.data.status == 'success'){
		               _this.detail = response.data.info;
		               _this.follow("get");
		            };
		        });
			},
			follow(status){
		    	var _this = this;
		    	_this.loading = true;
		        _this.$ajax({
		            url: _this.API_ROOT + '/website/follow.php',
		            method: 'POST',
		            data : {
		            		"status" : status,
		            		"follow" : !_this.focusOn,
		            		"follow_userid" : _this.detail.userid
		            }
		        }).then((response) => {
		            if(response.data.status == 'success'){
		              	_this.focusOn = !_this.focusOn;
		              	_this.loading = false;
		              	if(status == 'save'){
			              	var msg = _this.focusOn == true ? '我们将为您推送该用户的最新动态' : '已取消关注';
				            _this.$Notice.success({
				                 title: msg,
				                 duration : 3,
				                 key: 'follow'
				            });
		              	}

		            } else {
		            	_this.$Message.error(response.data.msg);
		            }
		        });
			}
		}
	})
</script>