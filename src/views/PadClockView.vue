<template>
  <div class="FlipClock">
    <p>{{bjtime.format("YYYY-MM-DD HH:mm:ss, MMMM, dddd")}}</p>
    <Flipper ref="flipperHour1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperHour2" v-bind:style="{zoom:wzoom}"/>
    <em v-bind:style="{zoom:wzoom}">:</em>
    <Flipper ref="flipperMinute1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperMinute2" v-bind:style="{zoom:wzoom}"/>
    <em v-bind:style="{zoom:wzoom}">:</em>
    <Flipper ref="flipperSecond1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperSecond2" v-bind:style="{zoom:wzoom}"/>
    <p>&nbsp;</p>
    <img :src="currentAdPicture" ref="adPic"/>
  </div>
</template>

<script>
import Flipper from '@/components/Flipper.vue'
import moment from 'moment'
import objectFitImages from 'object-fit-images'
import axios from 'axios'

export default {
  name: 'PadClockView',
  data () {
    return {
      bootimer: null, // 校时倒计时时钟
      adtimer: null, // 广告倒计时时钟
      imgtimer: null, // 图片更换倒计时
      flipObjs: [], // 翻牌数字列表
      wzoom: Math.min(document.body.clientWidth / 480, 1.5), // 放大倍数
      timezone: 8, // 时区，默认北京时间
      bjtime: moment().utcOffset(8), // 北京时间
      // adPicture: moment().utcOffset(8).date(), // 广告图片
      adPictures: [], // 广告图片列表
      currentAdPicture: '' // 当前广告图片 URL
    }
  },
  components: {
    Flipper
  },
  computed: {
    // 是否空
    isNotEmptyStr () {
      return (s) => typeof s === 'string' && s.length > 0
    }
  },
  methods: {
    // 初始化
    init () {
      this.fitImage()
      this.getTimezone()
      this.initClock()
      // 秒时钟
      this.bootimer = setTimeout(this.run, (1000 - this.bjtime.millisecond()))
      // 启动换图倒计时
      this.adtimer = setTimeout(this.ad, (24 - this.bjtime.hour()) * 3600000 - this.bjtime.minute() * 60000)
    },
    // 初始化时钟
    initClock () {
      this.flipObjs = [
        this.$refs.flipperHour1,
        this.$refs.flipperHour2,
        this.$refs.flipperMinute1,
        this.$refs.flipperMinute2,
        this.$refs.flipperSecond1,
        this.$refs.flipperSecond2
      ]
      this.bjtime = this.getBjTime()
      const nextTimeStr = this.bjtime.format('HHmmss')
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nextTimeStr[i])
      }
    },
    // 开始计时
    run () {
      // 换点
      this.refClock()
      this.bootimer = setTimeout(this.run, (1000 - this.bjtime.millisecond()))
    },
    // 刷新时钟
    refClock () {
      const nowTimeStr = this.bjtime.format('HHmmss')
      this.bjtime = moment().utcOffset(this.timezone)
      const nextTimeStr = this.bjtime.format('HHmmss')
      for (let i = 0; i < this.flipObjs.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
          continue
        }
        this.flipObjs[i].flipDown(
          nowTimeStr[i],
          nextTimeStr[i]
        )
      }
    },
    // 每日更换图片
    setPicture () {
      // this.adPicture = this.getBjTime().date()
      // // 兼容性延迟处理
      // this.imgtimer = setTimeout(this.fitImage, 500)
      // this.adtimer = setTimeout(this.setPicture, (24 - this.bjtime.hour()) * 3600000)
      // 刷新页面
      // this.$router.go(0)
      location.reload()
    },
    // 图片兼容性处理
    fitImage () {
      objectFitImages(this.$refs.adPic)
    },
    // 获取URL参数
    getURLParameter (name, urlsearch) {
      const regExp = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
      const match = regExp.exec(urlsearch || location.search)
      return match ? decodeURIComponent(match[1].replace(/\+/g, '%20')) : ''
    },
    // 获取时区
    getTimezone () {
      // const zparm = this.getURLParameter('z', window.location.href)
      // if (this.isNotEmptyStr(zparm) && !isNaN(Number(zparm))) {
      //   if (Number(zparm) >= -12 && Number(zparm) <= 12) {
      //     this.timezone = Number(zparm)
      //   }
      // }
      this.timezone = !isNaN(parseFloat(localStorage.getItem('timezoneValue'))) ? parseFloat(localStorage.getItem('timezoneValue')) : this.timezone
    },
    // 获取时区（北京）时间
    getBjTime () {
      return moment().utcOffset(this.timezone)
    },
    // 加载广告图片列表
    async loadAdPictures () {
      try {
        const response = await axios.get('/images.json')
        this.adPictures = response.data.map(photo => photo.photo_url)
        const currentDate = this.getBjTime().date()
        if (currentDate <= this.adPictures.length) {
          this.currentAdPicture = this.adPictures[currentDate - 1]
        } else {
          this.currentAdPicture = this.adPictures[0]
        }
      } catch (error) {
        console.error('Failed to load ad pictures:', error)
      }
    }
  },
  mounted () {
    this.loadAdPictures().then(() => {
      this.init()
    })
  },
  beforeDestroy () {
    clearTimeout(this.bootimer)
    clearTimeout(this.adtimer)
    clearTimeout(this.imgtimer)
  }
}
</script>

<style>
.FlipClock .PadImg {
     object-fit: contain;
     -webkit-object-fit: contain;
     -moz-osx-object-fit: contain;
     object-position: center;
     font-family: "object-fit: contain;";
     width: 87%;
     max-height: calc(66vh);
}
</style>
