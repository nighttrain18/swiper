import React, {useState} from 'react'

import './style.css'

const onTouchStart = (evt, metrics, updateMetrics) => {

    if(evt.touches.length != 1 || metrics.started) {
        return
    }

    const touch = evt.changedTouches[0]

    updateMetrics({
        ...metrics, 
        delta: 0,
        started: true, 
        lastCoord: {
            x: touch.pageX, 
            y: touch.pageY
        }
    })
}

const onTouchMove = (evt, metrics, updateMetrics) => {
    const touch = evt.changedTouches[0]
    const delta = metrics.delta + touch.pageX - metrics.lastCoord.x

    updateMetrics({
        ...metrics,
        delta,
        lastCoord: {
            x: touch.pageX,
            y: touch.pageY
        }
    })
}

const onTouchEnd = (evt, metrics, updateMetrics) => {
    updateMetrics({
        ...metrics,
        lastCoord: {
            x: 0,
            y: 0
        },
        started: false 
    })
}

const Swiper = ({children}) => {
    const [metrics, updateMetrics] = useState({
        delta: 0,
        lastCoord: {
            x: 0,
            y: 0
        },
        started: false
    })

    return (
        <div className="swiper" 
            onTouchStart={evt => onTouchStart(evt, metrics, updateMetrics)}
            onTouchMove={evt => onTouchMove(evt, metrics, updateMetrics)}
            onTouchEnd={evt => onTouchEnd(evt, metrics, updateMetrics)}>
            {
                React.Children.toArray(children).map((child, index) => {
                    let deltaPercent = metrics.started ? index * 100 + metrics.delta / 10 : Math.round((index * 100 + metrics.delta / 10) / 100) * 100
                    let transform = `translate(${deltaPercent}%, 0%)`

                    return <div className="swiper-el swiper-el-animating" style={{transform: transform}}>{child}</div>
                })
            }
        </div>
    )
}

export default Swiper