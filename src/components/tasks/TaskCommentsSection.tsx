"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type Props = {
    comments: any[];
    currentUser: any;
    taskId: string;
};

function CommentContent({
    content,
}: {
    content: string;
}) {

    const [expanded, setExpanded] =
        useState(false);

    const LIMIT = 80;

    const isLong =
        content.length > LIMIT;

    const displayContent =
        expanded || !isLong
            ? content
            : content.slice(
                0,
                LIMIT
            ) + "...";

    return (

        <div>

            <p
                className="
    text-sm
    text-gray-600
    mt-1

    whitespace-pre-wrap

    wrap-anywhere
  "
            >

                {displayContent}

            </p>
            {isLong && (

                <button

                    onClick={() =>
                        setExpanded(
                            !expanded
                        )
                    }

                    className="
            mt-1
            text-sm
            text-indigo-600
            hover:underline
          "
                >

                    {expanded
                        ? "Thu gọn"
                        : "Xem thêm"}

                </button>

            )}

        </div>

    );

}

export default function TaskCommentsSection({
    comments,
    currentUser,
    taskId,
}: Props) {
    const [text, setText] = useState("");
    const [commentsState, setComments] = useState(comments);

    const submitComment =
        async () => {

            const res =
                await fetch(
                    `/api/tasks/${taskId}/comments`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            content: text

                        })

                    }
                );

            if (!res.ok) return;

            const newComment =
                await res.json();

            setComments(prev => [
                ...prev,
                newComment
            ]);

            setText("");

        };

    return (

        <div className="bg-white rounded-xl shadow border p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-lg font-semibold">

                    Hoạt động & Bình luận

                </h2>

                <span className="text-sm text-gray-500">

                    {comments.length} hoạt động

                </span>

            </div>

            <div className="relative">

                {/* COMMENTS */}

                <div
                    className="
      space-y-5

      max-h-80
      min-h-68
      overflow-y-auto

      custom-scrollbar

      pr-1

      pb-40
    "
                >

                    {commentsState.length ? (

                        commentsState.map((comment) => (

                            <div
                                key={comment.id}
                                className="flex gap-4"
                            >

                                {/* avatar */}

                                <div className="
            w-10
            h-10

            rounded-full

            bg-indigo-100

            flex
            items-center
            justify-center

            shrink-0

            font-medium
            text-indigo-600
          ">

                                    {comment.employee.fullName?.[0]}

                                </div>


                                {/* content */}

                                <div className="
            flex-1
            min-w-0
          ">

                                    <div className="
              flex
              flex-wrap
              items-center
              gap-x-2
            ">

                                        <span className="font-medium">

                                            {comment.employee.fullName}

                                        </span>

                                        <span className="
                text-xs
                text-gray-400
              ">

                                            {new Date(
                                                comment.createdAt
                                            ).toLocaleString(
                                                "vi-VN"
                                            )}

                                        </span>

                                    </div>

                                    <CommentContent
                                        content={
                                            comment.content
                                        }
                                    />

                                </div>

                            </div>

                        ))

                    ) : (

                        <p className="
        text-sm
        text-gray-400
      ">

                            Chưa có hoạt động nào

                        </p>

                    )}

                </div>



                {/* FORM */}

                {(currentUser?.role === "EMPLOYEE" ||
                    currentUser?.role === "MANAGER" ||
                    currentUser?.role === "ADMIN") && (

                        <div className="
      absolute
      bottom-0
      left-0
      right-0

      border-t

      bg-white

      pt-4
    ">

                            <div className="relative">

                                <textarea

                                    value={text}

                                    onChange={(e) =>
                                        setText(
                                            e.target.value
                                        )
                                    }

                                    onKeyDown={(e) => {

                                        if (
                                            e.key === "Enter" &&
                                            !e.shiftKey
                                        ) {

                                            e.preventDefault();

                                            submitComment();

                                        }

                                    }}

                                    placeholder="
            Viết bình luận...
          "

                                    className="
            w-full

            border

            rounded-2xl

            p-2
            pr-14

            outline-none

            resize-none
          "

                                />


                                <button

                                    onClick={
                                        submitComment
                                    }

                                    className="
            absolute

            right-3
            bottom-3

            w-10
            h-10

            rounded-full

            bg-indigo-600
            text-white

            flex
            items-center
            justify-center
          "

                                >

                                    <Send size={18} />

                                </button>

                            </div>

                        </div>

                    )}

            </div>
        </div>

    );

}