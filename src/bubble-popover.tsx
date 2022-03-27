import React, { forwardRef } from 'react'
import styles from './bubble-popover.scss'
import { getArrowStyle } from './bubble-popover-utils'
import { Popover, PopoverRef } from './popover'
import type { PopoverProps } from './popover'

export interface BubblePopoverProps extends PopoverProps {
  /** 弹层样式 */
  contentStyle?: React.CSSProperties
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
  contentStyle,
  backgroundColor,
  arrowOffset,
  hiddenArrow,
  ...props
}, ref) => {
  return (
    <Popover 
      {...props}
      ref={ref}
      placement={placement}
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
      render={props => (
        <div
          className={styles.inner}
          style={{
            ...contentStyle,
            backgroundColor
          }}
        >
          {!hiddenArrow && (
            <div 
              className={styles.arrow}
              style={{
                backgroundColor, 
                ...getArrowStyle(
                  props.placement,
                  arrowOffset
                ) 
              }}
            />
          )}
          {content}
        </div>
      )}
    />
  )
})
