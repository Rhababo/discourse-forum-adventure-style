//categoryId and topicTag selection modified from :https://github.com/tshenry/discourse-blog-post-styling

import Category from "discourse/models/category";
import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
export default Component.extend({
  isAdventureTopic: false,
  @discourseComputed("topic.category_id", "topic.tags")
  isAdventureTopic(categoryId, topicTags) {
    let hasCategory = false;
    let hasTag = false;

    if(categoryId) {
      const allowedCategories = settings.adventure_category.split(",");
      const currentCategory = Category.findById(categoryId);
      const parentCategorySlug = currentCategory.parentCategory ? `${currentCategory.parentCategory.slug}-` : "";
      hasCategory = allowedCategories.some((c) => c.trim() === `${parentCategorySlug}${currentCategory.slug}`);
    }

    if(topicTags) {
      const allowedTags = settings.adventure_tag.split("|");
      hasTag = allowedTags.some((tag) => topicTags.includes(tag));
    }
    console.log("Script is running");
    return hasCategory || hasTag;
  },

});
