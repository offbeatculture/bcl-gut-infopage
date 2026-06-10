import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  findAnswer,
  whatsappLink,
  TEAM_NAME,
  QUICK_REPLIES,
  GREETING,
  HANDOFF_PREFILL,
  WHATSAPP_DISPLAY,
} from '../chatbot/knowledge';

interface Msg {
  id: number;
  role: 'bot' | 'user';
  text: string;
  whatsapp?: boolean;
}

const HANDOFF_WORDS = ['team', 'human', 'agent', 'talk', 'contact', 'speak', 'call', 'whatsapp', 'representative', 'someone'];
const isHandoff = (s: string) => {
  const t = s.toLowerCase();
  return HANDOFF_WORDS.some((w) => t.includes(w));
};

let _id = 1;
const nextId = () => _id++;

/* Calls the AI support function. Returns the reply + whether it could answer.
   Falls back to the local keyword bot if the function is unavailable
   (e.g. local `vite` dev without Netlify, or a network hiccup). */
async function askAI(
  history: { role: 'user' | 'assistant'; content: string }[],
): Promise<{ reply: string; canAnswer: boolean }> {
  try {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });
    if (!res.ok) throw new Error('bad status');
    const data = (await res.json()) as { reply?: string; canAnswer?: boolean };
    if (data.reply && data.canAnswer) {
      return { reply: data.reply, canAnswer: true };
    }
    // AI couldn't answer OR no key configured → try local KB before handoff
    const last = [...history].reverse().find((m) => m.role === 'user')?.content ?? '';
    const local = findAnswer(last);
    if (local) return { reply: local, canAnswer: true };
    return { reply: '', canAnswer: false };
  } catch {
    const last = [...history].reverse().find((m) => m.role === 'user')?.content ?? '';
    const local = findAnswer(last);
    return local ? { reply: local, canAnswer: true } : { reply: '', canAnswer: false };
  }
}

function WhatsAppButton({ prefill }: { prefill: string }) {
  return (
    <a
      href={whatsappLink(prefill)}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-[12px] font-semibold text-[#062611] transition-transform hover:scale-[1.03]"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.911zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
      </svg>
      Message us on WhatsApp
    </a>
  );
}

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  // greet on first open
  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ id: nextId(), role: 'bot', text: GREETING }]);
    }
  }, [open, msgs.length]);

  // autoscroll
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  function respond(history: { role: 'user' | 'assistant'; content: string }[]) {
    const question = [...history].reverse().find((m) => m.role === 'user')?.content ?? '';
    // Explicit "talk to a human" → straight to WhatsApp, no AI call.
    if (isHandoff(question)) {
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        setMsgs((m) => [
          ...m,
          {
            id: nextId(),
            role: 'bot',
            text: `Of course — our team will help you directly. Tap below to message us on WhatsApp (${WHATSAPP_DISPLAY}).`,
            whatsapp: true,
          },
        ]);
      }, reduce ? 120 : 500);
      return;
    }

    setTyping(true);
    askAI(history).then(({ reply, canAnswer }) => {
      setTyping(false);
      if (canAnswer) {
        setMsgs((m) => [...m, { id: nextId(), role: 'bot', text: reply }]);
      } else {
        setMsgs((m) => [
          ...m,
          {
            id: nextId(),
            role: 'bot',
            text: `That’s a great question, and I’d rather not guess. Let me connect you with ${TEAM_NAME} on WhatsApp — they’ll answer you personally.`,
            whatsapp: true,
          },
        ]);
      }
    });
  }

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const history = [
      ...msgs
        .filter((m) => m.role === 'user' || (m.role === 'bot' && !m.whatsapp))
        .map((m) => ({ role: (m.role === 'bot' ? 'assistant' : 'user') as 'user' | 'assistant', content: m.text })),
      { role: 'user' as const, content: q },
    ];
    setMsgs((m) => [...m, { id: nextId(), role: 'user', text: q }]);
    setInput('');
    respond(history);
  }

  return (
    <>
      {/* launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => { setOpen(true); setSeen(true); }}
            className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-amber/40 bg-ink-2/95 py-2.5 pl-3 pr-5 shadow-[0_8px_40px_-8px_rgba(83,62,20,0.18)] backdrop-blur-md transition-all hover:border-amber/70"
            aria-label="Open chat — have any questions?"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-amber text-cocoa">
              {!seen && (
                <span className="absolute inset-0 animate-ping rounded-full bg-amber/60" />
              )}
              <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </span>
            <span className="text-left leading-tight">
              <span className="block text-[13px] font-semibold text-cream">Have any questions?</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                You can ask here
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 z-50 flex h-[min(560px,80vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-ink shadow-[0_20px_70px_-12px_rgba(83,62,20,0.22)]"
            role="dialog"
            aria-label={`Chat with ${TEAM_NAME}`}
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-border bg-teal-deep/40 px-4 py-3.5">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-amber font-display text-lg text-cocoa">
                V
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-[#25D366]" />
              </span>
              <div className="flex-1">
                <div className="font-display text-[15px] text-cream">{TEAM_NAME}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#7fd8a0]">
                  ● Typically replies fast
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-cream"
                aria-label="Close chat"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* body */}
            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m) => (
                <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-sm bg-amber text-cocoa'
                        : 'rounded-bl-sm border border-border bg-surface text-cream-dim'
                    }`}
                  >
                    {m.text}
                    {m.whatsapp && <div><WhatsAppButton prefill={HANDOFF_PREFILL} /></div>}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted"
                        animate={reduce ? {} : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* quick replies */}
            <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pt-2.5">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-cream-dim transition-colors hover:border-amber/50 hover:text-cream"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-[13.5px] text-cream placeholder:text-muted focus:border-amber/50 focus:outline-none"
                aria-label="Type your question"
              />
              <button
                type="submit"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber text-cocoa transition-transform hover:scale-105 disabled:opacity-40"
                disabled={!input.trim()}
                aria-label="Send"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
