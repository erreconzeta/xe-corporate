import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { US, GB, DE, JP, CA, AU } from 'country-flag-icons/react/3x2';

interface BalanceCardProps {
  title: string;
  amount: string;
  currency: string;
  countryCode: string;
}

const FlagComponent: Record<string, React.ComponentType<any>> = {
  US,
  GB,
  DE,
  JP,
  CA,
  AU
};

const BalanceCard: React.FC<BalanceCardProps> = ({
  title,
  amount,
  currency,
  countryCode,
}) => {
  const Flag = FlagComponent[countryCode] || US;

  return (
    <Card className="p-6 shadow-none w-[240px] shrink-0">
      <div className="flex flex-col space-y-1">
        <div className="flex flex-col space-y-5">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-input">
            <Flag className="w-12 h-12 transform scale-150" />
          </div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
        </div>
        <div>
          <div className="text-xl font-bold flex items-center gap-1">
            <span>{amount}</span>
            <span>{currency}</span>
          </div>
        </div>
        <div className="flex">
          <Badge variant="default" size="sm">
            {amount} available
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard; 