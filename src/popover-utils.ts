import React from "react"

export type PartPopoverPlacement = 
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'

export type PopoverPlacement =
  PartPopoverPlacement
  | 'auto'
  | 'center'
  | 'x'
  | 'xCenter'
  | 'y'
  | 'yCenter'

type PlacementStyleGetter = (
  offset?: string | number,
  spacing?: string | number
) => React.CSSProperties

export type PopoverStyleKeeper = (
  placement: PartPopoverPlacement, 
  rootRect: DOMRect
) => React.CSSProperties

const PLACEMENT_STYLE_MAP: Record<string, PlacementStyleGetter> = {
  topLeft: (offset, spacing) => ({
    paddingBottom: spacing,
    left: offset || 0,
    top: 0,
    transform: 'translate(0, -100%)',
    transformOrigin: '0 100%'
  }),
  top: (offset, spacing) => ({
    paddingBottom: spacing,
    left: offset ? `calc(50% + ${offset})` : '50%',
    top: 0,
    transform: 'translate(-50%, -100%)',
    transformOrigin: '50% 100%'
  }),
  topRight: (offset, spacing) => ({
    paddingBottom: spacing,
    right: offset || 0,
    top: 0,
    transform: 'translate(0, -100%)',
    transformOrigin: '100% 100%'
  }),
  bottomLeft: (offset, spacing) => ({
    paddingTop: spacing,
    left: offset || 0,
    bottom: 0,
    transform: 'translate(0, 100%)',
    transformOrigin: '0 0'
  }),
  bottom: (offset, spacing) => ({
    paddingTop: spacing,
    left: offset ? `calc(-50% + ${offset})` : '50%',
    bottom: 0,
    transform: 'translate(-50%, 100%)',
    transformOrigin: '50% 0'
  }),
  bottomRight: (offset, spacing) => ({
    paddingTop: spacing,
    right: offset || 0,
    bottom: 0,
    transform: 'translate(0, 100%)',
    transformOrigin: '100% 0'
  }),
  leftTop: (offset, spacing) => ({
    paddingRight: spacing,
    top: offset || 0,
    left: 0,
    transform: 'translate(-100%, 0)',
    transformOrigin: '100% 0'
  }),
  left: (offset, spacing) => ({
    paddingRight: spacing,
    top: offset ? `calc(50% + ${offset})` : '50%',
    left: 0,
    transform: 'translate(-100%, -50%)',
    transformOrigin: '100% 50%'
  }),
  leftBottom: (offset, spacing) => ({
    paddingRight: spacing,
    bottom: offset || 0,
    left: 0,
    transform: 'translate(-100%, 0)',
    transformOrigin: '100% 100%'
  }),
  rightTop: (offset, spacing) => ({
    paddingLeft: spacing,
    top: offset || 0,
    right: 0,
    transform: 'translate(100%, 0)',
    transformOrigin: '0 0'
  }),
  right: (offset, spacing) => ({
    paddingLeft: spacing,
    top: offset ? `calc(50% + ${offset})` : '50%',
    right: 0,
    transform: 'translate(100%, -50%)',
    transformOrigin: '0 50%'
  }),
  rightBottom: (offset, spacing) => ({
    paddingLeft: spacing,
    bottom: offset || 0,
    right: 0,
    transform: 'translate(100%, 0)',
    transformOrigin: '0 100%'
  })
}

const PLACEMENT_MATRIX_MAP: Record<string, PartPopoverPlacement[][]> = {
  'auto': [
    ['rightTop', 'bottom', 'leftTop'],
    ['right', 'bottom', 'left'],
    ['rightBottom', 'top', 'leftBottom']
  ],
  'center': [
    ['right', 'bottom', 'left'],
    ['right', 'bottom', 'left'],
    ['right', 'top', 'left']
  ],
  'x': [
    ['rightTop', 'rightTop', 'leftTop'],
    ['right', 'right', 'left'],
    ['rightBottom', 'rightBottom', 'leftBottom']
  ],
  'xCenter': [
    ['right', 'right', 'left'],
    ['right', 'right', 'left'],
    ['right', 'right', 'left']
  ],
  'y': [
    ['bottomLeft', 'bottom', 'bottomRight'],
    ['bottomLeft', 'bottom', 'bottomRight'],
    ['topLeft', 'top', 'topRight']
  ],
  'yCenter': [
    ['bottom', 'bottom', 'bottom'],
    ['bottom', 'bottom', 'bottom'],
    ['top', 'top', 'top']
  ],
}

const MIN_WIDTH_OR_HEIGHT = 36

export function getPlacement(
  placement?: PopoverPlacement,
  root?: HTMLElement | null
): PartPopoverPlacement {
  if (!root) {
    return 'bottom'
  }
  const rect = root.getBoundingClientRect()
  const opm = placement || 'auto'
  const mtx = PLACEMENT_MATRIX_MAP[opm]
  if (!mtx) {
    return PLACEMENT_STYLE_MAP[opm] ? opm : 'bottom' as any
  }
  const parent = document.body
  const pw = parent.clientWidth / 10
  const ph = parent.clientHeight / 10
  const rx = (rect.left + rect.right) / 2
  const ry = (rect.top + rect.bottom) / 2
  let pm = mtx[
    ry < (ph * 3) ? 0 : ry < (ph * 7) ? 1 : 2
  ][
    rx < (pw * 3) ? 0 : rx < (pw * 7) ? 1 : 2
  ]
  // 当根节点宽或高不大的时候，弹层内容居中显示
  const pm0 = pm[0]
  if ('lr'.includes(pm0)) {
    if (rect.height < MIN_WIDTH_OR_HEIGHT) {
      pm = pm0 === 'l' ? 'left' : 'right'
    }
  } else if ('tb'.includes(pm0)) {
    if (rect.width < MIN_WIDTH_OR_HEIGHT) {
      pm = pm0 === 't' ? 'top' : 'bottom'
    }
  }
  return pm
}

export function getPlacementStyle(
  placement?: PopoverPlacement,
  root?: HTMLElement | null,
  offset?: string | number,
  spacing?: string | number,
  keepStyle?: number | PopoverStyleKeeper,
): [React.CSSProperties, PartPopoverPlacement] {
  const pm = getPlacement(placement, root)
  const style = PLACEMENT_STYLE_MAP[pm](offset, spacing)
  // 计算弹层内容区的宽度和高度
  if (root && keepStyle) {
    const rect = root.getBoundingClientRect()
    if (keepStyle instanceof Function) {
      Object.assign(style, keepStyle(pm, rect))
    } else {
      const attr = 'tb'.includes(pm[0]) ? 'width' : 'height'
      const value = rect[attr] * keepStyle
      if (value >= MIN_WIDTH_OR_HEIGHT) {
        style[attr] = value
      }
    }
  }
  return [style, pm]
}
