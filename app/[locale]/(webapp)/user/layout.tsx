"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { useUserMenu } from "@/hooks/useUserMenu";
import { usePathname } from "next/navigation";
import { Clock3Icon, UnplugIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

const getMenuIcon = (key: string) => {
  switch (key) {
    case "Accounts":
      return <UnplugIcon size={16} />;
    case "Orders":
      return <Clock3Icon size={16} />;
    default:
      return null;
  }
};

function UserLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [user, isLoading] = useUser();
  const [userMenuItems] = useUserMenu();

  return (
    <div className="flex flex-1">
      <aside className="z-10 flex mr-4 sm:mr-6 lg:mr-8">
        <div className="h-full overflow-y-auto px-3 py-4 dark:bg-gray-800 border-r">
          <ul className="space-y-2">
            {userMenuItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                    pathname === item.href && "bg-gray-100 dark:bg-gray-700"
                  )}
                >
                  {getMenuIcon(item.key)}
                  <span className="ml-3 hidden flex-1 whitespace-nowrap lg:block">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="flex w-full flex-col overflow-y-auto p-4 md:px-10">
        {isLoading ? null : user ? children : <div>请先登录</div>}
      </div>
    </div>
  );
}

export default UserLayout;
