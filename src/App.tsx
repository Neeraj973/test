import React, { useState, useEffect } from 'react';
import { Sparkles, Gift, Heart, Wind } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

function App() {
  const [step, setStep] = useState<'cake' | 'surprise' | 'letter' | 'finale'>('cake');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [blownCandles, setBlownCandles] = useState<boolean[]>([false, false, false, false, false]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const blowCandle = (index: number) => {
    const newBlownCandles = [...blownCandles];
    newBlownCandles[index] = true;
    setBlownCandles(newBlownCandles);

    // Check if all candles are blown
    if (newBlownCandles.every(blown => blown)) {
      setCandlesBlown(true);
      setShowConfetti(true);
      
      // Create elegant celebration particles
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
          vx: (Math.random() - 0.5) * 8,
          vy: -Math.random() * 12 - 4,
          color: ['#E879F9', '#F472B6', '#EC4899', '#BE185D'][Math.floor(Math.random() * 4)],
          life: 80
        });
      }
      setParticles(newParticles);

      setTimeout(() => {
        setStep('surprise');
      }, 2500);
    }
  };

  const revealLetter = () => {
    setStep('letter');
  };

  useEffect(() => {
    if (showConfetti) {
      const interval = setInterval(() => {
        setParticles(prev => 
          prev.map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.4,
            life: p.life - 1
          })).filter(p => p.life > 0)
        );
      }, 60);

      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Party Banner */}
        <div className="absolute top-0 left-0 right-0 h-16 flex items-start justify-center">
          <div className="flex space-x-1 mt-4">
            {[...Array(window.innerWidth < 768 ? 8 : 12)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-6 md:w-6 md:h-8 transform rotate-180"
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  backgroundColor: ['#EC4899', '#F472B6', '#E879F9', '#C084FC'][i % 4],
                  animation: `pulse 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Left Balloons */}
        <div className="absolute left-2 md:left-8 top-20">
          <div className="relative">
            {/* Balloon 1 */}
            <div className="absolute animate-float" style={{ animationDelay: '0s' }}>
              <div className="w-10 h-12 md:w-16 md:h-20 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full shadow-lg relative">
                <div className="absolute top-1 left-2 md:top-2 md:left-3 w-2 h-3 md:w-4 md:h-6 bg-pink-200 rounded-full opacity-60" />
              </div>
              <div className="w-0.5 h-10 md:h-16 bg-gray-300 mx-auto animate-sway" />
            </div>
            
            {/* Balloon 2 */}
            <div className="absolute left-8 md:left-12 top-6 md:top-8 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-8 h-10 md:w-14 md:h-18 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full shadow-lg relative">
                <div className="absolute top-1 left-1 md:top-2 md:left-2 w-2 h-3 md:w-3 md:h-5 bg-rose-200 rounded-full opacity-60" />
              </div>
              <div className="w-0.5 h-8 md:h-14 bg-gray-300 mx-auto animate-sway" />
            </div>
          </div>
        </div>

        {/* Right Balloons */}
        <div className="absolute right-2 md:right-8 top-16">
          <div className="relative">
            {/* Balloon 3 */}
            <div className="absolute animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="w-9 h-11 md:w-15 md:h-19 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full shadow-lg relative">
                <div className="absolute top-1 left-1 md:top-2 md:left-2 w-2 h-3 md:w-3 md:h-5 bg-purple-200 rounded-full opacity-60" />
              </div>
              <div className="w-0.5 h-9 md:h-15 bg-gray-300 mx-auto animate-sway" />
            </div>
            
            {/* Balloon 4 */}
            <div className="absolute right-6 md:right-10 top-8 md:top-12 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="w-8 h-10 md:w-13 md:h-17 bg-gradient-to-br from-indigo-300 to-indigo-400 rounded-full shadow-lg relative">
                <div className="absolute top-1 left-1 md:left-2 w-2 h-2 md:w-3 md:h-4 bg-indigo-200 rounded-full opacity-60" />
              </div>
              <div className="w-0.5 h-8 md:h-13 bg-gray-300 mx-auto animate-sway" />
            </div>
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-8 left-8 w-32 h-32 bg-pink-100/30 rounded-full blur-xl" />
        <div className="absolute top-32 right-16 w-24 h-24 bg-rose-100/40 rounded-full blur-lg" />
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-purple-100/20 rounded-full blur-2xl" />
        
        {/* Elegant Swan Decorations */}
        <div className="absolute top-20 left-1/4 transform -translate-x-1/2 opacity-20">
          <div className="text-4xl md:text-5xl animate-float">🦢</div>
        </div>
        <div className="absolute top-32 right-1/4 transform translate-x-1/2 opacity-25">
          <div className="text-3xl md:text-4xl animate-float" style={{ animationDelay: '1s' }}>🦢</div>
        </div>
        <div className="absolute bottom-40 left-1/3 transform -translate-x-1/2 opacity-15">
          <div className="text-2xl md:text-3xl animate-float" style={{ animationDelay: '2s' }}>🦢</div>
        </div>
        
        {/* Confetti Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              opacity: particle.life / 80
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        {step === 'cake' && (
          <div className="text-center max-w-2xl w-full px-4">
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 tracking-wide">
                Happy Birthday
              </h1>
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl md:text-3xl mr-2 animate-float">🦢</span>
                <span className="text-3xl md:text-4xl mx-1 animate-float" style={{ animationDelay: '0.5s' }}>⋆.˚🦢⋆</span>
                <span className="text-2xl md:text-3xl ml-2 animate-float" style={{ animationDelay: '1s' }}>🦢</span>
              </div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mb-8" />
              <p className="text-base md:text-lg text-gray-600 font-light">
                A graceful celebration awaits
              </p>
            </div>
            
            {/* Professional Cake Design */}
            <div className="mb-8 md:mb-12">
              <div className="relative mx-auto w-64 h-44 sm:w-72 sm:h-48 md:w-80 md:h-56">
                {/* Cake Base - Elegant Design */}
                <div className="absolute bottom-0 w-full h-28 md:h-36 bg-gradient-to-t from-pink-200 to-pink-100 rounded-2xl shadow-lg border border-pink-200/50">
                  <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 h-1.5 md:h-2 bg-white/60 rounded-full" />
                  <div className="absolute top-6 md:top-8 left-3 md:left-4 right-3 md:right-4 h-1.5 md:h-2 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 h-1.5 md:h-2 bg-pink-300/30 rounded-full" />
                </div>
                
                {/* Cake Top Layer */}
                <div className="absolute bottom-22 md:bottom-28 left-6 md:left-8 right-6 md:right-8 h-18 md:h-24 bg-gradient-to-t from-rose-200 to-rose-100 rounded-xl shadow-md border border-rose-200/50">
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 right-2 md:right-3 h-1 md:h-1.5 bg-white/50 rounded-full" />
                  <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 h-1 md:h-1.5 bg-rose-300/40 rounded-full" />
                </div>

                {/* Elegant Candles */}
                {!candlesBlown && (
                  <div className="absolute -top-6 md:-top-8 left-1/2 transform -translate-x-1/2 flex space-x-3 md:space-x-6">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex flex-col items-center cursor-pointer transform hover:scale-110 active:scale-95 transition-transform duration-300 touch-manipulation"
                        onClick={() => blowCandle(i)}
                      >
                        {/* Flame */}
                        {!blownCandles[i] ? (
                          <div className="w-1.5 h-2 md:w-2 md:h-3 bg-gradient-to-t from-orange-400 via-yellow-400 to-yellow-200 rounded-full animate-pulse mb-0.5 shadow-sm" 
                               style={{ 
                                 animation: 'flicker 1.5s ease-in-out infinite alternate',
                                 filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))'
                               }} />
                        ) : (
                          <div className="w-2 h-3 md:w-3 md:h-4 mb-0.5 flex items-center justify-center">
                            <div className="text-gray-400 text-xs md:text-sm animate-pulse">💨</div>
                          </div>
                        )}
                        {/* Candle */}
                        <div className="w-1 h-6 md:w-1.5 md:h-8 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm shadow-sm border border-yellow-300" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {!candlesBlown ? (
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 font-light mb-4 px-4">
                  Don't forget to make a wish and tap each candle to blow it out 😊
                </p>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Wind className="w-5 h-5" />
                  <span className="text-lg font-light">
                    {blownCandles.filter(blown => blown).length} / 5 candles blown
                  </span>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in space-y-4">
                <p className="text-2xl md:text-3xl text-gray-700 font-light">
                  ✨ Wish granted ✨
                </p>
                <p className="text-base md:text-lg text-gray-600 font-light animate-pulse">
                  Something magical is coming....................
                </p>
              </div>
            )}
          </div>
        )}

        {step === 'surprise' && (
          <div className="text-center animate-fade-in max-w-lg w-full px-4">
            <div className="mb-10">
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl md:text-5xl mr-3 animate-float">🦢</span>
                  <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-pink-400 mx-auto animate-pulse" />
                  <span className="text-4xl md:text-5xl ml-3 animate-float" style={{ animationDelay: '1s' }}>🦢</span>
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto">
                  <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-rose-300 animate-spin opacity-30" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-8 tracking-wide">
              Something Graceful & Special
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mb-10" />
            
            <button
              onClick={revealLetter}
             className="group bg-white hover:bg-gray-50 text-gray-800 font-medium py-4 px-8 md:py-5 md:px-12 rounded-full 
                      text-lg md:text-xl border-2 border-pink-200 hover:border-pink-300 transform hover:scale-105 active:scale-95
                      transition-all duration-500 ease-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-100
                      animate-smooth-bounce hover:animate-none touch-manipulation"
            >
              <span className="flex items-center space-x-3">
                <Gift className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-500 ease-out" />
                <span>Reveal Surprise</span>
              </span>
            </button>
          </div>
        )}

        {step === 'letter' && (
          <div className="text-center animate-fade-in max-w-4xl w-full px-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 lg:p-16 border border-pink-100">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="flex items-center space-x-3">
                    {/* <span className="text-3xl md:text-4xl animate-float">🦢</span> */}
                    <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />
                    {/* <span className="text-3xl md:text-4xl animate-float" style={{ animationDelay: '1s' }}>🦢</span> */}
                  </div>
                  <div className="absolute inset-0 w-12 h-12">
                    <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-300 animate-pulse opacity-50" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 mb-8 md:mb-10 tracking-wide">
                A Message for someone who is as Graceful as Swans
              </h3>
              
              <div className="space-y-6 md:space-y-8 text-gray-700 leading-relaxed max-w-3xl mx-auto text-left md:text-center">
                <p className="text-lg md:text-xl font-light text-gray-800">
                  Dear, 
                </p>
                
                <p className="text-base md:text-lg">
                  Someone said ki usko birthday nhi pasand, so i though why not make it special plus i can flaw 
                  my frontend skills (that's just an excuse👀) btw made this in under a day. Mereko pta ni tha
                  ki ek baar sath baithne se itni achi dosti ho jati h 😂😂 btw jokes apart Enjoy your day. I hope you would love it and that it makes your day as special as you are,
                  i mayyy be asking you out😂😂. Happy Birthday and  May your heart be light, your smile wide, and your dreams even brighter this year❤️❤️.
                  {/* Today marks another beautiful chapter in your journey. Your presence brings 
                  light to those around you, and your kindness creates ripples of joy that 
                  touch countless lives, as graceful as swans gliding across still waters. */}
                </p>
                
                <p className="text-base md:text-lg">
                  Like the elegant swan that moves with poise and beauty, may you continue to 
                  navigate life's waters with grace and confidence. Your dreams deserve to 
                  flourish, and your happiness deserves to shine as brilliantly as sunlight 
                  on a peaceful lake❤️❤️.
                </p>
                
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl md:rounded-2xl p-4 md:p-8 my-6 md:my-10">
                  <div className="flex justify-center mb-4">
                    <span className="text-3xl md:text-4xl animate-float">🦢</span>
                  </div>
                  <p className="text-base md:text-lg font-medium text-gray-800 mb-4 md:mb-6">
                    May this new year bring you the grace of swans and:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 text-left">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-pink-400 rounded-full" />
                      <span className="text-sm md:text-base text-gray-700">Endless possibilities</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-rose-400 rounded-full" />
                      <span className="text-sm md:text-base text-gray-700">Cherished memories</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-pink-400 rounded-full" />
                      <span className="text-sm md:text-base text-gray-700">Fulfilled aspirations</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-rose-400 rounded-full" />
                      <span className="text-sm md:text-base text-gray-700">Abundant joy</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl font-light text-gray-800 pt-4 md:pt-6">
                  Happy Birthday❤️❤️
                </p>
                
                <div className="flex justify-center mt-4">
                  <span className="text-2xl md:text-3xl animate-float">🦢</span>
                </div>
                
                <p className="text-base md:text-lg text-gray-600 italic">
                  With warmest wishes and the grace of swans
                </p>
              </div>
              
              <div className="mt-8 md:mt-12 flex justify-center">
                <button
                  onClick={() => {
                    // Create celebration particles
                    const newParticles: Particle[] = [];
                    for (let i = 0; i < 50; i++) {
                      newParticles.push({
                        id: Date.now() + i,
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight,
                        vx: (Math.random() - 0.5) * 10,
                        vy: -Math.random() * 15 - 5,
                        color: ['#E879F9', '#F472B6', '#EC4899', '#BE185D', '#FFD700', '#FF6B6B'][Math.floor(Math.random() * 6)],
                        life: 100
                      });
                    }
                    setParticles(newParticles);
                    setShowConfetti(true);
                    
                    // Transition to finale after celebration
                    setTimeout(() => {
                      setStep('finale');
                    }, 2000);
                  }}
                  className="group bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 
                           text-white font-medium py-3 px-8 md:py-4 md:px-10 rounded-full text-base md:text-lg transform hover:scale-105 active:scale-95
                           transition-all duration-500 ease-out shadow-lg hover:shadow-xl focus:outline-none 
                           focus:ring-4 focus:ring-pink-200 animate-smooth-bounce hover:animate-none touch-manipulation"
                >
                  <span className="flex items-center space-x-3">
                    <Gift className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-500 ease-out" />
                    <span>Accept This Gift</span>
                    <Heart className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-500 ease-out" />
                  </span>
                </button>
              </div>
              
              <div className="mt-6 md:mt-10 flex justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400" />
              </div>
            </div>
          </div>
        )}

        {step === 'finale' && (
          <div className="text-center animate-fade-in max-w-4xl w-full px-4">
            <div className="relative">
              {/* Large Happy Birthday Text */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 mb-4 md:mb-8 tracking-wider animate-pulse leading-tight">
                Happy
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 mb-8 md:mb-12 tracking-wider animate-pulse leading-tight" style={{ animationDelay: '0.5s' }}>
                Birthday!
              </h1>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 md:-top-8 left-1/4 transform -translate-x-1/2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl md:text-3xl animate-float">🦢</span>
                  <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-pink-400 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              <div className="absolute -top-2 md:-top-4 right-1/4 transform translate-x-1/2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-rose-400 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                  <span className="text-2xl md:text-3xl animate-float" style={{ animationDelay: '1s' }}>🦢</span>
                </div>
              </div>
              <div className="absolute top-1/2 -left-4 md:-left-8">
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-lg md:text-xl animate-float">🦢</span>
                  <Heart className="w-6 h-6 md:w-10 md:h-10 text-purple-400 animate-bounce" />
                </div>
              </div>
              <div className="absolute top-1/3 -right-4 md:-right-8">
                <div className="flex flex-col items-center space-y-2">
                  <Heart className="w-4 h-4 md:w-6 md:h-6 text-pink-400 animate-bounce" style={{ animationDelay: '1s' }} />
                  <span className="text-lg md:text-xl animate-float" style={{ animationDelay: '0.5s' }}>🦢</span>
                </div>
              </div>
            </div>
            
            {/* Celebration Message */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 border border-pink-100 mt-6 md:mt-8">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl md:text-4xl animate-float">🦢</span>
                  <span className="text-4xl md:text-5xl animate-float" style={{ animationDelay: '0.5s' }}>🦢</span>
                  <span className="text-3xl md:text-4xl animate-float" style={{ animationDelay: '1s' }}>🦢</span>
                </div>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-800 mb-4 md:mb-6 tracking-wide">
                🎉Just Raised the Bar! 🎉
              </p>
              <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
                Your special day has been celebrated with the grace of swans, joy, love, and magical moments. 
                May this birthday bring you endless happiness, wonderful memories, and the elegant beauty that swans represent!
              </p>
              
              {/* Restart Button */}
              <button
                onClick={() => {
                  setStep('cake');
                  setCandlesBlown(false);
                  setBlownCandles([false, false, false, false, false]);
                  setParticles([]);
                  setShowConfetti(false);
                }}
                className="mt-6 md:mt-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 
                         text-white font-medium py-3 px-6 md:px-8 rounded-full text-base md:text-lg transform hover:scale-105 active:scale-95
                         transition-all duration-300 ease-out shadow-lg hover:shadow-xl focus:outline-none 
                         focus:ring-4 focus:ring-pink-200 touch-manipulation"
              >
                Celebrate Again 🎂
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="flex space-x-6 opacity-30">
          <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-rose-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}

export default App;