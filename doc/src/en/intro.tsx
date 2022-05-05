import React, { useEffect, useRef } from 'react'
import { Popover, BubblePopover } from 'xueyan-react-popover'
import { PopoverRef } from 'xueyan-react-popover'
import { SwitchTheme } from 'xueyan-react-style'

const row: React.CSSProperties = {
  height: 100,
  display: 'flex'
}

const col: React.CSSProperties = {
  width: 100
}

export default function Main() {
  const popoverRef = useRef<PopoverRef>(null)
  useEffect(() => {
    console.log(popoverRef)
  }, [])
  return (
    <div style={{ 
      margin: 100, 
      height: '400px', 
      resize: 'horizontal',
      background: 'var(--base)',
      color: 'var(--font)',
      padding: '50px'
    }}>
      <SwitchTheme/>
      <Popover 
        ref={popoverRef}
        placement='topLeft'
        content={<div>东西南北</div>}
      >
        <div>上左</div>
      </Popover>
      <div style={row}>
        <div style={col}></div>
        <div style={col}>
          <BubblePopover 
            value={true}
            ref={popoverRef}
            disabled
            placement='topLeft'
            content={<div>东西南北</div>}
          >
            <div>上左</div>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            trigger='hover'
            keepStyle={1}
            content={<div>东西南北</div>}
          >
            <div>上中</div>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            placement='topRight'
            content={<div>东西南北</div>}
          >
            <div>上右</div>
          </BubblePopover>
        </div>
      </div>
      <div style={row}>
        <div style={col}>
          <BubblePopover 
            placement='leftTop'
            backgroundColor="#ff3388"
            content={<div>东西南北</div>}
          >
            <div>左上</div>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            hiddenArrow={true}
            placement='bottomLeft'
            content={<div>东西南北</div>}
          >
            <div>===</div>
          </BubblePopover>
        </div>
        <div style={col}>
          
        </div>
        <div style={col}>
          
        </div>
        <div style={col}>
          <BubblePopover 
            placement='rightTop'
            backgroundColor="#ff3388"
            content={<div>东西南北</div>}
          >
            <div>右上</div>
          </BubblePopover>
        </div>
      </div>
      <div style={row}>
        <div style={col}>
          <BubblePopover
            trigger='hover'
            keepStyle={1}
            content={<div>东西南北</div>}
          >
            <div>左中</div>
          </BubblePopover>
        </div>
        <div style={col}>
          
        </div>
        <div style={col}>
          
        </div>
        <div style={col}>
          
        </div>
        <div style={col}>
          <BubblePopover
            keepStyle={1}
            placement="left"
            content={<div>东西南北</div>}
          >
            <div>右中</div>
          </BubblePopover>
        </div>
      </div>
      <div style={row}>
        <div style={col}>
          <BubblePopover
            placement='leftBottom'
            content={<div>东西南北</div>}
          >
            <div>左下</div>
          </BubblePopover>
        </div>
        <div style={col}>
          
        </div>
        <div style={col}>
          
        </div>
        <div style={col}>
          
        </div>
        <div style={col}>
          <BubblePopover
            placement='rightBottom'
            content={<div>东西南北</div>}
          >
            <div>右下</div>
          </BubblePopover>
        </div>
      </div>
      <div style={row}>
        <div style={col}></div>
        <div style={col}>
          <BubblePopover 
            placement='bottomLeft'
            backgroundColor="#ff3388"
            content={<div>东西南北</div>}
          >
            <div>下左</div>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            trigger='hover'
            keepStyle={1}
            content={<div>东西南北</div>}
          >
            <div style={{ display: 'block' }}>下中</div>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            placement='bottomRight'
            content={<div>东西南北</div>}
          >
            <div>下右</div>
          </BubblePopover>
        </div>
        <div style={col}></div>
      </div>
    </div>
  )
}
