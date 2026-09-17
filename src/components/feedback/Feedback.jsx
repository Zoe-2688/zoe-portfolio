import { usePortfolio } from '../../context/PortfolioContext'
import { useFeedback } from '../../hooks/useFeedback'
import es from '../../locales/es'
import en from '../../locales/en'

const btnClass = "min-w-[96px] min-h-[44px] px-6 py-2 rounded-lg text-sm tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 focus:ring-offset-[#050d1a]"

function Feedback() {
  const { mode, language } = usePortfolio()
  const t = language === 'en' ? en : es
  const f = t.feedback || {}
  const { alreadyAnswered, step, comment, setComment, answer, submitComment, maxLength } = useFeedback(mode)

  if (alreadyAnswered) return null

  return (
    <section aria-label={f.ariaLabel} className="bg-[#050d1a] px-6 pb-20">
      <div
        className="max-w-md mx-auto rounded-lg p-6"
        style={{ border: '1px solid rgba(0,212,255,0.15)', backgroundColor: 'rgba(0,212,255,0.02)' }}
      >
        <div aria-live="polite" aria-atomic="true" className="flex flex-col items-center text-center gap-4">
          {step === 'question' && (
            <>
              <p className="text-white text-base">{f.question}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => answer('si')}
                  className={btnClass}
                  style={{ border: '1px solid rgba(0,212,255,0.4)', color: '#00d4ff' }}
                >
                  {f.yes}
                </button>
                <button
                  type="button"
                  onClick={() => answer('no')}
                  className={btnClass}
                  style={{ border: '1px solid rgba(232,160,144,0.4)', color: '#e8a090' }}
                >
                  {f.no}
                </button>
              </div>
            </>
          )}

          {step === 'comment' && (
            <form
              className="w-full flex flex-col items-stretch gap-3"
              onSubmit={(e) => { e.preventDefault(); submitComment() }}
            >
              <label htmlFor="feedback-comment" className="text-white/70 text-sm text-left">
                {f.commentLabel}
              </label>
              <textarea
                id="feedback-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, maxLength))}
                maxLength={maxLength}
                rows={3}
                className="rounded-lg px-3 py-2 text-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                style={{ border: '1px solid rgba(0,212,255,0.3)', resize: 'none' }}
              />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs" aria-hidden="true">{comment.length}/{maxLength}</span>
                <button
                  type="submit"
                  className={btnClass}
                  style={{ backgroundColor: '#00d4ff', color: '#050d1a', border: '1px solid #00d4ff' }}
                >
                  {f.send}
                </button>
              </div>
            </form>
          )}

          {step === 'thanks' && (
            <p className="text-[#00d4ff] text-sm">{f.thanks}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Feedback
