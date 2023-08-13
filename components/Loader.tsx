import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-40 h-40 relative">
        <Image
            className=""
            alt="logo"
            fill
            src={"/empty.gif"}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Let me thinking ...
      </p>
    </div>
  );
};

export default Loader;
