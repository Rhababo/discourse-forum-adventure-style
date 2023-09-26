import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { inject as controller } from "@ember/controller";
import { action } from "@ember/object";
import DiscourseURL from "discourse/lib/url";
//import I18n from "I18n";
//import discourseComputed from "discourse-common/utils/decorators";
//import User from "discourse/models/user";

export default class filterTopicOwnerPosts extends Component {
    @controller topic;
    @service site;

    topicOwner = this.topic.model.details.created_by.username;
    @action
    filterPosts() {
        const topicController = this.topic;
        const postStream = topicController.model.postStream;
        topicController.send("filterParticipant", topicController.model.details.created_by);
        console.log(topicController.model);
        console.log(postStream);
        console.log(DiscourseUrl);
        if (postStream.posts) {
            console.log("postStream has posts");
            console.log(postStream.posts[0].get("post_number"));
            DiscourseURL.jumpToPost(postStream.posts[0].get("post_number"));
        }
    }


}
