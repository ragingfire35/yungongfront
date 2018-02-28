<style lang="less"></style>
<template>
	<div></div>
</template>
<script>
	export default({
		data(){
			return{
			}
		},
		components:{

		},
		mounted(){
			this.notice();
		},
		methods:{
           info (nodesc) {
                this.$Notice.info({
                    title: '担保交易',
                    duration: 0,
                    desc: "",
 					render: h => {
                        return h('div', [

                            h('p', nodesc
                            ),
                            h('a',
                            	{
	                                style :{
	                                	color : "#2d8cf0",
	                                	display : "block",
                                   		marginTop : '3px'
	                                }
                            	},
                            	'前往查看'
                            ),
                        ])
                    }
                });
            },
            notice(){
               var _this = this;
                _this.$ajax({
                    url: _this.API_ROOT + '/notice/notice.php',
                    method: 'POST'
                }).then((response) => {
	                if(response.data.status == "success"){
	                	_this.infoContent = response.data.notice;
	                	_this.info(response.data.notice[0].info);
	                };
                });
            },
            goLook(){
            	alert(1)
            }
		}
	})
</script>
