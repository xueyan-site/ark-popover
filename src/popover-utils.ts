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

export function getPlacementStyle(
  placement: PopoverPlacement,
  root?: HTMLDivElement | null,
  offset?: string | number,
  spacing?: string | number,
  keepWidth?: number | ((rootRect: DOMRect) => number),
  keepHeight?: number | ((rootRect: DOMRect) => number)
): React.CSSProperties {
  const style = PLACEMENT_STYLE_MAP[placement](offset, spacing)
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
  return style
}
