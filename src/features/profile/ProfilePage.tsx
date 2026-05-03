import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useQuery } from '@apollo/client';
import { GET_STATS } from '../../graphql/queries';
import Spinner from '../../shared/components/Spinner';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { data, loading } = useQuery(GET_STATS);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  const stats = data?.getStats;

  // Mock data for heatmap
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activity = Array.from({ length: 49 }, () => Math.floor(Math.random() * 5));

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2">Developer Profile</h1>
        <p className="text-secondary">Analyze your algorithmic mastery and consistency.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-8 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-brand-orange/20 to-transparent pointer-events-none" />

            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-bg-card glow-orange overflow-hidden bg-bg-alt flex items-center justify-center text-4xl font-bold text-primary">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-bg-card" />
            </div>

            <h2 className="text-2xl font-bold text-primary mb-1">{user?.name}</h2>
            <p className="text-gray-500 text-sm mb-6">@{user?.name?.toLowerCase().replace(' ', '_')}_algo</p>

            <div className="grid grid-cols-2 w-full gap-4 pt-6 border-t border-surface-border">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Global Rank</p>
                <p className="text-xl font-bold text-primary">#4,209</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">League</p>
                <p className="text-xl font-bold text-emerald-400 uppercase tracking-tighter">Diamond</p>
              </div>
            </div>
          </div>

          <button className="btn-primary w-full py-3 uppercase tracking-widest text-sm">Edit Profile</button>
          <button className="btn-secondary w-full py-3 uppercase tracking-widest text-sm">Export Report</button>
        </div>

        {/* Stats Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Heatmap */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Activity Heatmap</h3>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(v => (
                    <div key={v} className={`w-3 h-3 rounded-sm ${v === 0 ? 'bg-bg-alt' : 'bg-brand-orange'} opacity-${v * 20 + 20}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col justify-between py-2 text-[10px] text-gray-600 font-bold uppercase">
                {days.filter((_, i) => i % 2 === 0).map(d => <span key={d}>{d}</span>)}
              </div>
              <div className="flex-1 grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-2">
                {activity.map((val, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-sm transition-colors cursor-help ${val === 0 ? 'bg-bg-alt' : 'bg-brand-orange'
                      }`}
                    style={{ opacity: val === 0 ? 1 : val * 0.25 }}
                    title={`${val} problems solved`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Streak & Rank Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 flex items-center justify-between relative overflow-hidden">
              <div className="absolute right-0 top-0 text-brand-orange/10 text-8xl font-black rotate-12 select-none">🔥</div>
              <div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Current Streak</h3>
                <p className="text-5xl font-black text-brand-orange mb-1">42 <span className="text-lg font-bold text-gray-500 uppercase tracking-widest">Days</span></p>
                <p className="text-xs text-gray-500">Longest: 87 days</p>
              </div>
            </div>

            <div className="card p-6 flex items-center justify-between relative overflow-hidden">
              <div className="absolute right-0 top-0 text-brand-orange/10 text-8xl font-black rotate-12 select-none">🏆</div>
              <div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Mastery Score</h3>
                <p className="text-5xl font-black text-primary mb-1">{stats?.percentage || 0}%</p>
                <p className="text-xs text-gray-500">{stats?.completedProblems} / {stats?.totalProblems} solved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
