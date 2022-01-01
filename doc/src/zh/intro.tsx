import React, { useState, Fragment } from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import Playground from 'xueyan-react-playground'
import { Switch } from 'xueyan-react-popover'

const MARK1 = `
## xueyan-react-popover

\`xueyan-react-popover\` 是一个 React 组件。  

## 用法
`

const code1 = `
import React, { useState } from 'react'
import Switch from 'xueyan-react-popover'

export default function Example() {
  const [state, setState] = useState<boolean>(false)
  return (
    <Fragment>
      <span>switch: </span>
      <Switch value={state} onChange={setState} />
    </Fragment>
  )
}
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground scope={{ React, useState, Fragment, Switch }}>
        {code1}
      </Playground>
    </Article>
  )
}
