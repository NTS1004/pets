// app.js
App({
  data: {
    innerAudioContext: null,
    isPlay: false
  },
  onLaunch() {
    this.data.innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: false
    })
    this.data.innerAudioContext.src = "/static/audio/1.mp3"
    this.data.innerAudioContext.loop = true
  },
  onMusic() {
    if (this.data.isPlay) {
      this.data.innerAudioContext.pause()
    } else {
      this.data.innerAudioContext.play()
    }
    this.data.isPlay = !this.data.isPlay
  }
})