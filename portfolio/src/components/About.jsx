import React from 'react';
import TypewriterTwoLines from './TypewriterTwoLines';
import Typography from './Typography';
import WaveformTimeline from './WaveformTimeline';
import FlipFlopAnimation from "./FlipFlopAnimation.jsx";
import TechStack from './TechStack';
import SkillsShowcase from './SkillsShowcase';

const About = () => {
  const timelineEvents = [
    {
      year: '2020',
      title: 'COMPTABILITÉ',
      description: 'Spécialisation en gestion des paies'
    },
    {
      year: '2022',
      title: 'RECONVERSION',
      description: 'Décision de se tourner vers le dev'
    },
    {
      year: '2024',
      title: 'CERTIFICATION',
      description: 'Développeur Web et Web Mobile'
    },
    {
      year: '2024',
      title: 'EPITECH',
      description: 'Poursuite d\'études en informatique'
    },
    {
      year: 'NOW',
      title: 'PRESENT',
      description: 'En route vers l\'expertise'
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:py-20 sm:px-8 lg:py-24 lg:px-44" id='about'>
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
          <header>
            <Typography variant='h1' className="text-2xl sm:text-4xl lg:text-5xl font-orbitron font-bold text-transparent bg-neon-gradient bg-clip-text text-center mb-6 sm:mb-8 lg:mb-12 animate-pulse-neon">
              <TypewriterTwoLines fullText="ABOUT_ME.SYS" />
            </Typography>
          </header>
          
          {/* Waveform Timeline */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <Typography className="dark:text-neon-cyan text-neon-violet font-rajdhani text-center mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg z-10 relative">
              &gt;&gt; CAREER_TIMELINE.WAV
            </Typography>
            <WaveformTimeline events={timelineEvents} className="mb-24" />
          </div>
          
          <div className="bg-club-gray border border-neon-violet/20 p-4 sm:p-6 lg:p-8 rounded-lg backdrop-blur-sm">
            <Typography className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-rajdhani">
              Depuis toujours, l'informatique est bien plus qu'un simple outil pour moi : c'est une véritable
              passion ! Fasciné par les possibilités infinies du numérique, j'ai d'abord pris un chemin
                différent en me lançant dans la comptabilité, avec une spécialisation en <strong>gestion des paies.</strong>
            </Typography>
            <Typography className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-rajdhani">
              Mais l'envie de coder, de créer et de donner vie à mes idées ne m'a jamais quitté.
            </Typography>
            <Typography className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-rajdhani">
                En 2024, j'ai donc sauté le pas et obtenu mon titre de <strong>Développeur Web et Web Mobile.</strong>
              Aujourd'hui, je poursuis mon aventure à Epitech, déterminé à repousser mes limites et à
               explorer toujours plus loin le monde du développement web.<br/>
               <br/>
                Ces différentes expériences m'ont permis de comprendre les <strong>enjeux business réels</strong>, que la rigueur et la
                méthodologie sont essentielles pour réussir dans ce domaine. J'ai aussi une capacité à traduire des
                <strong> exigences métier en solutions techniques efficaces</strong>.<br/>
                <br/>
                C'est pourquoi, je suis convaincu qu'Epitech est l'école idéale pour moi. Je vais pouvoir me <strong>spécialiser </strong>
                dans les technologies qui me passionnent, tout en continuant à développer mes compétences en informatique.
            </Typography>
          </div>
        </div>

        <div className="flex justify-center">
          <FlipFlopAnimation >
            <img
                src="/images/star.png"
                alt="Michel Banckaert - Photo de profil du développeur web full-stack"
                className="w-72 h-72 relative z-10 my-24 sm:mt-16 lg:mt-60 bg-club-gray rounded-full shadow-xl"
            />
          </FlipFlopAnimation>
        </div>

        <div>
            <Typography variant='h2' className="lg:text-4xl text-3xl font-orbitron text-neon-cyan mt-52 mb-8 text-center animate-pulse">
              &gt;&gt; EPITECH.EXE
            </Typography>
          <div className="bg-club-gray border border-neon-cyan/20 p-8 rounded-lg backdrop-blur-sm">
            <Typography className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-rajdhani">
              Epitech est une école d'informatique qui propose une pédagogie par projet, basée sur
              l'apprentissage par la pratique. Ici, on apprend en faisant, en se trompant, en recommençant.
              C'est un environnement stimulant, qui pousse à sortir de sa zone de confort et à repousser
              ses limites.
            </Typography>
            <Typography className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-rajdhani">
              L'objectif ? Devenir un professionnel de l'informatique, capable de s'adapter
              à tous les environnements et de relever tous les défis.
            </Typography>
            <Typography className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-rajdhani">
              Le MSc Pro, c'est la suite logique : un Bac +5 qui mène au titre d'Architecte des Systèmes
              d'Information, exclusivement en alternance.
            </Typography>
          </div>
        </div>

        <div>
          <TechStack />
        </div>

        <div>
          <SkillsShowcase />
        </div>
    </div>
  );
};

export default About;