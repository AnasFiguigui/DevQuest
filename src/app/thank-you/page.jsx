import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata = {
  title: 'Vous etes ',
  description: 'Merci pour votre abonnement',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Merci pour votre abonnement."
      intro="Je vous enverrai un email chaque fois que je publierai un nouvel project de blog, lancerai un nouveau projet ou partagerai quelque chose d’intéressant qui pourrait vous plaire. Vous pouvez vous désabonner à tout moment, sans rancune."
    />
  )
}
