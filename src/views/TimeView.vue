<template>
    <div>{{ currentTime }}</div>
  </template>

<script>
export default {
  name: 'TimeView',
  data () {
    return {
      currentTime: new Date().toLocaleTimeString()
    }
  },
  mounted () {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString()
    }, 1000)
  }
}
</script>
