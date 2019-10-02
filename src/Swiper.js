import React, {useState} from 'react'

import './style.css'

const NO_CLASSES = ''
const ANIMATION_CLASSES = ['swiper__page-animating']

const initialMouseMetrics = {
    deltaX: 0,
    lastCoordX: 0,
    isMoveStarted: false
}

const onMouseDown = (evt, mouseMetrics, setMouseMetrics, setAnimationClasses) => {
    setAnimationClasses(NO_CLASSES)
    setMouseMetrics({
        ...mouseMetrics,
        lastCoordX: evt.clientX,
        isMoveStarted: true
    })
}
const onMouseUp = (evt, shifts, setShifts, setMouseMetrics, setAnimationClasses) => {
    setAnimationClasses(ANIMATION_CLASSES.join(' '))
    setShifts(shifts.map(shift => Math.round(shift / 100) * 100))
    setMouseMetrics({
        ...initialMouseMetrics
    })
}
const onMouseOut = (evt, ...others) => {
    if(evt.target !== evt.currentTarget) {
        return
    }
    onMouseUp(evt, ...others)
}
const onMouseMove = (evt, shifts, setShifts, mouseMetrics, setMouseMetrics) => {
    if(!mouseMetrics.isMoveStarted) return 

    const {deltaX, lastCoordX} = mouseMetrics

    const nextMouseMetrics = {
        ...mouseMetrics,
        deltaX: deltaX - (evt.clientX - lastCoordX),
        lastCoordX: evt.clientX
    }

    setShifts(shifts.map(shift => shift + nextMouseMetrics.deltaX / 1000))
    setMouseMetrics({...nextMouseMetrics})
}

// let classes will be removed by Swipe and DragNDrop
const Swiper = ({
    children
}) => {
    const [shifts, setShifts] = useState(Array.from({length: React.Children.count(children)}, (_, index) => index * 100))
    const [animationClasses, setAnimationClasses] = useState(NO_CLASSES)

    const [mouseMetrics, setMouseMetrics] = useState({...initialMouseMetrics})

    const paginationClick = (buttonNum) => {
        const newShifts = Array.from({length: React.Children.count(children)}, (_, index) => (index - buttonNum) * 100)
        setAnimationClasses(ANIMATION_CLASSES.join(' '))
        setShifts([...newShifts])
    }

    return (
        <div>
            <div className="swiper" 
                onMouseDown={evt => onMouseDown(evt, mouseMetrics, setMouseMetrics, setAnimationClasses)}
                onMouseMove={evt => onMouseMove(evt, shifts, setShifts, mouseMetrics, setMouseMetrics)}
                onMouseUp={evt => onMouseUp(evt, shifts, setShifts, setMouseMetrics,setAnimationClasses)}
                onMouseOut={evt => onMouseOut(evt, shifts, setShifts, setMouseMetrics,setAnimationClasses)} >
            {
                React.Children.toArray(children).map((child, index) => {
                    const classes = `swiper__page`
                    const transform = `translate(${shifts[index]}%, 0%)`

                    return <div className={`${classes} ${animationClasses}`} style={{transform: transform}}>{child}</div>
                })
            }
            </div>
            <ul className="swiper__pagination">
                {
                    Array.from({length: React.Children.count(children)}, (_, index) => {
                        return (
                            <li key={index}>
                                <button onClick={() => paginationClick(index)}>{index}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Swiper