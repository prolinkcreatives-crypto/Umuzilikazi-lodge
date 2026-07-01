import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShieldMark from '../../components/ShieldMark';
import { useAuthStore } from '../../store/authStore';
import { lodgeInfo } from '../../design-system/tokens';

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const result = await login(email, password);
    setSubmitting(false);
    if (result.ok) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error ?? 'Incorrect email or password.');
    }
  }

  return (
    <div className="min-h-screen bg-forest-green-deep flex items-center justify-center px-margin-mobile">
      <div className="glass-panel-dark rounded-xl p-10 w-full max-w-sm text-center">
        <ShieldMark className="h-14 w-auto text-ivory-white mx-auto mb-6" />
        <h1 className="font-display text-headline-md text-ivory-white mb-1">{lodgeInfo.name}</h1>
        <p className="label-caps text-warm-gold-bright mb-8">Reception Dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="label-caps text-ivory-white/70 block mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ivory-white/10 border border-ivory-white/20 rounded px-4 py-3 text-ivory-white placeholder:text-ivory-white/40 focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              placeholder="you@umuzilikazi.co.zm"
            />
          </div>
          <div>
            <label className="label-caps text-ivory-white/70 block mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ivory-white/10 border border-ivory-white/20 rounded px-4 py-3 text-ivory-white placeholder:text-ivory-white/40 focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-error text-label-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="label-caps w-full bg-warm-gold disabled:opacity-60 text-ivory-white px-6 py-3.5 rounded hover:bg-warm-gold-bright hover:text-forest-green-deep transition-colors"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
