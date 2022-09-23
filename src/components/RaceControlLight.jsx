import "./RaceControlLight.css";

export const RaceControlLight = (props) => {
    const { lit } = props;

    return (
        <div className='light-chassis'>
            <div className='light-frame'>
                <div className={`light ${lit ? "lit" : ""}`}></div>
                <div className={`light ${lit ? "lit" : ""}`}></div>
            </div>
        </div>
    );
};
