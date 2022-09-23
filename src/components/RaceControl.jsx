import { useRef, useState } from 'react';

import { RaceControlLight } from './RaceControlLight';
import useInterval from '../usehooks/useInterval';
import useTimeout from '../usehooks/useTimeout';
import useEventListener from '../usehooks/useEventListener';
import { randomBetween } from '../utils/math';
import "./RaceControl.css";

const State = {
    Standby: "STANDBY",
    Ready: "READY",
    Set: "SET",
    Go: "GO"
};

const initialLights = new Array(5).fill(false);

const formatReactionTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const millis = ms % 1000;

    return `${seconds}:${millis}`;
};

export const RaceControl = () => {
    const documentRef = useRef(document);
    const [lights, setLights] = useState(initialLights);
    const [step, setStep] = useState(State.Standby);
    const [reactionTimerStart, setReactionTimerStart] = useState(0);
    const [times, setTimes] = useState([]);
    const [best, setBest] = useState();
    const [average, setAverage] = useState();

    // For "Ready" state countdown
    useInterval(() => {
        let currLights = [...lights];
        const numLightsOn = currLights.filter(x => x === true).length;

        if (numLightsOn === 4) {
            // currLights = initialLights;
            currLights[numLightsOn] = true;
            setStep(State.Set);
        }
        else {
            currLights[numLightsOn] = true;
        }

        setLights(currLights);
    }, step === State.Ready ? 1000 : null);

    // For "Set" state timer
    useTimeout(() => {
        setStep(State.Go);
        setLights(initialLights);
        setReactionTimerStart(new Date());
    }, step === State.Set ? randomBetween(1000, 5000) : null);

    // Listener for user input
    const onKeyPress = (e) => {
        if (e.code === "Space") {
            // eslint-disable-next-line default-case
            switch (step) {
                case State.Standby:
                    setStep(State.Ready);
                    break;
                case State.Ready:
                    handleFalseStart();
                    break;
                case State.Set:
                    handleFalseStart();
                    break;
                case State.Go:
                    handleValidStart();
                    break;
            }
        }
    };

    useEventListener("keydown", onKeyPress, documentRef);

    const handleFalseStart = () => {
        setStep(State.Standby);
        setLights(initialLights);
        const starts = [...times];
        starts.push(0);
        setTimes(starts);
    };

    const handleValidStart = () => {
        const starts = [...times];
        const newTime = new Date().getTime() - reactionTimerStart.getTime();
        starts.push(newTime);

        handleRecords(newTime, starts)
        setTimes(starts);
        setStep(State.Standby);
    };

    const handleRecords = (newTime, allTimes) => {
        if (!best || newTime < best) {
            setBest(newTime);
        }

        const valid = allTimes.filter(x => x > 0);
        setAverage(Math.floor(
            valid.reduce((acc, curr) => {
                return acc + curr;
            }, 0) / valid.length
        ));
    };

    const getValidStartRatio = () => {
        // Count valid
        const valid = times.filter(x => x > 0).length;
        // Return ratio
        return ((valid / times.length) * 100).toPrecision(3);
    };

    return (
        <div className='game'>
            <div className='race-control'>
                <div className='light-set'>
                    <RaceControlLight lit={lights[0]} />
                    <RaceControlLight lit={lights[1]} />
                    <RaceControlLight lit={lights[2]} />
                    <RaceControlLight lit={lights[3]} />
                    <RaceControlLight lit={lights[4]} />
                </div>

                <div className='current-step'>
                    <div className={`start-notice ${step === State.Standby ? "show" : "hide"}`}>
                        Press space to begin
                    </div>
                </div>
            </div>

            <div className='times'>
                <div>
                    <div>Best: {formatReactionTime(best)}</div>
                    <div>Average: {formatReactionTime(average)}</div>
                    <div>Ratio: {getValidStartRatio()}%</div>
                </div>
                <div>
                    <div>Your times:</div>
                    {times.map((x, idx) => {
                        return (
                            <div key={`time-record-${idx}`}>{idx + 1}: {x === 0 ? "DNS" : formatReactionTime(x)}</div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
