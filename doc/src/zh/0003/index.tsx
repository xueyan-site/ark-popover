import React from 'react'
import { Article, Segment } from 'ark-markdown'
import { Playground } from 'ark-playground'
import { BubblePopover } from 'ark-popover'

const MARK1 = `
气泡状弹出式浮层组件

\`\`\`
type Popover = React.ForwardRefExoticComponent<
  BubblePopoverProps & React.RefAttributes<PopoverRef>
>
\`\`\`

> 其他类型：[PopoverRef](?doc=0002#popoverref)

## 示例
`

const CODE1 = `
import React from 'react'
import { BubblePopover } from 'ark-popover'

export default function Example() {
  return (
    <BubblePopover 
      placement='bottomLeft'
      content="弹层内容"
    >
      <div>点击我显示弹层</div>
    </BubblePopover>
  )
}
`

const MARK2 = `
## BubblePopoverProps

继承 [PopoverProps](?doc=0002#popoverprops) 所有属性

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| contentClassName | 弹层类名 | \`? string\` |  |
| contentStyle | 弹层样式 | \`? React.CSSProperties\` |  |
| borderColor | 弹层边框色 | \`? React.CSSProperties['borderColor']\` | var(--area2) |
| backgroundColor | 弹层背景色 | \`? React.CSSProperties['backgroundColor']\` | var(--base1) |
| hiddenArrow | 隐藏箭头 | \`? boolean\` |  |
| arrowOffset | 箭头的横向偏移量 | \`? string,number\` | |

在 hiddenArrow != true 的情况下，spacing 默认值为 \`10px\`  

在 hiddenArrow == true 的情况下，transform 默认值为 \`scaleY(.8)\`；否则为 \`scale(.8)\`  

在 hiddenArrow == true 的情况下，placement 默认值为 \`yLeft\`  

弹层内容的最小宽/高度为 \`32px\`

气泡箭头在非居中时，相对于弹层边缘的距离，默认为 10px
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground scope={{ React, BubblePopover }}>
        {CODE1}
      </Playground>
      <Segment>{MARK2}</Segment>
    </Article>
  )
}
