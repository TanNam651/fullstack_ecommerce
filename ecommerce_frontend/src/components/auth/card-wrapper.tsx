import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card.tsx";
import {Header} from "@/components/auth/header.tsx";
import {BackButton} from "@/components/auth/back-button.tsx";

interface CardWrapperProps {
  children: React.ReactNode,
  titleLabel:string,
  headerLabel: string,
  backButtonLabel: string,
  backButtonHref: string,
}

export const CardWrapper = ({
    children,
  titleLabel,
    headerLabel,
    backButtonLabel,
    backButtonHref
  }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header
          title={titleLabel}
          label={headerLabel}
        />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}/>
      </CardFooter>
    </Card>
  );
}