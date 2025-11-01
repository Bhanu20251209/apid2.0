// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useAuthStore } from "@/store/AuthStore";
// import { 
//   BarChart3, 
//   TrendingUp, 
//   Users, 
//   Calendar,
//   AlertTriangle,
//   Heart,
//   MessageCircle,
//   BookOpen,
//   Shield,
//   Download,
//   X,
//   CheckCircle,
//   Info
// } from "lucide-react";

// const AlertItem = ({ alert, onDismiss }) => {
//   return (
//     <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
//       <div>
//         <p className="font-medium text-red-700 flex items-center space-x-1">
//           <AlertTriangle className="h-5 w-5" />
//           <span>High Suicide Risk</span>
//         </p>
//         <p className="text-sm">User prompt: {alert.userMessage}</p>
//         <p className="text-xs text-muted-foreground">
//           Student: {alert.user?.name || "Unknown"}
//         </p>
//         <p className="text-xs text-muted-foreground">
//           Mail: {alert.user?.email || "Not provided"}
//         </p>
//         <p className="text-xs text-muted-foreground">
//           {new Date(alert.timestamp).toLocaleString()}
//         </p>
//       </div>
//       <button onClick={onDismiss} className="text-gray-500 hover:text-gray-700">
//         <X className="h-5 w-5" />
//       </button>
//     </div>
//   );
// };

// const AdminAlerts = () => {
//   const [alerts, setAlerts] = useState([]);

//   // Fetch alerts periodically (polling)
//   const fetchAlerts = async () => {
//     try {
//       const res = await fetch("http://localhost:3001/admin/alerts");
//       if (res.ok) {
//         const data = await res.json();
//         console.log("data: ",data)
//         setAlerts(data);
//       } else {
//         console.error("Failed to fetch alerts:", res.statusText);
//       }
//     } catch (err) {
//       console.error("Error fetching alerts:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAlerts(); // Initial fetch
//     const interval = setInterval(fetchAlerts, 5000); // refresh every 5s
//     return () => clearInterval(interval);
//   }, []);

//   const dismissAlert = (index) => {
//     setAlerts((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="space-y-4">
//       {alerts.length === 0 && (
//         <p className="text-sm text-muted-foreground">No urgent alerts.</p>
//       )}
//       {alerts.map((alert, index) => (
//         <AlertItem key={index} alert={alert} onDismiss={() => dismissAlert(index)} />
//       ))}
//     </div>
//   );
// };

// // Main Admin Dashboard
// const Admin = () => {
//   const stats = {
//     totalBookings: 234,
//     activeUsers: 1847,
//     resourceViews: 5629,
//     forumPosts: 89,
//     urgentCases: 12,
//     satisfactionRate: 94
//   };

//   const trendData = [
//     { category: "Anxiety", percentage: 45, trend: "up", color: "bg-blue-500" },
//     { category: "Academic Stress", percentage: 38, trend: "up", color: "bg-green-500" },
//     { category: "Depression", percentage: 25, trend: "down", color: "bg-purple-500" },
//     { category: "Social Issues", percentage: 18, trend: "up", color: "bg-pink-500" },
//     { category: "Sleep Problems", percentage: 32, trend: "up", color: "bg-yellow-500" }
//   ];

//   const resourceMetrics = [
//     { name: "Stress Management Videos", views: 1243, downloads: 89, rating: 4.8 },
//     { name: "Meditation Audio Guide", views: 987, downloads: 156, rating: 4.9 },
//     { name: "Study Anxiety Toolkit", views: 756, downloads: 234, rating: 4.7 },
//     { name: "Sleep Hygiene Guide", views: 543, downloads: 67, rating: 4.6 }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
//           <p className="text-xl text-muted-foreground">
//             Anonymous analytics and insights for mental health interventions
//           </p>
//           <div className="flex items-center justify-center mt-4 space-x-2">
//             <Shield className="h-5 w-5 text-trust" />
//             <span className="text-sm text-muted-foreground">All data is anonymized and HIPAA compliant</span>
//           </div>
//         </div>

//         {/* Key Metrics */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-2">
//                 <Calendar className="h-5 w-5 text-trust" />
//                 <div>
//                   <p className="text-2xl font-bold">{stats.totalBookings}</p>
//                   <p className="text-xs text-muted-foreground">Total Bookings</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-2">
//                 <Users className="h-5 w-5 text-wellness" />
//                 <div>
//                   <p className="text-2xl font-bold">{stats.activeUsers}</p>
//                   <p className="text-xs text-muted-foreground">Active Users</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-2">
//                 <BookOpen className="h-5 w-5 text-support" />
//                 <div>
//                   <p className="text-2xl font-bold">{stats.resourceViews}</p>
//                   <p className="text-xs text-muted-foreground">Resource Views</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-2">
//                 <MessageCircle className="h-5 w-5 text-primary" />
//                 <div>
//                   <p className="text-2xl font-bold">{stats.forumPosts}</p>
//                   <p className="text-xs text-muted-foreground">Forum Posts</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-2">
//                 <AlertTriangle className="h-5 w-5 text-destructive" />
//                 <div>
//                   <p className="text-2xl font-bold">{stats.urgentCases}</p>
//                   <p className="text-xs text-muted-foreground">Urgent Cases</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-2">
//                 <Heart className="h-5 w-5 text-pink-500" />
//                 <div>
//                   <p className="text-2xl font-bold">{stats.satisfactionRate}%</p>
//                   <p className="text-xs text-muted-foreground">Satisfaction</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <Tabs defaultValue="overview" className="w-full">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="trends">Trends</TabsTrigger>
//             <TabsTrigger value="resources">Resources</TabsTrigger>
//             <TabsTrigger value="alerts">Alerts</TabsTrigger>
//           </TabsList>

//           {/* Overview */}
//           <TabsContent value="overview">
//             <div className="grid lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Mental Health Trends</CardTitle>
//                   <CardDescription>Most common concerns this month</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {trendData.map((item, index) => (
//                       <div key={index} className="flex items-center space-x-3">
//                         <div className={`w-4 h-4 rounded ${item.color}`}></div>
//                         <div className="flex-1">
//                           <div className="flex justify-between items-center mb-1">
//                             <span className="text-sm font-medium">{item.category}</span>
//                             <div className="flex items-center space-x-2">
//                               <span className="text-sm">{item.percentage}%</span>
//                               <TrendingUp className={`h-4 w-4 ${item.trend === 'up' ? 'text-red-500' : 'text-green-500'}`} />
//                             </div>
//                           </div>
//                           <div className="w-full bg-muted rounded-full h-2">
//                             <div 
//                               className={`h-2 rounded-full ${item.color}`}
//                               style={{ width: `${item.percentage}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Service Utilization</CardTitle>
//                   <CardDescription>Platform usage breakdown</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
//                       <div className="flex items-center space-x-2">
//                         <Calendar className="h-5 w-5 text-trust" />
//                         <span>Counseling Bookings</span>
//                       </div>
//                       <Badge variant="secondary">234 total</Badge>
//                     </div>
//                     <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
//                       <div className="flex items-center space-x-2">
//                         <BookOpen className="h-5 w-5 text-wellness" />
//                         <span>Resource Access</span>
//                       </div>
//                       <Badge variant="secondary">5.6k views</Badge>
//                     </div>
//                     <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
//                       <div className="flex items-center space-x-2">
//                         <MessageCircle className="h-5 w-5 text-support" />
//                         <span>Peer Support</span>
//                       </div>
//                       <Badge variant="secondary">89 posts</Badge>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Trends */}
//           <TabsContent value="trends">
//             <div className="grid gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Emerging Patterns</CardTitle>
//                   <CardDescription>Insights for intervention planning</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <h4 className="font-medium">High Priority Areas</h4>
//                       <div className="space-y-2">
//                         <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                           <p className="text-sm font-medium text-red-800">Exam Period Stress</p>
//                           <p className="text-xs text-red-600">300% increase in anxiety-related bookings</p>
//                         </div>
//                         <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
//                           <p className="text-sm font-medium text-orange-800">Sleep Disorders</p>
//                           <p className="text-xs text-orange-600">Rising trend among first-year students</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <h4 className="font-medium">Positive Trends</h4>
//                       <div className="space-y-2">
//                         <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
//                           <p className="text-sm font-medium text-green-800">Resource Engagement</p>
//                           <p className="text-xs text-green-600">40% increase in self-help tool usage</p>
//                         </div>
//                         <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                           <p className="text-sm font-medium text-blue-800">Peer Support Growth</p>
//                           <p className="text-xs text-blue-600">More students becoming volunteers</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Resources */}
//           <TabsContent value="resources">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Resource Performance</CardTitle>
//                 <CardDescription>Most accessed mental health resources</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {resourceMetrics.map((resource, index) => (
//                     <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
//                       <div className="flex-1">
//                         <h4 className="font-medium">{resource.name}</h4>
//                         <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
//                           <span>{resource.views} views</span>
//                           <span>{resource.downloads} downloads</span>
//                           <div className="flex items-center space-x-1">
//                             <span>⭐ {resource.rating}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <Button variant="outline" size="sm">
//                         <Download className="h-4 w-4 mr-2" />
//                         Export Data
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Alerts */}
//           <TabsContent value="alerts">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Alerts & Notifications</CardTitle>
//                 <CardDescription>Important updates requiring attention</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <AdminAlerts />
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useAuthStore } from "@/store/AuthStore"; // Unused import removed
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  AlertTriangle,
  Heart,
  MessageCircle,
  BookOpen,
  Shield,
  Download,
  X,
  CheckCircle,
  Info
} from "lucide-react";

// --- Alert Display Component (Internal/Helper) ---
// This is the component for displaying individual alerts within the 'Alerts' tab
const IntegratedAlertItem = ({ alert, onDismiss }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50 hover:bg-red-100 transition duration-200 shadow-sm">
      <div className="flex-1">
        <p className="font-medium text-red-700 flex items-center space-x-2 mb-1">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span>High Suicide Risk</span>
          <Badge variant="destructive" className="ml-2">Urgent</Badge>
        </p>
        <p className="text-sm">Prompt: **"{alert.userMessage.substring(0, 80)}{alert.userMessage.length > 80 ? '...' : ''}"**</p>
        <div className="mt-2 text-xs text-muted-foreground space-y-0.5">
          <p>Student: {alert.user?.name || "Unknown"} ({alert.user?.email || "Not provided"})</p>
          <p>Timestamp: {new Date(alert.timestamp).toLocaleString()}</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onDismiss} 
        className="text-gray-500 hover:text-red-700"
        title="Dismiss Alert"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

// Main Admin Dashboard
const Admin = () => {
  const [alerts, setAlerts] = useState([]);
  const [isAlertBarDismissed, setIsAlertBarDismissed] = useState(false);

  // --- Integrated Alert Logic ---
  const fetchAlerts = async () => {
    try {
      // NOTE: Using a placeholder array since a live server isn't available in this context.
      // In a real app, this would be a fetch call: 
      const res = await fetch("http://localhost:3001/admin/alerts");
      
      // Placeholder data for demonstration:
      const placeholderData = [
        {
          id: 1,
          userMessage: "I don't think I can handle this pressure anymore. Maybe I should just quit everything.",
          timestamp: new Date().toISOString(),
          user: { name: "Alice Johnson", email: "alice.j@uni.edu" }
        },
        {
          id: 2,
          userMessage: "Feeling completely lost and overwhelmed, I've been sleeping all day and can't focus on school work.",
          timestamp: new Date(Date.now() - 60000).toISOString(),
          user: { name: "Mark Lee", email: "mark.l@uni.edu" }
        }
      ].filter((_, i) => i < 2); // Cap the number of placeholder alerts

      // Assuming fetch was successful or using placeholder:
      const data = await res.json();
      // const data = placeholderData;

      // Only update if there are new/different alerts to avoid unnecessary re-renders with static data
      if (JSON.stringify(alerts.map(a => a.id)) !== JSON.stringify(data.map(a => a.id))) {
         setAlerts(data);
         setIsAlertBarDismissed(false); // New alerts bring the bar back
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setAlerts([]); // Clear alerts on error or keep previous state
    }
  };

  useEffect(() => {
    fetchAlerts(); // Initial fetch
    const interval = setInterval(fetchAlerts, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (alertId) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };
  // --- End Integrated Alert Logic ---

  const stats = {
    totalBookings: 234,
    activeUsers: 1847,
    resourceViews: 5629,
    forumPosts: 89,
    urgentCases: alerts.length, // Dynamically use the real alert count
    satisfactionRate: 94
  };

  const trendData = [
    { category: "Anxiety", percentage: 45, trend: "up", color: "bg-blue-500" },
    { category: "Academic Stress", percentage: 38, trend: "up", color: "bg-green-500" },
    { category: "Depression", percentage: 25, trend: "down", color: "bg-purple-500" },
    { category: "Social Issues", percentage: 18, trend: "up", color: "bg-pink-500" },
    { category: "Sleep Problems", percentage: 32, trend: "up", color: "bg-yellow-500" }
  ];

  const resourceMetrics = [
    { name: "Stress Management Videos", views: 1243, downloads: 89, rating: 4.8 },
    { name: "Meditation Audio Guide", views: 987, downloads: 156, rating: 4.9 },
    { name: "Study Anxiety Toolkit", views: 756, downloads: 234, rating: 4.7 },
    { name: "Sleep Hygiene Guide", views: 543, downloads: 67, rating: 4.6 }
  ];

  // --- Canva-style Alert Bar Component ---
  const AlertStatusBar = () => {
    if (alerts.length === 0) {
      return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-100 text-green-800 border border-green-300 mb-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5" />
            <p className="font-medium text-sm">System Status: All clear. No urgent mental health alerts.</p>
          </div>
        </div>
      );
    }

    if (alerts.length > 0 && !isAlertBarDismissed) {
      return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-red-100 text-red-800 border border-red-300 mb-6 shadow-lg animate-pulse-once">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <p className="font-semibold text-sm">
              **URGENT ACTION REQUIRED:** You have **{alerts.length}** high-risk mental health alert{alerts.length !== 1 ? 's' : ''}.
              <a href="#alerts-tab" className="ml-3 underline font-bold hover:text-red-900 transition duration-150">View Details</a>
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsAlertBarDismissed(true)}
            className="text-red-700 hover:bg-red-200"
            title="Temporarily Dismiss Bar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }
    
    // Fallback if dismissed but alerts still exist
    return (
        <div className="flex items-center justify-end mb-6">
             <Button variant="outline" size="sm" onClick={() => setIsAlertBarDismissed(false)}>
                 <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                 Show {alerts.length} Urgent Alert{alerts.length !== 1 ? 's' : ''}
             </Button>
        </div>
    );
  };
  // --- End Canva-style Alert Bar Component ---
  const c = async () => {
    try {
      await fetch("http://localhost:3001/admin/alerts/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      setAlerts([]); 
    } catch (err) {
      console.error("Failed to clear alerts:", err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Anonymous analytics and insights for mental health interventions
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm text-muted-foreground">All data is anonymized and HIPAA compliant</span>
          </div>
        </div>
        
        {/* Integrated Alert Status Bar (Canva Style) */}
        <AlertStatusBar />

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {/* Metrics remain the same, using stats.urgentCases which now uses alerts.length */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-trust" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  <p className="text-xs text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-wellness" />
                <div>
                  <p className="text-2xl font-bold">{stats.activeUsers}</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-support" />
                <div>
                  <p className="text-2xl font-bold">{stats.resourceViews}</p>
                  <p className="text-xs text-muted-foreground">Resource Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.forumPosts}</p>
                  <p className="text-xs text-muted-foreground">Forum Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={stats.urgentCases > 0 ? "border-2 border-red-500 shadow-md" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`h-5 w-5 ${stats.urgentCases > 0 ? 'text-red-500' : 'text-destructive'}`} />
                <div>
                  <p className="text-2xl font-bold">{stats.urgentCases}</p>
                  <p className="text-xs text-muted-foreground">Urgent Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.satisfactionRate}%</p>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="alerts" id="alerts-tab">
                Alerts 
                {alerts.length > 0 && (
                    <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs animate-pulse">
                        {alerts.length}
                    </Badge>
                )}
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mental Health Trends</CardTitle>
                  <CardDescription>Most common concerns this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{item.category}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{item.percentage}%</span>
                              <TrendingUp className={`h-4 w-4 ${item.trend === 'up' ? 'text-red-500' : 'text-green-500'}`} />
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Utilization</CardTitle>
                  <CardDescription>Platform usage breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-trust" />
                        <span>Counseling Bookings</span>
                      </div>
                      <Badge variant="secondary">234 total</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-wellness" />
                        <span>Resource Access</span>
                      </div>
                      <Badge variant="secondary">5.6k views</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5 text-support" />
                        <span>Peer Support</span>
                      </div>
                      <Badge variant="secondary">89 posts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends */}
          <TabsContent value="trends">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emerging Patterns</CardTitle>
                  <CardDescription>Insights for intervention planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">High Priority Areas</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm font-medium text-red-800">Exam Period Stress</p>
                          <p className="text-xs text-red-600">300% increase in anxiety-related bookings</p>
                        </div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-sm font-medium text-orange-800">Sleep Disorders</p>
                          <p className="text-xs text-orange-600">Rising trend among first-year students</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Positive Trends</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-medium text-green-800">Resource Engagement</p>
                          <p className="text-xs text-green-600">40% increase in self-help tool usage</p>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">Peer Support Growth</p>
                          <p className="text-xs text-blue-600">More students becoming volunteers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Performance</CardTitle>
                <CardDescription>Most accessed mental health resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceMetrics.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{resource.name}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span><BookOpen className="h-4 w-4 inline mr-1" />{resource.views} views</span>
                          <span><Download className="h-4 w-4 inline mr-1" />{resource.downloads} downloads</span>
                          <div className="flex items-center space-x-1">
                            <span>⭐ {resource.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts (Now Integrated) */}
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts & Notifications</CardTitle>
                <CardDescription>Important updates requiring immediate attention

                  
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.length === 0 && (
                    <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg bg-gray-50 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                        <p className="text-sm">No urgent mental health alerts requiring action at this time.</p>
                    </div>
                  )}
                  {alerts.map((alert) => (
                    <IntegratedAlertItem 
                        key={alert.id} 
                        alert={alert} 
                        onDismiss={() => dismissAlert(alert.id)} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;