import React from "react";

interface Props {
  className?: string;
}

export const Section1: React.FC<Props> = ({ className }) => (
  <svg viewBox="0 0 800 600" className={className}>
    {/* 主视觉：收割机图形抽象化 */}
    <g transform="translate(400,250)">
      {/* 社交媒体图标群 (简化为圆点) */}
      <circle cx="-150" cy="0" r="15" fill="#FFFFFF" opacity="0.8" />
      <circle cx="-120" cy="-30" r="15" fill="#FFFFFF" opacity="0.8" />
      <circle cx="-130" cy="30" r="15" fill="#FFFFFF" opacity="0.8" />

      {/* 收割过程可视化 (弧形路径) */}
      <path
        d="M -100,0 Q 0,-50 100,0"
        stroke="#FFFFFF"
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
      />

      {/* 笔记本图标 (简化为矩形) */}
      <rect
        x="70"
        y="-40"
        width="60"
        height="80"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <line
        x1="85"
        y1="-25"
        x2="115"
        y2="-25"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <line
        x1="85"
        y1="-10"
        x2="115"
        y2="-10"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <line x1="85" y1="5" x2="115" y2="5" stroke="#FFFFFF" strokeWidth="2" />
    </g>

    {/* 文字说明 */}
    <text
      x="400"
      y="400"
      fontFamily="YSHaoShenTi"
      fontSize="36"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      Harvest
    </text>

    <text
      x="400"
      y="450"
      fontFamily="YSHaoShenTi"
      fontSize="18"
      fill="#808080"
      textAnchor="middle"
    >
      轻松收集 · 智能归档
    </text>
  </svg>
);
export const Section2: React.FC<Props> = ({ className }) => (
  <svg viewBox="0 0 800 600" className={className}>
    {/* 主标题 */}
    <text
      x="400"
      y="100"
      fontFamily="YSHaoShenTi"
      fontSize="48"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      Harvest
    </text>

    {/* 核心图形：简化的收割机/收集篮概念 */}
    <g transform="translate(400,300)">
      {/* 收集容器的简化表示 */}
      <path
        d="M-100,0 L-80,-120 L80,-120 L100,0 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
      />

      {/* 信息流的可视化表现 */}
      <g>
        {/* 信息颗粒 */}
        <circle cx="-60" cy="-60" r="8" fill="#FFFFFF" />
        <circle cx="0" cy="-90" r="8" fill="#FFFFFF" />
        <circle cx="60" cy="-60" r="8" fill="#FFFFFF" />

        {/* 连接线 */}
        <path
          d="M-60,-60 L0,-90 L60,-60"
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
        />
      </g>
    </g>

    {/* 说明文本 */}
    <g fontFamily="YSHaoShenTi" fill="#FFFFFF">
      <text x="400" y="450" fontSize="24" textAnchor="middle">
        简单高效的信息收藏
      </text>

      {/* 三个核心特点 */}
      <text x="250" y="500" fontSize="18" textAnchor="middle">
        便捷收集
      </text>
      <text x="400" y="500" fontSize="18" textAnchor="middle">
        智能整理
      </text>
      <text x="550" y="500" fontSize="18" textAnchor="middle">
        灵活应用
      </text>
    </g>

    {/* 装饰性线条 */}
    <line
      x1="200"
      y1="520"
      x2="600"
      y2="520"
      stroke="#808080"
      strokeWidth="1"
    />
  </svg>
);

export const Section3: React.FC<Props> = ({ className }) => (
  <svg viewBox="0 0 800 600" className={className}>
    {/* 主要图形元素: 收割机象征收集信息 */}
    <g transform="translate(400,250)">
      {/* 简化的收割机图案 */}
      <path
        d="M-150,0 L150,0 M-120,-30 L120,-30 M-90,-60 L90,-60"
        stroke="#FFFFFF"
        strokeWidth="4"
        fill="none"
      />

      {/* 信息颗粒 */}
      <circle cx="-100" cy="40" r="8" fill="#FFFFFF" />
      <circle cx="-60" cy="40" r="8" fill="#FFFFFF" />
      <circle cx="-20" cy="40" r="8" fill="#FFFFFF" />
      <circle cx="20" cy="40" r="8" fill="#FFFFFF" />
      <circle cx="60" cy="40" r="8" fill="#FFFFFF" />
      <circle cx="100" cy="40" r="8" fill="#FFFFFF" />
    </g>

    {/* 步骤说明 */}
    <g
      transform="translate(400,400)"
      textAnchor="middle"
      fontFamily="YSHaoShenTi"
      fill="#FFFFFF"
    >
      <text y="0" fontSize="24">
        Harvest 信息收集步骤
      </text>
      <text y="40" fontSize="16">
        1. 连接社交软件
      </text>
      <text y="70" fontSize="16">
        2. 连接笔记软件
      </text>
      <text y="100" fontSize="16">
        3. 选择要保存的信息
      </text>
      <text y="130" fontSize="16">
        4. 保存到笔记软件
      </text>
    </g>

    {/* 装饰元素 */}
    <g transform="translate(400,100)" stroke="#808080" strokeWidth="1">
      <line x1="-200" y1="0" x2="200" y2="0" />
      <line x1="-200" y1="10" x2="200" y2="10" />
    </g>
  </svg>
);
