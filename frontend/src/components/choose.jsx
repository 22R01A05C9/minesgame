function Choose({setshow}){
    const changechoose = (e)=>{
        if(e.target.classList.contains("choose")) return;
        e.target.classList.add("cactive");
        setshow(e.target.textContent)
        e.target.nextElementSibling?.classList.remove("cactive")
        e.target.previousElementSibling?.classList.remove("cactive")
    }
    return(
        <div className="choose" onClick={changechoose}>
            <p className="cactive">Game</p>
            <p>Statistics</p>
        </div>
    )
}


export default Choose