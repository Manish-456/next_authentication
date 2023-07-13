import React from "react";

type Props = {
  params: {
    profileId: string;
  };
  
};

export default function IndividualProfilePage({ params }: Props) {
  return (
    <div className="grid place-items-center min-h-screen">
      <code className="text-lg">Individual Profile Id : {params.profileId}</code>
    </div>
  );
}
