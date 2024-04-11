import type { MouseEvent, ReactNode } from 'react'
import classNames from 'classnames'
import Modal from 'react-modal'
import type ReactModal from 'react-modal'
import { motion } from 'framer-motion'

import CloseButton from '../CloseButton'
import style from './drawer.module.css'

export interface DrawerProps extends ReactModal.Props {
    bodyClass?: string
    closable?: boolean
    footer?: string | ReactNode
    footerClass?: string
    headerClass?: string
    height?: string | number
    lockScroll?: boolean
    onClose?: (e: MouseEvent<HTMLSpanElement>) => void
    placement?: 'top' | 'right' | 'bottom' | 'left'
    showBackdrop?: boolean
    title?: string | ReactNode
    width?: string | number
}

const Drawer = (props: DrawerProps) => {
    const {
        bodyOpenClassName,
        bodyClass,
        children,
        className,
        closable = true,
        closeTimeoutMS = 300,
        footer,
        footerClass,
        headerClass,
        height = 400,
        isOpen,
        lockScroll = true,
        onClose,
        overlayClassName,
        placement = 'right',
        portalClassName,
        showBackdrop = true,
        title,
        width = 400,
        ...rest
    } = props

    const onCloseClick = (e: MouseEvent<HTMLSpanElement>) => {
        onClose?.(e)
    }

    const renderCloseButton = <CloseButton onClick={onCloseClick} />

    const getStyle = (): {
        dimensionClass?: string
        contentStyle?: {
            width?: string | number
            height?: string | number
        }
        motionStyle: {
            [x: string]: string
        }
    } => {
        if (placement === 'left' || placement === 'right') {
            return {
                dimensionClass: 'vertical',
                contentStyle: { width },
                motionStyle: {
                    [placement]: `-${width}${
                        typeof width === 'number' && 'px'
                    }`,
                },
            }
        }

        if (placement === 'top' || placement === 'bottom') {
            return {
                dimensionClass: 'horizontal',
                contentStyle: { height },
                motionStyle: {
                    [placement]: `-${height}${
                        typeof height === 'number' && 'px'
                    }`,
                },
            }
        }

        return {
            motionStyle: {},
        }
    }

    const { dimensionClass, contentStyle, motionStyle } = getStyle()

    return (
        <Modal
            className={{
                base: classNames(style.drawer, className as string),
                afterOpen: style['drawer-after-open'],
                beforeClose: style['drawer-before-close'],
            }}
            overlayClassName={{
                base: classNames(
                    style['drawer-overlay'],
                    overlayClassName as string,
                    !showBackdrop && 'bg-transparent'
                ),
                afterOpen:  style['drawer-overlay-after-open'],
                beforeClose:  style['drawer-overlay-before-close'],
            }}
            portalClassName={classNames('drawer-portal', portalClassName)}
            bodyOpenClassName={classNames(
                style['drawer-open'],
                lockScroll && style['drawer-lock-scroll'],
                bodyOpenClassName
            )}
            ariaHideApp={false}
            isOpen={isOpen}
            closeTimeoutMS={closeTimeoutMS}
            {...rest}
        >
            <motion.div
                className={classNames( style['drawer-content'], dimensionClass)}
                style={contentStyle}
                initial={motionStyle}
                animate={{
                    [placement as 'top' | 'right' | 'bottom' | 'left']: isOpen
                        ? 0
                        : motionStyle[placement],
                }}
            >
                {title || closable ? (
                    <div className={classNames( style['drawer-header'], headerClass)}>
                        {typeof title === 'string' ? (
                            <h4>{title}</h4>
                        ) : (
                            <span>{title}</span>
                        )}
                        {closable && renderCloseButton}
                    </div>
                ) : null}
                <div className={classNames( style['drawer-body'], bodyClass)}>
                    {children}
                </div>
                {footer && (
                    <div className={classNames( style['drawer-footer'], footerClass)}>
                        {footer}
                    </div>
                )}
            </motion.div>
        </Modal>
    )
}

export default Drawer
