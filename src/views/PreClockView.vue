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
    <!-- <p>{{'/images/pre/'+adPicture.toString()+'.jpg'}}</p> -->
    <!-- <p>{{clientHeight}}</p> -->
    <img :src="'/images/pre/'+adPicture.toString()+'.jpg'" :alt="adPicture" ref="adPic"/>
  </div>
</template>

<script>
import Flipper from '@/components/Flipper.vue'
import moment from 'moment'
import objectFitImages from 'object-fit-images'

export default {
  name: 'PreClockView',
  data () {
    return {
      bootimer: null, // 校时倒计时时钟
      adtimer: null, // 广告倒计时时钟
      flipObjs: [], // 翻牌数字列表
      wzoom: document.body.clientWidth / 320, // 放大倍数
      bjtime: moment().utcOffset(480), // 北京时间
      adPicture: 1, // 广告图片
      adNum: 1 // 当前广告号
      // clientWidth: document.body.clientWidth,
      // clientHeight: document.body.scrollHeight
    }
  },
  // 监控变量变化
  // watch: {
  //   adPicture () {
  //     objectFitImages(this.$refs.adPic)
  //   }
  // },
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
      // 配置全局的基本URL
      this.$axios.defaults.timeout = 1000
      this.$axios.defaults.baseURL = 'https://cm.660901.cn/v1'
      this.dal(1) // 记录刷新
    },
    // 开始计时
    run () {
      this.fclock()
      this.bootimer = setTimeout(this.run, (60 - this.bjtime.second()) * 1000 - this.bjtime.millisecond())
    },
    // 广告更换
    ad () {
      if (this.adPicture === 100) {
        if (this.adNum === 31) {
          this.adPicture = 1
          this.adNum = 1
        } else {
          this.adNum += 1
          this.adPicture = this.adNum
        }
        this.adtimer = setTimeout(this.ad, 1000) // 更换未来图片
      } else {
        this.adPicture = 100
        this.adtimer = setTimeout(this.ad, 4000) // 更换未来图片
      }
      objectFitImages(this.$refs.adPic)
      // setTimeout(this.loadimg, 200)
    },
    // 显示时钟
    fclock () {
      this.bjtime = moment().utcOffset(480)
      const nextTimeStr = this.bjtime.format('HHmmss')
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nextTimeStr[i])
      }
    },
    // 图片加载完毕
    loadimg () {
      // 刷新图片
      objectFitImages(this.$refs.adPic)
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
     object-fit: contain;
     font-family: "object-fit: contain;";
     width: 90%;
     max-height: 50%;
}
</style>
