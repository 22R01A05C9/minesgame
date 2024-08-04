function Warning(props) {
    return (
        <div className="warningcard">
            <div className="warning">
                <h3>Warning!</h3>
                <p>{props.msg}</p>
                <div className="btn">
                    <button onClick={props.yes}>Yes</button>
                    <button onClick={props.no}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Warning;