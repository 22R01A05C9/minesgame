import { LineChart, XAxis, YAxis, Tooltip, Line, CartesianGrid, ResponsiveContainer } from "recharts"

function Statchart({data}){
    return(
        <div className="chart">
            <p>Statistics For Last 10 Games </p>
            <ResponsiveContainer height={"100%"} width={"90%"} style={{position:"relative","left":"-3%"}}>
                <LineChart data={data}>
                    <XAxis dataKey={"game"} label={{ value: "Games", position: "insideBottom", offset: -5, dx:-15 }} />
                    <YAxis label={{ value: "Scores", position: "insideLeft", offset: 15, angle:-90, dy:22}}/>
                    <CartesianGrid stroke="var(--text)"/>
                    <Tooltip contentStyle={{backgroundColor:"var(--blue-dim)", color:"var(--text)", "borderRadius":"10px", "border":"1px solid var(--text)"}}  itemStyle={{color:"var(--text)"}}/>
                    <Line type="monotone" stroke="var(--blue)" dataKey={"score"} strokeWidth={2}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        
    )
}

export default Statchart