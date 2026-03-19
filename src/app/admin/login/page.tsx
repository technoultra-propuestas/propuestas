'use client'

import { useState } from 'react'
import { loginAction } from '@/app/actions'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    try {
      const res = await loginAction(formData)
      if (res?.error) {
        setError(res.error)
      }
    } catch (err) {
      setError('Error al verificar credenciales')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 font-sans text-neutral-900">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="w-12 h-12 bg-orange-100 text-brand rounded-xl flex items-center justify-center mx-auto mb-6">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-2">
            Panel Administrativo
          </h2>
          <p className="text-center text-neutral-500 mb-8">
            Generador de Propuestas TECHNOULTRA
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Contraseña Administrativa
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all placeholder-neutral-400"
                placeholder="Ingresa la contraseña"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand disabled:bg-opacity-50 hover:bg-[#e05d00] text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? 'Accediendo...' : 'Ingresar Seguro'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
