"use client"

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { Separator } from "./separator";
import { ProfilePopover } from "./profile-popover";

export default function Header() {
    return (
        <div>
            <NavigationMenu className="p-2">
                <div className="w-screen">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link
                            href="http://localhost:3000/jon-filip"
                            legacyBehavior passHref
                            >
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link
                            href="http://localhost:3000/jon-filip/weather"
                            legacyBehavior passHref
                            >
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Weather Information
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link
                            href="https://www.vg.no/"
                            legacyBehavior passHref
                            >
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    VG
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="ml-auto mr-0">
                            <div className="flex flex-row gap-4">
                                <ThemeToggle/>
                                <ProfilePopover/>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
            <Separator></Separator>
        </div>
    )
}