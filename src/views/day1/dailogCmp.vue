<template>
  <div class="cover" v-if="props.showDialog">
    <div class="dialogBox" ref="fatherElement" :class="state.rotateFlag? 'dialogBoxRotate':''">
      <div class="close">
        <span ref="hoverButton" @click="emit('update:showDialog', false)">×</span>
      </div>
      <div class="contentBox">
        <div class="titleText">
          更换壁纸
        </div>
        <div class="bgPictrue">
          <img src="@/assets/day1Bg.jpg" alt="" class="mt30 imgCls">
          <img src="@/assets/day1Bg.jpg" alt="" class="mt30 imgCls">
          <img src="@/assets/day1Bg.jpg" alt="" class="mt30 imgCls">
        </div>
      </div>
    </div>
  </div>

</template>

<script setup >
import { ref, reactive, onMounted, nextTick } from 'vue'
import { watch } from '@vue/runtime-core'
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:showDialog'])
const hoverButton = ref(null)
const fatherElement = ref(null)
const state = reactive({
  rotateFlag: false
})

watch(
  () => props.showDialog,
  newvalue => {
    if (newvalue) {
      nextTick(() => {
        if (hoverButton.value) {
          hoverButton.value.addEventListener('mouseenter', function () {
            state.rotateFlag = true
          })
          hoverButton.value.addEventListener('mouseleave', function () {
            state.rotateFlag = false
          })
        }
      })
    } else {
      state.rotateFlag = false
    }
  }
)

onMounted(() => {})
</script>

<style scoped lang='scss'>
@keyframes ball {
  0% {
    transform: rotate3d(1, 1, 0, -30deg);
  }
  50% {
    transform: rotate3d(1, 1, 0, 10deg);
  }
  100% {
    transform: rotate3d(1, 1, 0, 0deg);
  }
}
.cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  backdrop-filter: blur(10px);
}
.dialogBox {
  position: absolute;
  z-index: 900;
  width: 600px;
  height: 500px;
  top: calc(50% - 250px);
  left: calc(50% - 300px);
  background: #fff;
  backdrop-filter: blur(10px);
  font-size: small;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0 15px 30px;
  transition: 0.3s;
  animation-name: ball;
  animation-duration: 0.5s;
}
.dialogBoxRotate {
  transform: rotate3d(1, 1, 0, 15deg);
  transition: 0.3s;
}
.close {
  text-align: right;
  margin-right: 15px;
  font-size: 42px;
  & span {
    cursor: pointer;
  }
}

.contentBox {
  width: 100%;
  box-sizing: border-box;
  padding: 0 50px;
  .titleText {
    font-size: 32px;
  }
}
.bgPictrue {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .imgCls {
    width: 150px;
    height: 100px;
    border-radius: 10px;
  }
}
</style>