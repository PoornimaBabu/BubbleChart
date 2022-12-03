import { Fragment } from "react"
import '../App.css'

export default function AdjustChart(props){

    const {type, setVal, value, step, min} = props

    function handleDecrement(){
        if(value > min){
            setVal((prev) => prev - step)
        }
    }

    return (
        <Fragment>        
            <div style={{display: 'flex', margin: '3px', justifyContent:'space-evenly', maxWidth: '200px'}}>   
                <h4 style={{minWidth: '50px'}}>{type} </h4>     
                <button className="btn" onClick={handleDecrement}>-</button>
                <h5 style={{minWidth: '25px'}}>{value}</h5>
                <button className="btn" onClick={() => setVal((prev) => prev + step)}>+</button>
            </div>
        </Fragment>
    )
}