import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Receipt } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ActionCardBillSplit() {
  return (
    <Card className="border-orange-200 bg-orange-50/50 shadow-sm mt-2 max-w-[300px]">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm text-[#F26C3D] flex items-center gap-2">
          <Receipt className="w-4 h-4" /> Bill Split Proposal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 text-sm space-y-4">
        <div className="text-muted-foreground text-xs">
          Analyzed receipt from <span className="font-semibold text-foreground">Izakaya Tokyo</span>. Total: ¥12,500.
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-background p-2 rounded-md border border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px]">YX</AvatarFallback>
              </Avatar>
              <span>Yun Xin</span>
            </div>
            <span className="font-semibold text-red-500">Owes ¥4,500</span>
          </div>
          
          <div className="flex items-center justify-between bg-background p-2 rounded-md border border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px]">JY</AvatarFallback>
              </Avatar>
              <span>Jie Ying</span>
            </div>
            <span className="font-semibold text-red-500">Owes ¥4,000</span>
          </div>

          <div className="flex items-center justify-between bg-background p-2 rounded-md border border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px]">XY</AvatarFallback>
              </Avatar>
              <span>Xuan Yu</span>
            </div>
            <span className="font-semibold text-green-600">Paid ¥12,500</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1 bg-[#F26C3D] hover:bg-[#d85e33] h-8 text-xs">Confirm Split</Button>
        <Button variant="outline" className="flex-1 h-8 text-xs">Edit</Button>
      </CardFooter>
    </Card>
  );
}
