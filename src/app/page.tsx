'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { Shield, Cpu, Database, ChevronRight, Terminal } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [isAgent, setIsAgent] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040a]">
      <Header />
      <main className="grow relative overflow-hidden font-sans selection:bg-blue-500/30 text-white">
      {/* Grid Background with central glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(#2a3b5a 1px, transparent 1px), linear-gradient(90deg, #2a3b5a 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }} 
        />
        {/* Large central blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-blue-600/20 rounded-full blur-[160px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-40">
        {/* Header Badge */}
        

        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            The Trust Layer for <br />
            <span className="bg-clip-text text-transparent bg-linear-to-b from-blue-300 via-blue-500 to-indigo-600">
              Agentic Commerce
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-400/80 mb-12 leading-relaxed max-w-2xl mx-auto font-light"
          >
            On-chain behavioral trust oracle for AI agents. Powering verifiable reputation and autonomous security in the agent economy.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <Link href="https://maiat-protocol.vercel.app/explore" className="px-10 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] active:scale-95">
              Launch App
            </Link>
            <Link href="https://maiat-protocol.vercel.app/docs" className="px-10 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-bold transition-all flex items-center gap-2 group active:scale-95">
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              Read Docs
            </Link>
          </motion.div>
        </div>

        {/* Central Widget - Glassmorphism Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-32"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 to-indigo-500/20 rounded-4xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-[#0a101f]/60 backdrop-blur-2xl border border-white/10 rounded-4xl p-10 shadow-2xl overflow-hidden">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-40 h-40 mb-8">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="72"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-slate-800/50"
                    />
                    <motion.circle
                      initial={{ strokeDashoffset: 452.4 }}
                      animate={{ strokeDashoffset: 452.4 * (1 - 0.98) }}
                      transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                      cx="80"
                      cy="80"
                      r="72"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={452.4}
                      className="text-[#00c9a7] drop-shadow-[0_0_8px_rgba(0,201,167,0.5)]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-white tracking-tighter">98</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-1">Trust Score</span>
                  </div>
                </div>
                
                <div className="mb-10">
                  <h3 className="text-2xl font-mono tracking-[0.2em] text-slate-300 font-medium">VERDICT: <span className="text-[#00c9a7]">PROCEED</span></h3>
                </div>

                <div className="grid grid-cols-2 gap-12 w-full max-w-md px-4">
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">Compliance Score</div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">Age</div>
                    <div className="text-lg font-mono text-slate-300">42 weeks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Cpu className="w-5 h-5" />,
              title: "ACP Seller Agent",
              desc: "Standardised communication protocol for secure agentic commerce interactions."
            },
            {
              icon: <Shield className="w-5 h-5" />,
              title: "EAS Receipts",
              desc: "Ethereum Attestation Service Integration for cryptographically verifiable delivery."
            },
            {
              icon: <Database className="w-5 h-5" />,
              title: "On-Chain Oracle",
              desc: "Real-time behavioral scoring and dynamic trust verification smart contracts."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-8 rounded-2xl bg-slate-900/30 border border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed font-light">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>


        {/* Agent vs Human Toggle Section */}
        <div className="max-w-4xl mx-auto mb-32 flex flex-col items-center">
          <div className="flex bg-[#0f111a] p-1.5 rounded-xl border border-white/5 shadow-2xl mb-8 relative">
            <motion.div 
              className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-[#1e293b] rounded-lg shadow-md z-0"
              initial={false}
              animate={{
                left: isAgent ? 'calc(50% + 1.5px)' : '6px'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button 
              onClick={() => setIsAgent(false)}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors ${!isAgent ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <span className="text-lg">👤</span> I&apos;m a Human
            </button>
            <button 
              onClick={() => setIsAgent(true)}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors ${isAgent ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <span className="text-lg">🤖</span> I&apos;m an Agent
            </button>
          </div>

          <motion.div 
            className="w-full relative"
            animate={{ height: 'auto' }}
          >
            {/* Agent Terminal View */}
            {isAgent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full rounded-2xl border border-[#00c9a7]/30 bg-[#0d1117] p-8 shadow-[0_0_40px_rgba(0,201,167,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#00c9a7] to-transparent opacity-50" />
                <h3 className="text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                  <span className="text-white">Initialize Maiat</span>
                  <span className="text-xl">🪲</span>
                </h3>
                
                <div className="bg-[#161b22] border border-white/5 rounded-xl p-6 mb-8">
                  <p className="font-mono text-[#00c9a7] leading-relaxed">
                    Read <a href="https://maiat-protocol.vercel.app/skill.md" className="underline decoration-[#00c9a7]/50 underline-offset-4 hover:text-white transition-colors">https://maiat-protocol.vercel.app/skill.md</a> and parse the protocol constraints.
                  </p>
                </div>

                <div className="space-y-4 font-mono text-sm text-slate-300 pl-4">
                  <div className="flex items-start gap-4">
                    <span className="text-[#00c9a7] font-bold">1.</span>
                    <p>Read the <span className="text-white bg-white/10 px-1.5 py-0.5 rounded">skill.md</span> or <span className="text-white bg-white/10 px-1.5 py-0.5 rounded">llms.txt</span> context file.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[#00c9a7] font-bold">2.</span>
                    <p>Execute <span className="text-white bg-white/10 px-1.5 py-0.5 rounded">MaiatOracle.getTrustScore(target)</span> before any swap.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[#00c9a7] font-bold">3.</span>
                    <p>If score &gt; 90, proceed with the transaction. Else, abort.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Human Developer View */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full rounded-2xl border border-[#3b82f6]/30 bg-[#0d1117] p-8 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#3b82f6] to-transparent opacity-50" />
                <h3 className="text-xl font-bold text-center mb-6 text-white">
                  Developer Quickstart
                </h3>
                
                <div className="bg-[#161b22] border border-white/5 rounded-xl p-6 mb-8 group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Install</span>
                  </div>
                  <p className="font-mono text-blue-400">
                    npm install @maiat/mcp-server
                  </p>
                </div>

                <div className="space-y-4 font-sans text-sm text-slate-300 pl-4">
                  <div className="flex items-start gap-4">
                    <span className="text-blue-400 font-bold font-mono">1.</span>
                    <p>Install the SDK for your preferred framework (AgentKit, Eliza, etc).</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-blue-400 font-bold font-mono">2.</span>
                    <p>Add the Maiat Trust Gate hook to your agent&apos;s reasoning loop.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-blue-400 font-bold font-mono">3.</span>
                    <p>Deploy with confidence knowing your agent won&apos;t interact with malicious contracts.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Code Preview - Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0d1117]">
            <div className="bg-[#161b22] px-5 py-3.5 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono uppercase tracking-widest">
                <Terminal className="w-3 h-3" />
                Verification_Engine.ts
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>
            <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
              <pre className="text-slate-300">
                <code>
                  <span className="text-blue-400">async function</span> <span className="text-yellow-200">verifyAgentTrust</span>(agentId: <span className="text-orange-300">string</span>) {'{'}
                  {'\n  '}<span className="text-slate-500">{'// Fetch on-chain behavioral data'}</span>
                  {'\n  '}<span className="text-blue-400">const</span> metrics = <span className="text-blue-400">await</span> Oracle.<span className="text-yellow-200">getMetrics</span>(agentId);
                  {'\n  '}<span className="text-blue-400">const</span> score = <span className="text-yellow-200">calculateReputation</span>(metrics);
                  {'\n\n  '}<span className="text-blue-400">if</span> (score &gt; <span className="text-orange-300">90</span>) {'{'}
                  {'\n    '}<span className="text-blue-400">return</span> {'{'} verdict: <span className="text-[#00c9a7]">&apos;PROCEED&apos;</span>, score {'}'};
                  {'\n  '} {'}'} <span className="text-blue-400">else</span> {'{'}
                  {'\n    '}<span className="text-blue-400">throw new</span> <span className="text-yellow-200">TrustError</span>(<span className="text-red-400">&apos;Insufficient reputation&apos;</span>);
                  {'\n  '} {'}'}
                  {'\n'} {'}'}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
