function Shading(props) {
    return (
        <div className="shading" onClick={props.score >= 0 ? props.click : null}>
            <button onClick={props.click}>{props.message}</button>
            {props.score >= 0 ? <p>{props.secmsg ? props.secmsg : "Score:"} <strong>{props.secmsg !== "Game Expired Or False Move" ? props.score : null}</strong></p> : null}
        </div>
    )
}

export default Shading;