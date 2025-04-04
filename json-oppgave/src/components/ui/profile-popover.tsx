import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { AvatarDemo } from "./profile"
import { useState, useEffect } from "react"

export function ProfilePopover() {

    const [imageSrc, setImageSrc] = useState<string>(
        localStorage.getItem("localImage") || ""
    )

    useEffect(() => {
        localStorage.setItem("localImage", imageSrc)
    }, [imageSrc])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button><AvatarDemo src={imageSrc}/></button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <Input
                        value={imageSrc}
                        onChange={(e) => setImageSrc(e.target.value)}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
