import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { US, GB, DE } from 'country-flag-icons/react/3x2';

interface BalanceCardProps {
  title: string;
  amount: string;
  currency: string;
  countryCode: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

const FlagComponent: Record<string, React.ComponentType<any>> = {
  US,
  GB,
  DE
};

const BalanceCard: React.FC<BalanceCardProps> = ({
  title,
  amount,
  currency,
  countryCode,
  trend,
}) => {
  const Flag = FlagComponent[countryCode] || US;

  return (
    <Card className="p-6 shadow-none w-[240px] shrink-0">
      <div className="flex flex-col space-y-1">
        <div className="flex flex-col space-y-5">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
            <Flag className="w-12 h-12 transform scale-150" />
          </div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
        </div>
        <div>
          <div className="text-2xl font-bold flex items-center gap-1">
            <span>{amount}</span>
            <span>{currency}</span>
          </div>
        </div>
        <Badge variant={trend.isPositive ? 'default' : 'destructive'} className="w-fit">
          {trend.value}
        </Badge>
      </div>
    </Card>
  );
};

export default BalanceCard; 