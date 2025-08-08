export const projects = [
  {
      id: 'year-end',
      title: 'RPG HD2D',
      subtitle: 'en cours',
      description: 'Ce projet est une démo technique d\'un RPG en 2.5D avec une vue isométrique et un style HD2D, se déroulant dans un monde ouvert.',
      image: '/images/unrealengine.jpg',
      technologies: ['Unreal', 'C++', 'Python'],
      category: 'jeux video',
      features: [
      'Moteur de jeu Unreal Engine',
      'Graphismes HD2D',
      'Système de combat en tour par tour',
      'Intelligence artificielle des ennemis locale',
      'Système de quêtes',
      ],
      github: null,
      demo: null
  },
  {
    id: 'cybersec',
    title: 'Cybersecurity',
    subtitle: 'AVRIL - JUIN 25 | TRYHACKME.COM',
    description: 'Ce projet est une série de défis de cybersécurité sur la plateforme TryHackMe.',
    image: '/images/tryhackme.png',
    technologies: ['divers outils de cybersec', 'Linux', 'Python'],
    category: 'cybersécurité',
    features: [
      'Connaitre les bases de la cybersécurité',
      'Utilisation de divers outils de cyber sécurité',
      'Exploitation de vulnérabilités',
      'Analyse de réseaux et de systèmes',
      'Cryptographie',
      'Ingénierie sociale',
    ],
    github: null,
    demo: null
  },
  {
    id: 'agilix',
    title: 'Agilix',
    subtitle: 'FEV - AVRIL 25 | WEB - REACT',
    description: 'Agilix est une application web de gestion de projets et de tâches, conçue pour faciliter la collaboration entre les équipes.',
    image: '/images/agilix.png',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    category: 'web',
    features: [
      'Gestion des projets et des tâches',
      'Tableaux Kanban',
      'Notifications en temps réel',
      "Assignation des tâches"
    ],
    github: 'https://github.com/MichelBKT/trelltech',
    demo: '/videos/demoAgilix.mp4'
  },
  {
    id: 'popeye',
    title: 'Popeye',
    subtitle: 'JANV - FEV 25 | DEVOPS - DOCKER',
    description: 'Ce projet utilise Docker et Docker Compose pour orchestrer une application composée de plusieurs services',
    image: '/images/popeye.jpg',
    technologies: ['Docker', 'Docker Compose', 'Nginx', 'PostgreSQL', 'Redis'],
    category: 'devops',
    features: [
      'Configuration multi-conteneurs',
      'Load balancing avec Nginx',
      'Persistance des données',
      'Mise en place de Redis pour le cache',
      'Documentation détaillée'
    ],
    github: 'https://github.com/MichelBKT/popeye',
    demo: '/videos/DemoPopeye.mp4'
  },
  {
    id: 'irc',
    title: 'Internet Relay Chat',
    subtitle: 'DEC 24 - JANV 25 | MERN - WEB',
    description: "L'objectif est de permettre aux utilisateurs de communiquer en temps réel via des channels et des messages privés.",
    image: '/images/chatapp.png',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
    category: 'web',
    features: [
      'Chat en temps réel',
      'Channels publics et privés',
      'Messages privés',
      'Système de notifications',
    ],
    github: null,
    demo: null
  },
  {
    id: 'nsa',
    title: 'You shall not pass !',
    subtitle: 'DEC 24 | NETWORK & SYSADMIN',
    description: 'Ce projet avait pour but de maitriser les concepts réseaux et de sécurité en configurant une infrastructure avec 4 machines virtuelles.',
    image: '/images/nsa.jpg',
    technologies: ['VirtualBox', 'Linux', 'Apache', 'MySQL', 'PHP'],
    category: 'cybersécurité',
    features: [
      'Configuration réseau avancée',
      'Sécurisation des services',
      'Documentation technique'
    ],
    github: null,
    demo: null
  },
  {
    id: 'rpg-empire',
    title: 'RPG Empire',
    subtitle: 'NOV - DEC 24 | JAVA 2D GAME',
    description: 'RPG Empire est un RPG en 2D avec une vue du dessus et un style pixel art, se déroulant dans un monde ouvert.',
    image: '/images/logo-rpg-empire.png',
    technologies: ['Java', 'JavaFX', 'FXML', 'CSS', 'SQLite'],
    category: 'jeux video',
    features: [
      'Système de combat',
      'Inventaire et équipement',
      'Quêtes et PNJ',
      'Sauvegarde de la progression',
      'Interface utilisateur intuitive'
    ],
    github: 'https://github.com/MichelBKT/RPG-Empire',
    demo: '/videos/RPGEmpireDemo.mp4'
  },
  {
    id: 'jobspot',
    title: 'Jobspot',
    subtitle: 'SEPT - OCT 24 | LARAVEL - WEB',
    description: "Ce projet est une application de gestion de petites annonces d'emploi. Les utilisateurs peuvent consulter les annonces, postuler en ligne et les administrateurs peuvent gérer les annonces.",
    image: '/images/jobboard.png',
    technologies: ['Laravel', 'MySQL', 'Bootstrap', 'JavaScript', 'AJAX'],
    category: 'web',
    features: [
      'Système d\'authentification',
      'Gestion des annonces',
      'Système de candidature',
      'Interface d\'administration'
    ],
    github: null,
    demo: null
  },
  {
    id: 'garage-parrot',
    title: 'Garage Parrot',
    subtitle: 'FEV - JUIN 24 | SYMFONY - WEB',
    description: 'Ce projet est un site web vitrine permettant aux utilisateurs de consulter les annonces de véhicules, les filtrer. Les administrateurs peuvent facilement ajouter, modifier ou supprimer les annonces.',
    image: '/images/parrot.png',
    technologies: ['Symfony', 'Twig', 'MySQL', 'Bootstrap', 'JavaScript'],
    category: 'web',
    features: [
      'Catalogue de véhicules',
      'Système de filtres',
      'Gestion des rendez-vous',
      'Interface d\'administration',
      'Formulaire de contact'
    ],
    github: 'https://github.com/MichelBKT/Garage_Parrot',
    demo: null
  }
]; 