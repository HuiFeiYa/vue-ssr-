<template>
  <div class="container">
    <div class="relative zi99 hot-area" data-code="6001" @click="onTrackClick(6001)">
      <h4 class="fs24 color3 mt24">{{ wxbArticle.title }}</h4>
      <div class="mt20 mb16 flex fs16 flex-hs">
        <div class="color9 b1 fs16 h20 w48 mr16 bradius16 tac">原创</div>
        <div class="mr12">一天前</div>
        <div class="mr12">{{ wxbArticle.channel }}</div>
        <div class="color-blue">
          {{ wxbArticle.channel }}服务号
        </div>
      </div>
      <div style="marginRight:18%" class="flr flex flex-vc fs18">
        <img class="mr5 w20 h20" src="/public/images/icon-up-arrow.gif" alt="箭头">
        <span>点击上方<span class="color-blue">蓝色字</span> ，前往公众号</span>
      </div>
      <!-- <img class="poster" src="/public/images/icon-border.png"> -->
      <div class="poster pb16">
        <div class="title" :class="[isMobile ? 'fs18' : 'fs27']">一个专注全网保险评测的公众号</div>
        <div>
          <img class="mr4" src="/public/images/icon-wechat.png">
          <span class="color-3 wechat">微信公众号:
            <span>{{ wxbArticle.channel }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="content" v-html="wxbArticle.content" />
    <div style="width:100%;marginTop:-68px;background: linear-gradient(rgba(255,255,255,.6), rgba(255,255,255,1))" class="relative h68 hot-area" data-code="6003" @click="onTrackClick(6003)" />
    <div id="lxbaidusem" class="flex flex-v flex-vc hot-area" data-code="6003" @click="onTrackClick(6003)">
      <img class="w23 h23 mb20" src="/public/images/icon-arrow.png" alt="箭头">
      <div style="width:100%" class="bg-green white bradius4 h70 flex flex-vc flex-hc fs20">
        <img class="w54 h40 mr16" src="/public/images/icon-wecht-button.png" alt="按钮">
        <span>进入公众号,阅读全文</span>
      </div>
    </div>
    <div class="flex flex-v flex-vc color9 fs12">
      <img class="mt16 w216 h216" :src="wxbArticle.officialAccountQrUrl" alt="二维码">
      <span>关注或扫码阅读全文</span>
    </div>
    <div style="border:1px solid #4d4b90" class="mt30 mb20 pt20 pb30">
      <h4 style="letterSpacing:6px" class="fs22 relative tac select">公众号文章精选</h4>
      <div class="prompt">/把时间浪费在走心的事物上/</div>
      <div v-for="item in pickList" :key="item.id" class="mt20 pl20 pr20">
        <div class="fs18 mb30 pl10 relative bold color-purple before">{{ item.title }}</div>
        <div v-for="(value,index) in item.list" :key="index" class="color-purple fs16 mb6" @click="onTrackClick(value.code)">
          <span>{{ value.subTitle }}  | </span>
          <span class="underline">{{ value.description }}</span>
        </div>
      </div>
    </div>
    <div v-if="isShowDialog" class="zi100 relative">
      <div class="cover" @click="isShowDialog=false" />
      <div :class="{ size: isMobile}" class="qrcode">
        <div v-if="isMobile" class="mobile">
          <h2 style="color:#333;fontSize:16px;textAlign:center;marginBottom:16px;">方式一:扫码添加公众号</h2>
          <img style="width:32px;height:42px;position:absolute;top:0;right:15px;" class="close" src="/public/images/icon-close.png" alt="图标" @click="onCloseClick">
          <img style="width:160px;height160px" :src="wxbArticle.officialAccountQrUrl" alt="二维码">
          <div style="color:#999;fontSize:12px;textAlign:left;textIndent:20%">
            <div style="marginTop:8px">1. 截屏或者长按二维码选择保存图片</div>
            <div style="marginTop:8px">2. 打开微信扫码,相册 (右上方) 选中二维码</div>
            <div style="marginTop:8px">3. 进入公众号继续阅读全文</div>
          </div>
          <div style="textAlign:center;marginTop:10px">
            <img style="width:200px" src="/public/images/add-public.gif" alt="">
          </div>
          <h2 style="color:#333;fontSize:16px;textAlign:center;margin:40px 0 16px 0">方式二:搜索名称添加</h2>
          <div style="background:#eee;fontSize:16px;color:#333;margin:0 auto;width:58%;textAlign:center;lineHeight:32px;position:relative;border-radius: 20px;">
            <span class="key">{{ wxbArticle.channel }}</span>
            <img style="position:absolute;right:14px;height:16px;width:16px; top: 50%;transform: translateY(-50%);" src="/public/images/icon-search.png" alt="搜索">
          </div>
          <div id="ydbaidusem" class="copy hot-area" style="background-color:#7BD39D" data-code="6026" data-agl-cvt="35" :data-clipboard-text="wxbArticle.channel" @click="onCopyClick($event,6026)">一键复制，打开微信搜一搜</div>
          <div class="way">
            <div class="right-arrow">一键复制</div>
            <div class="right-arrow">打开微信</div>
            <div class="right-arrow">搜一搜</div>
            <div class="last">粘贴搜索</div>
          </div>
        </div>
        <div v-else class="pc">
          <h2 class="fs22">微信扫一扫，进入公众号阅读全文</h2>
          <img class="w216 h216 mt16" :src="wxbArticle.officialAccountQrUrl" alt="二维码">
          <p class="fs16 mb30">微信公众号 : {{ wxbArticle.channel }}</p>
          <p class="tac fs16">{{ wxbArticle.channel }}，一个专注全网保险评测的公众号。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { track } from 'getData'
import Clipboard from 'clipboard'
export default {
  name: 'ViewAbout',
  asyncData({ store, context }) {
    return store.dispatch('getArticle', context)
  },
  data() {
    return {
      pickList: [
        {
          title: '公众号文章精选',
          id: 1,
          list: [
            {
              code: 6027,
              subTitle: '投保规划',
              description: '孩子保险怎么买？有哪些坑？主流产品有哪些？全面分析！'
            },
            {
              code: 6028,
              subTitle: '投保规划',
              description: '返还型保险好还是消费型保险好？'
            },
            {
              code: 6029,
              subTitle: '投保规划',
              description: '必须知道的家庭保险规划的5大原则！'
            },
            {
              code: 6030,
              subTitle: '投保规划',
              description: '中老年人该怎么买保险才好？读这篇文章就够了'
            },
            {
              code: 6031,
              subTitle: '经营监管',
              description: '小保险公司会倒闭吗？'
            },
            {
              code: 6032,
              subTitle: '经营监管',
              description: '为什么有些公司的保险会那么便宜？'
            },
            {
              code: 6033,
              subTitle: '经营监管',
              description: '大保险公司与小保险公司怎么选？'
            },
            {
              code: 6034,
              subTitle: '经营监管',
              description: '各大保险公司理赔速度怎么样？哪家更好？'
            },
            {
              code: 6035,
              subTitle: '购买渠道',
              description: '互联网渠道与传统代理人渠道，哪个更好？'
            }
          ]
        },
        {
          title: '选购指南',
          id: 2,
          list: [
            {
              code: 6036,
              subTitle: '险种知识',
              description: '【重疾险】如何买？什么产品好？教你买到最合适的重疾险'
            },
            {
              code: 6037,
              subTitle: '核保知识',
              description: '健康异常买保险需要注意什么？'
            },
            {
              code: 6038,
              subTitle: '核保知识',
              description: '购买保险时，如实告知健康状况有多重要！'
            },
            {
              code: 6039,
              subTitle: '寿险知识',
              description: '指定受益人VS法定受益人，哪个好？'
            },
            {
              code: 6040,
              subTitle: '购买技巧',
              description: '买了医疗险还需要买重疾险吗？'
            },
            {
              code: 6041,
              subTitle: '寿险知识',
              description: '寿险是什么？应该如何买？主流寿险产品深度测评'
            },
            {
              code: 6042,
              subTitle: '重疾测评',
              description: '多次赔付重疾险值得买么？'
            },
            {
              code: 6043,
              subTitle: '重疾测评',
              description: '网红少儿重疾险妈咪保贝真有这么好？专业第三方评测文章'
            }
          ]
        },
        {
          title: '保后无忧',
          id: 3,
          list: [
            {
              code: 6044,
              subTitle: '理赔须知',
              description: '买了保险，理赔前可以修改病历吗？'
            },
            {
              code: 6045,
              subTitle: '理赔须知',
              description: '万一理赔出现纠纷怎么办？'
            },
            {
              code: 6046,
              subTitle: '理赔须知',
              description: '“不可抗辩条款”知多少？'
            },
            {
              code: 6047,
              subTitle: '险种知识',
              description: '买错保险，想退保，如何减少损失？'
            }
          ]
        }
      ],
      sectionList: [
        {
          point: '咨询答疑',
          detail: '保险问题在线答疑'
        },
        {
          point: '产品测评',
          detail: '千款产品详细测评'
        },
        {
          point: '保单分析',
          detail: '量身定制全面保障'
        },
        {
          point: '方案订制',
          detail: '原有保单深度讲解'
        }
      ],
      isShowDialog: false,
      baseUrl: process.env.NODE_ENV === 'release' ? '/server-render' : ''
    }
  },
  computed: {
    wxbArticle() {
      return this.$store.state.wxbArticle
    },
    wxbRequest() {
      return this.$store.state.wxbRequest
    },
    isMobile() {
      return this.wxbRequest.platform === 'mobile'
    }
  },
  // 将标题传递给 context 上下文，然后传递给模版
  created() {
    this.$ssrContext && (this.$ssrContext.title = this.wxbArticle.title)
  },
  methods: {
    onCloseClick() {
      this.isShowDialog = false
    },
    onCopyClick(event, code) {
      this.clipboard = new Clipboard(event.target)
      // 模拟用户点击
      event.target.click()
      this.clipboard.on('success', () => {
        console.log('成功')
      })
      this.onTrackClick(code)
    },
    onTrackClick(code) {
      this.isShowDialog = true
      const params = Object.assign({ part: code, platform: this.platform, infoId: this.wxbArticle.infoId }, this.wxbRequest)
      track(params).catch(() => {})

      // this.clipboard.on("error", () => {
      //     hinting("设备不支持，请长按复制");
      // });
    }
  }
}
</script>
<style lang="less">
html{
  max-width: 750px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background-color: #fff;
}
.container{
  padding: 0 16px;
}
.poster{
  margin: 59px auto 16px;
  border: 1px solid #4D4D90;
  border-radius: 4px;
  text-align: center;
  max-width: 700px;
  .title{
    color:#4D4D90;
    font-weight: bold;
    margin-bottom:10px;
  }
  img{
    width:15px;
  }
  .wechat{
    position: relative;
    &:after{
      position: absolute;
      bottom:-4px;
      content:'';
      left:0;
      height: 2px;
      width: 100%;
      background-color: #4D4D90;
    }
    &:before{
      position: absolute;
      bottom:0;
      content:'';
      left:0;
      height: 1px;
      width: 100%;
      background-color: #4D4D90;
    }
  }
}
.select:after {
    content: '';
    position: absolute;
    width: 90%;
    height: 11px;
    background-color: #EDEDF3;
    bottom: 0;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);
}
.prompt{
    color: #4a4e6b;
    text-align: center;
    letter-spacing: 3px;
    font-size: 14px;
    border-bottom: 1px solid #9198d5;
    width: 80%;
    margin: 20px auto 0;
    padding-bottom: 5px;
    position: relative;
    &:after{
        position: absolute;
        content: '';
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #9198d5;
    }
}
.before{
  &:before{
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 14px;
    background-color: #4d4b90;
    margin-bottom: 30px;
  }
}
.cover{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(51,51,51,0.6);
  top: 0;
  left: 0;
}
.mobile{
  position: fixed;
  text-align: center;
  padding: 40px 0 10px 0;
  width: 85%;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
  overflow-y: scroll;
  max-height: 80%;
}
.qrcode{
  position: fixed;
  top:50%;
  left: 50%;
  transform:translate(-50%,-50%) ;
}
.right-arrow{
  position: relative;
  margin-right: 11px;
  height: 32px;
  line-height: 32px;
  flex-grow: 1;
}
.right-arrow:after{
  height: 6px;
  width: 6px;
  position: absolute;
  content: '';
  border: 1px solid;
  border-color: transparent transparent #24C562 #24C562;
  transform: rotate(-135deg) translate(-50%,-50%);
  top: 21%;
  right: -6px;
}
.way{
  height: 32px;
  color:#999999;
  display: flex;
  font-size:12px;
  width:75%;
  margin: 0 auto;
}
.last{
  line-height: 32px;
  padding-right: 10px;
}
.copy{
  width: 220px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  color: #fff;
  background-color: #24C562;
  margin: 24px auto 14px;
  font-weight: bold;
  border-radius: 20px;
  font-size: 14px;
}
img{
  max-width: 100%;
}
.pc{
  width: 380px;
  text-align: center;
  box-shadow: 8px 8px 27px rgba(0, 0, 0, 0.2);
  padding: 32px 0;
  background-color: #fff;
}
.size{
  width:100%;
  height: 100%;
}
</style>
