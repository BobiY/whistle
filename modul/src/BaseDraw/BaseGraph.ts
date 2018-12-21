import { IBaseGraphProps } from "../interface/Graph/BaseProps";
import * as Config from "../Util/CommonVar";
export default class BaseGraph implements IBaseGraphProps {
    static instance;

    static getInstace() {
        if ( !BaseGraph.instance ) {
            BaseGraph.instance = new BaseGraph();
        }
        return BaseGraph.instance;
    }
    id: Symbol;
    fontColor: string;
    fillColor: string;
    strokeColor: string;
    fontSize:　string;
    lineWidth: number;
    constructor() {
        this.id = Symbol();
        this.fontColor = Config.FONT_COLOR;
        this.fillColor = Config.FILL_COLOR;
        this.fontSize = Config.FONT_SIZE;
        this.lineWidth = Config.LINE_WIDTH;
        this.strokeColor = Config.STORKE_COLOR;
    }

}