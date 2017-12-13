<style lang="less" scope>
  .affixBtn{
    width: 40px;
    height: auto;
    position: fixed;
    top:40%;
    right: 10px;
    border-radius: 0;
    padding: 24px 0 20px 0;
    letter-spacing: 6px;
    font-size: 16px;
    &:nth-of-type(1){
      right: 0;
      left: 10px;
    }
    span{
       writing-mode: tb-rl;
    }
  }
  @media (max-width: 768px){
    .affixBtn{
      background: transparent;
      color: #000;
      border-top: 0;
      border-bottom: 0;
      &:nth-of-type(1){
        left: 0;
        border-right: 0;
        text-align: left;
      }
      &:nth-of-type(2){
        right: 0!important;
        border-left: 0;
        text-align: right;
      }
    }
  }
</style>
<template>
	<div>
      <Button
        v-for= "(item, index) in btnInto.btnNum"
        :key= "index"
        :type="userClassFiy == '' ? btnInto.type[index] : fixBtn.type" 
        @click="switchClass(btnInto.name)"
        class="affixBtn"
        style="right: 10px;"
      >
      {{userClassFiy == '' ? btnInto.text[index] : fixBtn.text}}
      </Button>
	</div>
</template>
<script>

  export default {
    data(){
      return{
        userClassFiy : this.$store.state.userClassify,
        fixBtn : "",

        btnInto  : {
          btnNum : 2,
          text : ["进入企业版", "进入个人版"],
          type : ["success","primary"],
          name : ["personal", "website"]
        },

        info: {
            webiste : {
              "type" : "success",
              "text" : "切换到个人版"
            },
            personal : {
              "type" : "primary",
              "text" : "切换到企业版"
            }
        }
      }
    },
    watch:{
      userClassFiy(name){
        this.fixBtn
        = name
        == "website" ?
        this.info.webiste : this.info.personal;
      }
    },
    mounted(){
      this.fixBtn
      = this.userClassFiy
      == "website"?
      this.info.webiste : this.info.personal;
    },
    methods:{
      switchClass(name){
          this.$store.state.userClassify
          = this.userClassFiy
          = this.userClassFiy == '' ?
              name : this.userClassFiy == "website" ?
                'personal' : 'website'
      },
    }
  }
</script>
