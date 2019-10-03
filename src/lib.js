import {
    CAROUSEL_PAGE_LIST_ID, 
    PATH_DERIVATIVE_THRESHOLD, 
    swipeDirection, 
    BACKLASH_PERCENT,
    ANIMATION_CLASSES,
    NO_CLASSES,
    ONE_HUNDRED_PERCENT,
    NEGATIVE_NUMBER_SIGN,
    POSITIVE_NUMBER_SIGN,
    WIDTH_CAROUSEL_PAGE_PERCENT,
    ZERO_PERCENT,
    initialMovingMetrics
} from './constant'

const getCarouselWidth = () => document.getElementById(CAROUSEL_PAGE_LIST_ID).clientWidth

const isMovingSwipeLike = dPath => Math.abs(dPath) >= PATH_DERIVATIVE_THRESHOLD

const isSwipeAvailable = (direction, carouselPageShifts) => {
    return direction === swipeDirection.LEFT ? carouselPageShifts[0] <= ZERO_PERCENT : carouselPageShifts[carouselPageShifts.length - 1] >= ZERO_PERCENT
}

const isBacklashGot = carouselPageShifts => {
    return carouselPageShifts[0] > BACKLASH_PERCENT || carouselPageShifts[carouselPageShifts.length - 1] < -BACKLASH_PERCENT
}





export const onMovingStart = (
    {x: nextCoordX, y = null}, 
    {movingMetrics, setMovingMetrics}, 
    setClassesToCarouselPages
) => {
    setClassesToCarouselPages(NO_CLASSES)

    setMovingMetrics({
        ...movingMetrics,
        lastCoordX: nextCoordX,
        isMovingStarted: true
    })
}

export const onMovingContinues = (
    {x: nextCoordX, y: nextCoordY = null}, 
    {carouselPageShifts, setCarouselPageShifts}, 
    {movingMetrics, setMovingMetrics}
) => {
    if(!movingMetrics.isMoveStarted) {
        return
    }

    if(isBacklashGot(carouselPageShifts)) {
        return
    }

    const {lastCoordX, lastCoordTime} = movingMetrics

    const deltaX = nextCoordX - lastCoordX
    const nextCoordTime = new Date().getTime()
    const deltaTime = nextCoordTime - lastCoordTime

    const nextMovingMetrics = {
        ...movingMetrics,
        deltaX: deltaX,
        lastCoordX: nextCoordX,
        lastCoordTime: nextCoordTime,
        dPath: deltaX / deltaTime
    }

    const nextShift = (nextMovingMetrics.deltaX / getCarouselWidth()) * ONE_HUNDRED_PERCENT
    const nextShifts = carouselPageShifts.map(shift => shift + nextShift)
    setCarouselPageShifts(nextShifts)
    setMovingMetrics(nextMovingMetrics)
}

export const onMovingEnd = (
    {carouselPageShifts, setCarouselPageShifts}, 
    {movingMetrics, setMovingMetrics}, 
    setClassesToCarouselPages
) => {
    if(!movingMetrics.isMovingStarted) {
        return
    }

    const {dPath} = movingMetrics

    setClassesToCarouselPages(ANIMATION_CLASSES.join(' '))

    if(isMovingSwipeLike(dPath) && isSwipeAvailable(dPath > 0 ? swipeDirection.LEFT : swipeDirection.RIGHT, carouselPageShifts)) {
        const sign = Math.sign(dPath)
        setCarouselPageShifts(carouselPageShifts.map(shift => sign === NEGATIVE_NUMBER_SIGN ? Math.floor(shift / ONE_HUNDRED_PERCENT) * ONE_HUNDRED_PERCENT : Math.ceil(shift / ONE_HUNDRED_PERCENT) * ONE_HUNDRED_PERCENT))
    } else {
        setCarouselPageShifts(carouselPageShifts.map(shift => Math.round(shift / WIDTH_CAROUSEL_PAGE_PERCENT) * WIDTH_CAROUSEL_PAGE_PERCENT))
    }

    setMovingMetrics({
        ...initialMovingMetrics
    })
}