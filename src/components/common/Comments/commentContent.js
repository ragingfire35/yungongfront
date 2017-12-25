<template>
	<div id="comment">
	 <comment-content v-bind:comment="comment" v-on:change="changCommmer"></comment-content>
	 <comment-textarea v-bind:type="type" v-bind:name="oldComment" v-on:submit="addComment" v-on:canel="canelCommit"></comment-textarea>
	</div>
</template>
<script>
	import Vue from 'vue';

	Vue.component('comment-content',{
		template:'\
		<div class="commentBox">\
			<h3>评论</h3>\
			<p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>\
			<div v-else>\
				<div class="comment" v-for="(item,index) in comment" v-bind:index="index" >\
					<b>{{item.name}}<span>{{item.time}}</span></b>\
					<p @click="changeCommenter(item.name,index)">{{item.content}}</p>\
					<div v-if="item.reply.length > 0">\
						<div class="reply" v-for="reply in item.reply">\
							<b>{{reply.responder}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{reply.reviewers}}<span>{{reply.time}}</span></b>\
							<p @click="changeCommenter(reply.responder,index)"">{{reply.content}}</p>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>',
		props: ['comment'],
		methods: {
			changeCommenter: function(name,index) {
				this.$emit("change",name,index);
			}
		}
	});

	Vue.component('commentTextarea',{
		template:'\
		<div class="commentBox">\
			<h3>发表评论</h3>\
			<b v-if="type">你回复&nbsp;{{name}}</b>\
			<textarea name="" value="请填写评论内容" v-model="commentText"></textarea>\
			<button class="btn" @click="addComment">发表</button>\
			<button class="btn" @click="canelComment">取消</button>\
		</div>',
		props: ['type','name'],
		data: function(){
			return {commentText:""}
		},
		methods: {
			addComment: function() {
				this.$emit("submit",this.commentText);
				this.commentText = "";
			},
			canelComment: function() {
				this.$emit("canel");
				this.commentText = "";
			}
		}
	});

	export default({
		
	})
		el: "#comment",
		data: {
			commenter: "session",   //评论人
			type: 0,                //0为评论作者1为评论别人的评论2为评论别人的别人
			oldComment: null,
			chosedIndex: -1,        //被选中的评论的index
			comment: [
				{
					name: "有毒的黄同学",
					time: "2016-08-17",
					content: "好,讲得非常好，good",
					reply: [
						{
							responder: "有毒的黄同学",
							reviewers: "傲娇的",
							time: "2016-09-05",
							content: "你说得对"
						},
						{
							responder: "傲娇的",
							reviewers: "有毒的黄同学",
							time: "2016-09-05",
							content: "很强"
						}
					]
				},
				{
					name: "Freedom小黄",
					time: "2016-08-17",
					content: "好,讲得非常好，good",
					reply: []
				}
			]
		},
		methods: {
			addComment: function(data) {
				if(this.type == 0) {
					this.comment.push({
						name: 'session',
						time: getTime(),
						content: data,
						reply: []
					});
					//服务器端变
				}else if(this.type == 1){
					this.comment[this.chosedIndex].reply.push({
						responder: 'session',
						reviewers:this.comment[this.chosedIndex].name,
						time: getTime(),
						content: data
					});
					this.type = 0;
				}
			},
			changCommmer: function(name,index) {
				this.oldComment = name;
				this.chosedIndex = index;
				this.type = 1;
			},
			canelCommit: function() {
				this.type = 0;
			}
		}
	})


	//格式化时间
	function getTime() {
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var day = now.getDate();
		month.length < 2 ?  "0" + month : month;
		day.length < 2 ?  "0" + day : day;
		return year+"-"+month+"-"+day;
	}
</script>

