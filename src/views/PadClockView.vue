/*
 * 翻牌数字
 * @author： 兔子先生+薛先生
 * @createDate: 2019-11-24
 * 2022-08-17 支持ipad时钟动画
 */
<template>
  <div class="FlipClock">
    <Flipper ref="flipperHour1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperHour2" v-bind:style="{zoom:wzoom}"/>
    <em v-bind:style="{zoom:wzoom}">:</em>
    <Flipper ref="flipperMinute1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperMinute2" v-bind:style="{zoom:wzoom}"/>
    <em v-bind:style="{zoom:wzoom}">:</em>
    <Flipper ref="flipperSecond1" v-bind:style="{zoom:wzoom}"/>
    <Flipper ref="flipperSecond2" v-bind:style="{zoom:wzoom}"/>
    <p>{{bjtime.format("YYYY-MM-DD HH:mm:ss, MMMM, dddd")}}</p>
    <img class="PadImg" :src="'/images/'+adPicture.toString()+'.jpg'" :alt="adPicture" ref="adPic"/>
  </div>
</template>

<script>
import Flipper from '@/components/Flipper.vue'
import moment from 'moment'
import objectFitImages from 'object-fit-images'

export default {
  name: 'PadClockView',
  data () {
    return {
      bootimer: null, // 校时倒计时时钟
      adtimer: null, // 广告倒计时时钟
      imgtimer: null, // 图片更换倒计时
      flipObjs: [], // 翻牌数字列表
      wzoom: document.body.clientWidth / 480, // 放大倍数
      timezone: 8, // 时区，默认北京时间
      bjtime: moment().utcOffset(8), // 北京时间
      adPicture: moment().utcOffset(8).date() // 广告图片
    }
  },
  components: {
    Flipper
  },
  methods: {
    // 初始化数字
    init () {
      // 获取时区 ?z=number(-12~12)
      const zparm = this.getURLParameter('z', window.location.href)
      if (this.isNotEmptyStr(zparm) && !isNaN(Number(zparm))) {
        if (Number(zparm) >= -12 && Number(zparm) <= 12) {
          this.timezone = Number(zparm)
        }
      }

      // 初始时钟
      this.bjtime = moment().utcOffset(this.timezone)
      const nextTimeStr = this.bjtime.format('HHmmss')
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nextTimeStr[i])
      }
      // 秒时钟
      this.bootimer = setTimeout(this.run, (1000 - this.bjtime.millisecond()))

      // 启动换图倒计时
      // this.imgtimer = setTimeout(this.fitimage, 10000 - this.bjtime.millisecond()) // 10s
      this.adtimer = setTimeout(this.ad, (24 - this.bjtime.hour()) * 3600000) // 60*60*1000

      // 配置全局的基本URL
      this.$axios.defaults.timeout = 1000
      this.$axios.defaults.baseURL = 'https://cm.660901.cn/v1'
      this.dal(2) // 记录刷新pad
    },
    // 开始计时
    run () {
      // 换点
      this.fclock()
      this.bootimer = setTimeout(this.run, (1000 - this.bjtime.millisecond()))
    },
    // 广告更换
    ad () {
      // 凌晨更换图片
      this.$router.go(0) // 刷新，重置，间接换广告
    },
    // 显示时钟
    fclock () {
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
    // 图片加载完毕
    fitimage () {
      // 更换图片+不加空白
      if (this.adPicture === 0) {
        this.adPicture = moment().utcOffset(this.timezone).date()
        this.imgtimer = setTimeout(this.fitimage, 500)
      } else {
        // 兼容性刷新图片
        objectFitImages(this.$refs.adPic)
      }
    },
    // 记录kindle访问
    dal (worktype) {
      this.$axios.post('/kindle', {
        cid: sessionStorage.getItem('cid'),
        cip: sessionStorage.getItem('cip'),
        cname: sessionStorage.getItem('cname'),
        cwork: worktype
      }).then(res => {
        // console.log(res.data)
        return res.data
      }).catch(err => {
        // 请求拦截器和响应拦截器抛出错误时，返回的err对象会传给当前函数的err对象
        // console.log(err)
        return err
      })
    },
    getURLParameter (name, urlsearch) {
      try {
        return (decodeURIComponent(
          (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(urlsearch || location.search))[1].replace(/\+/g, '%20')
        ))
      } catch {
        return ''
      }
    },
    isNotEmptyStr (s) {
      if (typeof s === 'string' && s.length > 0) {
        return true
      }
      return false
    }
  },
  mounted () {
    this.flipObjs = [
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2
    ]
    objectFitImages(this.$refs.adPic)
    this.init()
  },
  beforeDestroy () {
    clearTimeout(this.bootimer)
    clearTimeout(this.adtimer)
    clearTimeout(this.imgtimer)
    this.bootimer = null
    this.adtimer = null
    this.imgtimer = null
  }
}
</script>

<style>
.FlipClock .PadImg {
     object-fit: contain;
     font-family: "object-fit: contain;";
     width: 85%;
     max-height: 65%;
}
</style>
