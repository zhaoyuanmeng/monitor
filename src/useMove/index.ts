import {  CanvasEngine, Rect, EventName } from "ycanvas";

import type { CanvasEngineProps } from "../types/useMove";

// 这个没有封装，思路是从base上继承然后添加新方法，最后组合成一个功能
// 优化点：传参，公用engine 变化的都设置成参数传递接收
export function useMove(option: CanvasEngineProps) {
  // 利用闭包的思路写
  let isDrag: boolean = false;
  let now = { x: 0, y: 0 }; // 鼠标的位置 相对于canvas里面的位置
  let pos = { x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0, x4: 0, y4: 0 }; // 起始点的位置，这里默认(x1, y1)为(0, 0)
  /**
   * @author Zhao YuanDa
   * @parms: width:canvas宽度 height canvas高度
   * @description: //判断并纠正临界点
   * @date 2022-09-02 11:35
   */
  const judgePosition = (
    canvasWidth = 200,
    canvasHeight = 200,
    rectWidth = 100,
    rectHeight = 100
  ) => {
    // 单边出界的情况和两边出界共三种情况
    // 只要保证左上角和右下角的三种情况都不出界，所有情况都不会出界了。
    if (pos.x1 < 0 && pos.y1 > 0) {
      updatePos(0, pos.y1);
    } else if (pos.x1 > 0 && pos.y1 < 0) {
      updatePos(pos.x1, 0);
    } else if (pos.x1 < 0 && pos.y1 < 0) {
      updatePos(0, 0);
    } else if (pos.x3 > canvasWidth && pos.y3 < canvasHeight) {
      updatePos(canvasWidth - rectWidth, pos.y3 - rectHeight);
    } else if (pos.x3 < canvasWidth && pos.y3 > canvasHeight) {
      updatePos(pos.x3 - rectWidth, canvasHeight - rectHeight);
    } else if (pos.x3 > canvasWidth && pos.y3 > canvasHeight) {
      updatePos(canvasWidth - rectWidth, canvasHeight - rectHeight);
    }
  };

  /**
   * @author Zhao YuanDa
   * @parms: x:最左上角的横坐标 y:纵坐标
   * @description: //更新点的信息
   * @date 2022-09-02 11:42
   */
  const updatePos = (x: number, y: number) => {
    pos.x1 = x;
    pos.y1 = y;
    pos.x2 = x + 100;
    pos.y2 = y;
    pos.x3 = x + 100;
    pos.y3 = y + 100;
    pos.x4 = x;
    pos.y4 = y + 100;
  };

  const updateNowPositon = (x: number, y: number) => {
    // 更新当前点
    now.x = x;
    now.y = y;
  };
  // 可以再这里面先生成一个canvas,这里写死了 可以拿option里面的参数
  const engine2 = new CanvasEngine({
    w: "200",
    h: "200",
    canvasTarget: option.canvasTarget,
  });
  
  const rect1 = new Rect({
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    zIndex: 0,
  });

  // 先初始化一下四个点的信息
  updatePos(pos.x1, pos.y1);
  engine2.render(rect1, {
    color: "red",
  });

  // 事件系统
  engine2.addEventListener(rect1, EventName.mousedown, (e) => {
    isDrag = true;
    updateNowPositon(e.clientX,e.clientY)
    console.log(now.x + " -> " + now.y);
  });
  engine2.addEventListener(rect1, EventName.mouseup, (e) => {
    isDrag = false;
  });
  engine2.addEventListener(rect1, EventName.mousemove, (e) => {
    if (isDrag) {
      let x = e.clientX;
      let y = e.clientY;
      // 计算绘制起点的变化位置
      pos.x1 = pos.x1 + (x - now.x);
      pos.y1 = pos.y1 + (y - now.y);
      // 更新其它点的位置
      updatePos(pos.x1, pos.y1);
      // 判断四个点的位置情况，不能越界
      judgePosition();
      // 这里面组装option
      let option = {
        x: pos.x1,
        y: pos.y1,
        w: 100, //可以弄成参数的形式
        h: 100, //同理
        zIndex: 0,
      };
      rect1.setOption(engine2, option);
      updateNowPositon(x, y);
    }
  });

}
