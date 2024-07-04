<template>
  <div id="app">
    <div class="main"><router-view/></div>
    <div class="footer">
      <a href="https://github.com/xyxwz/kindlex">GitHub&nbsp;</a> |
      <router-link to="/">&nbsp;Kindle&nbsp;</router-link> |
      <router-link to="/i">&nbsp;iPad&nbsp;</router-link> |
      <a @click="showInput">&nbsp;Time Zone&nbsp;</a> |
      <div v-if="isInputVisible">
        <div class="overlay" @click="closeInput"></div>
        <div class="input-container">
          <label for="timezone-input">当地时区 TimeZone：</label>
          <input id="timezone-input" type="text" v-model="tempInputValue" placeholder="请输入-12~12的数字。Please enter a number from -12 to 12.">
          <button @click="setValue">OK</button>
          <!-- <button @click="closeInput">取消</button> -->
        </div>
      </div>
      <a @click="about">&nbsp;About</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isInputVisible: false,
      tempInputValue: '',
      timezoneValue: 8
    }
  },
  methods: {
    about () {
      alert('版权说明Copyright Notice\r本网站所有图片归原作者所有，如有侵权请立即与我们联系，我们将及时处理。\rAll images on this website are the property of their respective owners. If there is any infringement, please contact us immediately and we will deal with it promptly.\r小红书号Xiaohongshu Account：660901cn')
    },
    showInput () {
      this.tempInputValue = this.timezoneValue.toString()
      this.isInputVisible = true
    },
    closeInput () {
      this.isInputVisible = false
    },
    setValue () {
      const reg = /^([-+])?(0|([1-9]\d*))(\.\d+)?$/
      if (!reg.test(this.tempInputValue)) {
        alert('请输入-12至12之间，0.5为最小单元的世界时区数字\rPlease enter a world time zone number between -12 and 12, with increments of 0.5.')
      } else {
        const val = parseFloat(this.tempInputValue)
        if (val < -12 || val > 12 || val % 0.5 !== 0) {
          alert('请输入-12至12之间，0.5为最小单元的世界时区数字\rPlease enter a world time zone number between -12 and 12, with increments of 0.5.')
        } else {
          this.timezoneValue = val
          localStorage.setItem('timezoneValue', this.timezoneValue)
          this.isInputVisible = false
          // 刷新页面
          // this.$router.go(0)
          location.reload()
        }
      }
    }
  },
  mounted () {
    // 从localStorage中获取vtimezoneValue的值
    // this.timezoneValue = parseFloat(localStorage.getItem('timezoneValue')) || this.timezoneValue
    this.timezoneValue = !isNaN(parseFloat(localStorage.getItem('timezoneValue'))) ? parseFloat(localStorage.getItem('timezoneValue')) : this.timezoneValue
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  padding-top: 30px;
  padding-bottom: 30px;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  // border: 1px;
  // border-color:brown;
  // border-style: solid;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 30px;
  font-size: x-small;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.input-container {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-osx-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.input-container label {
  font-size: 24px;
  padding: 10px;
}
.input-container input {
  width: 75%;
  font-size: 32px;
  padding: 10px;
  margin-bottom: 10px;
}
.input-container button {
  font-size: 24px;
  padding: 10px 20px;
  margin-left: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>
