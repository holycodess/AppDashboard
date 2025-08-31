/*
  # Add system settings table

  1. New Tables
    - `system_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - setting key name
      - `value` (jsonb) - setting value
      - `category` (text) - setting category (theme, system, etc.)
      - `description` (text) - setting description
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on system_settings table
    - Only superadmin can read/write system settings

  3. Default Settings
    - Insert default theme and system settings
*/

-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}',
  category text NOT NULL DEFAULT 'general',
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for system_settings
CREATE POLICY "Only superadmin can read system settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'superadmin');

CREATE POLICY "Only superadmin can modify system settings"
  ON system_settings
  FOR ALL
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'superadmin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'superadmin');

-- Insert default theme settings
INSERT INTO system_settings (key, value, category, description) VALUES
  ('theme_admin', '{"color": "blue", "font": "geist-sans"}', 'theme', 'Theme settings for admin users'),
  ('theme_staff', '{"color": "green", "font": "geist-sans"}', 'theme', 'Theme settings for staff users'),
  ('theme_vendor', '{"color": "gold", "font": "geist-sans"}', 'theme', 'Theme settings for vendor users'),
  ('theme_user', '{"color": "black", "font": "geist-sans"}', 'theme', 'Theme settings for regular users'),
  ('system_maintenance', '{"enabled": false, "message": ""}', 'system', 'System maintenance mode settings'),
  ('auth_providers', '{"google": true, "facebook": true}', 'auth', 'Enabled authentication providers')
ON CONFLICT (key) DO NOTHING;

-- Trigger for updated_at on system_settings
DROP TRIGGER IF EXISTS update_system_settings_updated_at ON system_settings;
CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();