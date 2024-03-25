import React from "react";
import { Menubar } from "@/components/ui/menubar";
import Link from "next/link";

const navabar = () => {
  return (
    <Menubar className="flex justify-evenly h-[60px] rounded-none">
      <Link href='/'>Home</Link>
      <Link href='medicines'>Medicines</Link>
      <Link href='/cart'>Cart</Link>
    </Menubar>
  );
};

export default navabar;
