import { action, observable } from 'mobx';

import { viewport, ViewportType } from '~/utils/state';

export default class ViewStore {
  /** Type of current viewport width. */
  @observable public viewportType: ViewportType = viewport();

  /** Update the type of the viewport width. */
  @action public updateCurrentType() {
    this.viewportType = viewport();
  }
}
