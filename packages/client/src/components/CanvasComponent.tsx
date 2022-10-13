import { FC, useEffect, useRef } from 'react'

type CanvasComponentProps = {
  width: number
  height: number
  id: string
}

export const CanvasComponent: FC<CanvasComponentProps> = ({
  width,
  height,
  id,
}) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = ref.current.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#6C0'
    ctx.fillRect(0, 0, 100, 100)
  }, [])

  return <canvas ref={ref} width={width} height={height} id={id} />
}
