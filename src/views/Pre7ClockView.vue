/*
 * 预览插画
 * @author： 薛先生
 * @createDate: 2022-07-20
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
    <img :src="'images/'+adNum.toString()+'.jpg'" :alt="adPicture" ref="adPic"/>
  </div>
</template>

<script>
import Flipper from '@/components/Flipper.vue'
import moment from 'moment'
import objectFitImages from 'object-fit-images'

export default {
  name: 'Pre7ClockView',
  data () {
    return {
      bootimer: null, // 校时倒计时时钟
      adtimer: null, // 广告倒计时时钟
      flipObjs: [], // 翻牌数字列表
      wzoom: Math.min(document.body.clientWidth / 320, 2.5), // 放大倍数
      bjtime: moment().utcOffset(480), // 北京时间
      adNum: moment().utcOffset(480).date() // 当前广告号
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
      this.adtimer = setTimeout(this.ad, 3000) // 更换未来图片
    },
    // 开始计时
    run () {
      this.fclock()
      this.bootimer = setTimeout(this.run, (60 - this.bjtime.second()) * 1000 - this.bjtime.millisecond())
    },
    // 广告更换
    ad () {
      // 更换图片，不加空白
      if (this.adNum === 31) {
        this.adNum = this.bjtime.date()
      } else {
        this.adNum += 1
      }
      this.adtimer = setTimeout(this.ad, 3000) // 更换未来图片

      // 兼容显示
      objectFitImages(this.$refs.adPic)
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
    objectFitImages(this.$refs.adPic)
    this.init()
  },
  beforeDestroy () {
    clearTimeout(this.bootimer)
    clearTimeout(this.adtimer)
    this.bootimer = null
    this.adtimer = null
  }
}
</script>
