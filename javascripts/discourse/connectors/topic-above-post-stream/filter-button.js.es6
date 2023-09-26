import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { inject as controller } from "@ember/controller";
import { action } from "@ember/object";
import I18n from "I18n";
import discourseComputed from "discourse-common/utils/decorators";
import DiscourseURL, { groupPath, userPath } from "discourse/lib/url";

export default class filterTopicOwnerPosts extends Component {
    @action
    filterPosts(user) {
        const topicController = this.topic;
        topicController.send("filterParticipant", user);
    }

    @discourseComputed("username", "topicPostCount")
    filterPostsLabel(username, count) {
        return I18n.t("topic.filter_to", {username, count});
    }

}
