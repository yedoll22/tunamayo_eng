import MyComment from "../components/comment/MyComment";
import DrawerHeader from "../components/common/DrawerHeader";
import { useMyCommentsQuery } from "../api/comment";

const MyComments = () => {
  const myComments = useMyCommentsQuery();

  return (
    <>
      <DrawerHeader isAdmin={false} title="내가 쓴 리뷰" rightNone />
      {myComments?.data?.map((comment: any) => {
        return (
          <div key={comment.id}>
            <MyComment
              content={comment.content}
              createdAt={comment.createdAt}
              rating={comment.rating}
              toiletId={comment.toiletId}
            />
          </div>
        );
      })}
    </>
  );
};

export default MyComments;
