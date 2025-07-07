"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  CreditCard,
  Database,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Monitor,
  Settings,
  Smartphone,
  TrendingUp,
  Users,
  Wifi,
} from "lucide-react"

const navigationItems = [
  {
    title: "Tableau de Bord",
    items: [
      {
        title: "Vue d'ensemble",
        url: "/",
        icon: Home,
        isActive: true,
      },
      {
        title: "Réclamations",
        url: "/complaints",
        icon: AlertTriangle,
        badge: "",
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Canaux Digitaux",
    items: [
      {
        title: "App Mobile",
        url: "/channels/mobile",
        icon: Smartphone,
        badge: "",
      },
      {
        title: "Internet Banking",
        url: "/channels/web",
        icon: Monitor,
        badge: "",
      },
      {
        title: "GAB/ATM",
        url: "/channels/atm",
        icon: CreditCard,
        badge: "",
      },
      {
        title: "Autres Canaux",
        url: "/channels/others",
        icon: Wifi,
        badge: "",
      },
    ],
  },
  {
    title: "Gestion",
    items: [
      {
        title: "Équipes",
        url: "/teams",
        icon: Users,
      },
      {
        title: "Rapports",
        url: "/reports",
        icon: FileText,
      },
      {
        title: "Base de Données",
        url: "/database",
        icon: Database,
      },
      {
        title: "Paramètres",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
]

export function BankingLayout({ children }: { children: React.ReactNode }) {
  const [notifications] = useState(12)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center">
                <img src="/stb2.jpeg" alt="STB Logo" className="h-10 w-10 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">STB Digital</span>
                <span className="text-xs text-gray-500">Direction Développement</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2 py-4">
            {navigationItems.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.isActive}
                          className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium"
                        >
                          <a href={item.url} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span className="flex-1">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Système opérationnel</span>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Dashboard Réclamations - Transactions Digitales
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
                  )}
                </Button>

                {/* Help */}
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback className="bg-blue-600 text-white text-xs">AM</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-medium">AYA</span>
                        <span className="text-xs text-gray-500">Analyste Digital</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">AYA</p>
                        <p className="text-xs text-gray-500">AYA@stb.com.tn</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>© 2025 Société Tunisienne de Banque</span>
                <span>•</span>
                <span>Direction Développement Digital</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Version 2.1.0</span>
                <span>•</span>
                <span>Dernière mise à jour: {new Date().toLocaleDateString("fr-FR")}</span>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
