import React, { useState } from 'react';
import { COMMON_FOODS, MEAL_SUGGESTIONS, DAILY_TARGETS } from '../data';

const MEAL_TABS = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

const MacroBadge = ({ label, value, color }) => (
  <span style={{
    background: `${color}22`, color, borderRadius: 6, padding: '2px 7px',
    fontSize: 11, fontWeight: 600, fontFamily: 'Barlow Condensed'
  }}>
    {label}: {value}g
  </span>
);

export default function FoodLogger({ log, onUpdate, frequentFoods, onFrequentUpdate }) {
  const [tab, setTab] = useState('quick');
  const [mealTab, setMealTab] = useState('All');
  const [search, setSearch] = useState('');
  const [custom, setCustom] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  const [added, setAdded] = useState(null);

  const todayLog = log || { calories: 0, protein: 0, carbs: 0, fat: 0, items: [] };

  const addFood = (food) => {
    const updated = {
      calories: todayLog.calories + food.calories,
      protein: todayLog.protein + (food.protein || 0),
      carbs: todayLog.carbs + (food.carbs || 0),
      fat: todayLog.fat + (food.fat || 0),
      items: [...(todayLog.items || []), { ...food, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]
    };
    onUpdate(updated);

    // update frequent
    const freq = [...(frequentFoods || [])];
    const idx = freq.findIndex(f => f.name === food.name);
    if (idx >= 0) {
      freq[idx] = { ...freq[idx], count: (freq[idx].count || 0) + 1 };
    } else {
      freq.push({ ...food, count: 1 });
    }
    freq.sort((a, b) => b.count - a.count);
    onFrequentUpdate(freq.slice(0, 10));

    setAdded(food.name);
    setTimeout(() => setAdded(null), 1500);
  };

  const removeItem = (index) => {
    const item = todayLog.items[index];
    const updated = {
      calories: Math.max(0, todayLog.calories - item.calories),
      protein: Math.max(0, todayLog.protein - (item.protein || 0)),
      carbs: Math.max(0, todayLog.carbs - (item.carbs || 0)),
      fat: Math.max(0, todayLog.fat - (item.fat || 0)),
      items: todayLog.items.filter((_, i) => i !== index)
    };
    onUpdate(updated);
  };

  const addCustom = () => {
    if (!custom.name || !custom.calories) return;
    addFood({
      name: custom.name,
      calories: +custom.calories,
      protein: +custom.protein || 0,
      carbs: +custom.carbs || 0,
      fat: +custom.fat || 0,
    });
    setCustom({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const filteredFoods = COMMON_FOODS.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMeals = MEAL_SUGGESTIONS.filter(m =>
    (mealTab === 'All' || m.meal.toLowerCase() === mealTab.toLowerCase()) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const remaining = Math.max(DAILY_TARGETS.calories - todayLog.calories, 0);

  return (
    <div style={{ padding: '16px 16px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 3 }}>FOOD TRACKER</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ color: '#fff', fontSize: 30, fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
            {todayLog.calories.toLocaleString()} <span style={{ color: '#444', fontSize: 16 }}>kcal</span>
          </div>
          <div style={{ color: '#ff4d4d', fontFamily: 'Barlow Condensed', fontSize: 18, fontWeight: 700 }}>
            -{remaining} left
          </div>
        </div>
        {/* macro bar */}
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <MacroBadge label="P" value={Math.round(todayLog.protein)} color="#4d9fff" />
          <MacroBadge label="C" value={Math.round(todayLog.carbs)} color="#ffd700" />
          <MacroBadge label="F" value={Math.round(todayLog.fat)} color="#ff944d" />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {['quick', 'meals', 'custom', 'today'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? '#ff4d4d' : '#1a1a1a',
            color: tab === t ? '#fff' : '#666',
            border: 'none', borderRadius: 20, padding: '7px 16px',
            fontSize: 12, fontFamily: 'Barlow Condensed', fontWeight: 700,
            letterSpacing: 1, cursor: 'pointer', whiteSpace: 'nowrap',
            textTransform: 'uppercase'
          }}>
            {t === 'quick' ? 'Quick Add' : t === 'meals' ? 'Meal Ideas' : t === 'custom' ? 'Custom' : "Today's Log"}
          </button>
        ))}
      </div>

      {/* QUICK ADD */}
      {tab === 'quick' && (
        <div>
          {/* Frequent */}
          {frequentFoods && frequentFoods.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#555', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2, marginBottom: 10 }}>
                FREQUENTLY ADDED
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {frequentFoods.slice(0, 6).map((f, i) => (
                  <button key={i} onClick={() => addFood(f)} style={{
                    background: added === f.name ? '#4dff88' : '#1a1a1a',
                    color: added === f.name ? '#000' : '#ccc',
                    border: '1px solid #2a2a2a', borderRadius: 20,
                    padding: '6px 14px', fontSize: 12, cursor: 'pointer',
                    transition: 'all 0.2s', fontFamily: 'Barlow'
                  }}>
                    {f.name.split(' ').slice(0, 3).join(' ')} · {f.calories}
                  </button>
                ))}
              </div>
            </div>
          )}

          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search foods..."
            style={{
              width: '100%', background: '#111', border: '1px solid #222',
              borderRadius: 12, padding: '10px 14px', color: '#fff',
              fontSize: 14, marginBottom: 12, boxSizing: 'border-box', outline: 'none'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredFoods.map((food, i) => (
              <div key={i} style={{
                background: '#111', borderRadius: 12, padding: '12px 14px',
                border: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <div style={{ color: '#ddd', fontSize: 14 }}>{food.name}</div>
                  <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>
                    P:{food.protein}g · C:{food.carbs}g · F:{food.fat}g
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#ff4d4d', fontFamily: 'Barlow Condensed', fontWeight: 700 }}>{food.calories}</span>
                  <button onClick={() => addFood(food)} style={{
                    background: added === food.name ? '#4dff88' : '#ff4d4d',
                    color: added === food.name ? '#000' : '#fff',
                    border: 'none', borderRadius: 8, width: 30, height: 30,
                    fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MEAL IDEAS */}
      {tab === 'meals' && (
        <div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto' }}>
            {MEAL_TABS.map(t => (
              <button key={t} onClick={() => setMealTab(t)} style={{
                background: mealTab === t ? '#ffd700' : '#1a1a1a',
                color: mealTab === t ? '#000' : '#666',
                border: 'none', borderRadius: 20, padding: '6px 14px',
                fontSize: 11, fontFamily: 'Barlow Condensed', fontWeight: 700,
                letterSpacing: 1, cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'uppercase'
              }}>
                {t}
              </button>
            ))}
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search meal ideas..."
            style={{
              width: '100%', background: '#111', border: '1px solid #222',
              borderRadius: 12, padding: '10px 14px', color: '#fff',
              fontSize: 14, marginBottom: 12, boxSizing: 'border-box', outline: 'none'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredMeals.map((meal, i) => (
              <div key={i} style={{
                background: '#111', borderRadius: 14, padding: '14px',
                border: '1px solid #1e1e1e'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ color: '#fff', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{meal.name}</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {(meal.tags || []).map(tag => (
                        <span key={tag} style={{
                          background: '#1e1e1e', color: '#555', borderRadius: 6,
                          padding: '1px 7px', fontSize: 10
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => addFood(meal)} style={{
                    background: added === meal.name ? '#4dff88' : '#ff4d4d22',
                    color: added === meal.name ? '#000' : '#ff4d4d',
                    border: '1px solid #ff4d4d44', borderRadius: 10,
                    padding: '6px 14px', fontSize: 12, cursor: 'pointer',
                    fontFamily: 'Barlow Condensed', fontWeight: 700, letterSpacing: 1,
                    transition: 'all 0.2s'
                  }}>
                    {added === meal.name ? 'ADDED!' : 'LOG IT'}
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: '#ff4d4d', fontFamily: 'Barlow Condensed', fontSize: 18, fontWeight: 700 }}>{meal.calories}</span>
                  <span style={{ color: '#555', fontSize: 12, alignSelf: 'center' }}>kcal</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginLeft: 8 }}>
                    <MacroBadge label="P" value={meal.protein} color="#4d9fff" />
                    <MacroBadge label="C" value={meal.carbs} color="#ffd700" />
                    <MacroBadge label="F" value={meal.fat} color="#ff944d" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CUSTOM */}
      {tab === 'custom' && (
        <div style={{ background: '#111', borderRadius: 16, padding: 20, border: '1px solid #1e1e1e' }}>
          <div style={{ color: '#666', fontSize: 11, fontFamily: 'Barlow Condensed', letterSpacing: 2, marginBottom: 16 }}>
            ADD CUSTOM FOOD
          </div>
          {['name', 'calories', 'protein', 'carbs', 'fat'].map(field => (
            <div key={field} style={{ marginBottom: 12 }}>
              <div style={{ color: '#555', fontSize: 11, marginBottom: 4, textTransform: 'uppercase', fontFamily: 'Barlow Condensed', letterSpacing: 1 }}>
                {field}{field !== 'name' && ' (g)'}
              </div>
              <input
                type={field === 'name' ? 'text' : 'number'}
                value={custom[field]}
                onChange={e => setCustom(p => ({ ...p, [field]: e.target.value }))}
                placeholder={field === 'name' ? 'Food name...' : '0'}
                style={{
                  width: '100%', background: '#0a0a0a', border: '1px solid #222',
                  borderRadius: 10, padding: '10px 14px', color: '#fff',
                  fontSize: 14, boxSizing: 'border-box', outline: 'none'
                }}
              />
            </div>
          ))}
          <button onClick={addCustom} style={{
            width: '100%', background: '#ff4d4d', color: '#fff',
            border: 'none', borderRadius: 12, padding: '14px',
            fontSize: 16, fontFamily: 'Barlow Condensed', fontWeight: 900,
            letterSpacing: 2, cursor: 'pointer', marginTop: 8
          }}>
            ADD FOOD
          </button>
        </div>
      )}

      {/* TODAY'S LOG */}
      {tab === 'today' && (
        <div>
          {todayLog.items && todayLog.items.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {todayLog.items.map((item, i) => (
                <div key={i} style={{
                  background: '#111', borderRadius: 12, padding: '12px 14px',
                  border: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: '#ddd', fontSize: 14 }}>{item.name}</div>
                    <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>{item.time}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ff4d4d', fontFamily: 'Barlow Condensed', fontWeight: 700 }}>{item.calories}</span>
                    <button onClick={() => removeItem(i)} style={{
                      background: '#1e1e1e', color: '#666', border: 'none',
                      borderRadius: 8, width: 28, height: 28, cursor: 'pointer', fontSize: 14
                    }}>×</button>
                  </div>
                </div>
              ))}
              <div style={{
                background: '#ff4d4d11', borderRadius: 12, padding: '12px 14px',
                border: '1px solid #ff4d4d22', marginTop: 8
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16 }}>
                  <span>TOTAL</span>
                  <span>{todayLog.calories} kcal</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: '#444', textAlign: 'center', marginTop: 60, fontSize: 14 }}>
              No foods logged today.<br />
              <span style={{ color: '#ff4d4d' }}>Start eating! 💪</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
