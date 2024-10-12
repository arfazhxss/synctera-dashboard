"use client"

import React, { createContext, useContext, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

type AlertContextType = {
    showAlertWorkInProgress: (title: string, description: string) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { readonly children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const [alertContent, setAlertContent] = useState({ title: '', description: '' });

    const showAlertWorkInProgress = React.useCallback((title: string, description: string) => {
        setAlertContent({ title, description });
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000);
    }, []);

    const contextValue = React.useMemo(() => ({ showAlertWorkInProgress }), [showAlertWorkInProgress]);

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
            {isVisible && (
                <div className="fixed top-4 right-4 z-50">
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>{alertContent.title}</AlertTitle>
                        <AlertDescription>{alertContent.description}</AlertDescription>
                    </Alert>
                </div>
            )}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
}