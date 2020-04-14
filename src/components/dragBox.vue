<template>
    <div class=" fixed" :style="{left:dragCfg.left,top:dragCfg.top}" @mousedown="mousedown( $event)" @mouseup='mouseup( $event)'>
        +<slot style="display: inline-block"></slot>

    </div>
</template>

<script>
export default {
    name: "dragBox",
    props: {
        dragCfg: {
            left: {
                type: String,
                default: '500px'
            },
            top: {
                type: String,
                default: '500px'
            }
        }
    },
    methods: {
        mousedown: function ( event) {
             event=event||window.event;
            let _target = event.target
            let startx=event.clientX;
            let starty=event.clientY;
            let sb_bkx=startx-event.target.offsetLeft;
            let sb_bky=starty-event.target.offsetTop;
            let ww=document.documentElement.clientWidth;
            let wh = window.innerHeight;
            if (event.preventDefault) {
                event.preventDefault();
            } else{
                event.returnValue=false;
            };
            document.onmousemove=function (ev) {
                let event=ev||window.event;
                let scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
                if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
                    return false;
                };
                let endx=event.clientX-sb_bkx;
                let endy=event.clientY-sb_bky;
                _target.style.left=endx+'px';
                _target.style.top=endy+'px';
            }
        },
        mouseup: function (e) {
            document.onmousemove=null;
        }
    }
}
</script>

<style scoped>
    .fixed{
        z-index: 999;
        text-align: right;
        padding: 0px 10px 15px 10px;
        border:1px #CCC solid;
        width: auto;
        height: auto;
        position: fixed;
        cursor: move;
    }
</style>