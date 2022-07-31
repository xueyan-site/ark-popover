import React, { createElement, useLayoutEffect, useState } from 'react'
import cn from 'classnames'
import { SlideTransition } from 'ark-transition'
import { getPlacementStyle } from './popover-utils'
import styles from './popover.scss'
import type { PopoverBasePlacement, PopoverPlacement, PopoverStyleKeeper } from './popover-utils'
import type { SlideTransitionProps } from 'ark-transition'

export interface PopoverContentNodeRenderProps {
  /** 外部根节点 */
  rootRef: React.RefObject<HTMLElement>
  /** 弹层摆放位置 */
  placement: PopoverBasePlacement
}

export type PopoverContentRender = React.ComponentType<PopoverContentNodeRenderProps>

export type PopoverContentTransformGetter = (
  /** 弹层摆放位置 */
  placement: PopoverBasePlacement
) => React.CSSProperties['transform']

export interface PopoverContentProps {
  /** transition组件props */
  transition?: SlideTransitionProps
  /** 外部根节点 */
  rootRef: React.RefObject<HTMLElement>
  /** 弹层层级 */
  zIndex?: React.CSSProperties['zIndex']
  /** 弹层内容节点 */
  children?: React.ReactNode
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
  /** 弹层进入前或退出后的位置 */
  transform?: React.CSSProperties['transform'] | PopoverContentTransformGetter
}

export function PopoverContent({
  rootRef,
  transition,
  zIndex,
  children,
  render,
  placement,
  offset,
  spacing,
  keepStyle,
  transform,
}: PopoverContentProps) {
  const getter = () => getPlacementStyle(
    placement,
    rootRef.current,
    offset,
    spacing || '6px',
    keepStyle
  )
  const [[style, _placement], setData] = useState(getter)
  useLayoutEffect(() => setData(getter()), [
    placement,
    rootRef.current,
    offset,
    spacing,
    keepStyle
  ])
  const _transform = transform instanceof Function
    ? transform(_placement)
    : transform

  return (
    <SlideTransition
      {...transition}
      transform={cn(style && style.transform, _transform)}
    >
      <div
        className={styles.content}
        style={{ zIndex, ...style }}
        onClick={event => event.stopPropagation()}
      >
        {render ? createElement(render, ({
          rootRef: rootRef,
          placement: _placement
        })) : children}
      </div>
    </SlideTransition>
  )
}
