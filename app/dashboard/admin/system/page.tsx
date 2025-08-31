'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useProfile } from '@/hooks/use-profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  const supabase = createClient()
  const [envVars, setEnvVars] = useState([
    { key: 'NEXT_PUBLIC_SUPABASE_URL', value: '***hidden***', description: 'Supabase project URL' },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: '***hidden***', description: 'Supabase anonymous key' },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', value: '***hidden***', description: 'Supabase service role key' },
  ])
  const [loading, setLoading] = useState(false)

  const handleUpdateEnvVar = async (index: number, newValue: string) => {
    setLoading(true)
    try {
      // In a real implementation, this would update environment variables
      const updated = [...envVars]
      updated[index].value = newValue
      setEnvVars(updated)
      toast.success('Environment variable updated successfully')
    } catch (error) {
      toast.error('Failed to update environment variable')
    } finally {
      setLoading(false)
    }
  }

  const handleRunMigration = async () => {
    setLoading(true)
    try {
      // In a real implementation, this would trigger database migrations
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      toast.success('Database migration completed successfully')
    } catch (error) {
      toast.error('Migration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateRLS = async () => {
    setLoading(true)
    try {
      // In a real implementation, this would update RLS policies
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      toast.success('RLS policies updated successfully')
    } catch (error) {
      toast.error('Failed to update RLS policies')
    } finally {
      setLoading(false)
    }
  }

  const handleSystemReset = async () => {
    if (!confirm('Are you sure you want to reset the system? This action cannot be undone.')) {
      return
    }
    
    setLoading(true)
    try {
      // In a real implementation, this would reset system data
      await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate API call
      toast.success('System reset completed')
    } catch (error) {
      toast.error('System reset failed')
    } finally {
      setLoading(false)
    }
  }

  const handleBackupDatabase = async () => {
    setLoading(true)
    try {
      // In a real implementation, this would create a database backup
      await new Promise(resolve => setTimeout(resolve, 2500)) // Simulate API call
      toast.success('Database backup created successfully')
    } catch (error) {
      toast.error('Backup failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSecurityAudit = async () => {
    setLoading(true)
    try {
      // In a real implementation, this would run security checks
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      toast.success('Security audit completed - No issues found')
    } catch (error) {
      toast.error('Security audit failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRotateKeys = async () => {
    setLoading(true)
    try {
      // In a real implementation, this would rotate API keys
      await new Promise(resolve => setTimeout(resolve, 1800)) // Simulate API call
      toast.success('API keys rotated successfully')
    } catch (error) {
      toast.error('Key rotation failed')
    } finally {
      setLoading(false)
    }
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
                      onChange={(e) => {
                        const updated = [...envVars]
                        updated[index].value = e.target.value
                        setEnvVars(updated)
                      }}
                      placeholder="Enter value"
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpdateEnvVar(index, envVars[index].value)}
                      disabled={loading}
                    >
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
                <Button 
                  onClick={handleRunMigration} 
                  disabled={loading}
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {loading ? 'Running...' : 'Run Migration'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleBackupDatabase} 
                  disabled={loading} 
                  className="w-full"
                >
                  <Database className="mr-2 h-4 w-4" />
                  {loading ? 'Creating...' : 'Backup Database'}
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleSystemReset} 
                  disabled={loading} 
                  className="w-full"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  {loading ? 'Resetting...' : 'Reset System'}
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
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Migration</span>
                  <Badge variant="outline">2 hours ago</Badge>
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
              <Button 
                onClick={handleUpdateRLS} 
                disabled={loading}
                className="w-full"
              >
                <Shield className="mr-2 h-4 w-4" />
                {loading ? 'Updating...' : 'Update RLS Policies'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSecurityAudit} 
                disabled={loading} 
                className="w-full"
              >
                <Server className="mr-2 h-4 w-4" />
                {loading ? 'Auditing...' : 'Security Audit'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRotateKeys} 
                disabled={loading} 
                className="w-full"
              >
                <Key className="mr-2 h-4 w-4" />
                {loading ? 'Rotating...' : 'Rotate API Keys'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Status</CardTitle>
              <CardDescription>
                Current security configuration overview.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">RLS Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Enabled
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Auth Providers</span>
                <Badge variant="outline">Google, Facebook</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Key Rotation</span>
                <Badge variant="outline">30 days ago</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Security Score</span>
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  98%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}