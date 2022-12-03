// import { BubbleChart ' from "./components/BubbleChart";
import BubbleChart from './components/BubbleChart'
import AdjustChart from './components/AdjustChart';
import { useState, useEffect } from 'react';

function App() {
  const [chartData, setChartData] = useState([])
  const [height, setHeight] = useState(800)
  const [width, setWidth] = useState(600)
  const [bubble, setBubble] = useState(30)

  useEffect(() => {
    async function fetchData(){
        let response = await fetch('https://mocki.io/v1/18936d28-2f79-4840-b146-5622e8ad1e77')
        let data = await response.json()
        // console.log('data', data)
        if(data.length > 0){
            setChartData(data)            
        }         
    }     
    fetchData()  

  }, [])

  return (
    <div>      
        <AdjustChart type='Width' setVal={setWidth} value={width} step={100} min={200} />
        <AdjustChart type='Height' setVal={setHeight} value={height} step={100} min={200}/>
        <AdjustChart type='Bubble' setVal={setBubble} value={bubble} step={10} min={10} />
     
        <BubbleChart x='compratio' y='headcount' z='salary' desc='title' w={width} h={height} bubbleSize={bubble} chartData={chartData} /> 

    </div>
  );
  }

export default App;
