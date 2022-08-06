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
      <a @click="buildToast">&nbsp;Time Zone 时区设置</a>
    </div>
  </div>
</template>

<script>
// import miniToastr from 'mini-toastr'

export default {
  name: 'app',
  methods: {
    buildToast () {
      // miniToastr.info('地址：https://660901.cn/?z=时区值，如：\r 格林尼治标准时间地址https://660901.cn/?z=0 \r 爪哇时间+07:30地址https://660901.cn/?z=7.5 \n 夏威夷时间-09:00地址https://660901.cn/?z=-9', '地址设置', 5000)
      alert('时区地址：https://660901.cn/?z=时区值  如：\r格林尼治标准时间地址\t https://660901.cn/?z=0 \r爪 哇 时间+07:30地址\t https://660901.cn/?z=7.5 \r夏威夷时间-09:00地址\t https://660901.cn/?z=-9')
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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #2c3e50;
    }
  }
}

a {
  text-decoration:underline;
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
