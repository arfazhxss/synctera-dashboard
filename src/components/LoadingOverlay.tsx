"use client"

import { Loader2 } from 'lucide-react';
import { useLoading } from '@/contexts/LoadingContext';

export default function LoadingOverlay() {
    const { isLoading } = useLoading();
    // console.log('Loading state:', isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Loader2 className="h-16 w-16 animate-spin text-white" />
        </div>
    );
}