import * as Config from "../MouseEvent/MouseEvent";
import CkeckDataType from "./CkeckDataType";
export default class CheckEvent {
    static instance;

    static getInstance(): CheckEvent {
        if ( !CheckEvent.instance ) {
            CheckEvent.instance = new CheckEvent();
        }
        return CheckEvent.instance;
    }
    
    checkEventNameisSupport( eventName: string ) {
        const typeAll = CkeckDataType.getInstance().checkAimDataType( eventName, "string" );
        if ( !typeAll ) {
            console.log(`${eventName}事件暂不支持`)
        }
    }
}