import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { Direction } from '@/app-core/@types/theme'
import { direction as SidebarDirection , setDirection} from '@/features/theme/theme.slice'

function useDirection(): [
    direction: Direction,
    updateDirection: (dir: Direction) => void
] {
    const direction = useSelector(SidebarDirection)

    const dispatch = useDispatch()

    const updateDirection = (dir: Direction) => {
        dispatch(setDirection(dir))
    }

    useEffect(() => {
        if (window === undefined) {
            return
        }
        const root = window.document.documentElement
        root.setAttribute('dir', direction)
    }, [direction])

    return [direction, updateDirection]
}

export default useDirection
