"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  type LucideIcon,
  List,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logoImg from "../../../../../public/logo.png";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarSection {
  title: string;
  links: SidebarItem[];
}

interface SidebarLinksProps {
  className?: string;
  isCollapsed: boolean;
  links: SidebarItem[];
  pathname: string;
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  isCollapsed: boolean;
  label: string;
  pathname: string;
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Painel",
    links: [
      {
        href: "/dashboard",
        label: "Agendamentos",
        icon: CalendarCheck2,
      },
      {
        href: "/dashboard/services",
        label: "Servicos",
        icon: Folder,
      },
    ],
  },
  {
    title: "Configuracoes",
    links: [
      {
        href: "/dashboard/profile",
        label: "Meu perfil",
        icon: Settings,
      },
      {
        href: "/dashboard/plans",
        label: "Planos",
        icon: Banknote,
      },
    ],
  },
];

const flatSidebarLinks = sidebarSections.flatMap((section) => section.links);

export function SideBarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "h-full flex flex-col border-r bg-background p-4 transition-all duration-300",
          {
            "hidden md:fixed md:flex": true,
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
          },
        )}
      >
        <div className="mb-6 mt-4">
          {!isCollapsed && (
            <Image
              src={logoImg}
              alt="Logo da ClinicaPRO"
              priority
              quality={100}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          )}
        </div>

        <Button
          className="mb-2 self-end bg-gray-100 text-zinc-900 hover:bg-gray-50"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-12 w-12" />
          ) : (
            <ChevronLeft className="h-12 w-12" />
          )}
        </Button>

        {isCollapsed && (
          <SideBarLinks
            className="mt-2 flex flex-col gap-1 overflow-hidden"
            isCollapsed={true}
            links={flatSidebarLinks}
            pathname={pathname}
          />
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <SideBarSections pathname={pathname} />
          </CollapsibleContent>
        </Collapsible>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-2 md:hidden md:px-6">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsCollapsed(false)}
                >
                  <List className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <h1 className="text-base font-semibold md:text-lg">
                Menu ClinicaPRO
              </h1>
            </div>

            <SheetContent side="right" className="p-4 text-black sm:max-w-xs">
              <SheetTitle>ClinicaPRO</SheetTitle>
              <SheetDescription>Menu administrativo</SheetDescription>
              <SideBarLinks
                className="grid gap-2 pt-5 text-base"
                isCollapsed={false}
                links={flatSidebarLinks}
                pathname={pathname}
              />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 px-2 py-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

function SideBarSections({ pathname }: { pathname: string }) {
  return (
    <>
      {sidebarSections.map((section) => (
        <div key={section.title}>
          <span className="mt-1 text-sm font-medium uppercase text-gray-400">
            {section.title}
          </span>
          <SideBarLinks
            className="mt-1 flex flex-col gap-1 overflow-hidden"
            isCollapsed={false}
            links={section.links}
            pathname={pathname}
          />
        </div>
      ))}
    </>
  );
}

function SideBarLinks({
  className,
  isCollapsed,
  links,
  pathname,
}: SidebarLinksProps) {
  return (
    <nav className={className}>
      {links.map((link) => (
        <SideBarLink
          key={link.href}
          href={link.href}
          icon={link.icon}
          isCollapsed={isCollapsed}
          label={link.label}
          pathname={pathname}
        />
      ))}
    </nav>
  );
}

function SideBarLink({
  href,
  icon,
  isCollapsed,
  label,
  pathname,
}: SidebarLinkProps) {
  const Icon = icon;

  return (
    <Link href={href}>
      <div
        className={clsx(
          "ransition-colors flex items-center gap-2 rounded-md px-3 py-2",
          {
            "bg-blue-500 text-white": pathname === href,
            "text-gray-700 hover:bg-gray-100": pathname !== href,
          },
        )}
      >
        <span className="h-6 w-6">
          <Icon className="h-6 w-6" />
        </span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
