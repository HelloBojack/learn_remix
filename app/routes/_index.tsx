import type { MetaFunction } from "@remix-run/node";
import { Pagination, Button } from "@nextui-org/react";
import { prisma } from "~/prisma.server";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";

const PAGE_SIZE = 1
export const loader = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page') || 1

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      orderBy: {
        created_at: "desc"
      },
      // 分页查询
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE
    }),
    prisma.post.count()
  ])


  return json({
    posts,
    pageCount: Math.ceil(total / PAGE_SIZE)
  })
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)

  return (
    <div>
      <Link to={'/posts/new'} className="text-xl" prefetch="intent">
        New
      </Link>

      <div className="p-12 flex flex-col gap-4">  
        {loaderData.posts.map(post => {
          return (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`} className="text-xl" prefetch="intent">
                {post.title}
              </Link>
              <div className="text-sm text-gray-400">
                {post.created_at}
              </div>
            </div>
          )
        })}

      <Pagination page={page} total={loaderData.pageCount} 
        onChange={page => {
          const newSearchParams = new URLSearchParams(searchParams)
          newSearchParams.set('page', String(page))
          setSearchParams(newSearchParams)
        }}
      />
      </div>
    </div>
  );
}
