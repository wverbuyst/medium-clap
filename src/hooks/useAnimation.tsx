import { useLayoutEffect, useState } from 'react'

export const useClapAnimation = ({ clapEl, countEl, clapTotalEl }: any) => {
  const [animationTimeline, setAnimationTimeline] = useState<{
    hello: string
    replay: any
  }>({
    hello: 'e',
    replay: () => null,
  })

  useLayoutEffect(() => {
    if (!clapEl || !countEl || !clapTotalEl) {
      return
    }

    // const tlDuration = 300

    // const triangleBurst = new mojs()?.Burst({
    //   parent: clapEl,
    //   radius: { 50: 95 },
    //   count: 5,
    //   angle: 30,
    //   children: {
    //     shape: 'polygon',
    //     radius: { 6: 0 },
    //     scale: 1,
    //     stroke: 'rgba(211,84,0 ,0.5)',
    //     strokeWidth: 2,
    //     angle: 210,
    //     delay: 30,
    //     speed: 0.2,
    //     easing: mojs?.easing?.bezier(0.1, 1, 0.3, 1),
    //     duration: tlDuration,
    //   },
    // })

    // const circleBurst = new mojs()?.Burst({
    //   parent: clapEl,
    //   radius: { 50: 75 },
    //   angle: 25,
    //   duration: tlDuration,
    //   children: {
    //     shape: 'circle',
    //     fill: 'rgba(149,165,166 ,0.5)',
    //     delay: 30,
    //     speed: 0.2,
    //     radius: { 3: 0 },
    //     easing: mojs?.easing?.bezier(0.1, 1, 0.3, 1),
    //   },
    // })

    // const countAnimation = new mojs.Html({
    //   el: countEl,
    //   isShowStart: false,
    //   isShowEnd: true,
    //   y: { 0: -30 },
    //   opacity: { 0: 1 },
    //   duration: tlDuration,
    // }).then({
    //   opacity: { 1: 0 },
    //   y: -80,
    //   delay: tlDuration / 2,
    // })

    // const countTotalAnimation = new mojs.Html({
    //   el: clapTotalEl,
    //   isShowStart: false,
    //   isShowEnd: true,
    //   opacity: { 0: 1 },
    //   delay: (3 * tlDuration) / 2,
    //   duration: tlDuration,
    //   y: { 0: -3 },
    // })

    const replay = () => {
      clapEl.style.scale = '1.5'
    }

    // const scaleButton = new mojs.Html({
    //   el: clapEl,
    //   duration: tlDuration,
    //   scale: { 1.3: 1 },
    //   easing: mojs.easing?.out,
    // })

    // if (typeof clapEl === 'string') {
    //   const clap = document.getElementById('clap-test')!
    //   clap.style.transform = 'scale(1, 1)'
    // } else {
    //   clapEl.style.transform = 'scale(1, 1)'
    // }

    // const newAnimationTimeline = animationTimeline.add([
    //   countAnimation,
    //   countTotalAnimation,
    //   scaleButton,
    //   circleBurst,
    //   triangleBurst,
    // ])
    animationTimeline.replay = replay
    setAnimationTimeline(animationTimeline)
  }, [clapEl, countEl, clapTotalEl])

  return animationTimeline
}
