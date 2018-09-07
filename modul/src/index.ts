// 暴露的全局对象

import BaseWhistle from "./base";


// 将舞台对象在全局创建
const win: any = window
win.Stage = BaseWhistle;