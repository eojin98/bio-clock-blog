export default function Hero() {
  return (
    <section className="py-16 px-4 text-center border-b border-zinc-100 dark:border-zinc-800">
      <p className="text-4xl mb-4" aria-hidden="true">🕐</p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
        생체시계 블로그
      </h1>
      <p className="max-w-xl mx-auto text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
        일주기 리듬(Circadian Rhythm)이 우리 몸과 마음에 미치는 영향을
        <br className="hidden sm:block" />
        시간대별로 탐구합니다.
      </p>
    </section>
  )
}
