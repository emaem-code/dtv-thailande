import { RENDEZ_VOUS } from '../lib/rendez-vous';
import s from './RendezVous.module.css';

type Props = {
  titre: string;
  description: string;
  niveau?: 'h2' | 'h3';
};

export default function RendezVous({ titre, description, niveau: Titre = 'h2' }: Props) {
  return (
    <section className={s.rendezVous} aria-label="Rendez-vous en visio">
      <p className={s.format}>En visio · {RENDEZ_VOUS.dureeMinutes} minutes</p>
      <Titre className={s.titre}>{titre}</Titre>
      <p className={s.description}>{description}</p>
      <a className={s.lien} href={RENDEZ_VOUS.url} target="_blank" rel="noopener noreferrer">
        {RENDEZ_VOUS.libelle}
      </a>
      <p className={s.precision}>L’agenda Google s’ouvre dans un nouvel onglet.</p>
    </section>
  );
}
