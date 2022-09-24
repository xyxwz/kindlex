<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/clock">Clock</router-link> |
      <router-link to="/about">About</router-link> -->
    </nav>
    <div class="main"><router-view/></div>
    <div class="footer">
      <a href="https://beian.miit.gov.cn/">京ICP备2022019482号-1&nbsp;</a> |
      <router-link to="/">&nbsp;Kindle&nbsp;</router-link> |
      <router-link to="/i">&nbsp;iPad&nbsp;</router-link> |
      <a @click="timezone">&nbsp;Time Zone&nbsp;</a> |
      <a @click="about">&nbsp;About</a>
    </div>
  </div>
</template>

<script>
// import miniToastr from 'mini-toastr'

export default {
  name: 'app',
  methods: {
    timezone () {
      // miniToastr.info('地址：https://660901.cn/?z=时区值，如：\r 格林尼治标准时间地址https://660901.cn/?z=0 \r 爪哇时间+07:30地址https://660901.cn/?z=7.5 \n 夏威夷时间-09:00地址https://660901.cn/?z=-9', '地址设置', 5000)
      alert('时区地址：660901.cn/?z=时区\r示例如下：\r格林尼治标准时间地址：660901.cn/?z=0\r爪 哇 时间+07:30地址：660901.cn/?z=7.5\r夏威夷时间-09:00地址：660901.cn/?z=-9\r\riPad翻页时钟地址：660901.cn/i/?z=时区')
    },
    about () {
      alert('版权说明\r\t本网站所有图片归原作者所有，如有侵权请立即与我们联系，我们将及时处理\r\t小红书号：660901cn')
    }
  },
  mounted () {
    // miniToastr.init()
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}

nav {
  padding: 20px;

  // a {
  //   font-weight: bold;
  //   color: #2c3e50;

  //   &.router-link-exact-active {
  //     color: #2c3e50;
  //   }
  // }
}

a {
  text-decoration:none;
  // font-weight: bold;
  color: #3f3f3f;
  cursor: pointer;
}

a:hover {
  text-decoration:underline;
  color: #000000;
}

.main {
  padding-bottom: 30px;
  overflow-y: hidden;
  // height: calc(100vh - 50px);
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 30px;
  // background: #42b983;
  // color: #fff;
  // text-align: left;
  font-size: x-small;
}
</style>
