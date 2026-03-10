import { useState } from "react";

export default function TimeBar() {
    const [time, setTime] = useState(new Date());

    return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm text-slate-300">
            {time.toLocaleString(undefined, { month: "short", day: "numeric" })}{" "}
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
    )
}