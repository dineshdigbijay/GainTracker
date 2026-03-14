import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DAILY_TARGETS } from '../data';

export default function Progress({ bodyWeight, onWeightAdd, history }) {
  const [newWeight, setNewWeight] = useState('');
  const [tab, setTab] = useState('weight');

  const latestWeight = bodyWeight && bodyWeight.length > 0
    ? bodyWeight[bodyWeight.length - 1].weight : 45;
  const gained = +(latestWeight - 45).toFixed(1);

  const addWeight = () => {
    if (!newWeight || isNaN(newWeight)) return;
    const entry = {
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      weight: parseFloat(newWeight)
    };
    onWeightAdd([...(bodyWeight || [{ date: 'Start', weight: 45 }]), entry]);
    setNewWeight('');
  };

  const chartData = bodyWeight && bodyWeight.length > 0
    ? bodyWeight.slice(-14)
    : [{ date: 'Start', weight: 45 }];

  // Past 7 days calorie history
  const historyDays = Object.entries(history || {}).slice(-7).map(([date, log]) => ({
    date: new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    calories: log.calories || 0,
    protein: log.protein || 0,
  }));

  return (
    <div style={{ padding: '16px 16px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 3 }}>PROGRESS</div>
        <div style={{ color: '#fff', fontSize: 30, fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
          YOUR <span style={{ color: '#4dff88' }}>GAINS</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'CURRENT', value: `${latestWeight}kg`, color: '#fff' },
          { label: 'GAINED', value: `+${gained}kg`, color: '#4dff88' },
          { label: 'TO GO', value: `${+(70 - latestWeight).toFixed(1)}kg`, color: '#ff4d4d' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#111', borderRadius: 14, padding: '12px 10px',
            border: '1px solid #1e1e1e', textAlign: 'center'
          }}>
            <div style={{ color: '#555', fontSize: 9, fontFamily: 'Barlow Condensed', letterSpacing: 2 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 22, fontFamily: 'Barlow Condensed', fontWeight: 900 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Add weight */}
      <div style={{
        background: '#111', borderRadius: 16, padding: 16,
        border: '1px solid #1e1e1e', marginBottom: 20,
        display: 'flex', gap: 10, alignItems: 'center'
      }}>
        <input
          type="number"
          value={newWeight}
          onChange={e => setNewWeight(e.target.value)}
          placeholder="Today's weight (kg)"
          style={{
            flex: 1, background: '#0a0a0a', border: '1px solid #222',
            borderRadius: 10, padding: '10px 14px', color: '#fff',
            fontSize: 14, outline: 'none'
          }}
        />
        <button onClick={addWeight} style={{
          background: '#4dff88', color: '#000', border: 'none',
          borderRadius: 10, padding: '10px 20px', cursor: 'pointer',
          fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 14, letterSpacing: 1
        }}>
          LOG
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['weight', 'nutrition'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? '#4dff88' : '#1a1a1a',
            color: tab === t ? '#000' : '#666',
            border: 'none', borderRadius: 20, padding: '7px 18px',
            fontSize: 12, fontFamily: 'Barlow Condensed', fontWeight: 700,
            letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase'
          }}>
            {t === 'weight' ? 'Weight History' : 'Nutrition History'}
          </button>
        ))}
      </div>

      {/* Charts */}
      {tab === 'weight' && (
        <div style={{ background: '#111', borderRadius: 16, padding: '16px 8px 8px', border: '1px solid #1e1e1e' }}>
          <div style={{ color: '#555', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2, marginLeft: 10, marginBottom: 12 }}>
            WEIGHT TREND (kg)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#1a1a1a" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} width={35} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, color: '#fff' }}
                labelStyle={{ color: '#888' }}
              />
              <Line type="monotone" dataKey="weight" stroke="#4dff88" strokeWidth={2.5} dot={{ fill: '#4dff88', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'nutrition' && (
        <div>
          <div style={{ background: '#111', borderRadius: 16, padding: '16px 8px 8px', border: '1px solid #1e1e1e', marginBottom: 16 }}>
            <div style={{ color: '#555', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2, marginLeft: 10, marginBottom: 12 }}>
              DAILY CALORIES (last 7 days)
            </div>
            {historyDays.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={historyDays}>
                  <CartesianGrid stroke="#1a1a1a" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} width={38} />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, color: '#fff' }} />
                  <Line type="monotone" dataKey="calories" stroke="#ff4d4d" strokeWidth={2} dot={{ fill: '#ff4d4d', r: 3 }} name="Calories" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ color: '#444', textAlign: 'center', padding: 30, fontSize: 13 }}>
                No history yet. Start logging meals!
              </div>
            )}
          </div>

          {/* History list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(history || {}).slice(-7).reverse().map(([date, log]) => {
              const hit = log.calories >= DAILY_TARGETS.calories;
              return (
                <div key={date} style={{
                  background: '#111', borderRadius: 12, padding: '12px 14px',
                  border: `1px solid ${hit ? '#4dff8833' : '#1e1e1e'}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: '#ccc', fontSize: 13 }}>
                      {new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                    <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>
                      P:{Math.round(log.protein || 0)}g · C:{Math.round(log.carbs || 0)}g · F:{Math.round(log.fat || 0)}g
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: hit ? '#4dff88' : '#ff4d4d', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 18 }}>
                      {(log.calories || 0).toLocaleString()}
                    </div>
                    <div style={{ color: '#555', fontSize: 10 }}>{hit ? '✓ Goal hit' : '✗ Under goal'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
