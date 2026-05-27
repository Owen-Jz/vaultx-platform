import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/getAuthUser'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const user = await getAuthUser()
  if (!user) redirect('/auth/login')

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-text-primary">Account Settings</h1>
        <p className="text-text-muted text-sm mt-1">Manage your profile and security settings</p>
      </div>
      <SettingsForm user={JSON.parse(JSON.stringify(user))} />
    </div>
  )
}
