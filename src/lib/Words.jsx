/**
 * Splits a string into masked words so GSAP can slide each one up
 * from behind its own clipping box (`.line-mask > .word`).
 */
export default function Words({ text, wordClass = 'word' }) {
  return text.split(' ').map((word, i) => (
    <span key={`${word}-${i}`} className="line-mask">
      <span className={`${wordClass} inline-block`}>{word}&nbsp;</span>
    </span>
  ))
}
