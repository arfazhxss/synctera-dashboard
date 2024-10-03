import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpRight, TrendingUp, DollarSign, PieChart, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function FinanceInsights() {
    return (
        <Card className="w-full overflow-hidden p-4">
            <div className="grid grid-cols-3 divide-x gap-x-4">
                <Card className="rounded-none border-none shadow-none p-3">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Financial Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium">Total Spent</p>
                                    <ArrowUpRight className="h-3 w-3 text-red-500" />
                                </div>
                                <p className="text-lg font-bold">$1,248.32</p>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>+2.5% from last month</span>
                                    <span>Budget: 75%</span>
                                </div>
                                <Progress value={75} className="h-1 mt-1" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium">Total Saved</p>
                                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                                </div>
                                <p className="text-lg font-bold">$8,764.90</p>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>+18.7% from last month</span>
                                    <span>Goal: 92%</span>
                                </div>
                                <Progress value={92} className="h-1 mt-1" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium">Net Worth</p>
                                    <ArrowUpRight className="h-3 w-3 text-blue-500" />
                                </div>
                                <p className="text-lg font-bold">$142,568.23</p>
                                <p className="text-xs text-muted-foreground">+5.2% this quarter</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-none shadow-none p-3">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                            <PieChart className="h-4 w-4 mr-1" />
                            Portfolio Allocation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                        <div className="space-y-3 text-xs">
                            {[
                                { name: "Stocks", percentage: 40, color: "bg-blue-500", change: "+2.3%" },
                                { name: "Bonds", percentage: 30, color: "bg-green-500", change: "-0.5%" },
                                { name: "Real Estate", percentage: 20, color: "bg-yellow-500", change: "+1.2%" },
                                { name: "Crypto", percentage: 10, color: "bg-purple-500", change: "+5.7%" },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center w-1/2">
                                        <div className={`mr-2 h-2 w-2 rounded-full ${item.color}`} />
                                        <span>{item.name}</span>
                                    </div>
                                    <div className="w-1/4 text-right">{item.percentage}%</div>
                                    <div className={`w-1/4 text-right ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-xs">
                            <p className="font-medium">Total Portfolio Value</p>
                            <p className="text-lg font-bold">$89,532.67</p>
                            <p className="text-muted-foreground">+3.2% past week</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-none shadow-none p-3">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                            <Activity className="h-4 w-4 mr-1" />
                            Market Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[220px] w-full pr-4">
                            <div className="space-y-3">
                                {[
                                    {
                                        title: "Tech Startup XYZ Raises $50M",
                                        description: "AI development funding secured",
                                        impact: "Positive for tech sector"
                                    },
                                    {
                                        title: "Green Energy Corp Expands",
                                        description: "New solar farm project announced",
                                        impact: "Bullish for renewable energy stocks"
                                    },
                                    {
                                        title: "Global Markets React to Rates",
                                        description: "Central banks adjust policies",
                                        impact: "Volatility expected in forex markets"
                                    },
                                    {
                                        title: "E-commerce Giant Acquires AI Firm",
                                        description: "$2B deal finalized yesterday",
                                        impact: "Potential industry disruption"
                                    },
                                    {
                                        title: "Crypto Regulations Tighten",
                                        description: "New policies from regulators",
                                        impact: "Short-term uncertainty for crypto assets"
                                    },
                                    {
                                        title: "Major Bank Reports Q2 Earnings",
                                        description: "Exceeds analyst expectations",
                                        impact: "Positive outlook for financial sector"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex items-center">
                                            <TrendingUp className="mr-1 h-3 w-3 text-muted-foreground" />
                                            <p className="text-xs font-medium leading-none">{item.title}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground pl-4">{item.description}</p>
                                        <p className="text-xs text-primary pl-4 italic">{item.impact}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </Card>
    )
}