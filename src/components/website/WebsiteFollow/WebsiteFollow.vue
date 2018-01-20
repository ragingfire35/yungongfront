<style lang="less" scoped>

</style>
<template>
	<Card class="bt0"  dis-hover>
		<job-seekers ref="jobSeekers"></job-seekers>
	</Card>
</template>
<script>
	import JobSeekers from "@/components/common/JobSeekers/JobSeekers.vue";
	export default({
		data(){
			return{
			}
		},
		mounted(){
			this.getInfo();
		},
	    components:{
	    	JobSeekers : JobSeekers
	    },
	    methods:{
			getInfo(){
		    	var _this = this;
		        _this.$ajax({
		            url: _this.API_ROOT + '/website/followInfo.php',
		            method: 'POST'
		        }).then((response) => {
		            if(response.data.status == 'success'){
		               _this.$refs.jobSeekers.job_seekers = response.data.info;
		            };
		        });
			},
	    }
	})
</script>