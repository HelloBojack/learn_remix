import type { MetaFunction } from "@remix-run/node";
import {Button, ButtonGroup} from "@nextui-org/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

  export default function Index() {
  return (
   <div>
      123
   </div>
  );
}
