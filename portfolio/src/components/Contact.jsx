import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Toast from './Toast';
import ErrorToast from './ErrorToast';
import AudioVisualizer from './AudioVisualizer';
import Typography from './core/Typography';

const Contact = () => {
  const form = useRef();
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [showInstruction, setShowInstruction] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const holdTimer = useRef(null);
  const progressTimer = useRef(null);

  const HOLD_DURATION = 2000; // 2 secondes
  const MIN_SUBMIT_INTERVAL = 30000; // 30 secondes entre les soumissions
  const MAX_NAME_LENGTH = 100;
  const MAX_SUBJECT_LENGTH = 200;
  const MAX_MESSAGE_LENGTH = 2000;

  // Fonctions de validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input) => {
    return input
      .trim()
      .replace(/<[^>]*>/g, '') // Supprime les balises HTML
      .replace(/[<>"'&]/g, (match) => {
        const entityMap = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entityMap[match];
      });
  };

  const validateForm = () => {
    const errors = {};
    const sanitizedData = {
      user_name: sanitizeInput(formData.user_name),
      user_email: sanitizeInput(formData.user_email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    // Validation du nom
    if (!sanitizedData.user_name) {
      errors.user_name = 'Le nom est requis';
    } else if (sanitizedData.user_name.length > MAX_NAME_LENGTH) {
      errors.user_name = `Le nom ne peut pas dépasser ${MAX_NAME_LENGTH} caractères`;
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(sanitizedData.user_name)) {
      errors.user_name = 'Le nom contient des caractères non autorisés';
    }

    // Validation de l'email
    if (!sanitizedData.user_email) {
      errors.user_email = 'L\'email est requis';
    } else if (!validateEmail(sanitizedData.user_email)) {
      errors.user_email = 'Format d\'email invalide';
    }

    // Validation du sujet (optionnel mais limité)
    if (sanitizedData.subject && sanitizedData.subject.length > MAX_SUBJECT_LENGTH) {
      errors.subject = `Le sujet ne peut pas dépasser ${MAX_SUBJECT_LENGTH} caractères`;
    }

    // Validation du message
    if (!sanitizedData.message) {
      errors.message = 'Le message est requis';
    } else if (sanitizedData.message.length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    } else if (sanitizedData.message.length > MAX_MESSAGE_LENGTH) {
      errors.message = `Le message ne peut pas dépasser ${MAX_MESSAGE_LENGTH} caractères`;
    }

    // Détection de spam basique
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'click here', 'free money'];
    const messageText = sanitizedData.message.toLowerCase();
    if (spamKeywords.some(keyword => messageText.includes(keyword))) {
      errors.message = 'Message détecté comme potentiellement indésirable';
    }

    return { errors, sanitizedData };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur si l'utilisateur commence à corriger
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    
    // Vérification du rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
      const remainingTime = Math.ceil((MIN_SUBMIT_INTERVAL - (now - lastSubmitTime)) / 1000);
      setFormErrors({ submit: `Veuillez attendre ${remainingTime} secondes avant de renvoyer un message` });
      return;
    }

    // Validation du formulaire avant de commencer l'appui long
    const { errors } = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (isSubmitting) return;
    
    setIsHolding(true);
    setShowInstruction(true);
    setFormErrors({});
    
    // Animation du progrès
    const startTime = Date.now();
    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setHoldProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressTimer.current);
      }
    }, 16); // 60fps
    
    // Timer pour l'envoi
    holdTimer.current = setTimeout(() => {
      sendEmail();
      resetHoldState();
    }, HOLD_DURATION);
  };

  const handleMouseUp = () => {
    resetHoldState();
  };

  const handleMouseLeave = () => {
    resetHoldState();
  };

  const resetHoldState = () => {
    setIsHolding(false);
    setHoldProgress(0);
    setShowInstruction(false);
    
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  };

  // Cleanup sur unmount
  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  const sendEmail = () => {
    const { errors, sanitizedData } = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(Date.now());
    
    // Mettre à jour le formulaire avec les données sanitisées
    Object.keys(sanitizedData).forEach(key => {
      const element = form.current?.elements[key];
      if (element) {
        element.value = sanitizedData[key];
      }
    });

    const formElement = form.current;
    if (!formElement) {
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formElement,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log('SUCCESS!');
          setShowSuccessToast(true);
          // Réinitialiser le formulaire
          setFormData({
            user_name: '',
            user_email: '',
            subject: '',
            message: ''
          });
          formElement.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          setShowErrorToast(true);
          setFormErrors({ submit: 'Erreur lors de l\'envoi. Veuillez réessayer.' });
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

    return (
    <div className="min-h-screen py-16 px-4 sm:py-20 lg:py-24" id='contact'>
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
          {showSuccessToast && (
            <Toast 
              message="MESSAGE SENT SUCCESSFULLY !" 
              typeAlert="success" 
              onClose={() => setShowSuccessToast(false)} 
            />
          )}
          {showErrorToast && (
            <Toast 
              message="TRANSMISSION ERROR - PLEASE RETRY" 
              typeAlert="error" 
              onClose={() => setShowErrorToast(false)} 
            />
          )}

          {/* DJ Console Header */}
          <div>
            <div className="bg-club-gray border border-neon-violet/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
                <div>
                  <Typography variant='h1' className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold text-transparent bg-neon-gradient bg-clip-text mb-2 animate-pulse-neon">
                    CONTACT.SYS
                  </Typography>
                  <Typography className="text-sm sm:text-base lg:text-lg font-rajdhani text-neon-violet">
                    &gt;&gt; COMMUNICATION_MODULE.EXE
                  </Typography>
                </div>
                
                {/* Console status */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-neon-green font-rajdhani text-sm">STATUS: ONLINE</div>
                    <div className="text-white font-orbitron text-sm">READY TO RECEIVE</div>
                  </div>
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Console */}
          <div className="bg-club-gray/80 border border-neon-cyan/30 rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              
              {/* Left Panel - Channel Info */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <Typography className="text-lg sm:text-xl lg:text-2xl font-orbitron font-bold text-neon-cyan mb-3 sm:mb-4">
                    &gt;&gt; CHANNEL_INFO.DAT
                  </Typography>
                  <Typography className="text-gray-300 font-rajdhani mb-6 sm:mb-8 text-sm sm:text-base">
                      <span>
                        Prêt à établir une connexion sécurisée ? Envoyez votre transmission via le formulaire
                      </span>
                      <span className="max-md:block hidden"> ci-dessous.  </span>
                      <span className="max-md:hidden"> ci-contre. </span>
                  </Typography>
                </div>

                {/* Audio Meters */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-synth-darker border border-neon-violet/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Typography className="text-neon-violet font-rajdhani text-sm font-bold">
                        EMAIL CHANNEL
                      </Typography>
                      <div className="text-neon-green font-orbitron text-xs">ACTIVE</div>
                    </div>
                    <AudioVisualizer barCount={20} height={30} interactive={false} />
                    <a 
                      href="mailto:michel.banckaert@epitech.eu" 
                      className="flex items-center text-neon-cyan hover:text-neon-violet transition-colors mt-3 group"
                    >
                      <div className="bg-neon-cyan/20 h-8 w-8 rounded border border-neon-cyan/50 flex items-center justify-center mr-3 group-hover:bg-neon-violet/20 group-hover:border-neon-violet/50 transition-all">
                        <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
                      </div>
                      <div className="font-rajdhani">
                        <div className="text-xs opacity-70">DIRECT_LINK</div>
                        <div className="font-bold">michel.banckaert@epitech.eu</div>
                      </div>
                    </a>
                  </div>

                  <div className="bg-synth-darker border border-neon-violet/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Typography className="text-neon-violet font-rajdhani text-sm font-bold">
                        SOCIAL CHANNELS
                      </Typography>
                      <div className="text-neon-green font-orbitron text-xs">LINKED</div>
                    </div>
                    <div className="space-y-3">
                      <a 
                        href="https://www.linkedin.com/in/michel-banckaert-54-devweb/" 
                        target="_blank"
                        className="flex items-center text-neon-cyan hover:text-neon-violet transition-colors group"
                      >
                        <div className="bg-neon-cyan/20 h-6 w-6 rounded border border-neon-cyan/50 flex items-center justify-center mr-3 group-hover:bg-neon-violet/20 group-hover:border-neon-violet/50 transition-all">
                          <div className="w-1 h-1 bg-current rounded-full" />
                        </div>
                        <div className="font-rajdhani text-sm">
                          <span className="opacity-70">LINKEDIN:</span> <span className="font-bold">Michel Banckaert</span>
                        </div>
                      </a>

                      <a 
                        href="https://github.com/MichelBKT" 
                        target="_blank"
                        className="flex items-center text-neon-cyan hover:text-neon-violet transition-colors group"
                      >
                        <div className="bg-neon-cyan/20 h-6 w-6 rounded border border-neon-cyan/50 flex items-center justify-center mr-3 group-hover:bg-neon-violet/20 group-hover:border-neon-violet/50 transition-all">
                          <div className="w-1 h-1 bg-current rounded-full" />
                        </div>
                        <div className="font-rajdhani text-sm">
                          <span className="opacity-70">GITHUB:</span> <span className="font-bold">MichelBKT</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Mixer Form */}
              <div>
                <Typography className="text-lg sm:text-xl lg:text-2xl font-orbitron font-bold text-neon-violet mb-4 sm:mb-6">
                  &gt;&gt; MIXER_CONSOLE.DAT
                </Typography>
                
                <form id="contact-form" className="space-y-4" ref={form} onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    {/* Channel 1 - Name */}
                    <div className="bg-synth-darker border border-neon-cyan/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-neon-cyan font-rajdhani text-xs font-bold">CH1 - USER_NAME</label>
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Enter your identifier..."
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleInputChange}
                        maxLength={MAX_NAME_LENGTH}
                        className={`w-full bg-transparent text-white font-rajdhani placeholder-gray-500 focus:outline-none transition-colors ${
                          formErrors.user_name ? 'text-red-400 focus:text-red-400' : 'focus:text-neon-cyan'
                        }`}
                        required
                      />
                      {formErrors.user_name && (
                        <div className="text-red-400 text-xs font-rajdhani mt-1">
                          {formErrors.user_name}
                        </div>
                      )}
                    </div>

                    {/* Channel 2 - Email */}
                    <div className="bg-synth-darker border border-neon-violet/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-neon-violet font-rajdhani text-xs font-bold">CH2 - EMAIL_ADDR</label>
                        <div className="w-2 h-2 bg-neon-violet rounded-full animate-pulse" />
                      </div>
                      <input 
                        type="email" 
                        placeholder="your.signal@domain.ext"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent text-white font-rajdhani placeholder-gray-500 focus:outline-none transition-colors ${
                          formErrors.user_email ? 'text-red-400 focus:text-red-400' : 'focus:text-neon-violet'
                        }`}
                        required
                      />
                      {formErrors.user_email && (
                        <div className="text-red-400 text-xs font-rajdhani mt-1">
                          {formErrors.user_email}
                        </div>
                      )}
                    </div>

                    {/* Channel 3 - Subject */}
                    <div className="bg-synth-darker border border-neon-violet/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-neon-violet font-rajdhani text-xs font-bold">CH3 - SUBJECT_LINE</label>
                        <div className="w-2 h-2 bg-neon-violet rounded-full" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Message topic..."
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        maxLength={MAX_SUBJECT_LENGTH}
                        className={`w-full bg-transparent text-white font-rajdhani placeholder-gray-500 focus:outline-none transition-colors ${
                          formErrors.subject ? 'text-red-400 focus:text-red-400' : 'focus:text-neon-violet'
                        }`}
                      />
                      {formErrors.subject && (
                        <div className="text-red-400 text-xs font-rajdhani mt-1">
                          {formErrors.subject}
                        </div>
                      )}
                    </div>

                    {/* Main Channel - Message */}
                    <div className="bg-synth-darker border border-neon-green/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-neon-green font-rajdhani text-xs font-bold">MAIN - MESSAGE_DATA</label>
                        <AudioVisualizer barCount={8} height={15} interactive={false} />
                      </div>
                      <textarea 
                        placeholder="Transmit your message here..."
                        rows="6" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        maxLength={MAX_MESSAGE_LENGTH}
                        className={`w-full bg-transparent text-white font-rajdhani placeholder-gray-500 focus:outline-none transition-colors resize-none ${
                          formErrors.message ? 'text-red-400 focus:text-red-400' : 'focus:text-neon-green'
                        }`}
                        required
                      />
                      <div className="flex justify-between items-center mt-1">
                        {formErrors.message && (
                          <div className="text-red-400 text-xs font-rajdhani">
                            {formErrors.message}
                          </div>
                        )}
                        <div className={`text-xs font-rajdhani ml-auto ${
                          formData.message.length > MAX_MESSAGE_LENGTH * 0.9 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {formData.message.length}/{MAX_MESSAGE_LENGTH}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Error */}
                  {formErrors.submit && (
                    <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-3 mb-4">
                      <div className="text-red-400 text-xs font-rajdhani text-center">
                        {formErrors.submit}
                      </div>
                    </div>
                  )}

                  {/* Send Button */}
                  <div className="relative">
                    <button 
                      type="button"
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                      onTouchStart={handleMouseDown}
                      onTouchEnd={handleMouseUp}
                      className={`relative overflow-hidden w-full bg-gradient-to-r from-neon-cyan via-neon-violet to-purple-600 text-black font-orbitron font-bold py-3 px-4 sm:py-4 sm:px-6 text-sm sm:text-base rounded-lg transition-all duration-300 border border-neon-cyan/50 ${
                        isHolding ? 'shadow-[0_0_30px_rgba(0,255,255,0.8)] scale-105' : 'hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                      }`}
                    >
                      {/* Progress bar */}
                      <div 
                        className="absolute inset-0 bg-white/20 transition-all duration-75 ease-out"
                        style={{ width: `${holdProgress}%` }}
                      />
                      
                      <span className="relative z-10">
                        {isHolding ? 'TRANSMITTING...' : '>> TRANSMIT_MESSAGE.EXE'}
                      </span>
                    </button>
                    
                    {/* Instruction message */}
                    {showInstruction && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-synth-darker border border-neon-cyan/50 rounded-lg px-3 py-2 animate-pulse">
                        <Typography className="text-neon-cyan font-rajdhani text-xs text-center whitespace-nowrap">
                          MAINTENIR POUR ENVOYER
                        </Typography>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neon-cyan/50"></div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Contact;