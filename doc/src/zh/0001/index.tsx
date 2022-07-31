import React, { useState } from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import { Playground } from 'xueyan-react-playground'
import { BubblePopover } from 'ark-popover'
import { Placements } from './placements'

const MARK1 = `
弹出式浮层组件库，用于实现各种弹出式浮层效果。

## 示例
`

const code1 = `
import React from 'react'
import { BubblePopover } from 'ark-popover'

export default function Example() {
  return (
    <BubblePopover
      placement="topLeft"
      content="内容"
    >
      <div>点击</div>
    </BubblePopover>
  )
}
`

const MARK2 = `
## 方位

`

export default function Main() {
  const scope = { React, useState, BubblePopover }
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground scope={scope}>
        {code1}
      </Playground>
      <Segment>{MARK2}</Segment>
      <Placements/>
    </Article>
  )
}
