import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class Adventure-Logic extends Component {
  @service siteSettings;

  get displayName() {
    const user = this.args.outletArgs.model.details.created_by;
    if (this.siteSettings.prioritize_username_in_ux) {
      return user.username;
    } else {
      return user.name;
    }
  }
}