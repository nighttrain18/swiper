import {
    onMovingStart, 
    onMovingContinues,
    onMovingEnd} from './lib'

export const onMouseDown = (
    evt, ...others
) => {
    onMovingStart({x: evt.clientX}, ...others)
}

export const onMouseUp = (...others) => {
    onMovingEnd(...others)
}

export const onMouseMove = (
    evt, ...others
) => {
    onMovingContinues({x: evt.clientX}, ...others)
}

export const onMouseOut = (...others) => {
    onMovingEnd(...others)
}