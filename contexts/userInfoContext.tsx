"use client";

import { CartItemProps } from "@/lib/definations";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type UserInfo = {
  userId: string | null;
  username: string | null;
  email: string | null;
  address: {
    name: string;
    phoneNum: number;
    pincode: number;
    locality: string;
    address: string;
  } | null;
  profileImg?: string | null;
  itemsInCart?: [] | CartItemProps[];
};

type UserInfoContext = {
  info: UserInfo | null;
  setInfo: Dispatch<SetStateAction<UserInfo | null>>;
};

const UserInfoContext = createContext<UserInfoContext | null>(null);

export default function UserInfoContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [info, setInfo] = useState<UserInfo | null>(null);

  return (
    <UserInfoContext.Provider
      value={{
        info,
        setInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error(
      "useUserInfoContext must be used within a UserInfoContextProvider"
    );
  }

  return context;
}
