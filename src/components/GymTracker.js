import React, { useState } from 'react';
import { WORKOUT_PLAN } from '../data';
import { getWeekDayIndex } from '../useLocalStorage';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function GymTracker({ gymLogs, onGymUpdate }) {
  const todayIdx = getWeekDayIndex();
  const [selectedDay, setSelectedDay] = useState(todayIdx);
  const [completedSets, setCompletedSets] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [notes, setNotes] = useState({});

  const workout = WORKOUT_PLAN[selectedDay];
  const logKey = `${new Date().toISOString().split('T')[0]}_${selectedDay}`;
  const todayGymLog = (gymLogs || {})[logKey] || { completed: [], notes: {} };

  const toggleSet = (exIdx, setIdx) => {
    const key = `${exIdx}_${setIdx}`;
    const current = { ...(completedSets || {}) };
    if (current[key]) delete current[key];
    else current[key] = true;
    setCompletedSets(current);

    const allCompleted = WORKOUT_PLAN[selectedDay].exercises.flatMap((ex, ei) =>
      Array.from({ length: ex.sets }, (_, si) => `${ei}_${si}`)
    ).filter(k => current[k] || false);

    onGymUpdate({
      ...(gymLogs || {}),
      [logKey]: {
        completed: allCompleted,
        notes: (todayGymLog.notes || {}),
        workout: workout.name
      }
    });
  };

  const isSetDone = (exIdx, setIdx) => completedSets[`${exIdx}_${setIdx}`] || false;

  const totalSets = workout.exercises.reduce((s, ex) => s + ex.sets, 0);
  const doneSets = Object.keys(completedSets).length;

  return (
    <div style={{ padding: '16px 16px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 3 }}>GYM TRACKER</div>
        <div style={{ color: '#fff', fontSize: 30, fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
          {workout.name} <span style={{ color: workout.color }}>DAY</span>
        </div>
        <div style={{ color: '#555', fontSize: 12 }}>{workout.focus}</div>
      </div>

      {/* Day selector */}
      <div style={{
        display: 'flex', gap: 6, marginBottom: 20,
        overflowX: 'auto', paddingBottom: 4
      }}>
        {WORKOUT_PLAN.map((w, i) => (
          <button key={i} onClick={() => { setSelectedDay(i); setCompletedSets({}); }} style={{
            background: selectedDay === i ? w.color : i === todayIdx ? '#1e1e1e' : '#111',
            color: selectedDay === i ? '#000' : i === todayIdx ? '#fff' : '#555',
            border: i === todayIdx && selectedDay !== i ? `1px solid ${w.color}44` : '1px solid transparent',
            borderRadius: 10, padding: '8px 10px', cursor: 'pointer',
            fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 13,
            minWidth: 46, textAlign: 'center', lineHeight: 1.2,
            transition: 'all 0.2s'
          }}>
            <div>{DAYS[i]}</div>
            <div style={{ fontSize: 9, fontWeight: 400, opacity: 0.7 }}>{w.name.slice(0, 3)}</div>
          </button>
        ))}
      </div>

      {workout.exercises.length === 0 ? (
        <div style={{
          background: '#111', borderRadius: 20, padding: 40,
          textAlign: 'center', border: '1px solid #1e1e1e'
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>😴</div>
          <div style={{ color: '#fff', fontSize: 24, fontFamily: 'Barlow Condensed', fontWeight: 700 }}>REST DAY</div>
          <div style={{ color: '#555', fontSize: 14, marginTop: 8 }}>Eat big. Sleep. Recover. Grow.</div>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div style={{
            background: '#111', borderRadius: 14, padding: '14px 16px',
            border: '1px solid #1e1e1e', marginBottom: 16
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#666', fontSize: 12, fontFamily: 'Barlow Condensed', letterSpacing: 1 }}>WORKOUT PROGRESS</span>
              <span style={{ color: '#fff', fontFamily: 'Barlow Condensed', fontWeight: 700 }}>{doneSets}/{totalSets} sets</span>
            </div>
            <div style={{ height: 6, background: '#1e1e1e', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${totalSets ? (doneSets / totalSets) * 100 : 0}%`,
                background: workout.color, borderRadius: 6, transition: 'width 0.3s ease'
              }} />
            </div>
            {doneSets === totalSets && totalSets > 0 && (
              <div style={{ color: '#4dff88', fontSize: 12, marginTop: 6, fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
                💪 WORKOUT COMPLETE! BEAST MODE!
              </div>
            )}
          </div>

          {/* Exercises */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {workout.exercises.map((ex, exIdx) => {
              const doneSetsCount = Array.from({ length: ex.sets }, (_, si) => si).filter(si => isSetDone(exIdx, si)).length;
              const isExpanded = expanded === exIdx;
              return (
                <div key={exIdx} style={{
                  background: '#111', borderRadius: 14,
                  border: `1px solid ${doneSetsCount === ex.sets ? workout.color + '55' : '#1e1e1e'}`,
                  overflow: 'hidden', transition: 'border-color 0.3s'
                }}>
                  <div
                    onClick={() => setExpanded(isExpanded ? null : exIdx)}
                    style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <div style={{ color: doneSetsCount === ex.sets ? '#4dff88' : '#fff', fontSize: 15, fontWeight: 500 }}>
                        {doneSetsCount === ex.sets && '✓ '}{ex.name}
                      </div>
                      <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>{ex.muscle} · {ex.sets}×{ex.reps}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {Array.from({ length: ex.sets }, (_, si) => (
                          <div key={si} style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: isSetDone(exIdx, si) ? workout.color : '#2a2a2a',
                            transition: 'background 0.2s'
                          }} />
                        ))}
                      </div>
                      <span style={{ color: '#444', fontSize: 18 }}>{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: '0 16px 16px', borderTop: '1px solid #1a1a1a' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ex.sets}, 1fr)`, gap: 8, marginTop: 12 }}>
                        {Array.from({ length: ex.sets }, (_, si) => (
                          <button
                            key={si}
                            onClick={() => toggleSet(exIdx, si)}
                            style={{
                              background: isSetDone(exIdx, si) ? workout.color : '#1a1a1a',
                              color: isSetDone(exIdx, si) ? '#000' : '#666',
                              border: `1px solid ${isSetDone(exIdx, si) ? workout.color : '#2a2a2a'}`,
                              borderRadius: 10, padding: '12px 8px', cursor: 'pointer',
                              fontFamily: 'Barlow Condensed', fontWeight: 700,
                              fontSize: 12, transition: 'all 0.2s'
                            }}
                          >
                            SET {si + 1}<br />
                            <span style={{ fontSize: 10, fontWeight: 400 }}>{ex.reps}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
