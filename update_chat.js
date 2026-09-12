const fs = require('fs');

const path = 'src/app/(app)/trips/[tripId]/chat/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update debateStage state
content = content.replace(
  /const \[debateStage, setDebateStage\] = useState<'idle' \| 'poll' \| 'approval' \| 'added'>\('idle'\);/,
  "const [debateStage, setDebateStage] = useState<'idle' | 'poll_acc' | 'approval_acc' | 'poll_plan' | 'approval_plan' | 'added'>('idle');"
);

// Update pollVotes state
content = content.replace(
  /const \[pollVotes, setPollVotes\] = useState<Record<string, number>>\(\{ 'Kuromon Market': 1, 'Osaka Castle': 1, 'Kyoto Ryokan Kinoe': 0 \}\);/,
  "const [pollAccVotes, setPollAccVotes] = useState<Record<string, number>>({ 'Kyoto Ryokan Kinoe': 1, 'Nine Hours Namba': 1, 'Hotel Monterey Grasmere': 0 });\n  const [pollPlanVotes, setPollPlanVotes] = useState<Record<string, number>>({ 'Kuromon Market': 1, 'Osaka Castle': 1 });"
);

// Replace debate Stage JSX
const jsxRegex = /\{debateStage === 'idle' &&.*?\{debateStage === 'added' &&[^\}]+\}\n              \)\}/s;
const newJsx = `{debateStage === 'idle' && <div className="flex gap-4 justify-center mt-6 mb-8">
                <Button
                  className="bg-[#F26C3D] hover:bg-[#d85e33] text-white shadow-md relative overflow-hidden"
                  onClick={() => setDebateStage('poll_acc')}
                >
                  Let us choose <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" className="shadow-sm">
                  Convince us
                </Button>
              </div>}

              {debateStage === 'poll_acc' && (
                <div className="ml-12 max-w-md rounded-2xl border border-[#F26C3D]/30 bg-card p-5 shadow-sm mb-4">
                  <div className="flex items-center gap-2 mb-2 font-semibold"><Vote className="w-4 h-4 text-[#F26C3D]" /> Accommodation Poll</div>
                  <p className="text-sm text-muted-foreground mb-4">Vote for the accommodation you want us to prioritize.</p>
                  <div className="space-y-2">
                    {Object.entries(pollAccVotes).map(([place, votes]) => {
                      const totalVotes = Object.values(pollAccVotes).reduce((a, b) => a + b, 0);
                      const isMaxVotes = totalVotes >= 3;
                      return (
                        <Button 
                          key={place} 
                          variant="outline" 
                          className="w-full justify-between h-auto py-2" 
                          onClick={() => setPollAccVotes(current => ({ ...current, [place]: current[place] + 1 }))}
                          disabled={isMaxVotes}
                        >
                          <span>{place}</span><span className="text-xs text-muted-foreground">{votes} vote{votes === 1 ? '' : 's'}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <Button className="w-full mt-4 bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => setDebateStage('approval_acc')}>Finish voting</Button>
                </div>
              )}

              {debateStage === 'approval_acc' && (
                <div className="ml-12 max-w-md rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-sm mb-4">
                  <p className="font-semibold text-black">The accommodation winner is {Object.entries(pollAccVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
                  <p className="text-sm text-muted-foreground mt-1">It received the most votes. Use this as your group's accommodation?</p>
                  <div className="flex gap-2 mt-4">
                    <Button className="bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => { localStorage.setItem('approvedPollAcc', Object.entries(pollAccVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]); setDebateStage('poll_plan'); }}>Approve</Button>
                    <Button variant="outline" className="text-black" onClick={() => setDebateStage('poll_acc')}>Back to poll</Button>
                  </div>
                </div>
              )}

              {debateStage === 'poll_plan' && (
                <div className="ml-12 max-w-md rounded-2xl border border-[#F26C3D]/30 bg-card p-5 shadow-sm mb-4">
                  <div className="flex items-center gap-2 mb-2 font-semibold"><Vote className="w-4 h-4 text-[#F26C3D]" /> Attraction Poll</div>
                  <p className="text-sm text-muted-foreground mb-4">Vote for the attraction you want us to add to the itinerary.</p>
                  <div className="space-y-2">
                    {Object.entries(pollPlanVotes).map(([place, votes]) => {
                      const totalVotes = Object.values(pollPlanVotes).reduce((a, b) => a + b, 0);
                      const isMaxVotes = totalVotes >= 3;
                      return (
                        <Button 
                          key={place} 
                          variant="outline" 
                          className="w-full justify-between h-auto py-2" 
                          onClick={() => setPollPlanVotes(current => ({ ...current, [place]: current[place] + 1 }))}
                          disabled={isMaxVotes}
                        >
                          <span>{place}</span><span className="text-xs text-muted-foreground">{votes} vote{votes === 1 ? '' : 's'}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <Button className="w-full mt-4 bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => setDebateStage('approval_plan')}>Finish voting</Button>
                </div>
              )}

              {debateStage === 'approval_plan' && (
                <div className="ml-12 max-w-md rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-sm mb-4">
                  <p className="font-semibold text-black">The attraction winner is {Object.entries(pollPlanVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
                  <p className="text-sm text-muted-foreground mt-1">It received the most votes. Add it to your itinerary?</p>
                  <div className="flex gap-2 mt-4">
                    <Button className="bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => { localStorage.setItem('approvedPollPlace', Object.entries(pollPlanVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]); setDebateStage('added'); }}>Approve & add</Button>
                    <Button variant="outline" className="text-black" onClick={() => setDebateStage('poll_plan')}>Back to poll</Button>
                  </div>
                </div>
              )}

              {debateStage === 'added' && (
                <div className="ml-12 max-w-md rounded-2xl border border-green-200 bg-green-50/60 p-4 text-sm text-green-800 flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4" /> Voting Complete!
                  </div>
                  <p className="text-green-700">The itinerary has been updated with your group's choices!</p>
                </div>
              )}`;

content = content.replace(jsxRegex, newJsx);
fs.writeFileSync(path, content);
