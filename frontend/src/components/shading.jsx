function Shading(props) {
    return (
        <div className="shading" onClick={props.score >= 0 ? props.click : null}>
            <button onClick={props.click}>{props.message}</button>
            {props.score >= 0 ? <p>{props.secmsg ? props.secmsg : "Score:"} <strong>{props.score}</strong></p> : null}
        </div>
    )
}

export default Shading;