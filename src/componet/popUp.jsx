import Imgs from "../assets/react.svg"

export default function PopUp({ closeDis, passedImg, download }) {
    return (
        <div className="display_container">
            <div className="display_image">
                <img src={passedImg.img} alt={passedImg.alts} key={passedImg.id}/>
            </div>
            <div className="buttons">
                <button className="downlod"
                onClick={() => download(passedImg.img, passedImg.id)}
                >Download
                </button>
                <span><strong>{passedImg.name}</strong></span>
                <button
                onClick={closeDis}
                >close
                </button>
            </div>
        </div>
    )
}