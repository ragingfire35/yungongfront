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
    <switch-class/>
    <home-footer/>
    <div>
      <p>{{count}}</p>
      <p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
      </p>
      <small>
        Check out your cookies to see the updates.
      </small>
    </div>
	</div>
</template>
<script>
  import HeaderCommon from "@/components/common/Header/Header-Common.vue";
  import SwitchClass from "@/components/common/SwitchClass/SwitchClass.vue";
  import HomeFooter from "@/components/common/Footer/Footer-Home.vue";
  export default {
    data(){
      return{
      }
    },

    components:{
       HeaderCommon : HeaderCommon,
       SwitchClass : SwitchClass,
       HomeFooter : HomeFooter
    },
    methods:{
      increment() {
         this.$store.commit('increment');
      },
      decrement() {
         this.$store.commit('decrement');
      }
    },
    computed: {
      count() {
        return this.$store.state.count;
      }
    },
  }
</script>
