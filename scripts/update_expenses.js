const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/chat/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// I need to update the expenses block
const jsxRegex = /if \(activeChannel === "expenses"\) \{.*?return \(\s*<>\s*<MessageBubble\s*id="exp1".*?<\/div>\s*<\/>\s*\);\s*\}/s;

const newJsx = `if (activeChannel === "expenses") {
      const flightCostUSD = 450;
      const flightCostMYR = flightCostUSD * 4.70;
      
      const accChoice = typeof window !== 'undefined' ? localStorage.getItem('approvedPollAcc') : null;
      let accCostJPY = 78000;
      if (accChoice === 'Nine Hours Namba') accCostJPY = 31500;
      else if (accChoice === 'Hotel Monterey Grasmere') accCostJPY = 108000;
      else if (accChoice === 'Kyoto Ryokan Kinoe') accCostJPY = 270000;
      else if (accChoice === 'Cross Hotel Osaka') accCostJPY = 135000;
      else if (accChoice === 'Ritz-Carlton Kyoto') accCostJPY = 720000;
      const accCostMYR = accCostJPY * 0.0315;

      const likedPlaces = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tripLikedPlaces') || '[]') : [];
      let attrCostJPY = 0;
      if (likedPlaces.includes('Universal Studios Japan')) attrCostJPY += 8600;
      if (likedPlaces.includes('Osaka Castle')) attrCostJPY += 600;
      const attrCostMYR = attrCostJPY * 0.0315;

      const foodCostJPY = 24500;
      const foodCostMYR = foodCostJPY * 0.0315;

      const transportCostJPY = 16000;
      const transportCostMYR = transportCostJPY * 0.0315;

      const totalMYR = flightCostMYR + accCostMYR + attrCostMYR + foodCostMYR + transportCostMYR;

      return (
        <>
          <MessageBubble
            id="exp1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:30 AM"
            content="Here is a dynamic budget breakdown based on the group's chosen itinerary:"
          />
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full max-w-lg ml-12">
            <div className="flex items-start justify-between border-b pb-3 mb-3"><div><h3 className="font-semibold">Estimated trip spend per pax</h3><p className="text-xs text-muted-foreground mt-1">Mock conversion: USD 1 ≈ MYR 4.70 • JPY 100 ≈ MYR 3.15</p></div><span className="text-xs rounded-full bg-muted px-2 py-1">7 days</span></div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4"><div><p className="font-medium">Flights</p><p className="text-xs text-muted-foreground">USD {flightCostUSD}</p></div><span className="font-medium text-right">≈ MYR {flightCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="flex justify-between gap-4"><div><p className="font-medium">Accommodation ({accChoice || 'Standard'})</p><p className="text-xs text-muted-foreground">JPY {accCostJPY.toLocaleString()}</p></div><span className="font-medium text-right">≈ MYR {accCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="flex justify-between gap-4"><div><p className="font-medium">Attractions ({likedPlaces.length} selected)</p><p className="text-xs text-muted-foreground">JPY {attrCostJPY.toLocaleString()}</p></div><span className="font-medium text-right">≈ MYR {attrCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="flex justify-between gap-4"><div><p className="font-medium">Food</p><p className="text-xs text-muted-foreground">JPY {foodCostJPY.toLocaleString()}</p></div><span className="font-medium text-right">≈ MYR {foodCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="flex justify-between gap-4"><div><p className="font-medium">Local transport</p><p className="text-xs text-muted-foreground">JPY {transportCostJPY.toLocaleString()}</p></div><span className="font-medium text-right">≈ MYR {transportCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="border-t pt-3 mt-2 flex justify-between font-bold text-[#ff6b3d]"><span>Estimated total</span><span>≈ MYR {totalMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              <p className="text-xs text-muted-foreground">Budget range: MYR {(totalMYR * 0.9).toLocaleString('en-US', {maximumFractionDigits:0})}–{(totalMYR * 1.1).toLocaleString('en-US', {maximumFractionDigits:0})} depending on actual meals and shopping.</p>
            </div>
          </div>
        </>
      );
    }`;

content = content.replace(jsxRegex, newJsx);
fs.writeFileSync(path, content);
