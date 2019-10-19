const AudioContext: { new(): AudioContext } = (
  (window as any).AudioContext ||
  (window as any).webkitAudioContext
)

export const ctx = new AudioContext()

export const loadAudioBuffer = (url: string) => fetch(url)
  .then(response => response.arrayBuffer())
  .then(buffer => ctx.decodeAudioData(buffer))

export const playBufferWithRandomVariation = async (
  bufferPromise: Promise<AudioBuffer>,
  {
    detuneVariationDepth = 0,
    /** Minimum `0`. Maximum `1`. */
    gainVariationDepth = 0
  }: {
    detuneVariationDepth?: number
    gainVariationDepth?: number
  } = {}
) => {
  const sourceNode = ctx.createBufferSource()
  const gainNode = ctx.createGain()

  sourceNode.buffer = await bufferPromise
  sourceNode.detune.value = 0 - (detuneVariationDepth * (Math.random() * 0.5))
  gainNode.gain.value = 1 - (Math.random() * gainVariationDepth)

  sourceNode.connect(gainNode);
  gainNode.connect(ctx.destination);

  sourceNode.start(0);
}

const preloadedSounds = {
  // Thanks to freesound.org user "Horn" for typewriter sound.
  // https://freesound.org/people/Horn/sounds/9744
  typeWriterClick: loadAudioBuffer('/audio/9744_28132-hq.mp3')
}

export const playKeypressSound = () =>
  playBufferWithRandomVariation(preloadedSounds.typeWriterClick, {
    detuneVariationDepth: 200,
    gainVariationDepth: 0.5
  })
