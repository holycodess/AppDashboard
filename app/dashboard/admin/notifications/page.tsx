'use client'

import { useState } from 'react'
import { useProfile } from '@/hooks/use-profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Send,
  Users,
  AlertCircle
} from 'lucide-react'

export default function NotificationsPage() {
  const { profile } = useProfile()
  const [loading, setLoading] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
  })
  const [broadcastMessage, setBroadcastMessage] = useState('')
  const [broadcastTitle, setBroadcastTitle] = useState('')
  const [selectedAudience, setSelectedAudience] = useState('all')

  const handleSettingsUpdate = async (setting: string, value: boolean) => {
    setLoading(true)
    try {
      setNotificationSettings(prev => ({ ...prev, [setting]: value }))
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      toast.success('Notification settings updated')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  const handleBroadcast = async () => {
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      toast.error('Please fill in both title and message')
      return
    }

    setLoading(true)
    try {
      // In a real implementation, this would send notifications
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      toast.success(`Broadcast sent to ${selectedAudience} users`)
      setBroadcastTitle('')
      setBroadcastMessage('')
    } catch (error) {
      toast.error('Failed to send broadcast')
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
          Notification Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage system notifications and broadcast messages to users.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure system-wide notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send notifications via email
                </p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => handleSettingsUpdate('emailNotifications', checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send browser push notifications
                </p>
              </div>
              <Switch
                checked={notificationSettings.pushNotifications}
                onCheckedChange={(checked) => handleSettingsUpdate('pushNotifications', checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send notifications via SMS
                </p>
              </div>
              <Switch
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(checked) => handleSettingsUpdate('smsNotifications', checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Send weekly analytics reports
                </p>
              </div>
              <Switch
                checked={notificationSettings.weeklyReports}
                onCheckedChange={(checked) => handleSettingsUpdate('weeklyReports', checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Send critical security notifications
                </p>
              </div>
              <Switch
                checked={notificationSettings.securityAlerts}
                onCheckedChange={(checked) => handleSettingsUpdate('securityAlerts', checked)}
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Broadcast Message
            </CardTitle>
            <CardDescription>
              Send announcements to all or specific user groups.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <select
                id="audience"
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Users</option>
                <option value="superadmin">SuperAdmins</option>
                <option value="staff">Staff</option>
                <option value="vendor">Vendors</option>
                <option value="user">Regular Users</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Message Title</Label>
              <Input
                id="title"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="Enter message title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message Content</Label>
              <Textarea
                id="message"
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Enter your message here..."
                rows={4}
              />
            </div>

            <Button onClick={handleBroadcast} disabled={loading} className="w-full">
              <Send className="mr-2 h-4 w-4" />
              {loading ? 'Sending...' : 'Send Broadcast'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            Latest system notifications and broadcasts sent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">System Maintenance Complete</h4>
                  <Badge variant="outline">All Users</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  The scheduled maintenance has been completed successfully.
                </p>
                <p className="text-xs text-muted-foreground">
                  Sent 2 hours ago • 1,020 recipients
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">New Feature Release</h4>
                  <Badge variant="outline">Staff</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Analytics dashboard is now available for all staff members.
                </p>
                <p className="text-xs text-muted-foreground">
                  Sent yesterday • 45 recipients
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">Security Update</h4>
                  <Badge variant="outline">SuperAdmins</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Please review the new security policies in the admin panel.
                </p>
                <p className="text-xs text-muted-foreground">
                  Sent 3 days ago • 5 recipients
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}