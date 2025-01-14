"use client";
import * as React from "react"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronsLeftIcon } from "lucide-react";

interface BackButtonProps {
    message: string;
}

export default function BackButton({ message }: BackButtonProps) {
    return (
        <Button asChild variant="link" className="mt-4">
            <Link href={`/`}> <ChevronsLeftIcon />{message}</Link>
        </Button>
    );
}
