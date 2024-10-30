import type { Component, JSX, ParentProps } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface ArticleProps
  extends Pick<
      JSX.HTMLAttributes<HTMLElement>,
      'class' | 'innerHTML' | 'style'
    >,
    Readonly<ParentProps> {
  /** The heading title of the article. */
  readonly heading?: JSX.Element;
}

/**
 * The article template.
 * @param props The component properties.
 * @returns The component.
 */
export const Article: Component<ArticleProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'heading']);
  return (
    <article class="leading-loose">
      <Show when={local.heading}>
        <header class="bg-base-300 w-screen pb-20 pt-28">
          <h2 class="container mx-auto text-center text-2xl font-bold">
            {local.heading}
          </h2>
        </header>
      </Show>
      <section
        class={twMerge(
          'px-safe md:px-safe-or-8 container mx-auto py-20 tracking-wider',
          local.class,
        )}
        {...others}
      />
    </article>
  );
};
