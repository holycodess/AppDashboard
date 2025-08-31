'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useProfile } from '@/hooks/use-profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

const themeColors = [
  { name: 'Black', value: 'black', primary: '#000000', secondary: '#1f1f1f' },
  { name: 'Green', value: 'green', primary: '#16a34a', secondary: '#22c55e' },
  { name: 'Red', value: 'red', primary: '#dc2626', secondary: '#ef4444' },
  { name: 'Blue', value: 'blue', primary: '#2563eb', secondary: '#3b82f6' },
  { name: 'Gold', value: 'gold', primary: '#d97706', secondary: '#f59e0b' },
]

const fonts = [
  { name: 'Geist Sans', value: 'geist-sans' },
  { name: 'Inter', value: 'inter' },
  { name: 'Roboto', value: 'roboto' },
  { name: 'Open Sans', value: 'open-sans' },
]

export default function ThemesPage() {
  const { profile } = useProfile()
  const supabase = createClient()
  const [selectedCategory, setSelectedCategory] = useState('admin')
  const [selectedColor, setSelectedColor] = useState('blue')
  const [selectedFont, setSelectedFont] = useState('geist-sans')
  const [loading, setLoading] = useState(false)

  const handleSaveTheme = async () => {
    setLoading(true)
    try {
      // In a real implementation, this would save to system_settings table
      const themeKey = `theme_${selectedCategory}`
      const themeValue = {
        color: selectedColor,
        font: selectedFont
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(`Theme applied for ${selectedCategory} category`)
    } catch (error) {
      toast.error('Failed to save theme')
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
          Theme Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Customize colors and fonts for different user categories.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Theme Configuration</CardTitle>
            <CardDescription>
              Set themes for different user categories.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>User Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <div className="grid grid-cols-2 gap-3">
                {themeColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      selectedColor === color.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex gap-1">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.secondary }}
                      />
                    </div>
                    <span className="text-sm font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveTheme} className="w-full">
              disabled={loading}
              {loading ? 'Applying...' : 'Apply Theme'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
            <CardDescription>
              Preview how the theme will look for {selectedCategory} users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="rounded-lg border p-4 space-y-4"
              style={{
                borderColor: themeColors.find(c => c.value === selectedColor)?.primary,
              }}
            >
              <div className="flex items-center justify-between">
                <h3 
                  className="font-semibold"
                  style={{ 
                    color: themeColors.find(c => c.value === selectedColor)?.primary,
                    fontFamily: fonts.find(f => f.value === selectedFont)?.name 
                  }}
                >
                  Sample Header
                </h3>
                <Badge 
                  style={{ 
                    backgroundColor: themeColors.find(c => c.value === selectedColor)?.secondary,
                    color: 'white'
                  }}
                >
                  {selectedCategory}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                This is how the interface will appear for {selectedCategory} users.
              </div>
              <Button 
                size="sm"
                style={{ 
                  backgroundColor: themeColors.find(c => c.value === selectedColor)?.primary,
                  fontFamily: fonts.find(f => f.value === selectedFont)?.name 
                }}
              >
                Sample Button
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}