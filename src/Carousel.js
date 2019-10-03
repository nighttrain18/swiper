import React, {useState} from 'react'

import {
    NO_CLASSES,
    ANIMATION_CLASSES,
    initialMovingMetrics,
    WIDTH_CAROUSEL_PAGE_PERCENT
} from './constant'

import {
    onMouseDown, onMouseMove, onMouseUp, onMouseOut
} from './mouse-adapter'

import {
    onTouchStart, onTouchMove, onTouchEnd
} from './touch-adapter'

import './style.css'

const Carousel = ({
    children
}) => {
    const [carouselPageShifts, setCarouselPageShifts] = useState(Array.from({length: React.Children.count(children)}, (_, index) => index * WIDTH_CAROUSEL_PAGE_PERCENT))
    const [carouselPageClasses, setClassesToCarouselPages] = useState(NO_CLASSES)

    const [movingMetrics, setMovingMetrics] = useState({...initialMovingMetrics})

    const M = {
        movingMetrics, setMovingMetrics
    }

    const S = {
        carouselPageShifts, setCarouselPageShifts
    }

    return (
        <div id="carousel">
            <ul className="carousel__page-list"
                onMouseDown={evt => onMouseDown(evt, M, setCarouselPageShifts)}
                onMouseMove={evt => onMouseMove(evt, S, M)}
                onMouseUp={evt => onMouseUp(evt, S, M, setClassesToCarouselPages)}
                onMouseOut={evt => onMouseOut(evt, S, M, setClassesToCarouselPages)}
                onTouchStart={evt => onTouchStart(evt, S, M, setClassesToCarouselPages)}
                onTouchMove={evt => onTouchMove(evt, S, M, setClassesToCarouselPages)}
                onTouchEnd={evt => onTouchEnd(evt, S, M, setClassesToCarouselPages)} >
            {
                React.Children.toArray(children).map((child, index) => {
                    const classes = `carousel__page-item`
                    const transform = `translate(${carouselPageShifts[index]}%, 0%)`

                    return <li className={`${classes} ${carouselPageClasses}`} style={{transform: transform}}>{child}</li>
                })
            }
            </ul>
            <ul className="carousel__pagination">
                {
                    Array.from({length: React.Children.count(children)}, (_, buttonNum) => {
                        return (
                            <li key={buttonNum}>
                                <button onClick={() => {
                                    const nextCarouselPageShifts = Array.from({length: React.Children.count(children)}, (_, index) => (index - buttonNum) * WIDTH_CAROUSEL_PAGE_PERCENT)
                                    setClassesToCarouselPages(ANIMATION_CLASSES.join(' '))
                                    setCarouselPageShifts(nextCarouselPageShifts)
                                }}>{buttonNum}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Carousel