import React, { useState, useEffect } from 'react';
import { useLocalStorage, getTodayKey } from './useLocalStorage';
import Dashboard from './components/Dashboard';
import FoodLogger from './components/FoodLogger';
import GymTracker from './components/GymTracker';
import Progress from './components/Progress';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', icon: '⚡' },
  { id: 'food', label: 'Food', icon: '🍗' },
  { id: 'gym', label: 'Gym', icon: '💪' },
  { id: 'progress', label: 'Progress', icon: '📈' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [foodHistory, setFoodHistory] = useLocalStorage('bulk_food_history', {});
  const [bodyWeight, setBodyWeight] = useLocalStorage('bulk_body_weight', [{ date: 'Start', weight: 45 }]);
  const [gymLogs, setGymLogs] = useLocalStorage('bulk_gym_logs', {});
  const [frequentFoods, setFrequentFoods] = useLocalStorage('bulk_frequent_foods', []);

  const todayKey = getTodayKey();
  const todayLog = foodHistory[todayKey] || { calories: 0, protein: 0, carbs: 0, fat: 0, items: [] };

  const updateTodayLog = (log) => {
    setFoodHistory(prev => ({ ...prev, [todayKey]: log }));
  };

  // Autosave food log daily reset check
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
      body { font-family: 'Barlow', sans-serif; background: #0a0a0a; color: #fff; margin: 0; }
      input::placeholder { color: #333; }
      input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#0a0a0a', position: 'relative' }}>
      {/* Content */}
      <div style={{ paddingTop: 0 }}>
        {activeTab === 'dashboard' && (
          <Dashboard log={todayLog} bodyWeight={bodyWeight} />
        )}
        {activeTab === 'food' && (
          <FoodLogger
            log={todayLog}
            onUpdate={updateTodayLog}
            frequentFoods={frequentFoods}
            onFrequentUpdate={setFrequentFoods}
          />
        )}
        {activeTab === 'gym' && (
          <GymTracker gymLogs={gymLogs} onGymUpdate={setGymLogs} />
        )}
        {activeTab === 'progress' && (
          <Progress
            bodyWeight={bodyWeight}
            onWeightAdd={setBodyWeight}
            history={foodHistory}
          />
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        background: '#0d0d0d', borderTop: '1px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-around', padding: '8px 0 20px',
        zIndex: 100
      }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '6px 20px',
              opacity: activeTab === item.id ? 1 : 0.4,
              transition: 'opacity 0.2s'
            }}
          >
            <div style={{
              fontSize: 20,
              filter: activeTab === item.id ? 'none' : 'grayscale(1)'
            }}>
              {item.icon}
            </div>
            <div style={{
              color: activeTab === item.id ? '#ff4d4d' : '#555',
              fontSize: 10, fontFamily: 'Barlow Condensed', fontWeight: 700,
              letterSpacing: 1, textTransform: 'uppercase'
            }}>
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

