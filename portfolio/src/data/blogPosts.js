export const blogPosts = [
  {
    id: 'setup-home-studio',
    title: 'Mon setup de home studio 2025',
    date: '2025-01-15',
    author: 'Michel',
    category: 'gear',
    tags: ['studio', 'gear', 'setup', 'production'],
    excerpt: 'Découvrez mon setup complet pour la production musicale électronique, du hardware aux plugins essentiels.',
    image: '#',
    readTime: '5 min',
    content: `# Mon setup de home studio 2025

## Le hardware

Mon setup actuel comprend :
- **Interface audio**: Focusrite Scarlett 18i20
- **Moniteurs**: KRK Rokit 5 G4 
- **Contrôleur MIDI**: Native Instruments Kontrol S49
- **Casque**: Audio-Technica ATH-M50x

## Le software

Côté logiciels, j'utilise principalement :
- **DAW**: Ableton Live 12 Suite
- **Plugins**: Native Instruments Komplete, FabFilter Pro-Q 3
- **Samples**: Splice, Loopmasters

La clé d'un bon home studio n'est pas forcément d'avoir le matériel le plus cher, mais de bien connaître ses outils et d'optimiser son environnement de travail.`
  },
  {
    id: 'synthwave-production-tips',
    title: 'Tips pour produire de la synthwave authentique',
    date: '2025-01-08',
    author: 'Michel',
    category: 'tutorial',
    tags: ['synthwave', 'production', 'synth', 'retro'],
    excerpt: 'Les techniques essentielles pour capturer l\'essence de la synthwave des années 80.',
    image: '#',
    readTime: '8 min',
    content: `# Tips pour produire de la synthwave authentique

## Les bases harmoniques

La synthwave repose sur des progressions d'accords nostalgiques :
- Utiliser des accords mineurs avec des 7èmes ajoutées
- Explorer les modes dorien et aeolien
- Ne pas oublier les power chords des années 80

## Les sons signature

### Les synthés
- **Bass** : Moog Sub 37 ou émulation
- **Lead** : Jupiter-8, Juno-106
- **Pads** : DX7 avec beaucoup de reverb

### Les effets
- Reverb à gogo (Hall, Plate)
- Chorus vintage
- Delay avec feedback
- Compression parallèle sur la batterie`
  },
  {
    id: 'learning-javascript-music',
    title: 'Apprendre le JavaScript via la musique',
    date: '2025-01-02',
    author: 'Michel',
    category: 'dev',
    tags: ['javascript', 'web-audio', 'coding', 'music'],
    excerpt: 'Comment j\'ai utilisé ma passion pour la musique pour maîtriser la programmation JavaScript.',
    image: '#',
    readTime: '6 min',
    content: `# Apprendre le JavaScript via la musique

## L'eurêka moment

Quand j'ai découvert la Web Audio API, tout a changé. Pouvoir créer des visualisations audio, des synthétiseurs virtuels et des effets directement dans le navigateur m'a motivé à approfondir JavaScript.

## Projets pratiques

### Visualiseur audio
\`\`\`javascript
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const dataArray = new Uint8Array(analyser.frequencyBinCount);

function draw() {
  analyser.getByteFrequencyData(dataArray);
  // Dessiner les barres de fréquence
  requestAnimationFrame(draw);
}
\`\`\`

### Séquenceur simple
Un projet parfait pour apprendre les concepts de timing, d'événements et d'état en JavaScript.

La musique rend l'apprentissage du code plus concret et motivant !`
  }
];