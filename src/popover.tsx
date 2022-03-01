import React, { useEffect, useState, useRef } from 'react'
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

export interface PopoverProps extends PartPopoverContentProps {
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 子节点 */
  children?: React.ReactNode
  /** 显示或隐藏 */
  value?: boolean
  /** 监听显示或隐藏 */
  onChange?: (value: boolean) => void
  /** 弹层触发方式 */
  trigger?: PopoverTrigger
}

export function Popover({
  className,
  style,
  children,
  content,
  render,
  value,
  onChange,
  trigger,
  enterDelay,
  ...props
}: PopoverProps) {
  const [vsb, setVsb] = useState<boolean|undefined>(value)
  const rootRef = useRef<HTMLDivElement>(null)
  const _value = (onChange ? value : vsb) || false
  const _onChange = onChange || setVsb
  const _trigger = trigger || 'click'

  // 若当前属于click触发
  // 需监听全局点击事件以取消显示popover
  useEffect(() => {
    const root = rootRef.current
    if (!root || !_value || _trigger !== 'click') {
      return
    }
    const close = (event: MouseEvent) => {
      if (!root.contains(event.target as any)) {
        _onChange(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => {
      document.removeEventListener('mousedown', close)
    }
  }, [_trigger, _value, onChange])

  const divProps: React.HTMLAttributes<HTMLDivElement> = {}
  if (_trigger === 'click') {
    divProps.onClick = event => {
      event.stopPropagation()
      _onChange(!_value)
    }
  } else if (_trigger === 'focus') {
    divProps.onFocus = event => {
      event.stopPropagation()
      _onChange(true)
    }
    divProps.onBlur = event => {
      event.stopPropagation()
      _onChange(false)
    }
  } else if (_trigger === 'hover') {
    divProps.onMouseOver = event => {
      event.stopPropagation()
      _onChange(true)
    }
    divProps.onMouseLeave = event => {
      event.stopPropagation()
      _onChange(false)
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn(styles.popover, className)}
      style={style}
      {...divProps}
    >
      {children}
      {(content || render) && (
        <PopoverContent
          {...props}
          value={_value}
          rootRef={rootRef}
          content={content}
          render={render}
          enterDelay={
            enterDelay !== undefined 
              ? enterDelay 
              : _trigger === 'hover' 
              ? '.5s' 
              : undefined
          }
        />
      )}
    </div>
  )
}
