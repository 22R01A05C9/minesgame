function Shading(props) {
    return (
        <div className="shading">
            <button onClick={props.click}>{props.message}</button>
            {props.score >= 0 ? <p>Score: <strong>{props.score}</strong></p> : null}
        </div>
    )
}

export default Shading;