import React from 'react'

export function ArrowIcon({
  className,
  style,
  horizontal,
  borderColor,
  backgroundColor
}: {
  className?: string
  style?: React.CSSProperties
  horizontal?: boolean
  borderColor?: React.CSSProperties['borderColor']
  backgroundColor?: React.CSSProperties['backgroundColor']
}) {
  return horizontal ? (
    <svg className={className} style={style} width="7px" height="12px" viewBox="0 0 7 12">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <polygon fill={backgroundColor} fillRule="nonzero" points="0 0 0 12 1 12 7 6 1 2.84217094e-14"/>
        <polygon fill={borderColor} fillRule="nonzero" points="0 0 8.32667268e-17 0.42 5.58 6 8.32667268e-17 11.58 0 12 1 12 7 6 1 2.84217094e-14"/>
      </g>
    </svg>
  ) : (
    <svg className={className} style={style} width="12px" height="7px" viewBox="0 0 12 7">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <polygon fill={backgroundColor} fillRule="nonzero" points="0 -7.10542736e-15 8.32667268e-17 1 6 7 12 1 12 2.1316282e-14"/>
        <polygon fill={borderColor} fillRule="nonzero" points="0 -7.10542736e-15 8.32667268e-17 1 6 7 12 1 12 2.1316282e-14 11.5818292 2.1316282e-14 6 5.58 0.420071602 2.1316282e-14"/>
      </g>
    </svg>
  )
}
