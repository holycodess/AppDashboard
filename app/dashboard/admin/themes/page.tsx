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
import { Palette, Type } from 'lucide-react'

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
  { name: 'Poppins', value: 'poppins' },
]

const userCategories = [
  { name: 'Admin', value: 'admin', description: 'SuperAdmin users' },
  { name: 'Staff', value: 'staff', description: 'Account, Support, Media staff' },
  { name: 'Vendor', value: 'vendor', description: 'Partner, Supplier vendors' },
  { name: 'User', value: 'user', description: 'PublicUser regular users' },
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
      
      // Simulate API call to update system settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(`Theme applied for ${selectedCategory} category`)
    } catch (error) {
      toast.error('Failed to save theme')
    } finally {
      setLoading(false)
    }
  }

  const handleResetToDefaults = async () => {
    setLoading(true)
    try {
      setSelectedColor('blue')
      setSelectedFont('geist-sans')
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Theme reset to defaults')
    } catch (error) {
      toast.error('Failed to reset theme')
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

  const selectedColorData = themeColors.find(c => c.value === selectedColor)
  const selectedFontData = fonts.find(f => f.value === selectedFont)
  const selectedCategoryData = userCategories.find(c => c.value === selectedCategory)

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
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme Configuration
            </CardTitle>
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
                  {userCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <div className="grid grid-cols-1 gap-3">
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
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: color.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: color.secondary }}
                      />
                    </div>
                    <span className="text-sm font-medium">{color.name}</span>
                    {selectedColor === color.value && (
                      <div className="ml-auto">
                        <Badge variant="secondary">Selected</Badge>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Font Family
              </Label>
              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.name }}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveTheme} disabled={loading} className="flex-1">
                {loading ? 'Applying...' : 'Apply Theme'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleResetToDefaults} 
                disabled={loading}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
            <CardDescription>
              Preview how the theme will look for {selectedCategoryData?.name} users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="rounded-lg border p-6 space-y-4 bg-white dark:bg-slate-800"
              style={{
                borderColor: selectedColorData?.primary,
              }}
            >
              <div className="flex items-center justify-between">
                <h3 
                  className="text-xl font-semibold"
                  style={{ 
                    color: selectedColorData?.primary,
                    fontFamily: selectedFontData?.name 
                  }}
                >
                  Sample Dashboard
                </h3>
                <Badge 
                  style={{ 
                    backgroundColor: selectedColorData?.secondary,
                    color: 'white'
                  }}
                >
                  {selectedCategoryData?.name}
                </Badge>
              </div>
              
              <div 
                className="text-sm text-muted-foreground"
                style={{ fontFamily: selectedFontData?.name }}
              >
                This is how the interface will appear for {selectedCategoryData?.name} users 
                with the {selectedColorData?.name} color scheme and {selectedFontData?.name} font.
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  style={{ 
                    backgroundColor: selectedColorData?.primary,
                    fontFamily: selectedFontData?.name 
                  }}
                >
                  Primary Action
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  style={{ 
                    borderColor: selectedColorData?.primary,
                    color: selectedColorData?.primary,
                    fontFamily: selectedFontData?.name 
                  }}
                >
                  Secondary Action
                </Button>
              </div>

              <div className="mt-4 p-3 rounded border border-slate-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedColorData?.primary }}
                  />
                  <span 
                    className="text-sm font-medium"
                    style={{ fontFamily: selectedFontData?.name }}
                  >
                    Sample Card Header
                  </span>
                </div>
                <p 
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: selectedFontData?.name }}
                >
                  This shows how cards and content will be styled.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Current Theme Settings</CardTitle>
          <CardDescription>
            Overview of theme configurations for all user categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {userCategories.map((category) => (
              <div 
                key={category.value}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <h4 className="font-medium mb-2">{category.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Blue Theme</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Type className="w-3 h-3" />
                    <span>Geist Sans</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}