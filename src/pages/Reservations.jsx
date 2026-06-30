import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Minus, 
  User, 
  Armchair 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/ui/SEO';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Reservations = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Date State
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDirection, setCalendarDirection] = useState(0);

  // Time & Guests State
  const [selectedTime, setSelectedTime] = useState(null);
  const [guestsAdults, setGuestsAdults] = useState(2);
  const [guestsChildren, setGuestsChildren] = useState(0);

  // Seating Preference State
  const [selectedSeat, setSelectedSeat] = useState(null); // 'indoor' | 'patio' | 'sports' | 'no-preference'

  // Finish State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);

  // Stepper accessibility validation
  const isStepAccessible = (targetStep) => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return selectedDate !== null;
    if (targetStep === 3) return selectedDate !== null && selectedTime !== null;
    if (targetStep === 4) return selectedDate !== null && selectedTime !== null && selectedSeat !== null;
    return false;
  };

  const nextStep = (targetStep) => {
    if (isStepAccessible(targetStep)) {
      setStep(targetStep);
      const element = document.getElementById('reservation-panel');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Please fill in your name and email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/booking-confirmed', {
        state: {
          fullName,
          email,
          date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
          time: selectedTime,
          guests: `${guestsAdults + guestsChildren} Persons (${guestsAdults} Adults${guestsChildren > 0 ? `, ${guestsChildren} Child` : ''})`,
          seat: selectedSeat
        }
      });
    }, 1800);
  };

  // Generate Calendar cells
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevTotalDays = new Date(currentYear, currentMonth, 0).getDate();
    
    const cells = [];
    
    // Prev month padding cells
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({
        day: prevTotalDays - i,
        isCurrentMonth: false,
        date: new Date(currentMonth === 0 ? currentYear - 1 : currentYear, currentMonth === 0 ? 11 : currentMonth - 1, prevTotalDays - i)
      });
    }

    // Current month cells
    for (let i = 1; i <= totalDays; i++) {
      cells.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(currentYear, currentMonth, i)
      });
    }

    // Next month padding cells
    const remainingCells = 42 - cells.length;
    for (let i = 1; i <= remainingCells; i++) {
      cells.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(currentMonth === 11 ? currentYear + 1 : currentYear, currentMonth === 11 ? 0 : currentMonth + 1, i)
      });
    }

    return cells;
  }, [currentMonth, currentYear]);

  // Calendar helpers
  const handlePrevMonth = () => {
    if (currentYear === today.getFullYear() && currentMonth === today.getMonth()) return;
    setCalendarDirection(-1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setCalendarDirection(1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const formatDateDisplay = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isSameDate = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  const isPastDate = (date) => {
    const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const cellReset = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return cellReset < todayReset;
  };

  // Stepper Header tabs render
  const renderStepHeader = (stepNum, label) => {
    const isActive = step === stepNum;
    const isCompleted = (stepNum === 1 && selectedDate !== null) ||
                        (stepNum === 2 && selectedTime !== null) ||
                        (stepNum === 3 && selectedSeat !== null);
    const isAccessible = isStepAccessible(stepNum);

    return (
      <button
        key={stepNum}
        type="button"
        disabled={!isAccessible}
        onClick={() => nextStep(stepNum)}
        className={`py-4 font-label-caps text-[10px] md:text-label-caps uppercase border-b-2 relative flex items-center justify-center gap-1.5 md:gap-2 outline-none transition-all ${
          isActive 
            ? 'border-secondary text-secondary font-bold' 
            : isCompleted 
            ? 'border-outline text-on-surface hover:text-secondary' 
            : 'border-transparent text-on-surface-variant/40 cursor-not-allowed'
        }`}
      >
        {isCompleted && !isActive && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-secondary shrink-0"
          >
            <Check size={14} strokeWidth={3} />
          </motion.span>
        )}
        <span>{stepNum}. {label}</span>
        {isActive && (
          <motion.div 
            layoutId="activeStepUnderline" 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    );
  };

  // Calendar sliding animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0
    })
  };

  // Seat preferences data
  const seatingOptions = [
    {
      id: 'indoor',
      title: "Indoor Dining",
      desc: "Walnut wood, copper glow, and the energy of the open kitchen.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJD9gDcXhEli65GlNNF-ZesSLSjtyfN89TtEklKVfyTLt5ofv878WKzhXJn8zwsGT1ouR2ph_MxbtfYDkV5qOUomXUSgYcD9zQfbQihZQkAiXGDrnzC-HVhurPicvbskZz-GqtzUj88LSzbe93yjrR1NUOpsJLK-2PyN09QcMsDLLV_IMNzcBDEZZXVbLseC2_Fg6X19dYTbVUNAUS1ONSsfvUsPeiFRry2-EWfuFortW6ue2eeef58kNQ0XIvY9mrJITM_HHjtKAr"
    },
    {
      id: 'patio',
      title: "Heated Patio",
      desc: "Al fresco dining with the pulse of the city and ambient heat.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnTQiT1SpzI4R1cecKkDh-PjIEZUiPjOms9oOHKaC9Log_eHQwmx7p1M_Jg83Q-aHm21XErU51D3rFn-C2LcHKPVu_sF9SSa6uf53voRHkLaBbNpnNjHKnABXPtqR5Xfs8l_oRsPPSNtuenzIl0mD46VakdSYsgJQG4Y__IucDSmXOZ2AnX7huaDwrkHR6VR2MYECob1aM5nqsedB5VD8yGNdJo1nWwgCtwZduPUoI7kpQYWiKFZJOK5f3o7kutzQ38SBSD_Rd0vQ_"
    },
    {
      id: 'sports',
      title: "Sports Viewing Area",
      desc: "120\" laser projectors, immersive audio, and game-day energy.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAM1mt4_UT4JHdIJYMVZBOsuiiod819QimR9L-M1xkQl_DXwPBblmdXyzd2Tpi6LNpNMl0h1l63c61gtxW66sTyooA-lwjgHd8bG31nXsvohZmh5BQqGbKY5p7IjYUwf8YxVkX1g2D5hp1xB7supv4RYe0cmnJlDikwze_J87CZh_j2ddPtDv5OVbe9_c8L9g9CGUZBxaRf38Wsy_XlP4w7_GdrkFTfegwbHlVXqhnT6mbykGDuT09QHkQ21NIT-OEjlcYmqfj0es3S"
    },
    {
      id: 'no-preference',
      title: "No Preference",
      desc: "We'll place you in the best available table upon arrival.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbrtMiHhiqjEbtU0exWOCmg6xWIgkdSuk-qSrSjJtANu0bQvWbgIqXlwaD0miOR_aaC6zJdH2fUFgf0O3bTyyC6yG-UBRc2JL2W_AdB2LYVuGVBCt4JhmNXH3fp68rLy5E_mzmArV0blSsohWWW0tkDjjDh0Qa6Gcd02z--isWAnTeUq6EhUMpdMMm9C-tTCuCnz4fa-6YLoYpC8OqgLtCySGV_nJICXIg-0exiyqFJt_82BAp-CLYBPcylCHXRrs6CW8HGMsCBs5t"
    }
  ];

  return (
    <>
      <SEO title="Book a Table" description="Reserve your table at ANJU HOUSE. Join us for a culinary fusion experience and live sports in our craft beer garden." />

      <main className="relative min-h-screen pt-32 pb-stack-xl flex items-center justify-center">
        {/* Cinema Background */}
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbrtMiHhiqjEbtU0exWOCmg6xWIgkdSuk-qSrSjJtANu0bQvWbgIqXlwaD0miOR_aaC6zJdH2fUFgf0O3bTyyC6yG-UBRc2JL2W_AdB2LYVuGVBCt4JhmNXH3fp68rLy5E_mzmArV0blSsohWWW0tkDjjDh0Qa6Gcd02z--isWAnTeUq6EhUMpdMMm9C-tTCuCnz4fa-6YLoYpC8OqgLtCySGV_nJICXIg-0exiyqFJt_82BAp-CLYBPcylCHXRrs6CW8HGMsCBs5t')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        </div>

        {/* Reservation Container */}
        <section className="relative z-10 w-full max-w-5xl px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-stack-md">
            <h1 className="font-display-lg text-4xl md:text-display-lg text-secondary mb-4">Secure Your Table</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Experience the intersection of refined Korean tradition and the electric spirit of Los Angeles.</p>
          </div>

          {/* Booking Stepper Panel */}
          <div id="reservation-panel" className="glass-panel rounded-xl overflow-hidden shadow-2xl">
            {/* Progress Header */}
            <div className="grid grid-cols-4 border-b border-outline-variant/10 text-center">
              {renderStepHeader(1, "Date")}
              {renderStepHeader(2, "Time & Guests")}
              {renderStepHeader(3, "Seats")}
              {renderStepHeader(4, "Finish")}
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Select Date */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col md:flex-row gap-12">
                      <div className="flex-1">
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Choose a date</h3>
                        
                        {/* Premium Redesigned Date Picker */}
                        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/20 shadow-2xl relative overflow-hidden">
                          {/* Calendar Header */}
                          <div className="flex justify-between items-center mb-6">
                            <button 
                              type="button" 
                              disabled={currentYear === today.getFullYear() && currentMonth === today.getMonth()}
                              onClick={handlePrevMonth}
                              className="text-secondary disabled:opacity-20 disabled:cursor-not-allowed hover:bg-secondary/10 p-2 rounded-full transition-all cursor-pointer outline-none"
                              aria-label="Previous Month"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <span className="font-headline-md text-xl md:text-2xl text-on-surface uppercase tracking-wider">
                              {MONTH_NAMES[currentMonth]} {currentYear}
                            </span>
                            <button 
                              type="button" 
                              onClick={handleNextMonth}
                              className="text-secondary hover:bg-secondary/10 p-2 rounded-full transition-all cursor-pointer outline-none"
                              aria-label="Next Month"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>

                          {/* Weekdays */}
                          <div className="grid grid-cols-7 text-center mb-4 border-b border-outline-variant/10 pb-2">
                            {WEEKDAY_HEADERS.map((h, i) => (
                              <div key={i} className="text-[10px] md:text-xs text-on-surface-variant font-semibold uppercase tracking-widest">{h}</div>
                            ))}
                          </div>

                          {/* Days Grid with Animation */}
                          <div className="overflow-hidden min-h-[220px]">
                            <AnimatePresence mode="wait" custom={calendarDirection}>
                              <motion.div
                                key={`${currentMonth}-${currentYear}`}
                                custom={calendarDirection}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="grid grid-cols-7 gap-y-3 gap-x-1 text-center"
                              >
                                {calendarCells.map((cell, idx) => {
                                  const isCurrent = cell.isCurrentMonth;
                                  const isPast = isPastDate(cell.date);
                                  const isTodayDate = isSameDate(cell.date, today);
                                  const isSelected = isSameDate(cell.date, selectedDate);
                                  const isDisabled = isPast || !isCurrent;

                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      disabled={isDisabled}
                                      onClick={() => setSelectedDate(cell.date)}
                                      className={`relative w-8 h-8 md:w-9 md:h-9 mx-auto rounded-full flex items-center justify-center transition-all text-xs md:text-sm font-body-md outline-none ${
                                        isDisabled
                                          ? 'text-on-surface-variant/20 cursor-not-allowed'
                                          : isSelected
                                          ? 'bg-secondary text-on-secondary font-bold shadow-lg shadow-secondary/20 cursor-pointer'
                                          : isTodayDate
                                          ? 'border border-secondary text-secondary font-bold hover:bg-secondary/10 cursor-pointer'
                                          : 'text-on-surface hover:bg-secondary/10 hover:text-secondary cursor-pointer'
                                      }`}
                                    >
                                      {cell.day}
                                      {isTodayDate && !isSelected && (
                                        <span className="absolute bottom-1 w-1 h-1 bg-secondary rounded-full"></span>
                                      )}
                                    </button>
                                  );
                                })}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Selected Confirmation Panel */}
                        {selectedDate && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 rounded-lg bg-secondary/5 border border-secondary/20 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <CalendarIcon className="text-secondary shrink-0" size={18} />
                              <div>
                                <p className="text-[10px] font-label-caps uppercase text-on-surface-variant tracking-wider">Confirmed Date</p>
                                <p className="text-sm font-semibold text-on-surface">{formatDateDisplay(selectedDate)}</p>
                              </div>
                            </div>
                            <span className="bg-secondary/20 text-secondary w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* Right Column Context */}
                      <div className="md:w-1/3 flex flex-col justify-center">
                        <div className="p-6 border-l-2 border-secondary/20">
                          <p className="font-body-md text-on-surface-variant italic mb-4">"Reservations for the Chef’s Table are released weekly every Monday at 10 AM PST."</p>
                          <div className="flex items-center gap-3 text-secondary">
                            <CalendarIcon size={18} />
                            <span className="text-[10px] md:text-label-caps uppercase font-semibold">Available Dates Shown</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="flex justify-end pt-8 border-t border-outline-variant/10">
                      <button 
                        type="button"
                        disabled={!selectedDate}
                        onClick={() => nextStep(2)}
                        className="group flex items-center gap-4 bg-secondary text-on-secondary px-10 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Next: Party Size &amp; Time
                        <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Time & Guests */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      
                      {/* Premium Guest Counter Grid */}
                      <div className="space-y-6">
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Select Guests</h3>
                        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/20 shadow-2xl space-y-6">
                          
                          {/* Adults */}
                          <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                            <div>
                              <h4 className="font-bold text-on-surface">Adults</h4>
                              <p className="text-xs text-on-surface-variant">Ages 12 or above</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                disabled={guestsAdults <= 1}
                                onClick={() => setGuestsAdults(prev => prev - 1)}
                                className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:border-secondary hover:text-secondary disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-headline-md text-xl w-6 text-center">{guestsAdults}</span>
                              <button
                                type="button"
                                disabled={guestsAdults + guestsChildren >= 12}
                                onClick={() => setGuestsAdults(prev => prev + 1)}
                                className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:border-secondary hover:text-secondary disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div className="flex justify-between items-center py-2">
                            <div>
                              <h4 className="font-bold text-on-surface">Children</h4>
                              <p className="text-xs text-on-surface-variant">Ages under 12</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                disabled={guestsChildren <= 0}
                                onClick={() => setGuestsChildren(prev => prev - 1)}
                                className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:border-secondary hover:text-secondary disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-headline-md text-xl w-6 text-center">{guestsChildren}</span>
                              <button
                                type="button"
                                disabled={guestsAdults + guestsChildren >= 12}
                                onClick={() => setGuestsChildren(prev => prev + 1)}
                                className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:border-secondary hover:text-secondary disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Total Indicator */}
                          <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center font-label-caps text-xs text-on-surface-variant">
                            <span>Total Guest Count:</span>
                            <span className="text-secondary font-bold text-sm">{guestsAdults + guestsChildren} Persons</span>
                          </div>

                          {/* Large Party Warning */}
                          {guestsAdults + guestsChildren >= 10 && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-4 bg-tertiary/10 border border-tertiary/20 rounded-lg flex gap-3 text-tertiary"
                            >
                              <Info size={16} className="shrink-0 mt-0.5" />
                              <p className="text-xs leading-normal">
                                For parties larger than 10, please contact our hospitality team at (213) 555-ANJU to plan your custom event.
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Time Slots Selection */}
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Preferred time</h3>
                        <div className="space-y-6">
                          <div>
                            <p className="text-label-caps uppercase text-on-surface-variant mb-3 text-xs tracking-widest">Dinner Service</p>
                            <div className="grid grid-cols-3 gap-3">
                              {['5:30 PM', '6:00 PM', '6:30 PM', '7:15 PM', '8:00 PM', '8:45 PM'].map((time) => {
                                const isUnavailable = time === '6:00 PM' || time === '8:00 PM';
                                const isSelected = selectedTime === time;
                                return (
                                  <button
                                    key={time}
                                    type="button"
                                    disabled={isUnavailable}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-3 border rounded-lg transition-all text-sm cursor-pointer text-center relative overflow-hidden outline-none ${
                                      isSelected
                                        ? 'border-secondary bg-secondary/5 text-secondary font-bold shadow-lg shadow-secondary/5'
                                        : isUnavailable
                                        ? 'border-outline-variant/10 text-on-surface-variant/30 cursor-not-allowed bg-surface-container-low/30'
                                        : 'border-outline-variant/30 text-on-surface hover:border-secondary hover:text-secondary'
                                    }`}
                                  >
                                    <span className={isUnavailable ? 'line-through opacity-40' : ''}>{time}</span>
                                    {isUnavailable && (
                                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-[120%] h-[1px] bg-outline-variant/30 rotate-12"></div>
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <p className="text-label-caps uppercase text-on-surface-variant mb-3 text-xs tracking-widest">Late Night</p>
                            <div className="grid grid-cols-3 gap-3">
                              {['10:00 PM', '10:30 PM'].map((time) => {
                                const isUnavailable = time === '10:30 PM';
                                const isSelected = selectedTime === time;
                                return (
                                  <button
                                    key={time}
                                    type="button"
                                    disabled={isUnavailable}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-3 border rounded-lg transition-all text-sm cursor-pointer text-center relative overflow-hidden outline-none ${
                                      isSelected
                                        ? 'border-secondary bg-secondary/5 text-secondary font-bold shadow-lg shadow-secondary/5'
                                        : isUnavailable
                                        ? 'border-outline-variant/10 text-on-surface-variant/30 cursor-not-allowed bg-surface-container-low/30'
                                        : 'border-outline-variant/30 text-on-surface hover:border-secondary hover:text-secondary'
                                    }`}
                                  >
                                    <span className={isUnavailable ? 'line-through opacity-40' : ''}>{time}</span>
                                    {isUnavailable && (
                                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-[120%] h-[1px] bg-outline-variant/30 rotate-12"></div>
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="flex justify-between pt-8 border-t border-outline-variant/10">
                      <button 
                        type="button"
                        onClick={() => nextStep(1)}
                        className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer outline-none"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button 
                        type="button"
                        disabled={!selectedTime}
                        onClick={() => nextStep(3)}
                        className="group flex items-center gap-4 bg-secondary text-on-secondary px-10 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Next: Atmosphere
                        <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Atmosphere Preference */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-6 text-center">Where would you like to sit?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {seatingOptions.map((opt) => {
                        const isSelected = selectedSeat === opt.id;
                        return (
                          <motion.div 
                            key={opt.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedSeat(opt.id)}
                            className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                              isSelected ? 'border-secondary shadow-xl shadow-secondary/10' : 'border-outline-variant/20 hover:border-secondary/55'
                            }`}
                          >
                            <div 
                              className="aspect-[16/10] md:aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                              style={{ backgroundImage: `url('${opt.image}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                              <div className="flex justify-between items-end">
                                <div className="max-w-[80%]">
                                  <h4 className="font-headline-md text-xl md:text-2xl text-white mb-1">{opt.title}</h4>
                                  <p className="text-white/70 text-xs md:text-sm">{opt.desc}</p>
                                </div>
                                {isSelected ? (
                                  <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="bg-secondary text-on-secondary w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                                  >
                                    <Check size={16} strokeWidth={3} />
                                  </motion.div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full border border-white/30 group-hover:border-secondary flex items-center justify-center transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-secondary/50 transition-colors"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Footer Nav */}
                    <div className="flex justify-between pt-8 border-t border-outline-variant/10">
                      <button 
                        type="button"
                        onClick={() => nextStep(2)}
                        className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer outline-none"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button 
                        type="button"
                        disabled={!selectedSeat}
                        onClick={() => nextStep(4)}
                        className="group flex items-center gap-4 bg-secondary text-on-secondary px-10 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Next: Final Details
                        <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Special Requests / Final */}
                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="max-w-2xl mx-auto space-y-8">
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-4 text-center">Almost there...</h3>
                      
                      {/* Premium Summary Receipt Card */}
                      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50"></div>
                        <h4 className="font-headline-md text-lg text-secondary mb-4 pb-2 border-b border-outline-variant/10 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={16} /> Reservation Details
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-body-md">
                          <div className="space-y-1">
                            <span className="text-on-surface-variant/60 font-label-caps text-[10px] uppercase block tracking-wider">Date</span>
                            <span className="text-on-surface font-semibold block leading-tight">{selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-on-surface-variant/60 font-label-caps text-[10px] uppercase block tracking-wider">Time</span>
                            <span className="text-on-surface font-semibold block">{selectedTime}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-on-surface-variant/60 font-label-caps text-[10px] uppercase block tracking-wider">Party Size</span>
                            <span className="text-on-surface font-semibold block leading-tight">
                              {guestsAdults + guestsChildren} guests
                              <span className="text-[10px] text-on-surface-variant block">({guestsAdults} A, {guestsChildren} C)</span>
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-on-surface-variant/60 font-label-caps text-[10px] uppercase block tracking-wider">Seating</span>
                            <span className="text-on-surface font-semibold capitalize block">{selectedSeat ? selectedSeat.replace('-', ' ') : ''}</span>
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="space-y-4">
                        <label className="block text-label-caps uppercase text-on-surface-variant tracking-wider text-xs">Special Requests</label>
                        <textarea 
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-4 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all resize-none placeholder:text-on-surface-variant/40" 
                          placeholder="Allergies, birthdays, or special celebrations..." 
                          rows="4"
                        ></textarea>
                      </div>
                      
                      {/* Name and Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-label-caps uppercase text-on-surface-variant tracking-wider text-xs">Full Name</label>
                          <input 
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all placeholder:text-on-surface-variant/40" 
                            placeholder="John Doe" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-label-caps uppercase text-on-surface-variant tracking-wider text-xs">Email Address</label>
                          <input 
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all placeholder:text-on-surface-variant/40" 
                            placeholder="john@example.com" 
                          />
                        </div>
                      </div>
                      
                      {/* Cancellation policy */}
                      <div className="p-6 bg-secondary/5 border border-secondary/20 rounded-lg">
                        <div className="flex gap-4">
                          <Info className="text-secondary shrink-0 mt-0.5" size={20} />
                          <p className="text-body-md text-on-surface-variant leading-snug text-sm">
                            By completing this booking, you agree to our 24-hour cancellation policy. A $25 per person fee applies for no-shows or late cancellations.
                          </p>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex justify-between pt-8 border-t border-outline-variant/10">
                        <button 
                          type="button"
                          disabled={loading}
                          onClick={() => nextStep(3)}
                          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer outline-none disabled:opacity-20"
                        >
                          <ArrowLeft size={16} /> Back
                        </button>
                        <button 
                          type="submit"
                          disabled={loading || !fullName || !email}
                          className="group flex items-center gap-4 bg-secondary text-on-secondary px-12 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          {loading ? 'Confirming...' : 'Confirm Reservation'}
                          {!loading && <CheckCircle2 className="transition-transform group-hover:scale-110 text-on-secondary" size={18} />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Additional Context Icons */}
          <div className="mt-stack-md grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="text-center p-6 border-r border-outline-variant/10 flex flex-col items-center">
              <span className="material-symbols-outlined text-secondary mb-4" style={{ fontSize: '32px' }}>local_parking</span>
              <h5 className="text-label-caps uppercase font-bold mb-2">Valet Parking</h5>
              <p className="text-sm text-on-surface-variant">Complimentary valet service available daily after 5:00 PM.</p>
            </div>
            <div className="text-center p-6 border-r border-outline-variant/10 flex flex-col items-center">
              <span className="material-symbols-outlined text-secondary mb-4" style={{ fontSize: '32px' }}>groups</span>
              <h5 className="text-label-caps uppercase font-bold mb-2">Large Parties</h5>
              <p className="text-sm text-on-surface-variant">For groups of 10 or more, please contact our events team.</p>
            </div>
            <div className="text-center p-6 flex flex-col items-center">
              <span className="material-symbols-outlined text-secondary mb-4" style={{ fontSize: '32px' }}>schedule</span>
              <h5 className="text-label-caps uppercase font-bold mb-2">Kitchen Hours</h5>
              <p className="text-sm text-on-surface-variant">Sun-Thu: 5pm-10pm<br />Fri-Sat: 5pm-12am</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Reservations;
