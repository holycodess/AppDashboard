'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useProfile } from '@/hooks/use-profile'
import {
  LayoutDashboard,
  Users,
  Palette,
  Settings,
  FileText,
  Shield,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

const baseNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['superadmin', 'staff', 'vendor', 'user']
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: Users,
    roles: ['superadmin', 'staff', 'vendor', 'user']
  }
]

const adminNavItems = [
  {
    title: 'User Management',
    href: '/dashboard/admin/users',
    icon: Users,
    roles: ['superadmin']
  },
  {
    title: 'Theme Management',
    href: '/dashboard/admin/themes',
    icon: Palette,
    roles: ['superadmin']
  },
  {
    title: 'System Management',
    href: '/dashboard/admin/system',
    icon: Settings,
    roles: ['superadmin']
  },
  {
    title: 'Audit Logs',
    href: '/dashboard/admin/audit',
    icon: FileText,
    roles: ['superadmin']
  }
]

function SidebarContent() {
  const pathname = usePathname()
  const { profile } = useProfile()

  const navItems = [
    ...baseNavItems,
    ...(profile?.role === 'superadmin' ? adminNavItems : [])
  ].filter(item => item.roles.includes(profile?.role || 'user'))

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-8 w-8 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700">
        <SidebarContent />
      </div>
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}