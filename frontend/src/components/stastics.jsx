import { useState } from "react"
import Statchart from "./statschart"
import Warning from "./warning"

function Stats({data}){
    const [show,setShow] = useState(false)
    const reset=()=>{
        setShow(true)
    }
    const clickedyes = ()=>{
        localStorage.setItem("minesstatistics", null);
        window.location.reload();
    }
    let last = data.last
    let chartdata = []
    last.forEach((element,index) => {
        chartdata.push({game:index+1,score:element})
    });
    return(
        <div className="statistics">
            <div className="left">
                <div className="info">
                    <div className="total">
                        <p> Total Games: <strong>{data.total}</strong> </p>
                    </div>
                    <div className="maxscore">
                        <p>Maximum Score: <strong>{data.max}</strong></p>
                    </div>
                    <div className="minscore">
                        <p>Minimum Score: <strong>{data.min}</strong></p>
                    </div>
                    <div className="average">
                        <p>Average Score: <strong>{data.avg}</strong></p>
                    </div>
                </div>
                <div className="resetstats">
                    <button onClick={reset}>Reset Statistics</button>
                </div>
            </div>
            <Statchart data={chartdata}/>
            {show && <Warning msg={"Are You Sure You Want To Reset Score?"} yes={clickedyes}  no={()=>setShow(false)}/>}
        </div>
    )
}

function Playgame(){
    return(
        <div className="playgame">
            <p>Please Play Atleast One Game To Display The statistics</p> 
        </div>
    )
}


function Statistics({display}){
    let tdata = localStorage.getItem("minesstatistics"), data;
    if(tdata){
        data = JSON.parse(tdata)
    }
    if(display){
        return (
            <div className="tab">
                {
                data ? <Stats  data={data}/> : <Playgame />
            }
            </div>
        )
    }
    else {
        return null
    }
    
}


export default Statistics