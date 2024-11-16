interface Props {
  className?: string;
}

export const Hero = ({ className }: Props) => (
  <svg
    viewBox="0 0 800 600"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(400,250)">
      <path
        d="M0,0 
                                 L-40,-80 C-30,-90 -20,-100 0,-120
                                 C20,-100 30,-90 40,-80 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={3}
      />

      <circle cx={-20} cy={-90} r={4} fill="#FFFFFF" />
      <circle cx={0} cy={-100} r={4} fill="#FFFFFF" />
      <circle cx={20} cy={-90} r={4} fill="#FFFFFF" />

      <rect x={-30} y={0} width={60} height={15} fill="#FFFFFF" />
    </g>

    <g fontFamily="YSHaoShenTi" textAnchor="middle">
      <text x={400} y={400} fill="#FFFFFF" fontSize={48}>
        Harvest
      </text>

      <text x={400} y={450} fill="#808080" fontSize={24}>
        轻松收藏，随时随地
      </text>
    </g>

    <g transform="translate(400,500)">
      <circle
        cx={-40}
        cy={0}
        r={8}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
      />
      <circle
        cx={0}
        cy={0}
        r={8}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
      />
      <circle
        cx={40}
        cy={0}
        r={8}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
      />
    </g>
  </svg>
);
