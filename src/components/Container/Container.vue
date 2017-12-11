<style lang="less">
</style>
<template>
	<div>
		<header-common/> 
		<router-view/>
	</div>
</template>
<script>
  import HeaderCommon from "@/components/common/Header/Header-Common.vue";
  
  export default {
    mounted(){
    },
    components:{
       HeaderCommon : HeaderCommon
    }
  }
</script>
