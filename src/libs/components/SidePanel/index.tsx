import classNames from 'classnames'
import Drawer from '../Drawer'
import { HiOutlineCog } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import withHeaderItem from '@libs/utils/hoc/withHeaderItem'
import { setPanelExpand , panelExpand, direction} from '@libs/features/theme/theme.slice'
import type { CommonProps } from '@app-core/@types/common'
import ThemeConfigurator, {ThemeConfiguratorProps} from '../ThemeConfigurator'

type SidePanelProps = ThemeConfiguratorProps & CommonProps

const _SidePanel = (props: SidePanelProps) => {
    const dispatch = useDispatch()

    const { className, ...rest } = props

    const _panelExpand = useSelector(panelExpand)

    const _direction = useSelector(direction)

    const openPanel = () => {
        dispatch(setPanelExpand(true))
    }

    const closePanel = () => {
        dispatch(setPanelExpand(false))
        const bodyClassList = document.body.classList
        if (bodyClassList.contains('drawer-lock-scroll')) {
            bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
        }
    }

    return (
        <>
            <div
                className={classNames('text-2xl', className)}
                onClick={openPanel}
                {...rest}
            >
                <HiOutlineCog />
            </div>
            <Drawer
                title="Side Panel"
                isOpen={_panelExpand}
                placement={_direction === 'rtl' ? 'left' : 'right'}
                width={375}
                onClose={closePanel}
                onRequestClose={closePanel}
            >
                <ThemeConfigurator callBackClose={closePanel} />
            </Drawer>
        </>
    )
}

const SidePanel = withHeaderItem(_SidePanel)

export default SidePanel
