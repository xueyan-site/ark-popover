import React, { createElement, useLayoutEffect, useState } from 'react'
import { SlideTransition } from 'xueyan-react-transition'
import { getPlacementStyle } from './popover-utils'
import styles from './popover.scss'
import type { PartPopoverPlacement, PopoverPlacement, PopoverStyleKeeper } from './popover-utils'
import type { SlideTransitionProps } from 'xueyan-react-transition'

interface PopoverContentStyle extends Pick<
  React.CSSProperties,
  | 'zIndex'
> {}

interface PartSlideTransitionProps extends Pick<
  SlideTransitionProps,
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

export interface PopoverContentNodeRenderProps {
  /** 外部根节点 */
  rootRef: React.RefObject<HTMLElement>
  /** 弹层摆放位置 */
  placement: PartPopoverPlacement
}

export type PopoverContentRender = React.ComponentType<PopoverContentNodeRenderProps>

export interface PopoverContentProps extends PopoverContentStyle, PartSlideTransitionProps {
  /** 外部根节点 */
  rootRef: React.RefObject<HTMLElement>
  /** 弹层内容节点 */
  content?: React.ReactNode
  /** 弹层内容渲染器 */
  render?: PopoverContentRender
  /** 弹层摆放位置 */
  placement?: PopoverPlacement
  /** 弹层相对摆放位置的横向偏移量 */
  offset?: string | number
  /** 弹层与容器的间隙 */
  spacing?: string | number
  /** 调整宽高度 */
  keepStyle?: number | PopoverStyleKeeper
}

export function PopoverContent({
  rootRef,
  content,
  render,
  placement,
  offset,
  spacing,
  keepStyle,
  /** 部分SlideTransition的Props */
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
  const getter = () => getPlacementStyle(
    placement,
    rootRef.current,
    offset,
    spacing || '4px',
    keepStyle
  )
  const [[style, pm], setData] = useState(getter)
  useLayoutEffect(() => setData(getter()), [
    placement,
    rootRef.current,
    offset,
    spacing,
    keepStyle
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
        {render ? createElement(render, ({
          rootRef: rootRef,
          placement: pm
        })) : content}
      </div>
    </SlideTransition>
  )
}
