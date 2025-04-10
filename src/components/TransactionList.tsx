import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: string;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between border-b py-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Button variant="link" className="text-primary">
          View All
        </Button>
      </div>
      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-lg font-medium">
                  {transaction.description.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{transaction.amount} {transaction.currency}</p>
                <p className="text-sm text-muted-foreground capitalize">{transaction.status}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionList; 