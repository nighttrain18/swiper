import {
    onMovingStart, 
    onMovingContinues,
    onMovingEnd
} from './lib'

import {
    LEFT_MOUSE_BUTTON_CODE
} from './constant'


export const onMouseDown = (
    evt, ...others
) => {
    if(evt.button !== LEFT_MOUSE_BUTTON_CODE) {
        return
    }

    onMovingStart({x: evt.clientX}, ...others)
}

export const onMouseUp = (evt, ...others) => {
    onMovingEnd(...others)
}

export const onMouseMove = (
    evt, ...others
) => {
    onMovingContinues({x: evt.clientX}, ...others)
}

export const onMouseOut = (evt, ...others) => {
    onMovingEnd(...others)
}