import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { File, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FilesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Travel Files</h2>
        <Button className="gap-2">
          <Upload className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Passports & IDs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border/50 cursor-pointer hover:bg-muted transition-colors">
              <File className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-medium text-sm">John's Passport.pdf</p>
                <p className="text-xs text-muted-foreground">Added Oct 1, 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Flight Tickets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border/50 cursor-pointer hover:bg-muted transition-colors">
              <File className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-medium text-sm">JAL_E-Ticket.pdf</p>
                <p className="text-xs text-muted-foreground">Added Oct 2, 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
