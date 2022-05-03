import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './bubble-popover.scss'
import { getArrowStyle } from './bubble-popover-utils'
import { Popover, PopoverRef } from './popover'
import { ArrowIcon } from './arrow-icon'
import type { PopoverProps } from './popover'

export interface BubblePopoverProps extends PopoverProps {
  /** 弹层类名 */
  contentClassName?: string
  /** 弹层样式 */
  contentStyle?: React.CSSProperties
  /** 弹层边框色 */
  borderColor?: React.CSSProperties['borderColor']
  /** 弹层背景色 */
  backgroundColor?: React.CSSProperties['backgroundColor']
  /** 隐藏箭头 */
  hiddenArrow?: boolean
  /** 箭头相对摆放位置的横向偏移量 */
  arrowOffset?: string | number
}

export const BubblePopover = forwardRef<PopoverRef, BubblePopoverProps>(({
  content,
  placement,
  transform,
  spacing,
  contentClassName,
  contentStyle,
  borderColor,
  backgroundColor,
  arrowOffset,
  hiddenArrow,
  ...props
}, ref) => {
  const _borderColor = borderColor || 'var(--alpha5)'
  const _backgroundColor = backgroundColor || 'var(--back2)'
  return (
    <Popover 
      {...props}
      ref={ref}
      placement={placement || (hiddenArrow ? 'yLeft' : undefined)}
      transform={transform || (pm => (
        (hiddenArrow && 'tb'.includes(pm[0]))
          ? 'scaleY(.8)'
          : 'scale(.8)'
      ))}
      spacing={
        spacing !== undefined 
          ? spacing 
          : hiddenArrow 
          ? '4px' 
          : '10px'
      }
      render={props => {
        const horizontal = 'lr'.includes(props.placement[0])
        return (
          <div
            className={cn(contentClassName, styles.xrinner)}
            style={{
              minWidth: horizontal ? '32px' : undefined,
              minHeight: horizontal ? '32px' : undefined,
              ...contentStyle,
              borderColor: _borderColor,
              backgroundColor: _backgroundColor
            }}
          >
            {!hiddenArrow && (
              <ArrowIcon
                className={styles.arrow}
                style={getArrowStyle(props.placement, arrowOffset)}
                horizontal={horizontal}
                borderColor={_borderColor}
                backgroundColor={_backgroundColor}
              />
            )}
            {content}
          </div>
        )
      }}
    />
  )
})
