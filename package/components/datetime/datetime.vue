<template>
      <div class="scene-datetime">
        <div class="scene-datetime-input">
          <calendar/>
          <input v-model="datetimeTemplate" @focus="calendarControl(true)" id="scene-datetime-input-input" type="text" readonly/>
        </div>
        <Transition name="scene-datetime">
          <KeepAlive>
            <div v-if="showCalendar">
              <div class="scene-datetime-arrow"></div>
              <div class="scene-datetime-calendar">
                <div class="scene-datetime-calendar-header">
                    <div>
                      <left216 @click="updateDatetime('year',modelValue.getFullYear()-1)"/>
                      <left16 src="/left_16.svg" @click="updateDatetime('month',modelValue.getMonth())"/>
                    </div>
                    <div>
                      <span style="margin-right:20px">{{modelValue.getFullYear()}}</span>
                      <span style="margin-right:20px">{{englishMonthName}}</span>
                    </div>
                    <div>
                      <right16 @click="updateDatetime('month',modelValue.getMonth()+2)"/>
                      <!-- <img src="/right_16.svg" @click="updateDatetime('month',modelValue.getMonth()+2)"> -->
                      <right216 @click="updateDatetime('year',modelValue.getFullYear()+1)"/>
                    </div>
                </div>
                <div class="scene-datetime-calendar-body">
                  <div class="scene-datetime-calendar-body-date">
                    <div class="scene-datetime-calendar-body-date-table">
                      <div class="scene-datetime-calendar-body-date-thead">
                          <div class="scene-datetime-calendar-body-date-headcell"><strong>Mon</strong></div>
                          <div class="scene-datetime-calendar-body-date-headcell"><strong>Tue</strong></div>
                          <div class="scene-datetime-calendar-body-date-headcell"><strong>Wed</strong></div>
                          <div class="scene-datetime-calendar-body-date-headcell"><strong>Thu</strong></div>
                          <div class="scene-datetime-calendar-body-date-headcell"><strong>Fri</strong></div>
                          <div class="scene-datetime-calendar-body-date-headcell"><strong>Sat</strong></div>
                          <div class="scene-datetime-calendar-body-date-headcell"><strong>Sun</strong></div>
                      </div>
                      <div class="scene-datetime-calendar-body-date-tbody">
                        <div class="scene-datetime-calendar-body-date-tline" v-for="(dateObjectArr,index) in screenArray" :key="'r'+index">
                          <div v-for="(dateObj,index) in dateObjectArr" :key="'c'+index" class="scene-datetime-calendar-body-date-bodycell" 
                            :is-selected="dateObj.isSelected"
                            :is-current-month="dateObj.isCurrentMonth"
                            @click="updateDatetime('Date',dateObj.date)"
                            >
                            {{dateObj.date.getDate()}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="scene-datetime-calendar-body-time">
                    <strong class="scene-datetime-calendar-body-time-label">Hour</strong>
                    <strong class="scene-datetime-calendar-body-time-label">Minute</strong>
                    <strong class="scene-datetime-calendar-body-time-label">Second</strong>
                    <s-scrollbar ref="hourScrollbar" :width="43" :height="210">
                      <div ref="hours">
                        <div v-for="(hour,index) in 24" :key="index" class="scene-datetime-calendar-body-time-cell" @click="updateDatetime('hour',hour-1)">{{hour-1}}</div>
                      </div>
                    </s-scrollbar>
                    <s-scrollbar ref="minuteScrollbar" :width="43" :height="210">
                      <div ref="minutes">
                        <div v-for="(minute,index) in 60" :key="index" class="scene-datetime-calendar-body-time-cell" @click="updateDatetime('minute',minute-1)">{{minute-1}}</div>
                      </div>
                    </s-scrollbar>
                    <s-scrollbar ref="secondScrollbar" :width="44" :height="210">
                      <div ref="seconds">
                        <div v-for="(second,index) in 60" :key="index" class="scene-datetime-calendar-body-time-cell" @click="updateDatetime('second',second-1)">{{second-1}}</div>
                      </div>
                    </s-scrollbar>
                  </div>
                </div>
                <div class="scene-datetime-calendar-footer">
                  <div>
                    <s-button size="small" type="text" theme="info" @click="updateDatetime('Date',new Date())">now</s-button>
                    <s-button size="small" type="text" theme="info" @click="updateDatetime('Date',createDate(modelValue.getFullYear(),modelValue.getMonth()+1,modelValue.getDate()))">clear time</s-button>
                  </div>
                  <s-button size="small" theme="success" @click="calendarControl(false)">confirm</s-button>
                </div>
              </div>
            </div>
          </KeepAlive>
        </Transition>
      </div>
</template>

<script lang='ts'>
import {computed, defineComponent, ref, watch, nextTick, onMounted} from 'vue'
import sButton from '../button/button.vue'
import sScrollbar from '../scrollbar/scrollbar.vue'
import {datetimeProps, datetimeEmits} from './datetime'
import {englishMonths, DateObject, getDateCountByYearAndMonth, getYearMonthDateHourMinuteSecond, createDate, getFullScreen} from '../../core/lib/date'
import {turnTo2dArray} from '../../core/lib/array'
import '../../styles/global.css'
import Calendar from '../svg/calendar.vue';
import Right16 from '../svg/right16.vue';
import Right216 from '../svg/right216.vue';
import Left216 from '../svg/left216.vue';
import Left16 from '../svg/left16.vue';
/**
 * 修改modelValue的七种模式
 */
type modelType = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second' | 'Date';

export default defineComponent({
  name:'scene-datetime',
  props:datetimeProps,
  emits:datetimeEmits,
  components:{ sButton, sScrollbar, Calendar, Right16, Right216, Left16, Left216 },
  setup(props,{emit,attrs,slots,expose}){
    // 模板引用
    const hours = ref<HTMLElement>()
    const minutes = ref<HTMLElement>()
    const seconds = ref<HTMLElement>()
    const hourScrollbar = ref<any>()
    const minuteScrollbar = ref<any>()
    const secondScrollbar = ref<any>()

    // 是否显示下拉日历
    let showCalendar = ref(false);
    // 控制下拉日历的显示
    function calendarControl(open: boolean){
      if(open){
        showCalendar.value = true
        nextTick(()=>{updateTimeCSS()}) //更新时间部分CSS样式
      }
      else{
        showCalendar.value = false
      }
    }

    // 更新时间部分样式
    function updateTimeCSS(){
      let hourDivCollection = hours.value?.children
      let minuteDivCollection = minutes.value?.children
      let secondDivCollection = seconds.value?.children
      for(let i=0;i<24;i++){
        hourDivCollection?.item(i)!.removeAttribute('is-selected')
      }
      hourDivCollection?.item(props.modelValue.getHours() as number)!.setAttribute('is-selected','true')
      hourScrollbar.value!.moveTo(props.modelValue.getHours() as number * 33,'Y')     // 调用滚动条内部的方法，自动滚动使得当前时间块到顶部

      for(let i=0;i<60;i++){
        minuteDivCollection?.item(i)?.removeAttribute('is-selected')
        secondDivCollection?.item(i)!.removeAttribute('is-selected')
      }
      minuteDivCollection?.item(props.modelValue.getMinutes() as number)?.setAttribute('is-selected','true')
      minuteScrollbar.value!.moveTo(props.modelValue.getMinutes() as number * 33,'Y') // 调用滚动条内部的方法，自动滚动使得当前时间块到顶部
      secondDivCollection?.item(props.modelValue.getSeconds() as number)!.setAttribute('is-selected','true')
      secondScrollbar.value!.moveTo(props.modelValue.getSeconds() as number * 33,'Y') // 调用滚动条内部的方法，自动滚动使得当前时间块到顶部
    }

    // 显示在input中的日期
    let datetimeTemplate = computed(()=>`${props.modelValue.getFullYear()}-${props.modelValue.getMonth()+1}-${props.modelValue.getDate()} ${props.modelValue.getHours()}:${props.modelValue.getMinutes()}:${props.modelValue.getSeconds()}`)
    // 当前显示的英文月份
    const englishMonthName = computed(()=>{
      return englishMonths.get((props.modelValue.getMonth()+1).toString())
    })
    // 当前显示的日历中的日期
    let screenArray = computed(()=>turnTo2dArray<DateObject>(getFullScreen(props.modelValue),6,7))

    /**
     * 修改v-model 绑定的日期时间(有7种修改模式),
     * 这里不能用 Date()自带的set函数，否则监听不到响应式的变化
     */
    function updateDatetime(model: modelType, value: number | Date){
      let oldDate = new Date(props.modelValue) // 未修改的日期时间
      let [year,month,date,hour,minute,second] = getYearMonthDateHourMinuteSecond(props.modelValue)
      switch(model){
        case 'year':
          emit('update:modelValue',createDate(value as number,month,date,hour,minute,second))
          emit('change',props.modelValue,oldDate)
          break
        case 'month':
          if(value === 0)
            emit('update:modelValue',createDate(year-1,12,date,hour,minute,second))
          else if(value === 13)
            emit('update:modelValue',createDate(year+1,1,date,hour,minute,second))
          else{
            // 需要更改的月份的总天数
            let MonthDateCount: number = getDateCountByYearAndMonth(year,value as number)
            if(date > MonthDateCount)// 修改的日期在更改的月份不存在，改为最后一天
              emit('update:modelValue',createDate(year,value as number,MonthDateCount,hour,minute,second))
            else
              emit('update:modelValue',createDate(year,value as number,date,hour,minute,second))
          }
          emit('change',props.modelValue,oldDate)
          break
        case 'date':
          emit('update:modelValue',createDate(year,month,value as number,hour,minute,second))
          emit('change',props.modelValue,oldDate)
          break
        case 'hour':
          emit('update:modelValue',createDate(year,month,date,value as number,minute,second))
          emit('change',props.modelValue,oldDate)
          break
        case 'minute':
          emit('update:modelValue',createDate(year,month,date,hour,value as number,second))
          emit('change',props.modelValue,oldDate)
          break
        case 'second':
          emit('update:modelValue',createDate(year,month,date,hour,minute,value as number))
          emit('change',props.modelValue,oldDate)
          break
        case 'Date': 
          emit('update:modelValue', value as Date)
          emit('change',props.modelValue,oldDate)
          break
      }
      nextTick(()=>{
        updateTimeCSS()
      }) //更新时间部分CSS样式
    }

    return{
      hours,
      minutes,
      seconds,
      hourScrollbar,
      minuteScrollbar,
      secondScrollbar,
      showCalendar,
      screenArray,
      englishMonthName,
      datetimeTemplate,
      calendarControl,
      updateDatetime,
      createDate,
    }
  }
})
</script>
<style scoped>
/**
* 动画的效果
*/
.scene-datetime-enter-active,
.scene-datetime-leave-active {
  transition: all 0.4s ease;
}

.scene-datetime-enter-from,
.scene-datetime-leave-to{
  visibility:hidden;
  opacity: 0;
}

.scene-datetime{
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  font-family: var(--scene-font-family);
}
/* 日期输入区域 */
.scene-datetime-input{
  display: flex;
  border: var(--scene-border-size) solid var(--scene-border-color-light);
  border-radius: var(--scene-border-radius);
  box-sizing: border-box; 
  width: 240px;
  height: 32px;
  justify-content: space-between;
  align-items: center;
}
.scene-datetime-input:hover{
  border: var(--scene-border-size) solid var(--scene-border-color-dark);
}
/* 日期输入区域的子元素有获取焦点时 */
.scene-datetime-input:focus-within{
  border: var(--scene-border-size) solid var(--scene-theme-color-main);
}
/* 日期输入框边上的图标 */
#scene-datetime-input-img{
  width: 28px;
  height: 32px;
  box-sizing: border-box; 
  padding: 8px 5px 8px 7px;
}
/* 日期输入框 */
#scene-datetime-input-input{
  width: 212px;
  height: 26px;
  box-sizing: border-box; 
  padding: 0 5px;
  outline: none;
  border: none;
  font-size: var(--scene-font-size);
  font-family: var(--scene-font-family);
  letter-spacing: var(--scene-letter-spacing);
  color: var(--scene-font-color-dark)
}
/* 日期选择器的箭头 */
.scene-datetime-arrow{
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    top: 40px;
    left: calc(50%);
    border-top: var(--scene-border-size) solid var(--scene-border-color-light);
    border-right: var(--scene-border-size) solid var(--scene-border-color-light);
    transform: rotate(-45deg);
    z-index: var(--scene-index-advanced);
}
/* 日期选择器的下拉日历 */
.scene-datetime-calendar{
  position: absolute;
  top: 45px;
  left: calc(-50%);
  border-radius: var(--scene-border-radius);
  width: 450px;
  height: 350px;
  background: white;
  z-index: var(--scene-index-heighter);

  border: var(--scene-border-size) solid var(--scene-border-color-light);
  box-shadow: var(--scene-box-shadow);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 日期选项器的头部 */
.scene-datetime-calendar-header{
  /* 总高度35px  */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px 0;
  width: 450px;
  height: 35px;
  border-bottom: var(--scene-border-inner-size) solid var(--scene-border-color-light);
}
/* 日期选择器的主体 */
.scene-datetime-calendar-body{
  box-sizing: border-box;
  display: flex;
  width: 450px;
  height: 280px;
  padding: 10px;
}
/* 日期选择器的日期部分 */
.scene-datetime-calendar-body-date{
  box-sizing: border-box;
  width: calc(300px - 10px);
  height: calc(280px - 20px);
}
/* 日历表的样式 */
.scene-datetime-calendar-body-date-table{
  width: 100%;
  height: 100%;
}
/* 日历表头 */
.scene-datetime-calendar-body-date-thead{
  width: 100%;
  height: 13%;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: var(--scene-border-inner-size) solid var(--scene-border-color-light);
}
/* 日历表头每一格 */
.scene-datetime-calendar-body-date-headcell{
  width: 14.28%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
/* 日历表主体 */
.scene-datetime-calendar-body-date-tbody{
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
}
/* 每一行 */
.scene-datetime-calendar-body-date-tline{
  width: 100%;
  height: 16.6%;
  display: flex;
}
/* 每一格 */
.scene-datetime-calendar-body-date-bodycell{
  margin: 5px;
  width: calc(14.28% - 10px);
  border-radius: 2px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
}
.scene-datetime-calendar-body-date-bodycell:hover{
  color:var(--scene-theme-color-main);
}
.scene-datetime-calendar-body-date-bodycell[is-selected="true"]{
  background:var(--scene-theme-color-main);
  color: white;
}
.scene-datetime-calendar-body-date-bodycell[is-current-month="false"]{
  color: var(--scene-color-dark-gray);
}
/* 日期选择器的时间部分 */
.scene-datetime-calendar-body-time{
  box-sizing: border-box;
  width: calc(150px - 10px);
  height: calc(280px - 20px);
  padding: 10px 0 10px 10px;
  /** content 宽：130px 高：240px*/
  display: flex;
  flex-flow: row wrap;
}
/* 时间部分表头 */
.scene-datetime-calendar-body-time-label{
  width: 43px;
  height: 30px;
  font-size: 12px;
}
/* 日历时间部分的每一个格 */
.scene-datetime-calendar-body-time-cell{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin: 7px 6px;
  height: 26px;
  font-size: 12px;
  cursor: pointer;
}
.scene-datetime-calendar-body-time-cell:hover{
  color: var(--scene-theme-color-main);
}
.scene-datetime-calendar-body-time-cell[is-selected="true"]{
  background:var(--scene-theme-color-main);
  color: white;
}
/* 日期选择器的底部 */
.scene-datetime-calendar-footer{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: var(--scene-border-inner-size) solid var(--scene-border-color-light);
  width: 450px;
  height: 35px;
  padding: 0 10px;
}
</style>