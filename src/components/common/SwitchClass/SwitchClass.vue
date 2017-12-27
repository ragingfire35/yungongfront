<style lang="less" scope>
  .affixBtn{
    width: 40px;
    height: auto;
    position: fixed;
    z-index:3;
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
        @click="switchClass(btnInto.name[index])"
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
          type : ["primary","success"],
          name : ["personal", "website"]
        },

        info: {
            website : {
              "type" : "success",
              "text" : "进入个人版",
              "text1" : "当前版本：企业版"
            },
            personal : {
              "type" : "primary",
              "text" : "进入企业版",
              "text1" : "当前版本：个人版"
            }
        }
      }
    },
    watch:{
      userClassFiy(name){
        this.fixBtn
        = name
        == "website" ?
        this.info.personal : this.info.website;

        this.$Notice.success({
            title: this.fixBtn.text1,
            duration : 1,
            key: 'aa'
        });
      }
    },
    mounted(){
      this.fixBtn
      = this.userClassFiy
      == "website"?
      this.info.personal : this.info.website;
    },
    methods:{
      switchClass(name){

          this.$store.state.userClassify
          = this.userClassFiy
          = this.userClassFiy == '' ?
              name : this.userClassFiy == "website" ?
                'personal' : 'website';

          switch(this.$route.path){
              case "/PersonalHome" : this.$router.push({'path':'/WebsiteHome'}); break;
              case "/WebsiteHome" : this.$router.push({'path':'/PersonalHome'}); break;
          }
      }
    }
  }
</script>
