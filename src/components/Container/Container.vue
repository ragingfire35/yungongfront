<style lang="less" >
  .container{
    background: url("./image/body_bg.png") repeat;
    background-color: #fff;
    height: auto;
  }
</style>
<template>
	<div class="container">
    <header-common/>
		<router-view></router-view>
    <switch-class v-if="$store.state.is_login === 'true'"></switch-class>
    <notice v-if="$store.state.Notice === true"></notice>
    <home-footer/>
	</div>
</template>
<script>
  import HeaderCommon from "@/components/common/Header/Header-Common.vue";
  import SwitchClass from "@/components/common/SwitchClass/SwitchClass.vue";
  import Notice from "@/components/common/Notice/Notice.vue";
  import HomeFooter from "@/components/common/Footer/Footer-Home.vue";
  export default {
    data(){
      return{
      }
    },

    components:{
       HeaderCommon : HeaderCommon,
       SwitchClass : SwitchClass,
       Notice : Notice,
       HomeFooter : HomeFooter
    }
  }
</script>
