export default{
    now_time : 0,//歌曲当前时间
    timer : '',//定时器
    lrcObj : [],// 解析后歌词
    lrcTime:[],//解析后歌词时间
    // 毫秒转分秒
    formatData(time){
        var msg = parseInt(time/1000);
        if(null !== msg && ""!== msg){
            //秒数个位补0
            msg = parseInt(msg/60)+':'+(parseInt(msg%60).toString()[1]?parseInt(msg%60):'0'+parseInt(msg%60))  
        }
        return msg
    },
    // 鼠标拖拽事件
    formatMouse(){
        
    }
}