import { Clock, XCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"

export function CreatorTab() {
  return (
    <TabsContent value="campaigns" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       
       {/* 1. SUCCESSFUL CAMPAIGN (Skeuomorphic Green-300) */}
       <div className="bg-gradient-to-b from-white to-green-50/40 p-6 md:p-8 rounded-[2rem] border border-green-200/60 border-t-white shadow-[0_10px_40px_-10px_rgba(134,239,172,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Physical indent line */}
          <div className="absolute top-0 left-0 w-2 h-full bg-green-300 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.1)]" />
          
          <div className="flex-1 space-y-2 w-full">
             <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-white border border-green-200 shadow-sm text-green-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                   <CheckCircle2 className="w-3 h-3 text-green-500" /> Successful
                </span>
                <span className="text-slate-400 text-sm font-medium">Flexible Model</span>
             </div>
             <h3 className="text-2xl font-bold text-slate-900 drop-shadow-sm">DeFi Yield Aggregator</h3>
             <div className="flex items-center gap-4 text-sm mt-2">
                <div className="font-semibold text-slate-700 bg-white/50 px-3 py-1 rounded-lg border border-slate-100 shadow-inner">
                   Raised: <span className="text-green-600 font-extrabold">$55,000 USDCx</span>
                </div>
                <div className="text-slate-400 font-medium">Goal: $50,000</div>
             </div>
          </div>
          <div className="w-full md:w-auto shrink-0">
             {/* Skeuomorphic Button: Top highlight, bottom shadow */}
             <Button className="w-full md:w-auto h-14 px-8 rounded-xl bg-gradient-to-b from-green-300 to-green-400 border border-green-500 text-green-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_15px_rgba(134,239,172,0.5)] font-bold text-base transition-all hover:scale-[1.02] active:scale-95 active:shadow-inner">
                Withdraw Funds
             </Button>
          </div>
       </div>

       {/* 2. ACTIVE CAMPAIGN (Skeuomorphic Brand Orange) */}
       <div className="bg-gradient-to-b from-white to-orange-50/30 p-6 md:p-8 rounded-[2rem] border border-orange-200/50 border-t-white shadow-[0_10px_40px_-10px_rgba(255,107,74,0.2)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-tush shadow-[inset_-2px_0_4px_rgba(0,0,0,0.1)]" />
          
          <div className="flex-1 space-y-2 w-full">
             <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-white border border-orange-200 shadow-sm text-orange-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                   <Clock className="w-3 h-3" /> Active
                </span>
                <span className="text-slate-400 text-sm font-medium">All-or-Nothing</span>
             </div>
             <h3 className="text-2xl font-bold text-slate-900 drop-shadow-sm">Stacks Dev Bootcamp</h3>
             <div className="flex items-center gap-4 text-sm mt-2">
                <div className="font-semibold text-slate-700 bg-white/50 px-3 py-1 rounded-lg border border-slate-100 shadow-inner">
                   Raised: <span className="text-orange-600 font-extrabold">4,500 STX</span>
                </div>
                <div className="text-slate-400 font-medium">Goal: 10,000 STX</div>
             </div>
             {/* Skeuomorphic Progress Bar */}
             <div className="w-full max-w-md bg-slate-200/70 rounded-full h-3 mt-4 overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200/50">
                <div className="bg-gradient-tush h-full rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{ width: "45%" }} />
             </div>
          </div>
          <div className="w-full md:w-auto shrink-0 text-left md:text-right bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
             <div className="text-3xl font-black text-slate-900 drop-shadow-sm">12 Days</div>
             <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Remaining</div>
          </div>
       </div>

       {/* 3. FAILED CAMPAIGN (Skeuomorphic Depressed/Inner Shadow) */}
       <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-[inset_0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between gap-6 opacity-80 grayscale-[0.5] hover:grayscale-0 transition-all duration-500">
          <div className="flex-1 space-y-2 w-full">
             <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-white border border-red-100 shadow-sm text-red-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                   <XCircle className="w-3 h-3 text-red-500" /> Failed
                </span>
                <span className="text-slate-400 text-sm font-medium">All-or-Nothing</span>
             </div>
             <h3 className="text-2xl font-bold text-slate-500 line-through decoration-slate-300 decoration-2">NFT Marketplace</h3>
             <div className="flex items-center gap-4 text-sm mt-2">
                <div className="font-semibold text-slate-500 bg-white/40 px-3 py-1 rounded-lg border border-slate-200 shadow-inner">
                   Raised: 1,200 STX
                </div>
                <div className="text-slate-400 font-medium">Goal: 50,000 STX</div>
             </div>
          </div>
          <div className="w-full md:w-auto shrink-0">
             {/* "Pressed in" disabled button feel */}
             <Button variant="outline" disabled className="w-full md:w-auto h-14 px-8 rounded-xl bg-slate-100 border-slate-200 text-slate-400 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] cursor-not-allowed">
                Goal Not Met
             </Button>
          </div>
       </div>

    </TabsContent>
  )
}