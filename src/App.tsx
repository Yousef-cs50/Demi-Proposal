import { useEffect, useRef, useState } from 'react'
import { memories, proposal } from './content'

type Scene = 'memories' | 'envelope' | 'opening' | 'letter' | 'response'

export default function App() {
  const [scene, setScene] = useState<Scene>('memories')
  const [started, setStarted] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [outgoingImageIndex, setOutgoingImageIndex] = useState<number | null>(null)
  const [isCrossfading, setIsCrossfading] = useState(false)
  const [responseChoice, setResponseChoice] = useState<'yes' | 'time' | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/audio/our-song.mp3')
    audio.loop = true
    audio.volume = 0.2
    audioRef.current = audio
    return () => audio.pause()
  }, [])

  useEffect(() => {
    if (!started || scene !== 'memories') return
    const timer = window.setTimeout(() => {
      if (imageIndex === memories.length - 1) {
        setScene('envelope')
      } else {
        setOutgoingImageIndex(imageIndex)
        setImageIndex((current) => current + 1)
        setIsCrossfading(true)
        window.setTimeout(() => {
          setOutgoingImageIndex(null)
          setIsCrossfading(false)
        }, 1200)
      }
    }, 4200)
    return () => window.clearTimeout(timer)
  }, [imageIndex, scene, started])

  const begin = () => {
    setStarted(true)
    void audioRef.current?.play().catch(() => undefined)
  }

  const openEnvelope = () => {
    if (scene !== 'envelope') return
    setScene('opening')
    window.setTimeout(() => setScene('letter'), 1700)
  }

  const chooseResponse = (response: 'yes' | 'time') => {
    setResponseChoice(response)
    setScene('response')
  }

  return (
    <main className={`experience experience--${scene}`}>
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />

      {scene === 'memories' && (
        <section className="memory-scene" aria-labelledby="memory-title">
          <div className="memory-heading">
            <span className="overline">For Demiana</span>
            <h1 id="memory-title">Before the letter,<br /><em>a few memories.</em></h1>
            {!started && <p>Some moments I keep close.</p>}
          </div>
          <div className="photo-window" aria-live="polite">
            {outgoingImageIndex !== null && (
              <img className="photo-image photo-image--outgoing" src={memories[outgoingImageIndex].src} alt="" aria-hidden="true" />
            )}
            <img className={`photo-image ${isCrossfading ? 'photo-image--incoming' : ''}`} src={memories[imageIndex].src} alt={memories[imageIndex].alt} />
            <span className="memory-count">{String(imageIndex + 1).padStart(2, '0')} <i>/</i> {String(memories.length).padStart(2, '0')}</span>
          </div>
          {!started ? (
            <button className="begin-button" type="button" onClick={begin}>Begin</button>
          ) : (
            <p className="quiet-note">A memory at a time.</p>
          )}
        </section>
      )}

      {scene === 'envelope' && (
        <section className="envelope-scene" aria-labelledby="envelope-title">
          <span className="overline">The last thing I wanted to show you</span>
          <h1 id="envelope-title">A letter for you.</h1>
          <button className="envelope-button" type="button" onClick={openEnvelope} aria-label="Open the sealed letter">
            <span className="envelope-body" />
            <span className="envelope-flap" />
            <span className="wax-seal">D</span>
          </button>
          <p className="tap-note">Open when you are ready</p>
        </section>
      )}

      {scene === 'opening' && (
        <section className="opening-scene" aria-label="Opening the letter">
          <div className="envelope-button envelope-button--opening" aria-hidden="true">
            <span className="envelope-body" />
            <span className="envelope-flap" />
            <span className="wax-seal">D</span>
            <span className="paper-rising"><span>For Demi</span></span>
          </div>
        </section>
      )}

      {scene === 'letter' && (
        <section className="letter-scene" aria-labelledby="letter-title">
          <article className="letter-paper">
            <div className="paper-ornament">✦</div>
            <span className="overline">A letter for you</span>
            <h1 id="letter-title">{proposal.title}</h1>
            <div className="letter-copy">
              {proposal.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="response-buttons">
              <button type="button" className="yes-button" onClick={() => chooseResponse('yes')}>
                {proposal.yesLabel}
              </button>
              <button type="button" className="time-button" onClick={() => chooseResponse('time')}>
                {proposal.timeLabel}
              </button>
            </div>
            <div className="paper-signature">With all my heart</div>
          </article>
        </section>
      )}

      {scene === 'response' && responseChoice && (
        <section className="response-scene" aria-labelledby="response-title">
          <article className="letter-paper response-paper">
            <p id="response-title" className="response-message response-message--yes">
              {proposal.responses[responseChoice].message}
            </p>
          </article>
        </section>
      )}
    </main>
  )
}
