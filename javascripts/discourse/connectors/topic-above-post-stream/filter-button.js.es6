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

    topicOwnerUsername = this.topic.model.details.created_by.username;
    @action
    filterPosts() {
        const topicController = this.topic;
        const postStream = topicController.model.postStream;
        const topicOwnerUser = topicController.model.details.created_by;
        //topicController.send("filterParticipant", topicOwnerUser);
        postStream.cancelFilter();
        postStream.userFilters.addObject(topicOwnerUser);
        this.refreshPostStream().then(()=> topicController.updateQueryParams());
    }

    refreshPostStream(){
        const postStream = this.topic.model.postStream;
        return postStream.refresh().then(() => {
            if (postStream.posts) {
                DiscourseURL.jumpToPost(postStream.posts[0].get("post_number"));
            }
        });

    }




}
