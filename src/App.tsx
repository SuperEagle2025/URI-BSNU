import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  Trash2, 
  Calculator, 
  Copy, 
  CheckCircle2, 
  XCircle, 
  Users, 
  GraduationCap,
  ShieldCheck,
  Mail,
  Hash,
  Award
} from 'lucide-react';

interface StudentData {
  id: string;
  name: string;
  email: string;
  group: string;
  finalQuiz: number;
  commitment: number;
  interview: number;
  journal: number;
}

interface CalculatedResult extends StudentData {
  finalQuizPct: number;
  commitmentPct: number;
  interviewPct: number;
  journalPct: number;
  totalPct: number;
  isQualified: boolean;
}

const INITIAL_STUDENT = (): StudentData => ({
  id: Math.random().toString(36).substr(2, 9),
  name: '',
  email: '',
  group: 'G1',
  finalQuiz: 0,
  commitment: 0,
  interview: 0,
  journal: 0,
});

export default function App() {
  const [students, setStudents] = useState<StudentData[]>([INITIAL_STUDENT()]);
  const [showResults, setShowResults] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const groups = Array.from({ length: 20 }, (_, i) => `G${i + 1}`);

  const addStudent = () => {
    setStudents([...students, INITIAL_STUDENT()]);
  };

  const removeStudent = (id: string) => {
    if (students.length > 1) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const updateStudent = (id: string, field: keyof StudentData, value: string | number) => {
    setStudents(students.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const results = useMemo((): CalculatedResult[] => {
    return students.map(s => {
      const finalQuizPct = Number((s.finalQuiz * 1.6).toFixed(1));
      const commitmentPct = s.commitment * 2;
      const interviewPct = s.interview * 2;
      const journalPct = s.journal * 2;
      const totalPct = Number((finalQuizPct + commitmentPct + interviewPct + journalPct).toFixed(1));
      
      return {
        ...s,
        finalQuizPct,
        commitmentPct,
        interviewPct,
        journalPct,
        totalPct,
        isQualified: totalPct >= 70
      };
    });
  }, [students]);

  const copyToClipboard = () => {
    const header = "Name\tEmail\tGroup\tFinal Quiz %\tCommitment %\tInterview %\tJournal %\tTotal %\tStatus\n";
    const rows = results.map(r => 
      `${r.name}\t${r.email}\t${r.group}\t${r.finalQuizPct}%\t${r.commitmentPct}%\t${r.interviewPct}%\t${r.journalPct}%\t${r.totalPct}%\t${r.isQualified ? 'Qualified' : 'Not Qualified'}`
    ).join('\n');
    
    navigator.clipboard.writeText(header + rows);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <motion.img 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          src="https://i.postimg.cc/MnBW3jhY/Whats-App-Image-2026-03-05-at-2-04-35-PM.jpg" 
          alt="URI BSNU Student Community" 
          className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          referrerPolicy="no-referrer" 
        />
        <motion.img 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          src="https://i.postimg.cc/ts6XvVL5/Whats-App-Image-2026-03-05-at-2-07-56-PM.jpg" 
          alt="URI Logo" 
          className="h-14 md:h-16 w-auto object-contain"
          referrerPolicy="no-referrer" 
        />
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono mb-4">
            <ShieldCheck size={14} />
            SRT PHASE • BSNU BRANCH
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            URI Qualification Portal
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-8">
            Professional assessment tool for calculating student eligibility for the RL stage.
            Precision-engineered for the BSNU HR Department.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
          >
            <div className="flex flex-col items-center">
              <p className="text-sm font-bold tracking-wide text-white">Mohamed Esmat</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-mono">Vice HR of BSNU</p>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="flex flex-col items-center">
              <p className="text-sm font-bold tracking-wide text-white">Mai Mohamed Tamam</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-mono">Head HR of BSNU</p>
            </div>
          </motion.div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="text-emerald-500" size={20} />
                Student Entries
              </h2>
              <button 
                onClick={addStudent}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-medium"
              >
                <UserPlus size={16} />
                Add Student
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm relative group"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => removeStudent(student.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Full Name</label>
                          <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <input 
                              type="text"
                              value={student.name}
                              onChange={(e) => updateStudent(student.id, 'name', e.target.value)}
                              placeholder="Enter student name"
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <input 
                              type="email"
                              value={student.email}
                              onChange={(e) => updateStudent(student.id, 'email', e.target.value)}
                              placeholder="student@example.com"
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Group</label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <select 
                              value={student.group}
                              onChange={(e) => updateStudent(student.id, 'group', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
                            >
                              {groups.map(g => <option key={g} value={g} className="bg-zinc-900">{g}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Scores */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Final Quiz (0-20)</label>
                          <input 
                            type="number"
                            min="0"
                            max="20"
                            value={student.finalQuiz}
                            onChange={(e) => updateStudent(student.id, 'finalQuiz', Math.min(20, Math.max(0, Number(e.target.value))))}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Commitment (0-10)</label>
                          <input 
                            type="number"
                            min="0"
                            max="10"
                            value={student.commitment}
                            onChange={(e) => updateStudent(student.id, 'commitment', Math.min(10, Math.max(0, Number(e.target.value))))}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Interview (0-10)</label>
                          <input 
                            type="number"
                            min="0"
                            max="10"
                            value={student.interview}
                            onChange={(e) => updateStudent(student.id, 'interview', Math.min(10, Math.max(0, Number(e.target.value))))}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Journal (0-10)</label>
                          <input 
                            type="number"
                            min="0"
                            max="10"
                            value={student.journal}
                            onChange={(e) => updateStudent(student.id, 'journal', Math.min(10, Math.max(0, Number(e.target.value))))}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Calculator size={120} />
                </div>
                
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Award className="text-emerald-500" />
                  Live Assessment
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-zinc-400">Total Students</span>
                    <span className="text-2xl font-mono font-bold">{students.length}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-400">Qualified (70%+)</span>
                    <span className="text-2xl font-mono font-bold text-emerald-400">
                      {results.filter(r => r.isQualified).length}
                    </span>
                  </div>

                  <button 
                    onClick={() => setShowResults(!showResults)}
                    className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                  >
                    {showResults ? 'Hide Detailed Results' : 'Generate Full Report'}
                  </button>

                  {showResults && (
                    <button 
                      onClick={copyToClipboard}
                      className="w-full py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all flex items-center justify-center gap-2"
                    >
                      {copySuccess ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                      {copySuccess ? 'Copied to Clipboard!' : 'Copy for Google Sheets'}
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results Table */}
        <AnimatePresence>
          {showResults && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="mt-12 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-xl overflow-x-auto"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Student</th>
                    <th className="pb-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Group</th>
                    <th className="pb-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Final %</th>
                    <th className="pb-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Comm %</th>
                    <th className="pb-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Int %</th>
                    <th className="pb-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Jour %</th>
                    <th className="pb-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Total</th>
                    <th className="pb-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {results.map((r) => (
                    <tr key={r.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4">
                        <div className="font-medium">{r.name || 'Unnamed Student'}</div>
                        <div className="text-xs text-zinc-500">{r.email || 'No email provided'}</div>
                      </td>
                      <td className="py-4 font-mono text-sm">{r.group}</td>
                      <td className="py-4 font-mono text-sm">{r.finalQuizPct}%</td>
                      <td className="py-4 font-mono text-sm">{r.commitmentPct}%</td>
                      <td className="py-4 font-mono text-sm">{r.interviewPct}%</td>
                      <td className="py-4 font-mono text-sm">{r.journalPct}%</td>
                      <td className="py-4">
                        <span className={`font-mono font-bold text-lg ${r.isQualified ? 'text-emerald-400' : 'text-zinc-400'}`}>
                          {r.totalPct}%
                        </span>
                      </td>
                      <td className="py-4">
                        {r.isQualified ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                            <CheckCircle2 size={12} />
                            QUALIFIED
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                            <XCircle size={12} />
                            REJECTED
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
