import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Lock, Home } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { api, setAdminSession, isAdminAuthenticated } from '../../lib/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin/leads" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await api.post('/admin/login', { username, password });
      setAdminSession(response.data.token, response.data.username);
      navigate('/admin/leads');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-2xl border-0">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-900" />
            </div>
            <h1 className="text-xl font-bold text-blue-900">Mundo Yatra Admin</h1>
            <p className="text-sm text-gray-500">Sign in to manage the website</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Link
            to="/"
            aria-label="Back to Mundo Yatra"
            className="flex items-center justify-center gap-2 text-gray-500 hover:text-blue-900 text-sm font-medium transition-colors mt-6"
          >
            <Home className="w-4 h-4" />
            Back to Mundoyatra
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
