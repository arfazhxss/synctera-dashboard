"use client"

import { useState, useEffect, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Wallet, TrendingUp, Bell, CreditCard, PiggyBank } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface GrainedCardProps {
    children: ReactNode;
    className: string;
}

const performanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
]

const grainedBackgroundStyle = `
  .grained-background {
    position: relative;
  }
  .grained-background::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.1;
    pointer-events: none;
  }
`

function GrainedCard({ children, className }: Readonly<GrainedCardProps>) {
    return (
        <Card className={`${className} grainedReadonly<GrainedCardProps> transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}>
            {children}
        </Card>
    )
}

function PersonalizedGreeting() {
    const [greeting, setGreeting] = useState("")
    const [insight, setInsight] = useState("")
    const [newsIndex, setNewsIndex] = useState(0)

    const news = [
        "NASDAQ hits new all-time high",
        "Fed signals potential rate cut",
        "Renewable energy investments surge",
        "Crypto market shows recovery",
        "Major fintech merger announced",
        "AI-driven trading strategies gain traction",
        "Global supply chain disruptions ease",
    ]

    useEffect(() => {
        const hour = new Date().getHours()
        let greetingMessage
        if (hour < 12) {
            greetingMessage = "Good morning"
        } else if (hour < 18) {
            greetingMessage = "Good afternoon"
        } else {
            greetingMessage = "Good evening"
        }
        setGreeting(greetingMessage)

        const insights = [
            "Portfolio up 3.2% this week",
            "85% of monthly savings goal reached",
            "New AI advisor feature available",
            "Credit score improved by 15 points",
            "Dividend payout of $250 received",
            "New tax-saving opportunity identified",
            "Upcoming bill payment in 3 days",
        ]
        setInsight(insights[Math.floor(Math.random() * insights.length)])

        const interval = setInterval(() => {
            setNewsIndex((prevIndex) => (prevIndex + 1) % news.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [news.length])

    return (
        <GrainedCard className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 text-black border border-gray-200 shadow-sm">
            <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">
                        {greeting},<br />
                        <span className="text-3xl text-blue-600">John!</span>
                    </h2>
                    <Bell className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{insight}</p>
                <div className="h-6 overflow-hidden border-t pt-2">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={newsIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-xs font-medium text-blue-700"
                        >
                            {news[newsIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </CardContent>
        </GrainedCard>
    )
}

function AccountBalance() {
    return (
        <GrainedCard className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 text-black border border-gray-200 shadow-sm hover:shadow-md transition-opacity">
            <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">Account Balance</h2>
                    <Wallet className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold mb-2 flex-grow text-green-700">$24,500.75</p>
                <div className="border-t pt-2">
                    <p className="text-sm text-gray-600">Available: $22,750.50</p>
                    <p className="text-xs text-gray-500 mt-2">
                        Last updated: a minute ago
                    </p>
                    <div className="mt-2">
                        <p className="text-xs font-medium mb-1">Spending limit: $5,000</p>
                        <Progress value={60} className="h-1" />
                        <p className="text-xs text-right mt-1">$3,000 / $5,000</p>
                    </div>
                </div>
            </CardContent>
        </GrainedCard>
    )
}

function InvestmentPerformance() {
    return (
        <GrainedCard className="w-full h-full bg-gradient-to-br from-purple-50 to-indigo-100 text-black border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">Investment Performance</h2>
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold mb-2 flex-grow text-purple-700">+8.3%</p>
                <div className="border-t pt-2">
                    <p className="text-sm text-gray-600">Total gain: $1,850.25</p>
                    <div className="mt-2 text-xs text-gray-500 flex justify-between">
                        <span>1D: +0.5%</span>
                        <span>1W: +2.1%</span>
                        <span>1M: +5.7%</span>
                        <span>1Y: +12.4%</span>
                    </div>
                    <div className="mt-4 h-24">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </GrainedCard>
    )
}

function CreditCardOverview() {
    return (
        <GrainedCard className="w-full h-full bg-gradient-to-br from-yellow-50 to-amber-100 text-black border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">Credit Card</h2>
                    <CreditCard className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold mb-2 flex-grow text-yellow-700">$3,250.00</p>
                <div className="border-t pt-2">
                    <p className="text-sm text-gray-600">Available credit: $6,750.00</p>
                    <div className="mt-2">
                        <p className="text-xs font-medium mb-1">Credit utilization: 32.5%</p>
                        <Progress value={32.5} className="h-1" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Next payment due: 15 days
                    </p>
                </div>
            </CardContent>
        </GrainedCard>
    )
}

function SavingsGoals() {
    return (
        <GrainedCard className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100 text-black border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">Savings Goals</h2>
                    <PiggyBank className="h-5 w-5 text-pink-600" />
                </div>
                <Tabs defaultValue="vacation" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="vacation">Vacation</TabsTrigger>
                        <TabsTrigger value="emergency">Emergency</TabsTrigger>
                        <TabsTrigger value="retirement">Retirement</TabsTrigger>
                    </TabsList>
                    <TabsContent value="vacation">
                        <SavingsGoalContent goal={5000} current={3500} name="Vacation" />
                    </TabsContent>
                    <TabsContent value="emergency">
                        <SavingsGoalContent goal={10000} current={7500} name="Emergency Fund" />
                    </TabsContent>
                    <TabsContent value="retirement">
                        <SavingsGoalContent goal={500000} current={125000} name="Retirement" />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </GrainedCard>
    )
}

interface SavingsGoalContentProps {
    goal: number;
    current: number;
    name: string;
}

function SavingsGoalContent({ goal, current, name }: Readonly<SavingsGoalContentProps>) {
    const percentage = (current / goal) * 100
    return (
        <div>
            <p className="text-lg font-bold mb-2 text-pink-700">{name}</p>
            <p className="text-3xl font-bold mb-2">${current.toLocaleString()}</p>
            <Progress value={percentage} className="h-2 mb-2" />
            <div className="flex justify-between text-sm text-gray-600">
                <span>{percentage.toFixed(1)}% of goal</span>
                <span>Goal: ${goal.toLocaleString()}</span>
            </div>
        </div>
    )
}

function RecentTransactions() {
    const transactions = [
        { id: 1, description: "Grocery Store", amount: -85.32, date: "2023-06-15" },
        { id: 2, description: "Salary Deposit", amount: 3500.00, date: "2023-06-14" },
        { id: 3, description: "Electric Bill", amount: -120.50, date: "2023-06-13" },
        { id: 4, description: "Online Shopping", amount: -65.99, date: "2023-06-12" },
        { id: 5, description: "Restaurant", amount: -45.00, date: "2023-06-11" },
    ]

    return (
        <GrainedCard className="w-full h-full bg-gradient-to-br from-gray-50 to-slate-100 text-black border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">Recent Transactions</h2>
                    <ArrowUpRight className="h-5 w-5 text-gray-600" />
                </div>
                <div className="overflow-y-auto flex-grow">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-xs text-gray-500">{transaction.date}</p>
                            </div>
                            <p className={`font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'} `}>
                                {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </GrainedCard>
    )
}

export default function CustomerDashboard() {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }
    return (
        <>
            <style>{grainedBackgroundStyle}</style>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <PersonalizedGreeting />
                <AccountBalance />
                <InvestmentPerformance />
                <CreditCardOverview />
                <SavingsGoals />
                <RecentTransactions />
            </div>
        </>
    )
}