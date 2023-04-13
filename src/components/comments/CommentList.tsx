import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../apis/comment";
import { CommentResponse } from "../../models/comment";
import CommentItem from "./CommentItem";

export default function CommentList({newComment} : {newComment: CommentResponse}) {
    const { postId } = useParams<{ postId: string }>();
    const [comments, setComments] = useState<CommentResponse[]>([]);
    useEffect (() => {
        const handleGetComment = async () => {
            const response:any = await getComments(postId || "");
            setComments(response.data.comments);
        }
        handleGetComment();
    }, [postId]);

    useEffect(() => {
        if (newComment.id) {
            setComments(prevComments => [newComment, ...prevComments]);
        }
    }, [newComment]);

    const handleDeleteComment = (id: number) => {
        setComments(comments.filter((comment: CommentResponse) => comment.id !== id));
    }

    return (
        <>
            {comments.map((comment: CommentResponse) => (
                <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    actionComment={handleDeleteComment}
                />
            ))}
        </>
    );
}