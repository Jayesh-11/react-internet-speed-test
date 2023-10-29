import { useRef, useState } from "react"

const ITERATIONS = 15
const PING_URL = 'https://source.unsplash.com/random?topics=nature'

const useInternetSpeed = () => {
    const [speed, setSpeed] = useState<number>(0)
    const intervalRunning = useRef(false)

    const checkInternetSpeed = async () => {

        const startTime = new Date().getTime()
        let imageSize: number = 0;
        let speedInMbps = 0;

        await fetch(PING_URL).then((response) => {
            imageSize = Number(response.headers.get("content-length")) ?? 0;
            calculateSpeed();
        });

        function calculateSpeed() {
            const timeDuration = (new Date().getTime() - startTime) / 1000;
            const loadedBits = imageSize * 8;
            speedInMbps = Number((loadedBits / (1024 * 1024 * timeDuration)).toFixed(2));
            setSpeed(speedInMbps)
        }
        return speedInMbps
    }

    const intervalHandler = async () => {
        intervalRunning.current = !intervalRunning.current
        let accumulatedSpeed = 0
        for (let i = 0; (i < ITERATIONS) && intervalRunning.current; i++) {
            const speedInMbps = await checkInternetSpeed()
            accumulatedSpeed += speedInMbps
        }
        setSpeed(Number((accumulatedSpeed / ITERATIONS).toFixed(2)))
    }

    return { speed, intervalHandler }

}

export default useInternetSpeed
