import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/prisma.server";
import { json } from "@remix-run/node";
import ReactMarkdown from 'react-markdown'

export const loader = async ({ params }) => {
  const postId = params.postId;

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  })

  if (!post) {
    throw new Response("找不到文章", {
      status: 404
    })
  }

  return json({
    post
  })
}

export default function Post() {
  const loaderData = useLoaderData();

  return (
    <div className="p-12">
      <Link to='edit' className="text-xl" prefetch="intent">
        Edit
      </Link>

      <div className="prose">
        <h1>{loaderData.post.title}</h1>
        <ReactMarkdown>{loaderData.post.content}</ReactMarkdown>
      </div>
    </div>
  )
}