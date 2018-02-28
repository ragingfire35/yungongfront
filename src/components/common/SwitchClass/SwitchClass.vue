<style lang="less" scope>
  .afnowBtn{
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
    .afnowBtn{
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
        v-for= "(item, index) in btnInto.name"
        :key= "index"
        :type="nowBtn && nowBtn.type || btnInto.type[index]"
        @click="switchClass(btnInto.name[index])"
        class="afnowBtn"
        style="right: 10px;"
      >
      {{ nowBtn && nowBtn.text || btnInto.text[index]}}
      </Button>
	</div>
</template>
<script>

  export default {
    data(){
      return{
        userClassify : "",//'string'
        nowBtn : JSON.parse(sessionStorage.getItem('userClassify') || '[]') || null, /*personal or website : {"type" : "","text" : "","text1" : "" }*/
        btnInto  : {
          text : ["进入企业版", "进入个人版"],
          type : ["primary","success"],
          name : ["personal", "website"]
        }
      }
    },
    watch:{

    },
    mounted(){
      var _this = this;
      var t = _this.$store.state.userClassify.text1;
      switch (t){
        case undefined :
              _this.$Notice.warning({
                  title: "选择一个版本进入",
                  duration : 1,
                  key: 'bb',
                  onClose(){
                    _this.$store.state.Notice = true;
                  }
              });
              break;
        default :
              _this.$Notice.success({
                  title: t,
                  duration : 1,
                  key: 'cc',
                  onClose(){
                    _this.$store.state.Notice = true;
                  }
              });
              break;
      }

    },
    methods:{
      switchClass(name){
          switch(this.$store.state.userClassify.userClass || name){
              case "personal" :
                  if (this.$route.path == "/PersonalHome")
                    this.$router.push({'path':'/WebsiteHome?name=websiteInfo'});
                  this.userClassify = 'website';
                  break;
              case "website" :
                  if (this.$route.path == "/WebsiteHome")
                    this.$router.push({'path':'/PersonalHome?name=personalInfo'});
                  this.userClassify = 'personal';
                  break;
          }
          this.$store.dispatch('userClassify', this.userClassify);
          this.nowBtn = JSON.parse(sessionStorage.getItem('userClassify'));
          this.$Notice.success({
              title: this.nowBtn.text1,
              duration : 1,
              key: 'aa'
          });
      }
    }
  }
</script>
