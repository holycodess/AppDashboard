'use client'

import { useState } from 'react'
import { useProfile } from '@/hooks/use-profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  AlertTriangle, 
  Database, 
  Key, 
  RefreshCw, 
  Shield,
  Server 
} from 'lucide-react'

export default function SystemPage() {
  const { profile } = useProfile()
  const [envVars, setEnvVars] = useState([
    { key: 'NEXT_PUBLIC_SUPABASE_URL', value: '***hidden***', description: 'Supabase project URL' },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: '***hidden***', description: 'Supabase anonymous key' },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', value: '***hidden***', description: 'Supabase service role key' },
  ])

  const handleUpdateEnvVar = (index: number, newValue: string) => {
    const updated = [...envVars]
    updated[index].value = newValue
    setEnvVars(updated)
    toast.success('Environment variable updated')
  }

  const handleRunMigration = () => {
    toast.success('Database migration initiated')
  }

  const handleUpdateRLS = () => {
    toast.success('RLS policies updated')
  }

  const handleSystemReset = () => {
    toast.success('System reset initiated')
  }

  if (profile?.role !== 'superadmin') {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
            <CardDescription className="text-center">
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          System Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage system configuration, environment variables, and database operations.
        </p>
      </div>

      <Tabs defaultValue="environment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="environment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Environment Variables
              </CardTitle>
              <CardDescription>
                Manage application configuration and API keys.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {envVars.map((envVar, index) => (
                <div key={envVar.key} className="space-y-2">
                  <Label>{envVar.key}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value={envVar.value}
                      onChange={(e) => handleUpdateEnvVar(index, e.target.value)}
                      placeholder="Enter value"
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{envVar.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Operations
                </CardTitle>
                <CardDescription>
                  Manage database schema and migrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleRunMigration} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Run Migration
                </Button>
                <Button variant="outline" className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Backup Database
                </Button>
                <Button variant="destructive" onClick={handleSystemReset} className="w-full">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Reset System
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Status</CardTitle>
                <CardDescription>
                  Current database health and statistics.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Connection Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Connected
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Tables</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Connections</span>
                  <Badge variant="outline">45</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage RLS policies and security configurations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleUpdateRLS} className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Update RLS Policies
              </Button>
              <Button variant="outline" className="w-full">
                <Server className="mr-2 h-4 w-4" />
                Security Audit
              </Button>
              <Button variant="outline" className="w-full">
                <Key className="mr-2 h-4 w-4" />
                Rotate API Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}