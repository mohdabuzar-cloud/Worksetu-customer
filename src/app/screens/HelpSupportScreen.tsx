import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send } from 'lucide-react';
import { C } from '../theme/colors';

const initialMessages = [
  { id: 1, sender: 'bot', text: "Hi Rahul! 👋 How can I help you today?" },
  { id: 2, sender: 'user', text: "Where is my worker?" },
  {
    id: 3, sender: 'bot',
    text: "Your worker Suresh Kumar is on the way. ETA is approximately 15 minutes. 🚀",
  },
  { id: 4, sender: 'user', text: "How do I cancel a booking?" },
  {
    id: 5, sender: 'bot',
    text: "You can cancel before worker acceptance for free. After acceptance, a cancellation fee may apply. ℹ️",
  },
];

const quickReplies = ['Track Booking', 'Raise Issue', 'Talk to Agent'];

export default function HelpSupportScreen() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: "Thank you for your message! Our team will get back to you shortly. For urgent queries, please call our support line.",
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleQuickReply = (reply: string) => {
    if (reply === 'Raise Issue') {
      navigate('/review');
      return;
    }
    const userMsg = { id: Date.now(), sender: 'user', text: reply };
    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: reply === 'Track Booking'
        ? 'Your latest booking (Home Cleaning) is currently active. Worker Suresh Kumar is on the way! 📍'
        : 'Connecting you to a live agent... Please wait a moment. 🎧',
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="flex-1 flex flex-col" style={{ background: C.bg }}>
      {/* AppBar */}
      <div
        className="flex items-center gap-3 px-4 pt-12 pb-4"
        style={{ background: C.cardWhite, borderBottom: `1px solid ${C.divider}` }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 38, height: 38, borderRadius: 10,
            border: `1px solid ${C.divider}`, background: C.bg,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} color={C.textDark} />
        </button>
        <div className="flex items-center gap-2" style={{ flex: 1 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: `${C.primaryBlue}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}
          >
            🤖
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.textDark }}>WorkSetu AI</div>
            <div style={{ fontSize: 11, color: C.successGreen, fontWeight: 500 }}>● Online</div>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.sender === 'bot' && (
              <div
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: `${C.primaryBlue}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, marginRight: 8, flexShrink: 0, alignSelf: 'flex-end',
                }}
              >
                🤖
              </div>
            )}
            <div
              style={{
                maxWidth: '72%', padding: '10px 14px', borderRadius: 16,
                background: msg.sender === 'user' ? C.primaryBlue : C.cardWhite,
                color: msg.sender === 'user' ? '#fff' : C.textDark,
                fontSize: 13, lineHeight: 1.5,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                borderBottomRightRadius: msg.sender === 'user' ? 4 : 16,
                borderBottomLeftRadius: msg.sender === 'bot' ? 4 : 16,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Quick replies */}
        <div className="flex flex-wrap gap-2 mt-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              style={{
                padding: '7px 14px', borderRadius: 20,
                border: `1.5px solid ${C.primaryBlue}`,
                background: 'transparent', color: C.primaryBlue,
                fontSize: 12, fontWeight: 500, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div
        className="px-4 py-3 flex gap-2 items-center"
        style={{ background: C.cardWhite, borderTop: `1px solid ${C.divider}` }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1, height: 44, borderRadius: 22,
            border: `1.5px solid ${C.divider}`, background: '#F3F4F6',
            padding: '0 16px', fontSize: 13, color: C.textDark,
            fontFamily: "'Poppins', sans-serif", outline: 'none',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: input.trim() ? C.primaryBlue : '#CBD5E1',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <Send size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
}
