import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRightLeft } from 'lucide-react';

export default function CurrencyPage() {
  return (
    <div className="max-w-xl mx-auto space-y-8 pt-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Currency Converter</h2>
        <p className="text-muted-foreground">Live exchange rates for your trip</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-lg">
        <CardContent className="p-8 space-y-6">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">You Pay (USD)</label>
              <div className="flex gap-4 items-center">
                <span className="text-2xl font-bold px-2">$</span>
                <Input type="number" defaultValue={100} className="text-2xl h-14 font-semibold" />
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-background border border-border rounded-full p-2">
                <ArrowRightLeft className="w-5 h-5 text-primary rotate-90" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">You Get (JPY)</label>
              <div className="flex gap-4 items-center">
                <span className="text-2xl font-bold px-2">¥</span>
                <Input type="number" value={14950} readOnly className="text-2xl h-14 font-semibold bg-muted/50" />
              </div>
            </div>
          </div>
          
          <div className="text-center text-xs text-muted-foreground pt-4">
            1 USD = 149.50 JPY (Mid-market rate)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
