"use client";

import { useAuth } from "@/app/_hooks/useAuth";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import UserPhoto from "../ui/UserPhoto";
import { loginLink } from "@/app/_utils/constants";

function Initial() {
  const { user } = useAuth();
  return (
    <div className="size-8 text-sm aspect-square rounded-full border-1 border-background2 text-background2 font-light font-body grid place-items-center">
      <Link
        href={user ? "/account" : loginLink}
        className="size-full grid place-items-center bg-primary rounded-full overflow-hidden"
      >
        {user 
          ? <UserPhoto url={user.photo} name={user.name} />
          : <User className="text-background2 rounded-full" />
        }
      </Link>
    </div>
  );
}

export default Initial;
