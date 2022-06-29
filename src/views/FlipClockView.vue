/*
 * 翻牌数字
 * @author： 兔子先生+薛先生
 * @createDate: 2019-11-24
 * 2022-06-25 增加每小时定时修正计时器
 */
<template>
  <div class="FlipClock">
    <Flipper ref="flipperHour1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperHour2" v-bind:style="{zoom:wzoom}"/>
    <em v-bind:style="{zoom:wzoom}">:</em>
    <Flipper ref="flipperMinute1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperMinute2" v-bind:style="{zoom:wzoom}"/>
    <p>{{bjtime.format("YYYY-MM-DD HH:mm:ss, MMMM, dddd")}}</p>
    <!-- <p>{{bjtime.format("dddd, MMMM, YYYY-MM-DD HH:mm:ss")}}</p> -->
    <!-- <p>{{adPicture}}</p> -->
    <!-- <p>{{clientWidth}}</p> -->
    <!-- <p>{{clientHeight}}</p> -->
    <img :src="require('@/assets/'+adPicture)">
  </div>
</template>

<script>
import Flipper from '@/components/Flipper.vue'
import moment from 'moment-timezone'

export default {
  name: 'FlipClockView',
  data () {
    return {
      bootimer: null, // 校时倒计时时钟
      adtimer: null, // 广告倒计时时钟
      // timer: null, // 定时时钟
      flipObjs: [], // 翻牌数字列表
      wzoom: document.body.clientWidth / 320, // 放大倍数
      bjtime: moment().utcOffset(480), // 北京时间
      adPicture: '0.png' // 广告图片
      // clientWidth: document.body.clientWidth,
      // clientHeight: document.body.scrollHeight
    }
  },
  components: {
    Flipper
  },
  methods: {
    // 初始化数字
    init () {
      this.fclock()
      // 启动整分钟倒计时
      this.bootimer = setTimeout(this.run, (60 - this.bjtime.second()) * 1000 - this.bjtime.millisecond())
      this.adtimer = setTimeout(this.ad, (24 - this.bjtime.hour()) * 3600000) // 60*60*1000
      // this.adtimer = setTimeout(this.ad, (60 - this.bjtime.second()) * 1000) // test
      // console.log(60 - this.bjtime.second())
    },
    // 开始计时
    run () {
      // console.log(Date())
      this.fclock()
      this.bootimer = setTimeout(this.run, (60 - this.bjtime.second()) * 1000 - this.bjtime.millisecond())
      if (this.adPicture === '0.png') {
        this.adPicture = moment().utcOffset(480).date().toString() + '.png'
      }
      // if (isNaN(this.timer)) {
      //   // 首次设置时钟
      //   this.timer = setInterval(this.fclock, 60000)
      // } else {
      //   // 重新设置
      //   clearInterval(this.timer)
      //   this.timer = setInterval(this.fclock, 60000)
      // }
      // // 设置小时倒计时-每小时60*60*1000
      // this.bootimer = setTimeout(this.run, 3600000)
      // // 随机替换1-31之间的图片
      // this.adPicture = (Math.floor(Math.random() * 31) + 1).toString() + '.png'
    },
    // 广告更换
    ad () {
      // 凌晨更换图片
      this.adPicture = moment().utcOffset(480).date().toString() + '.png'
      // this.adPicture = moment().minute().toString() + '.png'
      this.adtimer = setTimeout(this.ad, 86400000) // 24*60*60*1000
    },
    // 显示时钟
    fclock () {
      this.bjtime = moment().utcOffset(480)
      const nextTimeStr = this.bjtime.format('HHmmss')
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nextTimeStr[i])
      }
    }
  },
  mounted () {
    this.flipObjs = [
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2
    ]
    this.init()
    // this.run()
  },
  beforeDestroy () {
    // clearInterval(this.timer)
    clearTimeout(this.bootimer)
    clearTimeout(this.adtimer)
    // this.timer = null
    this.bootimer = null
    this.adtimer = null
  }
}
</script>

<style>
.FlipClock {
    text-align: center;
}
.FlipClock .M-Flipper {
    margin: 0 3px;
}
.FlipClock em {
    display: inline-block;
    line-height: 102px;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
}
.FlipClock img {
     /* object-fit: contain; */
     /* object-fit: cover; */
     width: 67%;
     /* height: 45%; */
     /* max-width: 50%; */
     /* max-height: 450px; */
}
</style>
