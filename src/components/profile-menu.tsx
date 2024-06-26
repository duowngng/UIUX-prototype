import Image from "next/image";
import Link from "next/link";

import { Book, HelpCircle, LogOut } from "lucide-react";

import ChevronUp from "@/components/shared/icons/chevron-up";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import UserRound from "./shared/icons/user-round";
import { ModeToggle } from "./theme-toggle";

type ProfileMenuProps = {
  className?: string;
  size: "large" | "small";
};

const ProfileMenu = ({ className, size }: ProfileMenuProps) => {
  const isSize = size === "large";
  return (
    <div className="flex items-center justify-between space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full">
            <div className="group flex w-full items-center rounded-full text-sm font-semibold leading-6 text-foreground hover:bg-gray-200 hover:dark:bg-secondary lg:gap-x-3 lg:rounded-md lg:p-2">
              {/* {session?.user?.image ? (
                <Image
                  className="h-7 w-7 rounded-full bg-secondary"
                  src={session?.user?.image}
                  width={30}
                  height={30}
                  alt={`Profile picture of ${session?.user?.name}`}
                  loading="lazy"
                />
              ) : ( */}
                <UserRound className="h-7 w-7 rounded-full bg-secondary p-1 ring-1 ring-muted-foreground/50" />
              {/* )} */}
              {isSize && (
                <span className="flex w-full items-center justify-between">
                  <span className="sr-only">Thông tin cá nhân</span>
                  <span aria-hidden="true" className="line-clamp-2">
                    {/* {session?.user?.name
                      ? session?.user?.name
                      : session?.user?.email?.split("@")[0]} */}
                      Người dùng
                  </span>
                  <ChevronUp
                    className="ml-2 h-5 w-5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </span>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 px-0 pb-2 lg:mr-0 lg:w-[240px] xl:w-[270px]">
            {/* {session ? ( */}
              <>
                <DropdownMenuLabel className="mt-2 truncate !py-[3px] px-3 text-sm text-muted-foreground">
                  user@email.com
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="!my-2" />
                <ModeToggle />
                <a
                  className="my-1 flex items-center px-3 py-2 text-sm duration-200 hover:bg-gray-200 dark:hover:bg-muted"
                >
                  <Book className="mr-2 h-4 w-4" />
                  Hướng dẫn
                </a>
                <a
                  href="mailto:support@kapiota.com"
                  className="my-1 flex items-center px-3 py-2 text-sm duration-200 hover:bg-gray-200 dark:hover:bg-muted"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Trợ giúp?
                </a>

                <Link
                  onClick={() => {}}
                  className="flex items-center px-3 py-2 text-sm duration-200 hover:bg-gray-200 dark:hover:bg-muted"
                  href={""}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </Link>
              </>
            {/* ) : null} */}
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
