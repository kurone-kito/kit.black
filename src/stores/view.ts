import { Bulma } from 'bloomer/lib/bulma';
import { action, observable } from 'mobx';

import { viewport } from '~/utils/state';

export default class ViewStore {
  /** Type of current viewport width. */
  @observable public viewportType: Bulma.Platform = viewport();

  /** Update the type of the viewport width. */
  @action public updateCurrentType() {
    this.viewportType = viewport();
  }
}
