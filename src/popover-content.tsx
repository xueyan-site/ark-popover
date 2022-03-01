import React, { useMemo } from 'react'
import { SlideTransition } from 'xueyan-react-transition'
import { getPlacementStyle } from './popover-utils'
import styles from './popover.scss'
import type { PopoverPlacement } from './popover-utils'
import type { SlideTransitionProps } from 'xueyan-react-transition'

interface PopoverContentStyle extends Pick<
  React.CSSProperties,
  | 'zIndex'
> {}

interface PartSlideTransitionProps extends Pick<
  SlideTransitionProps,
  | 'children'
  | 'value'
  | 'unmount'
  | 'side'
  | 'sideStyle'
  | 'middle'
  | 'middleStyle'
  | 'active'
  | 'activeStyle'
  | 'enterDelay'
  | 'enterDuration'
  | 'enterTimingFunction'
  | 'leaveDelay'
  | 'leaveDuration'
  | 'leaveTimingFunction'
> {}

export interface PopoverContentProps extends PopoverContentStyle, PartSlideTransitionProps {
  /** 外部根节点 */
  rootRef: React.RefObject<HTMLDivElement>
  /** 弹层摆放位置 */
  placement?: PopoverPlacement
  /** 弹层相对摆放位置的横向偏移量 */
  offset?: string | number
  /** 弹层与容器的间隙 */
  spacing?: string | number
  /** 调整宽度 */
  keepWidth?: number | ((rootRect: DOMRect) => number)
  /** 调整高度 */
  keepHeight?: number | ((rootRect: DOMRect) => number)
}

export function PopoverContent({
  rootRef,
  placement,
  offset,
  spacing,
  keepWidth,
  keepHeight,
  /** 部分SlideTransition的Props */
  children,
  value,
  unmount,
  side,
  sideStyle,
  middle,
  middleStyle,
  active,
  activeStyle,
  enterDelay,
  enterDuration,
  enterTimingFunction,
  leaveDelay,
  leaveDuration,
  leaveTimingFunction,
  /** 内层的样式 */
  zIndex
}: PopoverContentProps) {
  const style = useMemo(() => getPlacementStyle(
    placement || 'top',
    rootRef.current,
    offset,
    spacing || '4px',
    keepWidth,
    keepHeight
  ), [
    placement,
    rootRef.current, 
    offset,
    spacing,
    keepWidth,
    keepHeight
  ])
  return (
    <SlideTransition
      value={value}
      unmount={unmount}
      side={side}
      sideStyle={sideStyle}
      middle={middle}
      middleStyle={middleStyle}
      active={active}
      activeStyle={activeStyle}
      enterDelay={enterDelay}
      enterDuration={enterDuration}
      enterTimingFunction={enterTimingFunction}
      leaveDelay={leaveDelay}
      leaveDuration={leaveDuration}
      leaveTimingFunction={leaveTimingFunction}
      transform={(style && style.transform)
        ? `${style.transform} scale(.8)`
        : 'scale(.8)'}
    >
      <div
        className={styles.content} 
        style={{ zIndex, ...style }}
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </SlideTransition>
  )
}
