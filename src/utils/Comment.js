export default class Commment {
    /**
     * @param {string} postedBy - The username who posted the comment.
     * @param {string} datePosted - The date the comment was posted.
     * @param {string} commentBody - The body of the comment.
     */
    constructor(postedBy, datePosted, commentBody) {
        this.postedBy = postedBy;
        this.datePosted = datePosted;
        this.commentBody = commentBody;
    }
}