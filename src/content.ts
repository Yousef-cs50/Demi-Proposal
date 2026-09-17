export const proposal = {
  id: 'demiana-proposal',
  title: 'To the most beautiful Demi in the world,',
  paragraphs: [
    'I really like you, Demi. I want you in my life.',
    'I love eating with you, laughing with you, and sharing our lives together. I want to start a new adventure with you, to go through the hard times and the good times together, to help each other heal, and to grow together.',
    'I would be the happiest man if you said yes.',
    'Would you be my Demi?',
  ],
  yesLabel: 'Yes, my love',
  timeLabel: 'I need more time',
  responses: {
    yes: {
      title: 'Yes',
      message: 'What are you waiting for? Call him.',
    },
    time: {
      title: 'Take your time',
      message: 'He will understand. Just communicate with him and tell him how you feel.',
    },
  },
} as const

export const memories = [
  { src: '/images/memory-01.jpeg', alt: 'A candid memory together on the bus.' },
  { src: '/images/memory-02.jpeg', alt: 'A close candid memory together.' },
  { src: '/images/memory-03.jpeg', alt: 'A full-length indoor portrait memory.' },
  { src: '/images/memory-04.jpeg', alt: 'An indoor portrait memory.' },
  { src: '/images/memory-05.jpeg', alt: 'A tall indoor portrait memory.' },
  { src: '/images/memory-06.jpeg', alt: 'A nighttime portrait beneath warm lights.' },
] as const
