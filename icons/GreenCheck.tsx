import {SvgIcon, SvgIconProps} from '@mui/material'

export function GreenCheck(props: SvgIconProps) {
  return (
    <SvgIcon
      data-name="Layer 1"
      height="18.27"
      viewBox="0 0 18.27 18.27"
      width="18.27"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="clippath">
          <rect
            height="18.27"
            style={{fill: 'none', strokeWidth: 0}}
            width="18.27"
            x="0"
          />
        </clipPath>
      </defs>
      <g style={{clipPath: 'url(#clippath)'}}>
        <g>
          <path
            d="m9.14,18.27c5.05,0,9.14-4.09,9.14-9.14S14.18,0,9.14,0,0,4.09,0,9.14s4.09,9.14,9.14,9.14Z"
            style={{fill: '#226f61', strokeWidth: 0}}
          />
          <path
            d="m4.76,9.56l3.12,3.59"
            style={{
              fill: 'none',
              stroke: '#fff',
              strokeLinecap: 'round',
              strokeWidth: '2px',
            }}
          />
          <path
            d="m13.51,5.12l-5.62,8.04"
            style={{
              fill: 'none',
              stroke: '#fff',
              strokeLinecap: 'round',
              strokeWidth: '2px',
            }}
          />
        </g>
      </g>
    </SvgIcon>
  )
}
