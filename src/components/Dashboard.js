import React from 'react';
import { DAILY_TARGETS, WORKOUT_PLAN } from '../data';
import { getWeekDayIndex } from '../useLocalStorage';

const MacroRing = ({ value, target, color, label, unit = 'g' }) => {
  const pct = Math.min((value / target) * 100, 100);
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width="76" height="76" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r={r} fill="none" stroke="#1e1e1e" strokeWidth="7" />
        <circle
          cx="38" cy="38" r={r} fill="none"
          stroke={color} strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 38 38)"
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text x="38" y="38" textAnchor="middle" dominantBaseline="middle"
          style={{ fill: '#fff', fontSize: 11, fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
          {Math.round(value)}{unit}
        </text>
      </svg>
      <span style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 1 }}>
        {label}
      </span>
      <span style={{ color: '#444', fontSize: 10 }}>/ {target}{unit}</span>
    </div>
  );
};

export default function Dashboard({ log, bodyWeight }) {
  const todayWorkout = WORKOUT_PLAN[getWeekDayIndex()];
  const todayLog = log || { calories: 0, protein: 0, carbs: 0, fat: 0, items: [] };

  const calPct = Math.min((todayLog.calories / DAILY_TARGETS.calories) * 100, 100);
  const remaining = Math.max(DAILY_TARGETS.calories - todayLog.calories, 0);
  const latestWeight = bodyWeight && bodyWeight.length > 0
    ? bodyWeight[bodyWeight.length - 1].weight
    : 45;
  const gained = +(latestWeight - 45).toFixed(1);

  return (
    <div style={{ padding: '16px 16px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: '#666', fontSize: 12, fontFamily: 'Barlow Condensed', letterSpacing: 3, marginBottom: 4 }}>
          TODAY'S STATUS
        </div>
        <div style={{ color: '#fff', fontSize: 36, fontFamily: 'Barlow Condensed', fontWeight: 900, lineHeight: 1 }}>
          BULK<span style={{ color: '#ff4d4d' }}>UP</span>
        </div>
        <div style={{ color: '#555', fontSize: 12, marginTop: 4 }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Calorie Card */}
      <div style={{
        background: '#111', borderRadius: 16, padding: '20px',
        marginBottom: 16, border: '1px solid #1e1e1e', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          width: `${calPct}%`, background: 'linear-gradient(90deg, #ff4d4d22, #ff4d4d44)',
          transition: 'width 0.6s ease'
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2 }}>CALORIES TODAY</div>
              <div style={{ color: '#fff', fontSize: 42, fontFamily: 'Barlow Condensed', fontWeight: 900, lineHeight: 1 }}>
                {todayLog.calories.toLocaleString()}
              </div>
              <div style={{ color: '#444', fontSize: 12 }}>/ {DAILY_TARGETS.calories.toLocaleString()} kcal target</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: remaining > 0 ? '#ff4d4d' : '#4dff88', fontSize: 28, fontFamily: 'Barlow Condensed', fontWeight: 800 }}>
                {remaining > 0 ? `-${remaining}` : '+0'}
              </div>
              <div style={{ color: '#555', fontSize: 11 }}>kcal remaining</div>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ height: 4, background: '#1e1e1e', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${calPct}%`, background: '#ff4d4d', borderRadius: 4, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ color: '#555', fontSize: 11, marginTop: 6 }}>{Math.round(calPct)}% of daily goal</div>
        </div>
      </div>

      {/* Macros */}
      <div style={{
        background: '#111', borderRadius: 16, padding: '20px',
        marginBottom: 16, border: '1px solid #1e1e1e'
      }}>
        <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2, marginBottom: 16 }}>MACROS</div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <MacroRing value={todayLog.protein} target={DAILY_TARGETS.protein} color="#4d9fff" label="PROTEIN" />
          <MacroRing value={todayLog.carbs} target={DAILY_TARGETS.carbs} color="#ffd700" label="CARBS" />
          <MacroRing value={todayLog.fat} target={DAILY_TARGETS.fat} color="#ff944d" label="FAT" />
        </div>
      </div>

      {/* Today's Workout */}
      <div style={{
        background: '#111', borderRadius: 16, padding: '20px',
        marginBottom: 16, border: `1px solid ${todayWorkout.color}33`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2 }}>TODAY'S GYM</div>
            <div style={{ color: todayWorkout.color, fontSize: 28, fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
              {todayWorkout.name} DAY
            </div>
            <div style={{ color: '#555', fontSize: 12 }}>{todayWorkout.focus}</div>
          </div>
          {todayWorkout.exercises.length === 0 ? (
            <div style={{
              background: '#1e1e1e', borderRadius: 50, width: 48, height: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22
            }}>😴</div>
          ) : (
            <div style={{
              background: `${todayWorkout.color}22`, borderRadius: 12, padding: '8px 14px',
              color: todayWorkout.color, fontSize: 13, fontWeight: 600
            }}>
              {todayWorkout.exercises.length} exercises
            </div>
          )}
        </div>
        {todayWorkout.exercises.slice(0, 3).map((ex, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', padding: '8px 0',
            borderTop: '1px solid #1e1e1e', color: '#aaa', fontSize: 13
          }}>
            <span>{ex.name}</span>
            <span style={{ color: '#555' }}>{ex.sets}×{ex.reps}</span>
          </div>
        ))}
        {todayWorkout.exercises.length > 3 && (
          <div style={{ color: '#555', fontSize: 12, marginTop: 6 }}>
            +{todayWorkout.exercises.length - 3} more exercises
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: '#111', borderRadius: 16, padding: 16, border: '1px solid #1e1e1e' }}>
          <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2 }}>CURRENT WEIGHT</div>
          <div style={{ color: '#fff', fontSize: 32, fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
            {latestWeight}<span style={{ fontSize: 16, color: '#555' }}> kg</span>
          </div>
          <div style={{ color: gained >= 0 ? '#4dff88' : '#ff4d4d', fontSize: 12 }}>
            {gained >= 0 ? '+' : ''}{gained} kg gained
          </div>
        </div>
        <div style={{ background: '#111', borderRadius: 16, padding: 16, border: '1px solid #1e1e1e' }}>
          <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2 }}>GOAL WEIGHT</div>
          <div style={{ color: '#fff', fontSize: 32, fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
            70<span style={{ fontSize: 16, color: '#555' }}> kg</span>
          </div>
          <div style={{ color: '#ff4d4d', fontSize: 12 }}>
            {+(70 - latestWeight).toFixed(1)} kg to go
          </div>
        </div>
      </div>
    </div>
  );
}
