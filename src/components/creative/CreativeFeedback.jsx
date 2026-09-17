import { usePortfolio } from '../../context/PortfolioContext'
import { useFeedback } from '../../hooks/useFeedback'
import es from '../../locales/es'
import en from '../../locales/en'

function pixelBtnStyle(color, filled = false) {
  return {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: '44px', minHeight: '44px',
    fontFamily: "'Press Start 2P', monospace", fontSize: '10px', letterSpacing: '1px',
    padding: '12px 20px', borderRadius: '0px',
    border: `2px solid ${color}`,
    backgroundColor: filled ? color : 'transparent',
    color: filled ? '#050d1a' : color,
    boxShadow: `4px 4px 0px ${color}55`,
    transition: 'all 150ms ease',
    cursor: 'pointer',
  }
}

function CreativeFeedback() {
  const { mode, language } = usePortfolio()
  const t = language === 'en' ? en : es
  const f = t.feedback || {}
  const copy = f.creative || {}
  const { alreadyAnswered, step, comment, setComment, answer, submitComment, maxLength } = useFeedback(mode)

  if (alreadyAnswered) return null

  return (
    <section aria-label={f.ariaLabel} className="bg-[#050d1a] px-6 pb-20">
      <div
        className="max-w-md mx-auto p-6"
        style={{ border: '2px solid rgba(0,212,255,0.4)', backgroundColor: 'rgba(0,212,255,0.04)' }}
      >
        <div aria-live="polite" aria-atomic="true" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
          {step === 'question' && (
            <>
              <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#ffffff' }}>// {f.question}</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button type="button" onClick={() => answer('si')} style={pixelBtnStyle('#00d4ff')}>{f.yes}</button>
                <button type="button" onClick={() => answer('no')} style={pixelBtnStyle('#e8a090')}>{f.no}</button>
              </div>
            </>
          )}

          {step === 'comment' && (
            <form
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}
              onSubmit={(e) => { e.preventDefault(); submitComment() }}
            >
              <label htmlFor="creative-feedback-comment" style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.6)', textAlign: 'left' }}>
                {f.commentLabel}
              </label>
              <textarea
                id="creative-feedback-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, maxLength))}
                maxLength={maxLength}
                rows={3}
                style={{
                  fontFamily: 'monospace', fontSize: '13px', color: '#ffffff',
                  backgroundColor: 'transparent', border: '2px solid rgba(0,212,255,0.4)',
                  borderRadius: 0, padding: '10px', resize: 'none',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }} aria-hidden="true">{comment.length}/{maxLength}</span>
                <button type="submit" style={pixelBtnStyle('#00d4ff', true)}>{f.send}</button>
              </div>
            </form>
          )}

          {step === 'thanks' && (
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '11px', color: '#00d4ff' }}>{f.thanks}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default CreativeFeedback
