import React from "react"
import {useEffect, useRef, useState,useLayoutEffect} from "react"
import * as d3 from "d3"

class Walker{
  constructor(x,y,canvas){
    this.x = x
    this.y = y
  }

  draw(ctx,frameCount){
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'grey'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

}

class Circle{
  draw(ctx, frameCount){
    console.log("M: (Circle) draw!")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'grey'
    ctx.moveTo(ctx.canvas.width/2 + frameCount,ctx.canvas.width/2 + frameCount)
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }
}

const CanvasPlayground = props => {

  const canvasRef = useRef(null)
  let walker = new Walker(window.innerWidth/2, window.innerHeight/2)
  const circle = new Circle()

  const draw = (ctx, frameCount) => {
    console.log("M: (Circle) draw!")
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'grey'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    //Our draw came here
    const render = () => {
      frameCount+=0.1
      circle.draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    // render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [circle])

  return <canvas ref={canvasRef} {...props} class="module helloCanvas"/>
}

export default CanvasPlayground
