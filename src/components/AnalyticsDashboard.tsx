import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Eye, Clock } from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  uniqueSessions: number;
  topPages: { path: string; count: number }[];
  dailyStats: { date: string; views: number }[];
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    todayViews: 0,
    uniqueSessions: 0,
    topPages: [],
    dailyStats: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Get today's date at midnight in IST
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Total views
      const { count: totalViews } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true });

      // Today's views
      const { count: todayViews } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      // Unique sessions (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: sessionData } = await supabase
        .from('page_views')
        .select('session_id')
        .gte('created_at', thirtyDaysAgo.toISOString());

      const uniqueSessions = new Set(sessionData?.map(v => v.session_id) || []).size;

      // Top pages (last 30 days)
      const { data: pageData } = await supabase
        .from('page_views')
        .select('page_path')
        .gte('created_at', thirtyDaysAgo.toISOString());

      const pageCounts = (pageData || []).reduce((acc: Record<string, number>, { page_path }) => {
        acc[page_path] = (acc[page_path] || 0) + 1;
        return acc;
      }, {});

      const topPages = Object.entries(pageCounts)
        .map(([path, count]) => ({ path, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Daily stats (last 7 days)
      const dailyStatsData: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        const dateStr = date.toISOString().split('T')[0];
        dailyStatsData[dateStr] = 0;
      }

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const { data: dailyData } = await supabase
        .from('page_views')
        .select('created_at')
        .gte('created_at', sevenDaysAgo.toISOString());

      (dailyData || []).forEach(({ created_at }) => {
        const dateStr = new Date(created_at).toISOString().split('T')[0];
        if (dailyStatsData[dateStr] !== undefined) {
          dailyStatsData[dateStr]++;
        }
      });

      const dailyStats = Object.entries(dailyStatsData).map(([date, views]) => ({
        date,
        views,
      }));

      setAnalytics({
        totalViews: totalViews || 0,
        todayViews: todayViews || 0,
        uniqueSessions,
        topPages,
        dailyStats,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Loading analytics...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.todayViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Daily Views</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analytics.dailyStats.reduce((sum, day) => sum + day.views, 0) / 7).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Last 7 Days Traffic</CardTitle>
          <CardDescription>Daily page views breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analytics.dailyStats.map((stat) => (
              <div key={stat.date} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {new Date(stat.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full" 
                      style={{ 
                        width: `${Math.min((stat.views / Math.max(...analytics.dailyStats.map(s => s.views))) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <Badge variant="secondary">{stat.views}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages (Last 30 Days)</CardTitle>
          <CardDescription>Most visited pages on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <span className="text-sm font-mono">{page.path}</span>
                </div>
                <Badge>{page.count} views</Badge>
              </div>
            ))}
            {analytics.topPages.length === 0 && (
              <p className="text-sm text-muted-foreground">No data available yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
