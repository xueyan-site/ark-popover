import { PopoverBasePlacement } from "./popover-utils"

type ArrowStyleGetter = (
  offset?: string | number
) => React.CSSProperties

const ARROW_STYLE_MAP: Record<string, ArrowStyleGetter> = {
  topLeft: (offset) => ({
    left: offset ? `calc(10px + ${offset})` : '10px',
    bottom: 0,
    transform: 'translate(0, 100%)'
  }),
  top: (offset) => ({
    left: offset ? `calc(-50% + ${offset})` : '50%',
    bottom: 0,
    transform: 'translate(-50%, 100%)'
  }),
  topRight: (offset) => ({
    right: offset ? `calc(10px + ${offset})` : '10px',
    bottom: 0,
    transform: 'translate(0, 100%)'
  }),
  bottomLeft: (offset) => ({
    left: offset ? `calc(10px + ${offset})` : '10px',
    top: 0,
    transform: 'translate(0, -100%) rotate(180deg)',
  }),
  bottom: (offset) => ({
    left: offset ? `calc(50% + ${offset})` : '50%',
    top: 0,
    transform: 'translate(-50%, -100%) rotate(180deg)',
  }),
  bottomRight: (offset) => ({
    right: offset ? `calc(10px + ${offset})` : '10px',
    top: 0,
    transform: 'translate(0, -100%) rotate(180deg)',
  }),
  leftTop: (offset) => ({
    top: offset ? `calc(10px + ${offset})` : '10px',
    right: 0,
    transform: 'translate(100%, 0)'
  }),
  left: (offset) => ({
    top: offset ? `calc(50% + ${offset})` : '50%',
    right: 0,
    transform: 'translate(100%, -50%)'
  }),
  leftBottom: (offset) => ({
    bottom: offset ? `calc(10px + ${offset})` : '10px',
    right: 0,
    transform: 'translate(100%, 0)'
  }),
  rightTop: (offset) => ({
    top: offset ? `calc(10px + ${offset})` : '10px',
    left: 0,
    transform: 'translate(-100%, 0) rotate(180deg)'
  }),
  right: (offset) => ({
    top: offset ? `calc(50% + ${offset})` : '50%',
    left: 0,
    transform: 'translate(-100%, -50%) rotate(180deg)'
  }),
  rightBottom: (offset) => ({
    bottom: offset ? `calc(10px + ${offset})` : '10px',
    left: 0,
    transform: 'translate(-100%, 0) rotate(180deg)'
  }),
}

export function getArrowStyle(
  placement: PopoverBasePlacement,
  offset?: string | number
): React.CSSProperties {
  return ARROW_STYLE_MAP[placement](offset)
}
