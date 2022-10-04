import {CanvasComponent} from "../components/CanvasComponent";
import {FC} from "react";

type GamePageProps = {
    w: number,
};

export const GamePage: FC<GamePageProps> = (props) => {
    console.log(props);

    return <CanvasComponent width={1000} height={1000}/>
}