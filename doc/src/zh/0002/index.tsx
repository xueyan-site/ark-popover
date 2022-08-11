import React from 'react'
import { Article, Segment } from 'ark-markdown'
import { Playground } from 'ark-playground'
import { Popover } from 'ark-popover'

const MARK1 = `
弹出式浮层基础组件

\`\`\`
type Popover = React.ForwardRefExoticComponent<
  PopoverProps & React.RefAttributes<PopoverRef>
>
\`\`\`

## 示例
`

const CODE1 = `
import React from 'react'
import { Popover } from 'ark-popover'

export default function Example() {
  return (
    <Popover 
      placement='bottomLeft'
      content="弹层内容"
    >
      <div>点击我显示弹层</div>
    </Popover>
  )
}
`

const MARK2 = `
## PopoverRef

\`\`\`
interface PopoverRef {
  /** 根节点 */
  rootNode: HTMLElement | null
}
\`\`\`

## PopoverProps

继承 \`PopoverContentProps\` 部分属性，不包括：\`rootRef\`、\`children\`

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| tag | 标签名 | \`? keyof React.ReactHTML\` | 默认 span |
| className | 类名 | \`? string\` |  |
| style | 样式 | \`? React.CSSProperties\` |  |
| children | 子节点 | \`? React.ReactElement\` |  |
| content | 弹层内容节点 | \`? React.ReactNode\` |  |
| trigger | 弹层触发方式 | \`? PopoverTrigger\` | 默认 click |
| disabled | 禁用 | \`? boolean\` |  |
| value | 显示或隐藏 | \`? boolean\` |  |
| onChange | 监听显示或隐藏 | \`? (value: boolean) => void\` |  |

## PopoverTrigger

弹层触发方式

\`\`\`
type PopoverTrigger =
  | 'click'  // 点击触发
  | 'focus'  // 聚焦触发
  | 'hover'  // 鼠标覆盖触发
\`\`\`

## PopoverContentProps

弹层内容组件参数

\`\`\`
interface PopoverContentProps {
  /** transition组件props */
  transition?: SlideTransitionProps
  /** 外部根节点 */
  rootRef: React.RefObject<HTMLElement>
  /** 弹层层级（默认100） */
  zIndex?: React.CSSProperties['zIndex']
  /** 弹层内容节点 */
  children?: React.ReactNode
  /** 自定义弹层内容渲染器 */
  render?: PopoverContentRender
  /** 弹层摆放位置（默认 auto） */
  placement?: PopoverPlacement
  /** 弹层相对摆放位置的横向偏移量 */
  offset?: string | number
  /** 弹层与容器的间隙（默认 6px） */
  spacing?: string | number
  /** 调整宽高度 */
  keepStyle?: number | PopoverStyleKeeper
  /** 弹层进入前或退出后的位置 */
  transform?: React.CSSProperties['transform'] | PopoverContentTransformGetter
}
\`\`\`

> 其他类型：[SlideTransitionProps](/ark-transition?doc=0004#slidetransitionprops)

## PopoverContentRender

自定义弹层内容渲染器

\`\`\`
type PopoverContentRender = React.ComponentType<
  PopoverContentNodeRenderProps
>
\`\`\`

## PopoverContentNodeRenderProps

自定义弹层内容渲染器的参数

\`\`\`
interface PopoverContentNodeRenderProps {
  /** 外部根节点 */
  rootRef: React.RefObject<HTMLElement>
  /** 弹层摆放位置 */
  placement: PopoverBasePlacement
}
\`\`\`

## PopoverBasePlacement

弹层展示时，相对于触发点的摆放位置（基础）

\`\`\`
type PopoverBasePlacement = 
  | 'topLeft'       // 上方靠左对齐
  | 'top'           // 上方居中对齐
  | 'topRight'      // 上方靠右对齐
  | 'rightTop'      // 右侧靠上对齐
  | 'right'         // 右侧居中对齐
  | 'rightBottom'   // 右侧靠下对齐
  | 'bottomLeft'    // 下方靠左对齐
  | 'bottom'        // 下方居中对齐
  | 'bottomRight'   // 下方靠右对齐
  | 'leftTop'       // 左侧靠上对齐
  | 'left'          // 左侧居中对齐
  | 'leftBottom'    // 左侧靠下对齐
\`\`\`

## PopoverPlacement

弹层展示时，相对于触发点的摆放位置（所有）

\`\`\`
type PopoverPlacement =
  PopoverBasePlacement
  | 'auto'         // 根据触发点位置，自动摆放
  | 'center'       // 根据触发点位置，居中摆放
  | 'x'            // 根据触发点位置，左右摆放
  | 'xTop'         // 根据触发点位置，左右靠上摆放
  | 'xCenter'      // 根据触发点位置，左右居中摆放
  | 'xBottom'      // 根据触发点位置，左右靠下摆放
  | 'y'            // 根据触发点位置，上下摆放
  | 'yLeft'        // 根据触发点位置，上下靠左摆放
  | 'yCenter'      // 根据触发点位置，上下居中摆放
  | 'yRight'       // 根据触发点位置，上下靠右摆放
\`\`\`

## PopoverStyleKeeper

根据触发点位置和大小，设置弹层样式

\`\`\`
type PopoverStyleKeeper = (
  placement: PopoverBasePlacement,  // 当前对齐方式
  rootRect: DOMRect                 // 触发点的 Rect
) => React.CSSProperties            // 返回的弹层样式
\`\`\`

## PopoverContentTransformGetter

设置弹层进入前或退出后的位置

\`\`\`
type PopoverContentTransformGetter = (
  placement: PopoverBasePlacement  // 弹层摆放位置
) => React.CSSProperties['transform']
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground scope={{ React, Popover }}>
        {CODE1}
      </Playground>
      <Segment>{MARK2}</Segment>
    </Article>
  )
}
