<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/clock">Clock</router-link> |
      <router-link to="/about">About</router-link> -->
    </nav>
    <div class="main"><router-view/></div>
    <div class="footer"><a href="https://beian.miit.gov.cn/">&nbsp;京ICP备2022019482号-1</a></div>
  </div>
</template>

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
  text-decoration:none;
  color: #3f3f3f;
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
