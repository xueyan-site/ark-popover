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
        <button>上左</button>
      </Popover>
      <div style={row}>
        <div style={col}></div>
        <div style={col}>
          <BubblePopover 
            value={true}
            ref={popoverRef}
            placement='topLeft'
            content={<div>东西南北</div>}
          >
            <button>上左</button>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            trigger='hover'
            keepStyle={1}
            content={<div>东西南北</div>}
          >
            <button>上中</button>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            placement='topRight'
            content={<div>东西南北</div>}
          >
            <button>上右</button>
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
            <button>左上</button>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            hiddenArrow={true}
            placement='bottomLeft'
            content={<div>东西南北</div>}
          >
            <button>===</button>
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
            <button>右上</button>
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
            <button>左中</button>
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
            <button>右中</button>
          </BubblePopover>
        </div>
      </div>
      <div style={row}>
        <div style={col}>
          <BubblePopover
            placement='leftBottom'
            content={<div>东西南北</div>}
          >
            <button>左下</button>
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
            <button>右下</button>
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
            <button>下左</button>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            trigger='hover'
            keepStyle={1}
            content={<div>东西南北</div>}
          >
            <button style={{ display: 'block' }}>下中</button>
          </BubblePopover>
        </div>
        <div style={col}>
          <BubblePopover
            placement='bottomRight'
            content={<div>东西南北</div>}
          >
            <button>下右</button>
          </BubblePopover>
        </div>
        <div style={col}></div>
      </div>
    </div>
  )
}
