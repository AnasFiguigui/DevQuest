import LISC from '@/images/photos/Games/LISC-1.jpg'
import Eden from '@/images/photos/Games/Eden-1.jpg'
import QL from '@/images/photos/Games/Qarn-Laroub-1.jpg'
import SnakeImg from '@/images/photos/Games/Snake-1.jpg'
import Tower from '@/images/photos/Games/Tower-1.jpg'
import Portfolio from '@/images/photos/Games/Portfolio-1.jpg'
import Carlyon from '@/images/photos/Games/Carlyon-1.jpg'

export const summaries = [
  {
    id: 'lost-in-sala-colonia',
    name: 'Lost In Sala Colonia',
    shortDescription: 'Une revisite moderne du classique Snake',
    thumbnail: LISC.src,
    type: 'game',
    releaseDate: '2024-09-01'
  },
  {
    id: 'eden',
    name: 'Eden',
    shortDescription: "Un défi d'empilement en 3D",
    thumbnail: Eden.src,
    type: 'game',
    releaseDate: '2023-12-15'
  },
  {
    id: 'project-75',
    name: 'Project 75',
    shortDescription: 'Une adaptation numérique du célèbre jeu de cartes',
    thumbnail: QL.src,
    type: 'game',
    releaseDate: '2022-06-20'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    shortDescription: 'A developer portfolio that reflects my vision and skills.',
    thumbnail: Portfolio.src,
    type: 'website',
    releaseDate: '2022-01-01'
  },
  {
    id: 'snake',
    name: 'Snake',
    shortDescription: 'Un jeu éducatif fusionnant technologies et créativité.',
    thumbnail: SnakeImg.src,
    type: 'game',
    releaseDate: '2021-03-10'
  },
  {
    id: 'stacking-tower',
    name: 'Stacking tower',
    shortDescription: 'Expérience d’empilement 3D',
    thumbnail: Tower.src,
    type: 'game',
    releaseDate: '2020-11-05'
  },
  {
    id: 'carlyon',
    name: 'Carlyon',
    shortDescription: 'Un jeu/website expérimental',
    thumbnail: Carlyon.src,
    type: 'website',
    releaseDate: '2019-08-12'
  }
]

export default summaries
