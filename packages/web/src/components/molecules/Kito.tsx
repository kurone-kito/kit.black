import type { Component } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import avatarKito from '../../assets/avatars/kito.webp';
import avatarMomoneko from '../../assets/avatars/momoneko.webp';
import constants from '../../constants.json';
import { Avatar } from '../atoms/Avatar.js';

/** Type definition for the properties. */
export interface KitoProps {
  /** The CSS classes. */
  readonly class?: string | undefined;

  /** The ID of the element. */
  readonly id?: string;
}

/** The IDs of the elements. */
const ids = { kito: 'avatar-kito', momoneko: 'avatar-momoneko' } as const;

/**
 * The Kito's cutin component.
 * @returns The component.
 */
export const Kito: Component<KitoProps> = (props) => {
  const kitoId = `${props.id}-${ids.kito}` as const;
  const momonekoId = `${props.id}-${ids.momoneko}` as const;
  return (
    <figure
      class={twMerge('carousel aspect-[46/89]', props.class)}
      id={props.id}
    >
      <Avatar
        alt={constants.author.name}
        anchorClass="right-[3cqw] top-[3cqh] h-[7cqh] w-[20cqw]"
        class="carousel-item @container-[size]/kito"
        height={2403}
        id={kitoId}
        nextId={momonekoId}
        src={avatarKito}
        width={1242}
      />
      <Avatar
        alt={constants.author.name}
        anchorClass="right-[7cqw] top-[3cqh] h-[7cqh] w-[24cqw]"
        class="carousel-item @container-[size]/momoneko"
        height={988}
        id={momonekoId}
        nextId={kitoId}
        src={avatarMomoneko}
        width={511}
      />
    </figure>
  );
};
