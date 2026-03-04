import fs from 'fs'
import path from 'path'

export default function SkillPage() {
  const filePath = path.join(process.cwd(), 'public', 'skill.md')
  let content = 'File not found'
  
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    console.error("Could not read skill.md", e)
  }

  return (
    <div className="min-h-screen bg-[#02040a] p-8">
      <div className="max-w-4xl mx-auto border border-blue-500/20 rounded-xl overflow-hidden bg-[#0d1117] shadow-xl">
        <div className="bg-[#161b22] px-4 py-3 flex items-center border-b border-white/5">
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-mono text-slate-400">Agent_Knowledge_Base.md</span>
        </div>
        <pre className="p-8 text-sm font-mono text-blue-100/80 whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-blue-500/30">
          {content}
        </pre>
      </div>
    </div>
  )
}
