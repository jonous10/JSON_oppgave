import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AvatarDemo } from "./profile"

export function ProfilePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button><AvatarDemo/></button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          
        </div>
      </PopoverContent>
    </Popover>
  )
}
