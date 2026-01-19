import React, { useState, useEffect } from 'react';
import { Calendar, Mountain, Lock, Check, Edit3, Loader2 } from 'lucide-react';

const DAYS_DATA = [
  { day: 1, title: "Порог", task: "Проснуться в 6:00. Не брать телефон 20 минут.", observation: "Первое утро — самое громкое. Дальше будет тише.", question: "Что ты услышал в этой тишине?" },
  { day: 2, title: "Вода", task: "Холодный душ 2 минуты. Без разогрева.", observation: "Тело сопротивляется. Ты — нет.", question: "Где ещё ты сопротивляешься по привычке?" },
  { day: 3, title: "Голод", task: "Пропустить один приём пищи. Любой.", observation: "Голод — это не про еду. Это про контроль.", question: "Чего ты на самом деле хочешь, когда хочешь есть?" },
  { day: 4, title: "Шаг", task: "Пройти 10 000 шагов. Без наушников.", observation: "Ноги идут. Голова молчит. Или не молчит — тогда слушай.", question: "О чём ты думал большую часть пути?" },
  { day: 5, title: "Отказ", task: "Откажись от одной привычки на сегодня. Ты знаешь какой.", observation: "То, от чего трудно отказаться, держит тебя сильнее, чем кажется.", question: "Что заполнило освободившееся место?" },
  { day: 6, title: "Дыхание", task: "10 минут сидя. Просто дыши. Считай вдохи до 10, начинай снова.", observation: "Ум не хочет сидеть. Пусть не хочет. Ты всё равно сидишь.", question: "Сколько раз ты сбился? Почему?" },
  { day: 7, title: "Тело", task: "50 отжиманий, 50 приседаний. Раздели как хочешь, но сделай.", observation: "Тело помнит больше, чем ты думаешь.", question: "Когда ты в последний раз чувствовал усталость, которую сам выбрал?" },
  { day: 8, title: "Слово", task: "Не ври сегодня. Ни разу. Даже по мелочи.", observation: "Ложь начинается с «ничего страшного».", question: "Сколько раз ты хотел соврать?" },
  { day: 9, title: "Экран", task: "После 21:00 — никаких экранов. Телефон, компьютер, телевизор.", observation: "Вечер без света — это возвращение к себе или побег от себя.", question: "Чем ты заполнил вечер?" },
  { day: 10, title: "Точка", task: "Напиши три вещи, которые изменились за эти 10 дней.", observation: "Ты прошёл четверть пути. Дорога не стала легче. Ты стал сильнее.", question: "Ты продолжаешь или останавливаешься?" },
  { day: 11, title: "Начало", task: "Проснуться в 6:00. Холодный душ. 20 отжиманий. Всё подряд.", observation: "Второй круг начинается с повторения. Но ты уже не тот.", question: "Что изменилось в твоём теле за эти 10 дней?" },
  { day: 12, title: "Режим", task: "Лечь спать до 23:00. Без исключений.", observation: "Сон — это не слабость. Это фундамент.", question: "Что ты обычно делаешь вместо сна?" },
  { day: 13, title: "Повторение", task: "Сделай вчерашнее задание ещё раз. Точь-в-точь.", observation: "Дисциплина — это делать снова то, что уже сделал.", question: "Было легче или труднее?" },
  { day: 14, title: "Молчание", task: "3 часа без слов. Выбери время сам.", observation: "Молчание — это не отсутствие звука. Это присутствие.", question: "О чём ты хотел сказать, но не сказал?" },
  { day: 15, title: "Удар", task: "100 отжиманий. Раздели на подходы, но закончи.", observation: "Тело может больше, чем разрешает голова.", question: "На каком повторении ты хотел остановиться?" },
  { day: 16, title: "Простота", task: "Ешь сегодня только простую еду. Без соусов, без добавок.", observation: "Вкус — это привычка. Голод — это правда.", question: "Чего тебе не хватило?" },
  { day: 17, title: "Ритм", task: "Бег 5 км. Или ходьба 15 км. Без остановок.", observation: "Ритм важнее скорости. Ты не гонишься. Ты идёшь.", question: "Где ты хотел сдаться?" },
  { day: 18, title: "Выбор", task: "Откажись от одной вещи на неделю. Алкоголь, сладкое, соцсети — реши сам.", observation: "Отказ — это не лишение. Это освобождение.", question: "Что ты выбрал? Почему это?" },
  { day: 19, title: "Неудобство", task: "Сделай что-то, чего избегал. Звонок. Разговор. Извинение.", observation: "Неудобство — это точка роста, замаскированная под страх.", question: "Что ты чувствовал после?" },
  { day: 20, title: "Середина", task: "Напиши, что ты понял за эти 20 дней. Три строки.", observation: "Половина пути — это не конец подъёма. Это начало спуска внутрь себя.", question: "Зачем ты это делаешь?" },
  { day: 21, title: "Предел", task: "Планка до отказа. Потом ещё 10 секунд.", observation: "Предел — это договор с собой. Его можно пересмотреть.", question: "Что ты почувствовал в эти последние 10 секунд?" },
  { day: 22, title: "Пустота", task: "Целый день без музыки, подкастов, фона. Только тишина.", observation: "Тишина не пустая. Она полная. Ты просто не слушал.", question: "Что ты услышал?" },
  { day: 23, title: "Боль", task: "200 приседаний. По 20 в подходе. Отдых — минута.", observation: "Боль в мышцах — это разговор тела. Не игнорируй его.", question: "Когда ты в последний раз слушал своё тело?" },
  { day: 24, title: "Голод", task: "24 часа без еды. Только вода.", observation: "Голод делает мысли острее. Или показывает, что они всегда были тупыми.", question: "Что ты понял про себя, когда не ел?" },
  { day: 25, title: "Холод", task: "Холодный душ 5 минут. Не спеши. Дыши.", observation: "Холод не враг. Он зеркало. Ты видишь, как сопротивляешься.", question: "Когда дыхание выровнялось?" },
  { day: 26, title: "Усталость", task: "10 км пешком. Когда устанешь — ещё 2 км.", observation: "Усталость — это не стена. Это туман. Можно идти сквозь него.", question: "Что было за туманом?" },
  { day: 27, title: "Отказ", task: "Скажи \"нет\" три раза сегодня. Даже если неудобно.", observation: "\"Нет\" — это граница. Без границ ты размываешься.", question: "Кому труднее всего было отказать?" },
  { day: 28, title: "Одиночество", task: "Весь вечер один. Без звонков, без чатов, без людей.", observation: "Одиночество — это не наказание. Это встреча.", question: "С кем ты встретился?" },
  { day: 29, title: "Сила", task: "Максимум отжиманий за один подход. Потом 50% от этого числа — ещё раз.", observation: "Сила не в мышцах. Она в том, что ты делаешь, когда мышцы отказывают.", question: "Сколько ты сделал? Сколько думал, что сможешь?" },
  { day: 30, title: "Точка невозврата", task: "Напиши одну вещь, от которой ты отказываешься навсегда после этих 30 дней.", observation: "Ты прошёл три четверти. Назад дороги нет. Только через.", question: "Что ты оставляешь за спиной?" },
  { day: 31, title: "Спуск", task: "Медленная прогулка 1 час. Смотри вокруг, а не в телефон.", observation: "Спуск с горы медленнее подъёма. Ноги помнят каждый шаг.", question: "Что изменилось в мире, пока ты шёл?" },
  { day: 32, title: "Сборка", task: "Напиши список всех заданий, которые ты выполнил. Все 31.", observation: "Путь виден только с высоты. Ты прошёл дальше, чем думал.", question: "Какое задание было самым трудным?" },
  { day: 33, title: "Возвращение к телу", task: "Повтори задание из дня 7: 50 отжиманий, 50 приседаний.", observation: "Тело не стало сильнее. Ты стал увереннее.", question: "Почему было легче?" },
  { day: 34, title: "Слова", task: "Скажи трём людям то, что давно хотел сказать. Правду.", observation: "Слова, которых ты избегал, ждали тебя всё это время.", question: "Кому было труднее всего сказать?" },
  { day: 35, title: "Благодарность", task: "Напиши 10 вещей, за которые ты благодарен. Без общих слов.", observation: "Благодарность — это не радость. Это трезвость.", question: "Что из этого ты принимал как должное?" },
  { day: 36, title: "Ритуал", task: "Создай утренний ритуал на 30 минут и выполни его. Это твой ритуал.", observation: "Ритуал — это якорь. Ты возвращаешься к нему, когда всё плывёт.", question: "Что ты включил в ритуал?" },
  { day: 37, title: "Огонь", task: "Сожги (в прямом или переносном смысле) одну вещь из прошлого. Письмо, фото, предмет.", observation: "Некоторые вещи нужно отпустить через огонь.", question: "Что ты сжёг? Почему именно это?" },
  { day: 38, title: "Решение", task: "Прими одно решение, которое откладывал. Прими сегодня.", observation: "Решение — это не правильный выбор. Это конец колебаний.", question: "Что ты решил?" },
  { day: 39, title: "Тишина", task: "Целый день без лишних слов. Говори только то, что важно.", observation: "Тишина после 39 дней — это не пустота. Это полнота.", question: "Сколько слов ты не сказал?" },
  { day: 40, title: "Вершина", task: "Прочитай всё, что ты написал за 40 дней. Все ответы на вопросы.", observation: "Ты дошёл. Не потому что был сильным. Потому что шёл.", question: "Кто ты сейчас?" }
];

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [startDate, setStartDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [answers, setAnswers] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoUsage, setPromoUsage] = useState({});

  const ADMIN_PASSWORD = 'mountains2025';

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }

    const savedPromos = localStorage.getItem('mountains40_promo_codes');
    const savedUsage = localStorage.getItem('mountains40_promo_usage');
    
    if (savedPromos) {
      setPromoCodes(JSON.parse(savedPromos));
    } else {
      const initial = ['CREATOR', 'FRIEND', 'MOUNTAINS2025'].map(code => ({
        code,
        createdAt: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      }));
      setPromoCodes(initial);
      localStorage.setItem('mountains40_promo_codes', JSON.stringify(initial));
    }

    if (savedUsage) {
      setPromoUsage(JSON.parse(savedUsage));
    }
  }, []);

  const saveData = (data) => {
    const saved = JSON.parse(localStorage.getItem('mountains40') || '{}');
    const updated = { ...saved, ...data };
    localStorage.setItem('mountains40', JSON.stringify(updated));
  };

  const handleStartJourney = (date) => {
    setStartDate(date);
    setIsPaid(true);
    saveData({ startDate: date, isPaid: true });
    setScreen('journey');
  };

  const handlePromoSubmit = () => {
    const validCodes = promoCodes.map(p => p.code.toUpperCase());
    if (validCodes.includes(promoCode.toUpperCase())) {
      const usage = {
        ...promoUsage,
        [promoCode.toUpperCase()]: [
          ...(promoUsage[promoCode.toUpperCase()] || []),
          {
            date: new Date().toISOString(),
            startDate: startDate
          }
        ]
      };
      setPromoUsage(usage);
      localStorage.setItem('mountains40_promo_usage', JSON.stringify(usage));
      
      handleStartJourney(startDate);
    } else {
      setPromoError('Промокод не найден');
      setTimeout(() => setPromoError(''), 3000);
    }
  };

  const saveAnswer = (day, answer) => {
    const newAnswers = { ...answers, [day]: answer };
    setAnswers(newAnswers);
    saveData({ answers: newAnswers });
  };

  const getCurrentDay = () => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(0, Math.min(diff, 40));
  };

  const currentDay = getCurrentDay();

  if (screen === 'admin_login') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-2xl font-light">Админ-панель</h2>
          <div className="space-y-4">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full p-4 bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-zinc-700"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && adminPassword === ADMIN_PASSWORD) {
                  setIsAdmin(true);
                  setScreen('admin');
                }
              }}
            />
            <button
              onClick={() => {
                if (adminPassword === ADMIN_PASSWORD) {
                  setIsAdmin(true);
                  setScreen('admin');
                } else {
                  alert('Неверный пароль');
                }
              }}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-100 font-light"
            >
              Войти
            </button>
            <button
              onClick={() => setScreen('landing')}
              className="w-full text-zinc-600 hover:text-zinc-500 text-sm"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'admin' && isAdmin) {
    return <AdminPanel 
      promoCodes={promoCodes}
      setPromoCodes={setPromoCodes}
      promoUsage={promoUsage}
      onBack={() => setScreen('landing')}
    />;
  }

  if (screen === 'landing') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-16">
          <div className="space-y-8">
            <h1 className="text-5xl font-light tracking-tight leading-tight">
              40 дней<br/>в горы
            </h1>
            
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed border-l border-zinc-800 pl-6">
              <p>
                Ты не изменишься за 40 дней.<br/>
                Но узнаешь, можешь ли ты держать слово перед собой.
              </p>
              
              <p>
                Каждый день — задание.<br/>
                Каждый вечер — вопрос.<br/>
                Никто не проверяет. Только ты.
              </p>
              
              <p>
                40 дней — это отрыв, дисциплина, нагрузка, возвращение.<br/>
                Это путь. Не вверх. А через.
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-zinc-900">
            <div className="text-zinc-500 text-sm space-y-2">
              <p>Те, кто дойдёт до 40 дня —</p>
              <p>встретятся оффлайн. Один день в горах. Без телефонов.</p>
              <p className="text-zinc-600">Место объявим после финиша.</p>
            </div>

            <button
              onClick={() => setScreen('selectDate')}
              className="w-full py-5 bg-zinc-900 hover:bg-zinc-800 transition-colors text-zinc-100 font-light text-lg tracking-wide border border-zinc-800"
            >
              Начать — 1000₽
            </button>
            
            <button
              onClick={() => setScreen('admin_login')}
              className="text-zinc-800 hover:text-zinc-700 text-xs"
            >
              •
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'selectDate') {
    const today = new Date().toISOString().split('T')[0];
    
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-light">Когда начнёшь?</h2>
            <p className="text-zinc-500 text-base leading-relaxed">
              Выбери день старта.<br/>
              С этого дня начнётся отсчёт.<br/>
              Дни будут открываться по одному.
            </p>
          </div>

          <input
            type="date"
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-5 bg-zinc-900 border border-zinc-800 text-zinc-100 text-lg focus:outline-none focus:border-zinc-700"
          />

          {startDate && (
            <div className="space-y-6">
              <div className="text-zinc-500 text-base">
                Старт: {new Date(startDate).toLocaleDateString('ru-RU', { 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleStartJourney(startDate)}
                  className="w-full py-5 bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-100 font-light text-lg"
                >
                  Оплатить 1000₽
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-900"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-zinc-950 px-3 text-zinc-600">или</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Промокод"
                    className="w-full p-4 bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-zinc-700 uppercase"
                  />
                  {promoError && (
                    <div className="text-red-500 text-sm">{promoError}</div>
                  )}
                  <button
                    onClick={handlePromoSubmit}
                    disabled={!promoCode.trim()}
                    className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-300 font-light disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Применить промокод
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setScreen('landing')}
            className="w-full text-zinc-600 hover:text-zinc-500 text-sm"
          >
            Назад
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'journey') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="border-b border-zinc-900 p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <div className="text-sm text-zinc-500">День {currentDay} из 40</div>
              <div className="text-xs text-zinc-600 mt-1">
                Старт: {new Date(startDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
              </div>
            </div>
            <Mountain className="w-8 h-8 text-zinc-700" strokeWidth={1} />
          </div>
        </div>

        {selectedDay === null ? (
          <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
              {Array.from({ length: 40 }, (_, i) => i + 1).map((day) => {
                const isAvailable = day <= currentDay;
                const isCompleted = day < currentDay;
                const hasAnswer = answers[day];
                
                return (
                  <button
                    key={day}
                    onClick={() => isAvailable && setSelectedDay(day)}
                    disabled={!isAvailable}
                    className={`
                      aspect-square flex flex-col items-center justify-center border transition-all text-sm relative
                      ${isCompleted ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : ''}
                      ${day === currentDay ? 'bg-zinc-800 border-zinc-600 text-zinc-100 ring-1 ring-zinc-600' : ''}
                      ${!isAvailable ? 'border-zinc-900 text-zinc-800 cursor-not-allowed' : 'hover:border-zinc-700'}
                    `}
                  >
                    {!isAvailable && <Lock className="w-3 h-3 mb-0.5" strokeWidth={1.5} />}
                    {isCompleted && <Check className="w-3 h-3 mb-0.5" strokeWidth={1.5} />}
                    <div className="font-light">{day}</div>
                    {hasAnswer && isAvailable && (
                      <div className="absolute bottom-0.5 right-0.5">
                        <Edit3 className="w-2 h-2 text-zinc-600" strokeWidth={2} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {currentDay === 40 && (
              <div className="mt-12 p-8 border border-zinc-800 space-y-4 text-center">
                <h3 className="text-2xl font-light">Ты дошёл</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Оффлайн-встреча для тех, кто прошёл все 40 дней.<br/>
                  Один день в горах. Без смартфонов. Без слов о пройденном.<br/>
                  Только те, кто дошёл.
                </p>
              </div>
            )}
          </div>
        ) : (
          <DayView 
            day={DAYS_DATA[selectedDay - 1]} 
            onBack={() => setSelectedDay(null)}
            isCurrent={selectedDay === currentDay}
            isLast={selectedDay === 40}
            answer={answers[selectedDay]}
            onSaveAnswer={(answer) => saveAnswer(selectedDay, answer)}
          />
        )}
      </div>
    );
  }
}

function DayView({ day, onBack, isCurrent, isLast, answer, onSaveAnswer }) {
  const [editingAnswer, setEditingAnswer] = useState(answer || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSaveAnswer(editingAnswer);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-12 pb-24">
      <button 
        onClick={onBack}
        className="text-zinc-500 hover:text-zinc-400 text-sm"
      >
        ← Все дни
      </button>

      <div className="space-y-2">
        <div className="text-zinc-600 text-sm">День {day.day}</div>
        <h1 className="text-4xl font-light tracking-wide">{day.title}</h1>
      </div>

      <div className="space-y-10">
        <div className="space-y-3">
          <div className="text-zinc-600 text-xs uppercase tracking-widest">Задание</div>
          <p className="text-lg leading-relaxed">{day.task}</p>
        </div>

        <div className="space-y-3 border-l border-zinc-800 pl-6">
          <p className="text-zinc-400 leading-relaxed">{day.observation}</p>
        </div>

        <div className="space-y-4">
          <div className="text-zinc-600 text-xs​​​​​​​​​​​​​​​​
