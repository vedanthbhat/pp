import React from 'react';

interface HandwrittenNoteProps {
  children: React.ReactNode;
  rotation?: number; // degrees, e.g. -2, 1, 3
  color?: 'graphite' | 'red' | 'blue';
  className?: string;
  arrow?: 'left' | 'right' | 'up' | 'down';
  fig?: string;
}

export const HandwrittenNote: React.FC<HandwrittenNoteProps> = ({
  children,
  rotation = -1.5,
  color = 'graphite',
  className = '',
  arrow,
  fig
}) => {
  const colorMap = {
    graphite: 'text-[#2D2B26]',
    red: 'text-[#B93829]',
    blue: 'text-[#245380]'
  };

  return (
    <div 
      className={`inline-flex flex-col select-none max-w-full origin-left py-0.5 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {fig && (
        <span className="font-mono-code text-[9px] uppercase tracking-widest text-[#787467] mb-0.5">
          {fig}
        </span>
      )}
      <div className={`font-handwriting text-xl sm:text-2xl leading-snug font-medium ${colorMap[color]} break-words max-w-full`}>
        {arrow === 'left' && <span className="mr-1.5 text-xl">←</span>}
        {arrow === 'up' && <span className="mr-1.5 text-xl">↑</span>}
        <span>{children}</span>
        {arrow === 'right' && <span className="ml-1.5 text-xl">→</span>}
        {arrow === 'down' && <span className="ml-1.5 text-xl">↓</span>}
      </div>
    </div>
  );
};
