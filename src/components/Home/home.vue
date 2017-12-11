<style lang="less" scope>
  .home-main{
    width: 100%;
    min-height: 500px;
    background:linear-gradient(to bottom, #3399ff, #fff4f4);
    position: relative;
    h1.title{
      color: #fff;
      font-weight: normal;
      font-size: 40px;
      margin-bottom: 30px;
    }
    ol{
      text-align: center;
      li{
        color: #fff;
        display: inline-block;
        margin-right: 30px;
        i{
          float: left;
          font-size: 32px;
          margin-right: 6px;
        }
        span{
          float: left;
          font-size: 16px;
          height: 36px;
          line-height: 36px;
        }
      }
    }
  }
  .carousel{
    min-height: 300px;
    background: #fff;
    box-shadow: 0px 3px 3px #eee;
    color: #fff;
    width: 70%;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 300px;
    overflow: hidden;
    .ivu-carousel-list{
      border-radius: 300px;
      overflow: hidden;
    }
    .ivu-carousel-item{
      .works,
      .author
      {
        overflow: hidden;
        color: #000;    
        .ivu-tag{
          margin: 10px auto;
        }
        img{
          display: block;
          margin: 0 auto;
        }
      }
    }
    .works{
      float: left;
      margin-left: 15%;
      img{
        width: 100%;
      }
    }
    .author{
      float: right;
      margin-right: 15%;
    }
  }
  .btnWrap{
    &>button{
      width: 30%;
      height: 50px;
      line-height: 40px;
      font-size: 16px;
      border-color: #767603;
      color: #767603;
      background: #fff;
    }
  }
  .demand-box{
    width: 100%;
    overflow: hidden;
    margin-top: 30px;
    li{
      width: 30%;
      img{
      }
      .contentBox{
        h3{
          font-size: 18px;
          margin: 8px 0;
        }
        span{
          display: block;
          margin: 10px 0;
        }
        button{
          font-size: 18px;
        }
      }
      &:nth-of-type(1){
        float: left;
        margin-left: 15%;
      }
      &:nth-of-type(2){
        float: right;
        margin-right: 15%;
      }
    }
  }
  @media (max-width: 1200px){
    .carousel{
      width: 80%;
      border-radius: 0;
      .ivu-carousel-list{
        border-radius: 0;
      }
    }

    .works{
      width: 40%;
    }
  }
  @media (max-width: 992px){
    .carousel{
      width: 100%;
      border-radius: 0;
      .author{
        float: none;
        margin: 0 auto;
      } 
      .works{
        width: 70%;
        float: none;
      }
    }
    .home-main{
      h1.title{
        font-size: 18px;
      }
    }
    .btnWrap{
      &>button{
        width: 100%;
        margin: 30px auto 0 0!important;
      }
    }
    .demand-box{
      li{
        width: 100%;
        margin: 30px 0 30px 0!important;
      }
    }
  }
</style>
<template>
	<div>
		<home-header/> 
    <div class="home-main">
      <h1 class="title">按需雇佣 BAT 工程师、设计师</h1>
      <ol>
        <li><Icon type="android-person"></Icon><span>名企人才</span></li>
        <li><Icon type="android-plane"></Icon><span>快速到班</span></li>
        <li><Icon type="umbrella"></Icon><span>服务保障</span></li>
      </ol>
      <Carousel v-model="value1" class="carousel" autoplay arrow="always">
          <Carousel-item>
              <div class="works">
                <Tag color="green" type="border">成功案例</Tag>
                <img src="./image/11.png" alt="">
              </div>
              
              <div class="author">
                <Tag color="green" type="border">项目作者</Tag>
                <img src="./image/1.png" alt="">
              </div>
          </Carousel-item>
          <Carousel-item>
              <div class="works">
                <Tag color="green" type="border">成功案例</Tag>
                <img src="./image/12.png" alt="">
              </div>
              
              <div class="author">
                <Tag color="green" type="border">项目作者</Tag>
                <img src="./image/2.png" alt="">
              </div>
          </Carousel-item>
          <Carousel-item>
              <div class="works">
                <Tag color="green" type="border">成功案例</Tag>
                <img src="./image/13.png" alt="">
              </div>
              
              <div class="author">
                <Tag color="green" type="border">项目作者</Tag>
                <img src="./image/3.png" alt="">
              </div>
          </Carousel-item>
          <Carousel-item>
              <div class="works">
                <Tag color="green" type="border">成功案例</Tag>
                <img src="./image/14.png" alt="">
              </div>
              
              <div class="author">
                <Tag color="green" type="border">项目作者</Tag>
                <img src="./image/4.png" alt="">
              </div>
          </Carousel-item>
      </Carousel>
    </div>
    <div class="btnWrap">
      <Button type="dashed" style="margin-right:5%">更多成功案例</Button>
      <Button type="dashed" style="margin-left:5%">更多优秀人才</Button>
    </div>
    <ul class="demand-box">
        <li>
          <Card>
            <img src="./image/chuangye.png" alt="">
            <div class="contentBox">
               <p>
                  <h3>我是创业者</h3>
                  <span>我在寻找技术人才</span>
               </p>
               <Button type="success" long>发布需求</Button>
            </div>
          </Card>
        </li>
        <li>
          <Card>
            <img src="./image/author.png" alt="">
            <div class="contentBox">
               <p>
                  <h3>我是技术人才</h3>
                  <span>我在找兼职工作</span>
               </p>
               <Button type="success" long>我要入驻</Button>
            </div>
          </Card>
        </li>
    </ul>
    <home-footer/>
	</div>
</template>
<script>
  import HomeHeader from "@/components/common/Header/Header-Home.vue";
   import HomeFooter from "@/components/common/Footer/Footer-Home.vue";
  export default {
    data(){
      return{
        value1 : 0
      }
    },
    mounted(){
      
    },
    components:{
       HomeHeader : HomeHeader,
       HomeFooter : HomeFooter
    }
  }
</script>