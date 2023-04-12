import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../apis/comment";
import { CommentResponse } from "../../models/comment";
import CommentItem from "./CommentItem";

export default function CommentList() {
    const { postId } = useParams<{ postId: string }>();
    const [comments, setComments] = useState<CommentResponse[]>([]);
    useEffect (() => {
        const handleGetComment = async () => {
            const response:any = await getComments(postId || "");
            setComments(response.data.comments);
        }
        handleGetComment();
    }, [postId]);

    return (
        <>
            {comments.map((comment: CommentResponse) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </>
    );
}