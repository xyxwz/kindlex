<template>
  <div class="FlipClock">
    <!-- 在此处插入时钟组合的HTML代码 -->
    <Flipper ref="flipperHour1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperHour2" v-bind:style="{zoom:wzoom}"/>
    <em v-bind:style="{zoom:wzoom}">:</em>
    <Flipper ref="flipperMinute1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperMinute2" v-bind:style="{zoom:wzoom}"/>
    <p>{{bjtime.format("YYYY-MM-DD HH:mm:ss, MMMM, dddd")}}</p>
    <!-- 在此处插入图片的HTML代码 -->
    <img :src="'images/'+adPicture.toString()+'.jpg'" :alt="adPicture" ref="adPic"/>
  </div>
</template>
<script>
import Flipper from '@/components/Flipper.vue'
import moment from 'moment'
import objectFitImages from 'object-fit-images'
export default {
  name: 'FlipClockView',
  components: {
    Flipper
  },
  data () {
    return {
      bootimer: null, // 校时倒计时时钟
      adtimer: null, // 每日图片倒计时时钟
      imgtimer: null, // 图片兼容处理倒计时
      flipObjs: [], // 翻牌数字列表
      wzoom: Math.min(document.body.clientWidth / 320, 2.5), // 放大倍数
      timezone: 8, // 时区，默认北京时间
      bjtime: moment().utcOffset(8), // 北京时间
      adPicture: moment().utcOffset(8).date() // 广告图片
    }
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
      this.bootimer = setTimeout(this.run, (60 - this.bjtime.second()) * 1000 - this.bjtime.millisecond())
      this.adtimer = setTimeout(this.setPicture, (24 - this.bjtime.hour()) * 3600000 - this.bjtime.minute() * 60000)
    },
    // 初始化时钟
    initClock () {
      this.flipObjs = [
        this.$refs.flipperHour1,
        this.$refs.flipperHour2,
        this.$refs.flipperMinute1,
        this.$refs.flipperMinute2
      ]
      this.refClock()
    },
    // 开始计时
    run () {
      this.refClock()
      this.bootimer = setTimeout(this.run, (60 - this.bjtime.second()) * 1000 - this.bjtime.millisecond())
    },
    // 刷新时钟
    refClock () {
      this.bjtime = this.getBjTime()
      const nextTimeStr = this.bjtime.format('HHmmss')
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nextTimeStr[i])
      }
    },
    // 每日更换图片
    setPicture () {
      this.adPicture = this.getBjTime().date()
      // 兼容性延迟处理
      this.imgtimer = setTimeout(this.fitImage, 500)
      this.adtimer = setTimeout(this.setPicture, (24 - this.bjtime.hour()) * 3600000)
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
      const zparm = this.getURLParameter('z', window.location.href)
      if (this.isNotEmptyStr(zparm) && !isNaN(Number(zparm))) {
        if (Number(zparm) >= -12 && Number(zparm) <= 12) {
          this.timezone = Number(zparm)
        }
      }
    },
    // 获取时区（北京）时间
    getBjTime () {
      return moment().utcOffset(this.timezone)
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearTimeout(this.bootimer)
    clearTimeout(this.adtimer)
    clearTimeout(this.imgtimer)
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
.FlipClock p {
  font-size: x-small;
}
.FlipClock img {
  width: 87%;
  max-height: 57%;
  max-height: calc(57vh);
  /* overflow: hidden; */
  object-fit: contain;
  -webkit-object-fit: contain;
  -moz-osx-object-fit: contain;
  object-position: center;
  font-family: "object-fit: contain;";
}
</style>
