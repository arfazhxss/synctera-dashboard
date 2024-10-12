"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpRight, TrendingUp, DollarSign, PieChart, Activity, ArrowDownRight, Briefcase } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface GrainedCardProps {
    children: ReactNode;
    className: string;
}

function GrainedCard({ children, className }: Readonly<GrainedCardProps>) {
    return (
        <Card
            className={`grained-background ${className} transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
            style={{ position: "relative" }}
        >
            {children}
        </Card>
    )
}

const spendingData = [
    { category: "Housing", amount: 1200 },
    { category: "Food", amount: 400 },
    { category: "Transport", amount: 200 },
    { category: "Utilities", amount: 150 },
    { category: "Entertainment", amount: 100 },
    { category: "Healthcare", amount: 80 },
    { category: "Misc", amount: 50 },
]

export default function FinanceInsights() {
    return (
        <Card className="w-full overflow-hidden p-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <GrainedCard className="p-3 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                            <DollarSign className="h-4 w-4 mr-1 text-blue-600" />
                            Financial Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                        <Tabs defaultValue="1M" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-4">
                                <TabsTrigger value="1W">1W</TabsTrigger>
                                <TabsTrigger value="1M">1M</TabsTrigger>
                                <TabsTrigger value="3M">3M</TabsTrigger>
                                <TabsTrigger value="1Y">1Y</TabsTrigger>
                            </TabsList>
                            <TabsContent value="1W">
                                <FinancialSummaryContent
                                    totalSpent={324.56}
                                    spentChange={1.2}
                                    budgetPercentage={65}
                                    totalSaved={215.78}
                                    savedChange={3.5}
                                    goalPercentage={80}
                                    netWorth={52890.45}
                                    netWorthChange={0.8}
                                />
                            </TabsContent>
                            <TabsContent value="1M">
                                <FinancialSummaryContent
                                    totalSpent={1248.32}
                                    spentChange={2.5}
                                    budgetPercentage={75}
                                    totalSaved={876.90}
                                    savedChange={18.7}
                                    goalPercentage={92}
                                    netWorth={142568.23}
                                    netWorthChange={5.2}
                                />
                            </TabsContent>
                            <TabsContent value="3M">
                                <FinancialSummaryContent
                                    totalSpent={3745.67}
                                    spentChange={-1.8}
                                    budgetPercentage={82}
                                    totalSaved={2634.21}
                                    savedChange={22.3}
                                    goalPercentage={95}
                                    netWorth={145902.78}
                                    netWorthChange={7.6}
                                />
                            </TabsContent>
                            <TabsContent value="1Y">
                                <FinancialSummaryContent
                                    totalSpent={14982.45}
                                    spentChange={5.7}
                                    budgetPercentage={88}
                                    totalSaved={10567.89}
                                    savedChange={35.2}
                                    goalPercentage={98}
                                    netWorth={158234.56}
                                    netWorthChange={12.4}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </GrainedCard>

                <GrainedCard className="p-3 bg-gradient-to-br from-green-50 to-emerald-100">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                            <PieChart className="h-4 w-4 mr-1 text-green-600" />
                            Portfolio Allocation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                        <div className="space-y-3 text-xs">
                            {[
                                { name: "US Stocks", percentage: 35, color: "bg-blue-500", change: "+3.2%" },
                                { name: "International Stocks", percentage: 15, color: "bg-green-500", change: "+1.8%" },
                                { name: "Bonds", percentage: 20, color: "bg-yellow-500", change: "-0.5%" },
                                { name: "Real Estate", percentage: 15, color: "bg-orange-500", change: "+2.1%" },
                                { name: "Commodities", percentage: 5, color: "bg-red-500", change: "+4.7%" },
                                { name: "Crypto", percentage: 5, color: "bg-purple-500", change: "+7.3%" },
                                { name: "Cash", percentage: 5, color: "bg-gray-500", change: "+0.1%" },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center w-1/2">
                                        <div className={`mr-2 h-2 w-2 rounded-full ${item.color}`} />
                                        <span>{item.name}</span>
                                    </div>
                                    <div className="w-1/4 text-right">{item.percentage}%</div>
                                    <div className={`w-1/4 text-right ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                        {item.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-xs">
                            <p className="font-medium">Total Portfolio Value</p>
                            <p className="text-lg font-bold text-green-700">$189,532.67</p>
                            <p className="text-muted-foreground">+5.7% past month</p>
                        </div>
                    </CardContent>
                </GrainedCard>

                <GrainedCard className="p-3 bg-gradient-to-br from-purple-50 to-indigo-100">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                            <Activity className="h-4 w-4 mr-1 text-purple-600" />
                            Market Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[300px] w-full pr-4">
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "AI Startup Revolution",
                                        description: "Tech giants invest billions in AI startups",
                                        impact: "Potential disruption across industries",
                                        details: "Major tech companies are pouring unprecedented amounts into AI research and startups, signaling a new era of technological advancement and potential market shifts."
                                    },
                                    {
                                        title: "Green Energy Breakthrough",
                                        description: "New solar technology doubles efficiency",
                                        impact: "Renewable energy stocks surge",
                                        details: "A groundbreaking solar panel technology has been announced, promising to double the efficiency of current models. This could accelerate the adoption of solar energy and boost related stocks."
                                    },
                                    {
                                        title: "Global Supply Chain Shifts",
                                        description: "Companies diversify manufacturing bases",
                                        impact: "Emerging markets see increased investment",
                                        details: "In response to recent global events, many multinational corporations are diversifying their supply chains, leading to increased investment in various emerging markets."
                                    },
                                    {
                                        title: "Cryptocurrency Regulation",
                                        description: "Major economies agree on crypto framework",
                                        impact: "Increased stability in crypto markets expected",
                                        details: "A group of major economies has agreed on a regulatory framework for cryptocurrencies, which is expected to bring more stability and legitimacy to the crypto market."
                                    },
                                    {
                                        title: "Healthcare AI Integration",
                                        description: "AI diagnostics approved for clinical use",
                                        impact: "Healthcare tech stocks rally",
                                        details: "Regulatory bodies have approved the use of AI in clinical diagnostics, paving the way for more efficient and accurate medical treatments. Healthcare technology stocks are seeing significant gains."
                                    },
                                    {
                                        title: "Space Tourism Takes Off",
                                        description: "First commercial space hotel announced",
                                        impact: "Aerospace and tourism sectors buzz with activity",
                                        details: "A major aerospace company has announced plans for the first commercial space hotel, set to open within the decade. This news is causing excitement in both the aerospace and tourism industries."
                                    }
                                ].map((item) => (
                                    <div key={item.title} className="space-y-1">
                                        <div className="flex items-center">
                                            <TrendingUp className="mr-1 h-3 w-3 text-purple-500" />
                                            <p className="text-xs font-medium leading-none">{item.title}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground pl-4">{item.description}</p>
                                        <p className="text-xs text-purple-600 pl-4 italic">{item.impact}</p>
                                        <p className="text-xs text-muted-foreground pl-4">{item.details}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </GrainedCard>

                <Card className="p-3 md:col-span-2 lg:col-span-3">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                            <Briefcase className="h-4 w-4 mr-1 text-yellow-600" />
                            Spending Breakdown
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={spendingData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </Card>
    )
}

interface FinancialSummaryContentProps {
    totalSpent: number;
    spentChange: number;
    budgetPercentage: number;
    totalSaved: number;
    savedChange: number;
    goalPercentage: number;
    netWorth: number;
    netWorthChange: number;
}

function FinancialSummaryContent({ totalSpent, spentChange, budgetPercentage, totalSaved, savedChange, goalPercentage, netWorth, netWorthChange }: Readonly<FinancialSummaryContentProps>) {
    return (
        <div className="space-y-4">
            <div>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">Total Spent</p>
                    {spentChange > 0 ? (
                        <ArrowUpRight className="h-3 w-3 text-red-500" />
                    ) : (
                        <ArrowDownRight className="h-3 w-3 text-green-500" />
                    )}
                </div>
                <p className="text-lg font-bold text-blue-700">${totalSpent.toFixed(2)}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{spentChange > 0 ? '+' : ''}{spentChange}% from last period</span>
                    <span>Budget: {budgetPercentage}%</span>
                </div>
                <Progress value={budgetPercentage} className="h-1 mt-1" />
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">Total Saved</p>
                    {savedChange > 0 ? (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                    ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                </div>
                <p className="text-lg font-bold text-blue-700">${totalSaved.toFixed(2)}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{savedChange > 0 ? '+' : ''}{savedChange}% from last period</span>
                    <span>Goal: {goalPercentage}%</span>
                </div>
                <Progress value={goalPercentage} className="h-1 mt-1" />
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">Net Worth</p>
                    {netWorthChange > 0 ? (
                        <ArrowUpRight className="h-3 w-3 text-blue-500" />
                    ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                </div>
                <p className="text-lg font-bold text-blue-700">${netWorth.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{netWorthChange > 0 ? '+' : ''}{netWorthChange}% this period</p>
            </div>
        </div>
    )
}