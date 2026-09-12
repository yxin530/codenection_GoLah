const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/chat/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add new state variables
content = content.replace(
  /const \[planningCompleted, setPlanningCompleted\] = useState\(false\);/,
  `const [planningCompleted, setPlanningCompleted] = useState(false);\n  const [finalApprovalStage, setFinalApprovalStage] = useState<'idle' | 'pending' | 'rejected' | 'waiting' | 'approved'>('idle');\n  const [rejectionReason, setRejectionReason] = useState("");\n  const [groupApprovals, setGroupApprovals] = useState(0);\n  const [isSubmittingRejection, setIsSubmittingRejection] = useState(false);`
);

// 2. Add imports if needed (e.g., CheckCircle2, XCircle)
if (!content.includes('CheckCircle2')) {
  content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, "import {$1, CheckCircle2, XCircle, Loader2} from 'lucide-react';");
}

// 3. Update the transition from approval_plan to trigger the final approval flow
content = content.replace(
  /onClick=\{\(\) => \{ setPlanningCompleted\(true\); localStorage\.setItem\('tripLikedPlaces', JSON\.stringify\(\[Object\.entries\(pollPlanVotes\)\.reduce\(\(a, b\) => a\[1\] > b\[1\] \? a : b\)\[0\]\]\)\); \}\}/,
  `onClick={() => { setPlanningCompleted(true); localStorage.setItem('tripLikedPlaces', JSON.stringify([Object.entries(pollPlanVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]])); setFinalApprovalStage('pending'); }}`
);

// 4. Add the new final approval UI section after planningCompleted is true
const finalUIStr = `
              {planningCompleted && finalApprovalStage !== 'idle' && (
                <>
                  <div className="border-t border-border my-6 relative">
                    <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs font-semibold text-muted-foreground">
                      Final Itinerary Review
                    </span>
                  </div>

                  <MessageBubble
                    id="final-itinerary"
                    senderName="GoLah AI"
                    isAgent={true}
                    timestamp="10:25 AM"
                    content="Alright, I've compiled the final itinerary based on everyone's votes! We have the flights, accommodation, and attractions all set. Please review the plan below."
                  />

                  {finalApprovalStage === 'pending' && (
                    <div className="ml-12 max-w-md rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-sm mb-4">
                      <h3 className="font-bold text-lg mb-2">Final Itinerary Proposal</h3>
                      <ul className="text-sm space-y-1 mb-4 text-muted-foreground">
                        <li>• <strong>Accommodation:</strong> {typeof window !== 'undefined' ? localStorage.getItem('approvedPollAcc') || 'Nine Hours Namba' : 'Nine Hours Namba'}</li>
                        <li>• <strong>Key Attraction:</strong> {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tripLikedPlaces') || '["Universal Studios Japan"]')[0] : 'Universal Studios Japan'}</li>
                        <li>• <strong>Budget:</strong> ~$1,420 / pax</li>
                      </ul>
                      <p className="font-semibold text-black mb-4">Do you approve this itinerary?</p>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white" onClick={() => {
                          setFinalApprovalStage('waiting');
                          setGroupApprovals(1);
                          // Simulate other members approving
                          setTimeout(() => setGroupApprovals(2), 2000);
                          setTimeout(() => {
                            setGroupApprovals(3);
                            setFinalApprovalStage('approved');
                          }, 4000);
                        }}>
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                        </Button>
                        <Button variant="outline" className="flex-1 text-red-500 border-red-200 hover:bg-red-50" onClick={() => setFinalApprovalStage('rejected')}>
                          <XCircle className="w-4 h-4 mr-2" /> Reject
                        </Button>
                      </div>
                    </div>
                  )}

                  {finalApprovalStage === 'rejected' && (
                    <div className="ml-12 max-w-md rounded-2xl border border-red-200 bg-red-50/60 p-5 shadow-sm mb-4">
                      <h3 className="font-bold text-red-700 mb-2">Itinerary Rejected</h3>
                      <p className="text-sm mb-3 text-red-900/80">Why did you reject? What should we change?</p>
                      <textarea 
                        className="w-full text-sm p-3 rounded-xl border border-red-200 bg-white mb-3 min-h-[80px]"
                        placeholder="E.g., I think the hotel is too expensive..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white" disabled={!rejectionReason || isSubmittingRejection} onClick={() => {
                          setIsSubmittingRejection(true);
                          setTimeout(() => {
                            setIsSubmittingRejection(false);
                            setFinalApprovalStage('idle');
                            setDebateStage('idle');
                            setPlanningCompleted(false);
                          }, 1500);
                        }}>
                          {isSubmittingRejection ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Discuss Again
                        </Button>
                        <Button variant="ghost" onClick={() => setFinalApprovalStage('pending')}>Cancel</Button>
                      </div>
                    </div>
                  )}

                  {finalApprovalStage === 'waiting' && (
                    <div className="ml-12 max-w-md rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-sm mb-4 flex flex-col items-center justify-center text-center">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                      <h3 className="font-bold text-lg">Waiting for approvals...</h3>
                      <p className="text-sm text-muted-foreground mt-1">{groupApprovals}/3 members have approved</p>
                    </div>
                  )}

                  {finalApprovalStage === 'approved' && (
                    <div className="ml-12 max-w-md rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm mb-4 text-center">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-green-800">Everyone approved!</h3>
                      <p className="text-sm text-green-700/80 mt-1 mb-4">We will be using this itinerary for your trip.</p>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => router.push('/trips/group-trip-123/itinerary')}>
                        View Full Itinerary
                      </Button>
                    </div>
                  )}
                </>
              )}
`;

content = content.replace(
  /\{planningCompleted && \(\n\s*<div className="mt-8 text-center text-muted-foreground">\n\s*<p>Planning phase completed!<\/p>\n\s*<\/div>\n\s*\)\}/,
  finalUIStr
);

fs.writeFileSync(path, content);
