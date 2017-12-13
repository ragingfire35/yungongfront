<style lang="less">
</style>
<template>
	<div>
    <header-common/> 		
		<router-view></router-view>
    <switch-class/>
	</div>
</template>
<script>
  import HeaderCommon from "@/components/common/Header/Header-Common.vue";
  import SwitchClass from "@/components/common/SwitchClass/SwitchClass.vue";
  export default {
    data(){
      return{
      }
    },

    components:{
       HeaderCommon : HeaderCommon,
       SwitchClass : SwitchClass
    }
  }
</script>
