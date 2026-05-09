import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Star, Camera } from 'lucide-react';
import { C } from '../theme/colors';

const quickTags = ['Professional', 'On Time', 'Clean Work', 'Friendly'];
const issueTypes = [
  'Worker didn\'t arrive',
  'Poor quality work',
  'Overcharged',
  'Rude behavior',
  'Other',
];

export default function ReviewDisputeScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [issueType, setIssueType] = useState('');
  const [issueDesc, setIssueDesc] = useState('');
  const [snackbar, setSnackbar] = useState('');
  const [snackbarColor, setSnackbarColor] = useState(C.successGreen);

  const showSnackbar = (msg: string, color = C.successGreen) => {
    setSnackbar(msg);
    setSnackbarColor(color);
    setTimeout(() => setSnackbar(''), 3000);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
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
        <div style={{ fontSize: 18, fontWeight: 600, color: C.textDark }}>
          Review & Dispute
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex"
        style={{ background: C.cardWhite, borderBottom: `1px solid ${C.divider}` }}
      >
        {['Rate Service', 'Raise Issue'].map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              flex: 1, height: 46, border: 'none',
              background: 'transparent', cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              fontSize: 14, fontWeight: activeTab === i ? 600 : 400,
              color: activeTab === i ? C.primaryBlue : C.textGrey,
              borderBottom: `3px solid ${activeTab === i ? C.primaryBlue : 'transparent'}`,
              transition: 'all 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5">
        {/* Tab 1 — Rate Service */}
        {activeTab === 0 && (
          <div>
            {/* Worker info */}
            <div
              className="flex items-center gap-3 p-4 mb-4"
              style={{ background: C.cardWhite, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <div
                style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1A73E8, #0D47A1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}
              >
                👷
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.textDark }}>
                  Suresh Kumar
                </div>
                <div style={{ fontSize: 12, color: C.textGrey }}>Home Cleaning</div>
              </div>
            </div>

            <div style={{ fontSize: 15, fontWeight: 600, color: C.textDark, marginBottom: 16, textAlign: 'center' }}>
              How was your experience?
            </div>

            {/* Star rating */}
            <div className="flex justify-center gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                    transition: 'transform 0.15s',
                    transform: rating >= star ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <Star
                    size={36}
                    fill={rating >= star ? '#FBBC04' : 'transparent'}
                    color={rating >= star ? '#FBBC04' : C.divider}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <div style={{ textAlign: 'center', fontSize: 13, color: C.textGrey, marginBottom: 12 }}>
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </div>
            )}

            {/* Review text */}
            <textarea
              placeholder="Write a review (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
              style={{
                width: '100%', borderRadius: 12, border: `1.5px solid ${C.divider}`,
                background: '#F3F4F6', padding: '12px 14px', fontSize: 13,
                color: C.textDark, fontFamily: "'Poppins', sans-serif",
                resize: 'none', outline: 'none', marginBottom: 16,
                boxSizing: 'border-box',
              }}
            />

            {/* Quick tags */}
            <div style={{ fontSize: 13, fontWeight: 500, color: C.textDark, marginBottom: 10 }}>
              Quick Tags
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: '6px 14px', borderRadius: 20,
                    border: `1.5px solid ${selectedTags.includes(tag) ? C.primaryBlue : C.divider}`,
                    background: selectedTags.includes(tag) ? `${C.primaryBlue}15` : C.cardWhite,
                    color: selectedTags.includes(tag) ? C.primaryBlue : C.textGrey,
                    fontSize: 12, fontWeight: selectedTags.includes(tag) ? 600 : 400,
                    cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                    transition: 'all 0.2s',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            <button
              onClick={() => showSnackbar('Review submitted! Thank you 🎉')}
              style={{
                width: '100%', height: 52, borderRadius: 12,
                background: rating > 0 ? C.primaryBlue : '#CBD5E1',
                color: '#fff', fontSize: 15, fontWeight: 600,
                border: 'none', cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s',
              }}
            >
              Submit Review
            </button>
          </div>
        )}

        {/* Tab 2 — Raise Issue */}
        {activeTab === 1 && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.textDark, marginBottom: 8 }}>
              Issue Type
            </div>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              style={{
                width: '100%', height: 52, borderRadius: 12,
                border: `1.5px solid ${C.divider}`, background: '#F3F4F6',
                padding: '0 14px', fontSize: 13, color: issueType ? C.textDark : C.textGrey,
                fontFamily: "'Poppins', sans-serif", outline: 'none', marginBottom: 16,
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
              }}
            >
              <option value="">Select issue type</option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <div style={{ fontSize: 13, fontWeight: 500, color: C.textDark, marginBottom: 8 }}>
              Describe your issue
            </div>
            <textarea
              placeholder="Please describe the issue in detail..."
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
              rows={4}
              style={{
                width: '100%', borderRadius: 12, border: `1.5px solid ${C.divider}`,
                background: '#F3F4F6', padding: '12px 14px', fontSize: 13,
                color: C.textDark, fontFamily: "'Poppins', sans-serif",
                resize: 'none', outline: 'none', marginBottom: 16,
                boxSizing: 'border-box',
              }}
            />

            {/* Attach photo */}
            <button
              style={{
                width: '100%', height: 48, borderRadius: 12,
                border: `2px dashed ${C.divider}`, background: 'transparent',
                color: C.textGrey, fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginBottom: 16,
              }}
            >
              <Camera size={18} />
              Attach Photo (Optional)
            </button>

            <button
              onClick={() =>
                showSnackbar('Issue raised. Admin will respond within 24 hours.', C.accentOrange)
              }
              style={{
                width: '100%', height: 52, borderRadius: 12,
                background: C.errorRed, color: '#fff',
                fontSize: 15, fontWeight: 600, border: 'none',
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
              }}
            >
              Submit Issue
            </button>
          </div>
        )}

        <div style={{ height: 20 }} />
      </div>

      {/* Snackbar */}
      {snackbar && (
        <div
          style={{
            position: 'absolute', bottom: 24, left: 16, right: 16,
            background: snackbarColor, color: '#fff', borderRadius: 12,
            padding: '12px 16px', fontSize: 13, fontWeight: 500,
            textAlign: 'center', zIndex: 999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {snackbar}
        </div>
      )}
    </div>
  );
}
