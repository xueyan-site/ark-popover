import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, createElement } from 'react'
import cn from 'classnames'
import { PopoverContent } from './popover-content'
import styles from './popover.scss'
import type { PopoverContentProps } from './popover-content'

export type PopoverTrigger =
  | 'click'
  | 'focus'
  | 'hover'

export interface PopoverRef {
  /** 根节点 */
  rootNode: HTMLElement | null
}

export interface PopoverProps extends Omit<
  PopoverContentProps, 
  | 'rootRef'
  | 'children'
> {
  /** 标签名（默认span） */
  tag?: keyof React.ReactHTML
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 子节点 */
  children?: React.ReactElement
  /** 弹层内容节点 */
  content?: React.ReactNode
  /** 弹层触发方式 */
  trigger?: PopoverTrigger
  /** 禁用 */
  disabled?: boolean
  /** 显示或隐藏 */
  value?: boolean
  /** 监听显示或隐藏 */
  onChange?: (value: boolean) => void
}

export const Popover = forwardRef<PopoverRef, PopoverProps>(({
  tag,
  className,
  style,
  children,
  content,
  render,
  disabled,
  value,
  onChange,
  trigger,
  transition,
  ...props
}, ref) => {
  const [value1, setValue1] = useState(value)
  const rootRef = useRef<any>(null)
  const _trigger = trigger || 'click'
  const _value = (onChange ? value : value1) || false
  const _onChange = onChange || setValue1

  useImperativeHandle(ref, () => ({
    rootNode: rootRef.current
  }), [rootRef.current])

  // 若当前属于click触发
  // 需监听全局点击事件以取消显示popover
  useEffect(() => {
    if (disabled || !_value || !rootRef.current || _trigger !== 'click') {
      return
    }
    const close = (event: MouseEvent) => {
      const root = rootRef.current
      if (root && !root.contains(event.target as any)) {
        _onChange(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => {
      document.removeEventListener('mousedown', close)
    }
  }, [disabled, _trigger, _value, _onChange])

  // 计算根节点的props
  const rootProps: React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement> = {
    ref: rootRef,
    className: cn(styles.xrpopover, className),
    style,
  }
  if (!disabled) {
    const listener = (event: any, value: boolean) => {
      _onChange(value)
      if (event && event.stopPropagation) {
        event.stopPropagation()
      }
    }
    if (_trigger === 'click') {
      rootProps.onClick = (e: any) => listener(e, !_value)
    } else if (_trigger === 'focus') {
      rootProps.onFocus = (e: any) => listener(e, true)
      rootProps.onBlur = (e: any) => listener(e, false)
    } else if (_trigger === 'hover') {
      rootProps.onMouseOver = (e: any) => listener(e, true)
      rootProps.onMouseLeave = (e: any) => listener(e, false)
    }
  }

  const _transition = transition || {}
  
  return createElement(
    tag || 'span',
    rootProps,
    children,
    (!disabled && !content && !render) ? undefined : (
      <PopoverContent
        {...props}
        rootRef={rootRef}
        render={render}
        transition={{
          ..._transition,
          value: _value,
          unmount: _transition.unmount !== undefined
            ? _transition.unmount
            : _trigger === 'hover'
            ? true
            : false,
          enterDelay: _transition.enterDelay !== undefined 
            ? _transition.enterDelay
            : _trigger === 'hover' 
            ? '.5s'
            : undefined
        }}
      >
        {content}
      </PopoverContent>
    )
  )
})
