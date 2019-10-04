import {
    onMovingStart, onMovingContinues, onMovingEnd
} from './lib'

export const onTouchStart = (evt, ...others) => {
    // if more than two fingers are on the interface
    if(evt.touches.length !== 1) {
        return
    }

    const touch = evt.changedTouches[0]
    onMovingStart({x: touch.pageX}, ...others)
}

export const onTouchMove = (evt, ...others) => {
    if(evt.touches.length !== 1) {
        return
    }

    const touch = evt.changedTouches[0]
    onMovingContinues({x: touch.pageX}, ...others)
}

export const onTouchEnd = (evt, ...others) => {
    evt.preventDefault()
    
    onMovingEnd(...others)
}