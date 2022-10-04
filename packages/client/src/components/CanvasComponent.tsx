import {FC, useEffect, useRef} from "react";

type CanvasComponentProps = {
    width: number,
    height: number,
};

export const CanvasComponent:FC<CanvasComponentProps> = ({
    width,
    height,
}) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const ctx = ref.current.getContext('2d');
        if (!ctx) return;
        ctx.fillRect(0,0, 100, 100);
    }, []);

    return (
        <canvas ref={ref} width={width} height={height}/>
    );
}