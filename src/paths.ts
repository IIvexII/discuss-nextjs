export const paths = {
  home() {
    return "/";
  },
  showTopics() {
    return "/topics";
  },
  createTopic() {
    return "/topics/new";
  },
  showTopic(topicId: string) {
    return `/topics/${topicId}`;
  },
  createPost(topicId: string) {
    return `/topics/${topicId}/posts/new`;
  },
  showPost(topicId: string, postId: string) {
    return `/topics/${topicId}/posts/${postId}`;
  },
};
