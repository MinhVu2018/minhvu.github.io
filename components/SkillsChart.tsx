import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { SkillMetric } from '../types';

interface SkillsChartProps {
  data: SkillMetric[];
}

const SkillsChart: React.FC<SkillsChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar
            name="Skill Level"
            dataKey="A"
            stroke="#6366f1"
            strokeWidth={3}
            fill="#6366f1"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
            itemStyle={{ color: '#818cf8' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;