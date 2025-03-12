
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ChartCard: React.FC<ChartCardProps> = ({ title, children, className }) => {
  return (
    <Card className={`bg-white/90 dark:bg-card/90 backdrop-blur-sm ${className || ''}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
