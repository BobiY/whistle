import * as Config from "./CommonVar";

export default class CkeckDataType{
    static instance;

    static getInstance(): CkeckDataType {
        if ( !CkeckDataType.instance ) {
            CkeckDataType.instance = new CkeckDataType();
        }
        return CkeckDataType.instance;
    }

    getDataType( data: any ): string {
        return Object.prototype.toString.call(data);
    }

    checkAimDataType( data: any, hopeType: string ): boolean {  // 数据是否和期望类型一致
        const result = hopeType.toLocaleLowerCase();
        const dataTypeString = this.getDataType(data);
        const flge = Config.DATATYPE_TO_STRING.indexOf( dataTypeString ) !== -1;
        if ( flge ) {
            return dataTypeString.toLocaleLowerCase().indexOf( result ) !== -1;
        } 
        return false;
    }
}