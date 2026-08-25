import { Cpu, Database, MessageSquareCode, Waves, Workflow } from 'lucide-react';

const iconMap = {
  'cloud-ai': MessageSquareCode,
  'voice-wave': Waves,
  robotics: Cpu,
  'iot-dashboard': Database,
  'business-ui': Workflow,
};

export function ProjectIllustration({ visual = 'cloud-ai', title }) {
  const Icon = iconMap[visual] ?? MessageSquareCode;

  if (visual === 'voice-wave') {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-base-950 to-cyan-950/60 p-5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">voice.pipeline</span>
          <span>real-time</span>
        </div>
        <div className="mt-8 flex items-end gap-2">
          {[18, 38, 26, 60, 42, 72, 36, 54, 28, 66, 34].map((height, index) => (
            <div
              key={`${height}-${index}`}
              className="flex-1 rounded-full bg-gradient-to-t from-cyan-500 via-blue-400 to-fuchsia-400"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          Voice → Processing → Command → Response
        </div>
      </div>
    );
  }

  if (visual === 'robotics') {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-base-950 to-blue-950/60 p-5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">esp32.robotics</span>
          <span>hardware</span>
        </div>
        <div className="mt-6 grid grid-cols-[1fr_1fr] gap-4">
          <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4">
            <div className="h-16 rounded-xl border border-white/10 bg-base-950/80" />
            <p className="mt-3 text-xs text-slate-300">Motor control</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="h-16 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/30 to-fuchsia-500/20" />
            <p className="mt-3 text-xs text-slate-300">Obstacle sensing</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] text-slate-300">
          {['GPIO', 'L298N', 'Ultrasonic', 'Servo', 'Battery', 'ESP32'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (visual === 'iot-dashboard') {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-base-900 to-cyan-950/50 p-5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">iot.dashboard</span>
          <span>telemetry</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { label: 'Temp', value: '27.4°C' },
            { label: 'Humidity', value: '58%' },
            { label: 'Soil', value: '41%' },
            { label: 'Motion', value: 'Active' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
              <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual === 'business-ui') {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-base-900 to-fuchsia-950/40 p-5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">client.delivery</span>
          <span>web</span>
        </div>
        <div className="mt-6 rounded-3xl border border-white/10 bg-base-950/70 p-4">
          <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
            <div className="space-y-3">
              <div className="h-10 rounded-xl bg-white/6" />
              <div className="h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20" />
            </div>
            <div className="space-y-3">
              <div className="h-14 rounded-2xl bg-white/8" />
              <div className="h-14 rounded-2xl bg-fuchsia-500/15" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-base-950 to-fuchsia-950/50 p-5">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono">{title ? title.toLowerCase().replace(/\s+/g, '.') : 'document.platform'}</span>
        <span>ai pipeline</span>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cyan-400/15 p-2 text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-slate-400">secure, intelligent, connected</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-base-950/70 p-4 font-mono text-xs text-slate-300">
            <p className="text-cyan-200">$ ingest --documents</p>
            <p className="mt-2">extract - chunk - embed - search - answer</p>
          </div>
        </div>
        <div className="rounded-3xl border border-cyan-300/15 bg-cyan-400/10 p-5">
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
            {['AUTH', 'STORAGE', 'SEARCH', 'AI'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-base-950/60 px-3 py-4 text-center font-semibold tracking-[0.18em]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            Secure document workflows with a private-cloud mindset.
          </div>
        </div>
      </div>
    </div>
  );
}
