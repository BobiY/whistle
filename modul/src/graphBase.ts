// 各类图形的基类

export default abstract class GraphBase{

    abstract  draw() :void //画图形的方法

    abstract pointInGraph() :boolean // 判断点是否存在于图形中， 这个方法的实现需要根据各自图形的特性自定义


}