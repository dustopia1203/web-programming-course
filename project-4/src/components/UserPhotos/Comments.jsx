function Comments({ item }) {
  const comments = item.comments;

  if (!comments) {
    return <div></div>;
  }
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.date_time}</p>
          <p> {comment.comment}</p>
          <p>
            {comment.user.first_name} {comment.user.last_name}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Comments;
