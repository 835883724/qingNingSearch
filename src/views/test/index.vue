<template>
  <div class="test">
    <input type="file" @change="handleFileChange" />
    <button @click="sendMessage">发送</button>
  </div>
</template>

<script setup >
import { ref, reactive } from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { io } from 'socket.io-client'

const state = reactive({
  url: 'https://150.223.245.42/csrobot/cschannels/openapi/voice/asr?apiKey=16B5C109FB124BE199705178982AFF01',
  apiKey: '16B5C109FB124BE199705178982AFF01',
  secretKey: '08E126407ACA40ED947246EB4B5ED3DA',
  traceId: Math.random(),
  timestamp: Date.now(),
  resultHeader: '',
  websock: null
})
const sendMessage = () => {
  state.websock.send(
    JSON.stringify({
      req_id: Math.random,
      rec_status: 0
    })
  )
}

const handleaaa = () => {
  console.log(state.timestamp, 'timestamp')
  state.resultHeader = CryptoJS.SHA256(state.apiKey + '-' + state.secretKey + '-' + state.traceId + '-' + state.timestamp).toString()
  state.allurl = `${state.url}?apiKey=${state.apiKey}&appSign=${state.resultHeader}&traceId=${state.traceId}&timestamp=${state.timestamp}`
}
// handleaaa()
const openWebsocket = () => {
  console.log('链接成功')
}
const onMessage = e => {
  console.log(`接受数据`, e.data)
}
const createClient = () => {
  console.log(state.allurl, 'state.allurl')
  state.websock = new WebSocket(state.allurl)

  state.websock.onopen = openWebsocket()
  state.websock.onmessage = function (e) {
    onMessage(e)
  }
}
// createClient()

const handleFileChange = async event => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  console.log(file, 'file')
  state.traceId = Math.random()
  // 在这里处理文件流
  await handleaaa()
  // console.log(fileStream, 121312, state.resultHeader)
  const formdata = new FormData()
  formdata.append('timestamp', state.timestamp)
  formdata.append('traceId', state.traceId)
  formdata.append('audioFile', file)
  axios
    .request({
      baseURL: '/asrTest',
      url: `/csrobot/cschannels/openapi/voice/asr?apiKey=${state.apiKey}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;UTF-8',
        'App-Sign': state.resultHeader
      },
      data: formdata
    })
    .then(res => {})
  // }
  // reader.readAsArrayBuffer(file)
}
</script>

<style scoped lang='scss'>
</style>