export default class MousePos {
    static instance: MousePos;

    static getInstance(): MousePos {
        if (!MousePos.instance) {
            MousePos.instance = new MousePos();
        }

        return MousePos.instance;
    }
    currentX: number; // 当前 鼠标的横坐标 
    currentY: number; // 当前 鼠标的纵坐标
    PrevX: number; // 上一次 鼠标的横坐标
    PrevY: number; // 上一次 鼠标的纵坐标
    constructor() {
        this.currentX = 0;
        this.currentY = 0;
        this.PrevX = 0;
        this.PrevY = 0;
    }
    setCurrentPos( x: number, y: number ) {
        this.currentX = x;
        this.currentY = y;
    }
    setPrevPos( x: number, y: number ) {
        this.PrevX = x;
        this.PrevY = y;
    }
    getCurrentPos() :{x: number, y:number} {
        return {
            x: this.currentX,
            y: this.currentY
        }
    }
    getPrevPos() :{ x: number, y: number } {
        return {
            x: this.PrevX,
            y: this.PrevY
        }
    }
    getDifferPos() :{x: number, y: number} {  // 计算前后两次鼠标耳朵坐标差
        return {
            x: this.currentX - this.PrevX,
            y: this.currentY - this.PrevY
        }
    }
}