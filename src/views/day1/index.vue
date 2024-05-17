
<template>
  <div class="container" :class=" state.inputFlag ? 'contanierShadow':'' "></div>
  <div class="timeBox curp">{{ state.currentTime }}</div>
  <div class="contentBox">
    <div class="searchBox" :class=" state.inputFlag ? 'inputActived':''">
      <el-icon :size="20" class="ml20 iconCls" :class="state.iconShow? 'iconShow':''">
        <Platform />
      </el-icon>
      <input type="text" class="inputCls" :placeholder=" state.inputFlag ?'':'搜索'" @click="changeFlag(e)" v-model="state.inputValue">
      <el-icon :size="20" class="mr20 iconCls" :class="state.iconShow? 'iconShow':''">
        <Search />
      </el-icon>
    </div>
  </div>
  <div class="footer">
    <span class="textItem"> 闽ICP备16025935号-2 </span> |
    <span class="textItem">闽公网安备35010202001376号</span>
  </div>
</template>

<script  setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'

const state = reactive({
  inputFlag: false,
  iconShow: false,
  currentTime: '',
  timer: null,
  inputValue: ''
})
const listenClick = e => {
  console.log(typeof e.target.className, 222)
  if (typeof e.target.className == `object`) {
    return
  } else if (e.target.className?.includes(`container`)) {
    state.inputFlag = false
    state.iconShow = false
    state.inputValue = ''
  }
}
onMounted(() => {
  window.addEventListener('click', listenClick)
  // 初始化当前时间
  updateTime()
  // 每秒更新时间
  state.timer = setInterval(updateTime, 1000)
})
onUnmounted(() => {
  window.removeEventListener('click', listenClick)
  if (state.timer) {
    clearTimeout(state.timer)
    state.timer = null
  }
})
const updateTime = () => {
  state.currentTime = dayjs().format('HH:mm')
  console.log(state.currentTime)
}
const changeFlag = e => {
  state.inputFlag = true
  state.iconShow = true
}
</script>

<style lang="scss">
html,
body,
#app {
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  background-image: url('@/assets/day1Bg.jpg');
  background-size: 100% 100%;
  transition: 0.25s;
}
.contentBox {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
}
.searchBox {
  height: 50px;
  width: 300px;
  background: transparent;
  backdrop-filter: blur(3px);
  border-radius: 30px;
  box-shadow: 0 0 5px 1px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: width 0.5s ease 0s;
  &:hover {
    width: 500px;
    background: rgba($color: #fff, $alpha: 0.7);
    transition: width 0.5s ease 0s;
    input::-webkit-input-placeholder {
      color: #878b8d;
    }
  }
  .inputCls {
    height: 50px;
    border: none;
    background: transparent;
    text-align: center;
    flex: 1;
    &:focus {
      border: none;
      outline: none;
    }
  }
}
.timeBox {
  // width: 100%;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 42px;
  text-shadow: 3px;
  &:hover {
    font-size: 52px;
    transition: 0.5s;
  }
}
.inputActived {
  width: 500px;
  background: rgba($color: #fff, $alpha: 0.7);
  transition: width 0.5s ease 0s;
}
.contanierShadow {
  filter: blur(10px);
  transform: scale(1.1);
  transition: 0.25s;
}
.iconCls {
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  visibility: hidden;
}
.iconShow {
  visibility: visible;
  transition: 0.5s;
  &:hover {
    background: #fff;
  }
}
.footer {
  position: fixed;
  bottom: 20px;
  left: 50%;
  font-size: 13px;
  padding: 2px 5px;
  transform: translate(-50%, 0);
  backdrop-filter: blur(10px);
  color: #878b8d;

  .textItem {
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
}

input::-webkit-input-placeholder {
  color: rgba($color: #fff, $alpha: 0.8);
}
</style>