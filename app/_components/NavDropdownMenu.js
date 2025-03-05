import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { ImagePlus } from 'lucide-react';
import Link from 'next/link'  
import { useAuth } from "@/providers/useAuth";


export default function NavDropdownMenu() {
    const { user, logout } = useAuth();
    return user ? (<div className="flex items-center gap-5">
        <Link
        href="/canvas"
        className="px-6 py-2 bg-gradient-to-r from-[#e87415] to-[#ff9f1c] text-white rounded-lg flex items-center gap-2 
        hover:from-[#d76612] hover:to-[#ff8c00] transition-all duration-300 shadow-lg shadow-orange-500/30"
        >
        Create <ImagePlus className="w-5 h-5" />
        </Link>


        <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.picture ? user.picture : "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{user.user.first_name ? `${user.user.first_name} ${user.user.last_name}` : user.user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/profile" className="w-full text-left">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>
                <button onClick={logout} className="w-full text-left">
                    Logout
                </button>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        </div>
    ) : (
        <Link href="/auth" className="px-5 py-1 bg-white text-black rounded-md flex items-center gap-2 hover:bg-gray-200">
            Log in
        </Link>

    )
}  