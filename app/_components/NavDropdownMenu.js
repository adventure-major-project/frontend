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
import Link from 'next/link'  


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
            <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem><AuthButton /></DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

    )
}  