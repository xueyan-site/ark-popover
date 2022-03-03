import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, createElement } from 'react'
import cn from 'classnames'
import { PopoverContent } from './popover-content'
import styles from './popover.scss'
import type { PopoverContentProps } from './popover-content'

interface PartPopoverContentProps extends Omit<
  PopoverContentProps,
  | 'rootRef'
> {}

export type PopoverTrigger =
  | 'click'
  | 'focus'
  | 'hover'

export interface PopoverRef {
  /** 根节点 */
  rootNode: HTMLElement | null
}

export interface PopoverProps extends PartPopoverContentProps {
  /** 标签名（默认span） */
  tag?: keyof React.ReactHTML
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 禁用 */
  disabled?: boolean
  /** 子节点 */
  children?: React.ReactNode
  /** 显示或隐藏 */
  value?: boolean
  /** 监听显示或隐藏 */
  onChange?: (value: boolean) => void
  /** 弹层触发方式 */
  trigger?: PopoverTrigger
}

export const Popover = forwardRef<PopoverRef, PopoverProps>(({
  tag,
  className,
  style,
  disabled,
  children,
  content,
  render,
  value,
  onChange,
  trigger,
  enterDelay,
  ...props
}, ref) => {
  const [_value, _setValue] = useState(value)
  const rootRef = useRef<HTMLElement>(null)
  const curTrigger = trigger || 'click'
  const curValue = (onChange ? value : _value) || false
  const curOnChange = onChange || _setValue

  useImperativeHandle(ref, () => ({
    rootNode: rootRef.current
  }), [rootRef.current])

  // 若当前属于click触发
  // 需监听全局点击事件以取消显示popover
  useEffect(() => {
    if (disabled || !rootRef.current || !curValue || curTrigger !== 'click') {
      return
    }
    const close = (event: MouseEvent) => {
      const root = rootRef.current
      if (root && !root.contains(event.target as any)) {
        curOnChange(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => {
      document.removeEventListener('mousedown', close)
    }
  }, [curTrigger, disabled, curValue, curOnChange])

  // 计算根节点的props
  const rootProps: React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement> = {
    ref: rootRef,
    className: cn(styles.popover, className),
    style,
  }
  if (!disabled) {
    if (curTrigger === 'click') {
      rootProps.onClick = event => {
        event.stopPropagation()
        curOnChange(!_value)
      }
    } else if (curTrigger === 'focus') {
      rootProps.onFocus = event => {
        event.stopPropagation()
        curOnChange(true)
      }
      rootProps.onBlur = event => {
        event.stopPropagation()
        curOnChange(false)
      }
    } else if (curTrigger === 'hover') {
      rootProps.onMouseOver = event => {
        event.stopPropagation()
        curOnChange(true)
      }
      rootProps.onMouseLeave = event => {
        event.stopPropagation()
        curOnChange(false)
      }
    }
  }
  
  return createElement(
    tag || 'span',
    rootProps,
    children,
    (!disabled && !content && !render) ? undefined : (
      <PopoverContent
        {...props}
        rootRef={rootRef}
        value={curValue}
        content={content}
        render={render}
        enterDelay={
          enterDelay !== undefined 
            ? enterDelay
            : curTrigger === 'hover' 
            ? '.5s'
            : undefined
        }
      />
    )
  )
})
