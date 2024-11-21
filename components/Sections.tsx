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

export const Section4: React.FC<Props> = ({ className }) => (
  <svg viewBox="0 0 800 600" className={className}>
    {/* 背景 */}

    <g transform="translate(200,150)" fill="#FFFFFF">
      <path d="m54,18v38h-30.69c-2.37,0-3.98-.67-5.66-2.34l-5.31-5.31c-1.68-1.68-2.34-3.29-2.34-5.66V8h34v38h-25.52l4,4h25.52V18h6Z" />
    </g>
    <g transform="translate(100,120)" fill="#FFFFFF">
      <path d="m24,36.5c0,1.29.11,2.51.29,3.7-1.91.52-4.01.8-6.29.8-2.05,0-3.95-.22-5.69-.63-3.01,2.27-6.75,3.63-10.81,3.63l-1.5-2.25,5.03-5.03c-3.23-2.86-5.03-7.04-5.03-12.22C0,14.32,6.89,8,18,8c8.61,0,14.67,3.81,16.96,10.25-6.89,3.21-10.96,9.69-10.96,18.25Zm40,0c0-10.18-6.89-16.5-18-16.5s-18,6.32-18,16.5,6.89,16.5,18,16.5c2.05,0,3.95-.22,5.69-.63,3.01,2.27,6.75,3.63,10.81,3.63l1.5-2.25-5.03-5.03c3.23-2.86,5.03-7.04,5.03-12.22Z" />
    </g>
    <g transform="translate(300,130)" fill="#FFFFFF">
      <path d="m42,23v18c0,4.92-3.08,8-8,8H12c-4.92,0-8-3.08-8-8v-18c0-4.92,3.08-8,8-8h22c4.92,0,8,3.08,8,8Zm14-5l-10,10v8l10,10h4v-28h-4Z" />
    </g>
    <g transform="translate(400,160)" fill="#FFFFFF">
      <path d="m38,27c0-2.76,2.24-5,5-5s5,2.24,5,5-2.24,5-5,5-5-2.24-5-5Zm20-15v40H6V12h52Zm-6,6H12v26l14-14h4l16,16h6v-28Z" />
    </g>

    {/* 收藏动画路径 */}
    <path
      d="M230,180 C280,180 320,250 370,320"
      stroke="#808080"
      strokeWidth="3"
      fill="none"
      strokeDasharray="8,8"
    />

    {/* 笔记本图标 */}
    <g transform="translate(350,300)" fill="#FFFFFF">
      <rect x="0" y="0" width="100" height="120" rx="10" />
      {/* 笔记本内部线条 */}
      <line x1="20" y1="30" x2="80" y2="30" stroke="#000000" strokeWidth="2" />
      <line x1="20" y1="60" x2="80" y2="60" stroke="#000000" strokeWidth="2" />
      <line x1="20" y1="90" x2="80" y2="90" stroke="#000000" strokeWidth="2" />
    </g>

    {/* 标题文字 */}
    <text
      x="400"
      y="500"
      fontFamily="YSHaoShenTi"
      fontSize="24"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      轻松收藏，随时随地
    </text>

    {/* 动画效果：信息流动 */}
    <circle className="moving-dot" r="5" fill="#FFFFFF">
      <animateMotion
        path="M230,180 C280,180 320,250 370,320"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export const Section5: React.FC<Props> = ({ className }) => (
  <svg viewBox="0 0 800 600" className={className}>
    <g transform="translate(150,120)" fill="#FFFFFF">
      <path d="m24,36.5c0,1.29.11,2.51.29,3.7-1.91.52-4.01.8-6.29.8-2.05,0-3.95-.22-5.69-.63-3.01,2.27-6.75,3.63-10.81,3.63l-1.5-2.25,5.03-5.03c-3.23-2.86-5.03-7.04-5.03-12.22C0,14.32,6.89,8,18,8c8.61,0,14.67,3.81,16.96,10.25-6.89,3.21-10.96,9.69-10.96,18.25Zm40,0c0-10.18-6.89-16.5-18-16.5s-18,6.32-18,16.5,6.89,16.5,18,16.5c2.05,0,3.95-.22,5.69-.63,3.01,2.27,6.75,3.63,10.81,3.63l1.5-2.25-5.03-5.03c3.23-2.86,5.03-7.04,5.03-12.22Z" />
    </g>
    <g transform="translate(250,150)" fill="#FFFFFF">
      <path d="m54,18v38h-30.69c-2.37,0-3.98-.67-5.66-2.34l-5.31-5.31c-1.68-1.68-2.34-3.29-2.34-5.66V8h34v38h-25.52l4,4h25.52V18h6Z" />
    </g>
    <g transform="translate(350,120)" fill="#FFFFFF">
      <path d="m42,23v18c0,4.92-3.08,8-8,8H12c-4.92,0-8-3.08-8-8v-18c0-4.92,3.08-8,8-8h22c4.92,0,8,3.08,8,8Zm14-5l-10,10v8l10,10h4v-28h-4Z" />
    </g>
    <g transform="translate(450,160)" fill="#FFFFFF">
      <path d="m38,27c0-2.76,2.24-5,5-5s5,2.24,5,5-2.24,5-5,5-5-2.24-5-5Zm20-15v40H6V12h52Zm-6,6H12v26l14-14h4l16,16h6v-28Z" />
    </g>

    {/* 收藏动画路径 */}
    <path
      d="M300,180 C400,180 400,350 500,350"
      stroke="#FFFFFF"
      strokeWidth="3"
      fill="none"
      strokeDasharray="8,8"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="100"
        to="0"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>

    {/* 笔记本图标 */}
    <g transform="translate(500,320)">
      <rect
        x="0"
        y="0"
        width="100"
        height="120"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
      {/* 笔记本线条装饰 */}
      <line x1="20" y1="30" x2="80" y2="30" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="20" y1="60" x2="80" y2="60" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="20" y1="90" x2="80" y2="90" stroke="#FFFFFF" strokeWidth="2" />
    </g>

    {/* 标题文字 */}
    <text
      x="400"
      y="520"
      fontFamily="YSHaoShenTi"
      fontSize="28"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      Harvest 收藏助手：轻松收藏，随时随地
    </text>
  </svg>
);
