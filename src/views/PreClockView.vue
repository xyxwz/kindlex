<template>
  <div class="FlipClock">
    <Flipper ref="flipperMonth1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperMonth2" v-bind:style="{zoom:wzoom}"/>
    <em v-bind:style="{zoom:wzoom}">-</em>
    <Flipper ref="flipperDay1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperDay2" v-bind:style="{zoom:wzoom}"/>
    <p>{{ bjtime.format("YYYY-MM-DD HH:mm:ss, MMMM, dddd") }}</p>
    <img :src="currentAdPicture" :alt="adPicture" ref="adPic"/>
  </div>
</template>

<script>
import Flipper from '@/components/Flipper.vue'
import moment from 'moment'
import objectFitImages from 'object-fit-images'
import axios from 'axios'

export default {
  name: 'PreClockView',
  data () {
    return {
      bootimer: null, // 校时倒计时时钟
      adtimer: null, // 广告倒计时时钟
      flipObjs: [], // 翻牌数字列表
      wzoom: Math.min(document.body.clientWidth / 320, 2.5), // 放大倍数
      bjtime: moment().utcOffset(480), // 北京时间
      adPictures: [], // 广告图片列表
      currentAdPicture: '', // 当前广告图片 URL
      currentDateIndex: 0 // 当前日期索引
    }
  },
  components: {
    Flipper
  },
  methods: {
    // 初始化
    init () {
      this.fclock()
      // 启动整分钟倒计时
      this.bootimer = setTimeout(this.run, (60 - this.bjtime.second()) * 1000 - this.bjtime.millisecond())
      this.adtimer = setTimeout(this.nextDateAndPicture, 3000) // 3秒后切换到下一天
    },
    // 开始计时
    run () {
      this.fclock()
      this.bootimer = setTimeout(this.run, (60 - this.bjtime.second()) * 1000 - this.bjtime.millisecond())
    },
    // 切换到下一天
    nextDateAndPicture () {
      // 更新日期
      const nextDate = moment(this.bjtime).add(1, 'days') // 增加一天
      this.bjtime = nextDate

      // 更新日期索引
      this.currentDateIndex += 1
      if (this.currentDateIndex >= this.adPictures.length) {
        this.currentDateIndex = 0 // 如果超出范围，回到第一天
      }

      // 更新图片
      this.currentAdPicture = this.adPictures[this.currentDateIndex]

      // 更新翻牌显示
      this.fclock()

      // 3秒后继续切换
      this.adtimer = setTimeout(this.nextDateAndPicture, 3000)
    },
    // 显示日期
    fclock () {
      const nextDateStr = this.bjtime.format('MMDD') // 格式化为 MMDD
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nextDateStr[i])
      }
    },
    // 加载广告图片列表
    async loadAdPictures () {
      try {
        const response = await axios.get('/images.json')
        this.adPictures = response.data.map(photo => photo.photo_url)
        // 从今日日期开始
        const today = moment().utcOffset(480).date()
        this.currentDateIndex = today - 1
        this.currentAdPicture = this.adPictures[this.currentDateIndex]
      } catch (error) {
        console.error('Failed to load ad pictures:', error)
      }
    }
  },
  mounted () {
    this.flipObjs = [
      this.$refs.flipperMonth1,
      this.$refs.flipperMonth2,
      this.$refs.flipperDay1,
      this.$refs.flipperDay2
    ]
    objectFitImages(this.$refs.adPic)
    this.loadAdPictures().then(() => {
      this.init()
    })
  },
  beforeDestroy () {
    clearTimeout(this.bootimer)
    clearTimeout(this.adtimer)
    this.bootimer = null
    this.adtimer = null
  }
}
</script>
