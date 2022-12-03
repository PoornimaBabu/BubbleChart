import React, { useRef, useEffect, useState } from 'react'
import '../App.css'

const BubbleChart = props => {

    const {x, y, z, desc, w, h, bubbleSize, chartData} = props

    // console.log('w h', w, h)
    
    const canvasWidth = w > window.innerWidth ? window.innerWidth : w
    const canvasHeight = h > window.innerHeight ? window.innerHeight : h
    const GRAPH_WIDTH = canvasWidth - 25
    const GRAPH_HEIGHT =  canvasHeight - 25

    const GRAPH_LEFT = 25
    const GRAPH_TOP = 25
    // let GRAPH_BOTTOM = 25
    // let GRAPH_RIGHT = 25

    
    const [maxX, setMaxX] = useState(0)
    const [maxY, setMaxY] = useState(0)
    const [xRatio, setXRatio] = useState(0)
    const [yRatio, setYRatio] = useState(0)
  
    const canvasRef = useRef(null)

    function getMax(value){
        // console.log('val', value)
        let maxV = 0
        if(value === x){
            maxV = chartData?.map(v => v[x]).sort((a,b) => (b-a))[0]
        }
        
        if(value === y){ 
            maxV = chartData?.map(v => v[y]).sort((a,b) => (b-a))[0]
        }

        maxV = maxV + 50
        // console.log('maxV', maxV)      
        return maxV
        
    }
    
    function drawAxes(c){
        c.clearRect(0,0,w,h)
        c.beginPath();
        console.log('x y', x, y)
        // Drawing y-axis
        c.moveTo(GRAPH_WIDTH/2,GRAPH_TOP)
        c.lineTo(GRAPH_WIDTH/2,(GRAPH_HEIGHT))
        c.stroke();
         c.fillText(x, GRAPH_LEFT, GRAPH_HEIGHT/2 - 15 )

        // Drawing x-axis
        c.moveTo(GRAPH_LEFT,GRAPH_HEIGHT/2)
        c.lineTo((GRAPH_WIDTH),GRAPH_HEIGHT/2)
        c.stroke();
        c.fillText(y, GRAPH_WIDTH/2 + 5, GRAPH_HEIGHT + 5 )  
        
    }

    function drawXTicks(c, noOfTicks){
        c.fillStyle = "black"; 
        const inc = GRAPH_WIDTH/(noOfTicks - 1)
        // console.log('xRatio',xRatio, yRatio)
        let i = 0
       while(i < GRAPH_WIDTH - 25) { 
        // console.log('i  graphwidth', i, GRAPH_WIDTH )
            c.beginPath(); 
            c.moveTo(i + GRAPH_LEFT,GRAPH_HEIGHT/2); 
            c.lineTo(i + GRAPH_LEFT,(GRAPH_HEIGHT/2)+5);         
            c.stroke(); 
            if(xRatio) c.fillText(roundDigits(i/xRatio) + "", i + GRAPH_LEFT -5, (GRAPH_HEIGHT/2)+15 );            
            
            i = Math.floor(i + inc)
        }
    }

    function drawYTicks(c, noOfTicks){
        c.fillStyle = "black"; 
        const inc = GRAPH_HEIGHT/noOfTicks
        let j = 0
       while(j < GRAPH_HEIGHT - 25) { 
            c.beginPath(); 
            c.moveTo(GRAPH_WIDTH/2, GRAPH_TOP + j); 
            c.lineTo(GRAPH_WIDTH/2 + 5, GRAPH_TOP + j);         
            c.stroke(); 
            if(yRatio) c.fillText(roundDigits(j/yRatio) + "", GRAPH_WIDTH/2 + 10, GRAPH_TOP + j + 4);
            
            j = Math.floor(j + inc)
        }
    }

    function roundDigits(x) {
        let val = Number.isInteger(x) ? x : Number.parseFloat(x).toFixed(1)
        return val
    }

    function drawCircle(c){
        // console.log('xyz',x,y,z,desc)
        for(let k=0; k<chartData?.length; k++) { 
        
            c.beginPath();
            const dp = chartData[k];
            c.arc(dp[x] * xRatio, dp[y] * yRatio, dp[z]*(bubbleSize/100), 0, 2 * Math.PI);
            c.stroke();
            c.fillStyle = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.3)`
            c.fill();
            c.fillStyle = "#000000";
            c.textAlign = 'center';
            if(desc) c.fillText(`${dp[desc]}`, dp[x]*xRatio, dp[y]*yRatio, dp[z]*(bubbleSize/100));            
            
        } 
    }



  useEffect(() => {
    let xVal = getMax(x)
    let yVal = getMax(y)
    // console.log('xVal yVal', xVal,yVal)
    setMaxX(xVal) 
    setMaxY(yVal)
    setXRatio(GRAPH_WIDTH/xVal)
    setYRatio(GRAPH_HEIGHT/yVal)
  }, [chartData, GRAPH_WIDTH, GRAPH_HEIGHT])


 
  useEffect(() => {
    // console.log('maxx maxy xratio yratio', maxX, maxY, xRatio, yRatio)
    const canvas = canvasRef.current
    canvas.width = w
    canvas.height = h
    const context = canvas.getContext('2d')

    drawAxes(context)
    drawXTicks(context, 10)
    drawYTicks(context, 10)
    drawCircle(context)
    
  }, [maxX, maxY, xRatio, yRatio, bubbleSize])

  if(!chartData) return null

  return <canvas ref={canvasRef} id="myCanvas"/>

}

export default BubbleChart