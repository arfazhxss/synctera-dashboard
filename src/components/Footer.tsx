import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Building2, Briefcase, Users, Scale, ShieldCheck, FileText, Cookie } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <span className="font-semibold flex items-center">
                            <Building2 className="w-4 h-4 mr-2" />
                            Synctera, Inc
                        </span>
                        <Separator orientation="vertical" className="h-4 bg-gray-700" />
                        <span className="text-xs">NASDAQ: FNTP</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <Button variant="link" size="sm" className="text-white p-0 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            About
                        </Button>
                        <Button variant="link" size="sm" className="text-white p-0 flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            Careers
                        </Button>
                        <Button variant="link" size="sm" className="text-white p-0 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Investors
                        </Button>
                        <Button variant="link" size="sm" className="text-white p-0 flex items-center">
                            <Scale className="w-4 h-4 mr-1" />
                            Legal
                        </Button>
                    </div>
                </div>
                <Separator className="my-4 bg-gray-800" />
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs">
                    <span>© 2024 Synctera, Inc. All rights reserved.</span>
                    <div className="flex space-x-4 mt-2 sm:mt-0">
                        <Button variant="link" size="sm" className="text-white p-0 text-xs flex items-center">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Privacy Policy
                        </Button>
                        <Button variant="link" size="sm" className="text-white p-0 text-xs flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            Terms of Service
                        </Button>
                        <Button variant="link" size="sm" className="text-white p-0 text-xs flex items-center">
                            <Cookie className="w-3 h-3 mr-1" />
                            Cookie Policy
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}