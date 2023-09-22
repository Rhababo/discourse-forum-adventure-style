import User from "discourse/models/user";
import EmberObject, { action, set } from "@ember/object";
import { alias, and, gt, gte, not, or } from "@ember/object/computed";
import discourseComputed, { observes } from "discourse-common/utils/decorators";
import { propertyNotEqual, setting } from "discourse/lib/computed";
import Component from "@ember/component";
import I18n from "I18n";
import { durationTiny } from "discourse/lib/formatter";
import { getURLWithCDN } from "discourse-common/lib/get-url";
import { isEmpty } from "@ember/utils";
import { dasherize } from "@ember/string";

export default Component.extend(CardContentsBase, CanCheckEmails, CleansUp, {
    elementId: "filter-button",
    classNames: "filter-button",
    classNameBindings: [
      "visible:show",
    ],
  
    postStream: alias("topic.postStream"),
    showFilter: and(
      "viewingTopic",
      "postStream.hasNoFilters",
      "enoughPostsForFiltering"
    ),
    showName: propertyNotEqual("user.name", "user.username"),
    hasUserFilters: gt("postStream.userFilters.length", 0),
  
    @discourseComputed("username", "topicPostCount")
    filterPostsLabel(username, count) {
      return I18n.t("topic.filter_to", { username, count });
    },

    @action
    actions: {
        filterPosts() {
        this.filterPosts(this.user);
        },

     },

});