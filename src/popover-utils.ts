export type PopoverPlacement = 
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

type PlacementStyleFn = (
  offset?: string | number,
  spacing?: string | number
) => React.CSSProperties

const PLACEMENT_STYLE_MAP: { 
  [k: string]: PlacementStyleFn 
} = {
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

const AUTO_PLACEMENT_MAP: PopoverPlacement[][] = [
  ['rightTop', 'bottom', 'leftTop'],
  ['right', 'bottom', 'left'],
  ['rightBottom', 'top', 'leftBottom']
]

export function getPlacement(
  placement?: PopoverPlacement,
  root?: HTMLDivElement | null
) {
  if (placement || !root) {
    return placement || 'bottom'
  }
  const rect = root.getBoundingClientRect()
  const vw = document.body.clientWidth
  const vh = document.body.clientHeight
  const rx = (rect.left + rect.right) / 2
  const ry = (rect.top + rect.bottom) / 2
  const vw3 = vw / 3
  const vh3 = vh / 3
  return AUTO_PLACEMENT_MAP[
    ry < vh3 ? 0 : ry < (vh3 * 2) ? 1 : 2
  ][
    rx < vw3 ? 0 : rx < (vw3 * 2) ? 1 : 2
  ]
}

export function getPlacementStyle(
  placement?: PopoverPlacement,
  root?: HTMLDivElement | null,
  offset?: string | number,
  spacing?: string | number,
  keepWidth?: number | ((rootRect: DOMRect) => number),
  keepHeight?: number | ((rootRect: DOMRect) => number)
): [React.CSSProperties, PopoverPlacement] {
  const pm = getPlacement(placement, root)
  const style = PLACEMENT_STYLE_MAP[pm](offset, spacing)
  // 计算弹层内容区的宽度和高度
  if (root) {
    if (keepWidth) {
      const rootRect = root.getBoundingClientRect()
      style.width = keepWidth instanceof Function
        ? keepWidth(rootRect)
        : rootRect.width * keepWidth
    }
    if (keepHeight) {
      const rootRect = root.getBoundingClientRect()
      style.height = keepHeight instanceof Function
        ? keepHeight(rootRect)
        : rootRect.height * keepHeight
    }
  }
  return [style, pm]
}
