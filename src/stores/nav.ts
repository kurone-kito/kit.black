import { action, observable } from 'mobx';

/** Store for navigation menu. */
export default class NavStore {
  /** Whether expanded the navigation menu. */
  @observable public expanded = false;

  /**
   * Toggle whether expansion the navigation menu.
   * @returns Toggled state.
   */
  @action public toggleExpantion = () => {
    this.expanded = !this.expanded;
  }
}
