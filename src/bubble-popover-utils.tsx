import { PopoverPlacement } from "./popover-utils"

type ArrowStyleFn = (
  offset?: string | number
) => React.CSSProperties

const ARROW_STYLE_MAP: {
  [k: string]: ArrowStyleFn
} = {
  topLeft: (offset) => ({
    left: offset ? `calc(14px + ${offset})` : '14px',
    bottom: '4px',
    transform: 'translate(0, 100%) rotate(45deg)',
    boxShadow: '3px 3px 4px rgba(0,0,0,.05)'
  }),
  top: (offset) => ({
    left: offset ? `calc(-50% + ${offset})` : '50%',
    bottom: '4px',
    transform: 'translate(-50%, 100%) rotate(45deg)',
    boxShadow: '3px 3px 4px rgba(0,0,0,.05)'
  }),
  topRight: (offset) => ({
    right: offset ? `calc(14px + ${offset})` : '14px',
    bottom: '4px',
    transform: 'translate(0, 100%) rotate(45deg)',
    boxShadow: '3px 3px 4px rgba(0,0,0,.05)'
  }),
  bottomLeft: (offset) => ({
    left: offset ? `calc(14px + ${offset})` : '14px',
    top: '4px',
    transform: 'translate(0, -100%) rotate(45deg)',
    boxShadow: '-3px -3px 4px rgba(0,0,0,.05)'
  }),
  bottom: (offset) => ({
    left: offset ? `calc(50% + ${offset})` : '50%',
    top: '4px',
    transform: 'translate(-50%, -100%) rotate(45deg)',
    boxShadow: '-3px -3px 4px rgba(0,0,0,.05)'
  }),
  bottomRight: (offset) => ({
    right: offset ? `calc(14px + ${offset})` : '14px',
    top: '4px',
    transform: 'translate(0, -100%) rotate(45deg)',
    boxShadow: '-3px -3px 4px rgba(0,0,0,.05)'
  }),
  leftTop: (offset) => ({
    top: offset ? `calc(14px + ${offset})` : '14px',
    right: '4px',
    transform: 'translate(100%, 0) rotate(45deg)',
    boxShadow: '3px -3px 4px rgba(0,0,0,.05)'
  }),
  left: (offset) => ({
    top: offset ? `calc(50% + ${offset})` : '50%',
    right: '4px',
    transform: 'translate(100%, -50%) rotate(45deg)',
    boxShadow: '3px -3px 4px rgba(0,0,0,.05)'
  }),
  leftBottom: (offset) => ({
    bottom: offset ? `calc(14px + ${offset})` : '14px',
    right: '4px',
    transform: 'translate(100%, 0) rotate(45deg)',
    boxShadow: '3px -3px 4px rgba(0,0,0,.05)'
  }),
  rightTop: (offset) => ({
    top: offset ? `calc(14px + ${offset})` : '14px',
    left: '4px',
    transform: 'translate(-100%, 0) rotate(45deg)',
    boxShadow: '-3px 3px 4px rgba(0,0,0,.05)'
  }),
  right: (offset) => ({
    top: offset ? `calc(50% + ${offset})` : '50%',
    left: '4px',
    transform: 'translate(-100%, -50%) rotate(45deg)',
    boxShadow: '-3px 3px 4px rgba(0,0,0,.05)'
  }),
  rightBottom: (offset) => ({
    bottom: offset ? `calc(14px + ${offset})` : '14px',
    left: '4px',
    transform: 'translate(-100%, 0) rotate(45deg)',
    boxShadow: '-3px 3px 4px rgba(0,0,0,.05)'
  }),
}

export function getArrowStyle(
  placement: PopoverPlacement,
  offset?: string | number
): React.CSSProperties {
  return ARROW_STYLE_MAP[placement](offset)
}
