var _audioUtils = function () {
    var navigator = window.navigator
    navigator.mediaDevices = navigator.mediaDevices || {}
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    var AudioContext = window.AudioContext ||
        window.webkitAudioContext

    var isSupport = !!(navigator.mediaDevices.getUserMedia && AudioContext)
    var context = isSupport && new AudioContext()

    this.isSupport = isSupport

    this.analyser = null

    this.start = function () {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext  AudioContent API
        return new Promise((resolve, reject) => {
            alert('start promise')
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                alert('mediaDevices steam ok')
                const source = context.createMediaStreamSource(stream)
                this.analyser = context.createAnalyser()
                source.connect(this.analyser)
                this.analyser.fftSize = 2048
                resolve(this.analyser)
            })
            .catch(function (err) {
                alert(err)
                reject()
            })
        })
    }

    this.getVoiceSize = function () {
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount)
        this.analyser.getByteFrequencyData(dataArray)
        const data = dataArray.slice(100, 1000)
        const sum = data.reduce((a, b) => a + b)
        return sum
    }
}