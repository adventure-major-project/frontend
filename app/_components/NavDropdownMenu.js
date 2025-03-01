import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AuthButton from "./AuthButton"
  

export default function NavDropdownMenu() {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem><AuthButton /></DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

    )
}  