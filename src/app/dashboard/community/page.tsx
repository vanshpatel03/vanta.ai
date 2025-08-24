import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Alex Johnson", points: 2450, avatar: "https://placehold.co/100x100.png", hint: "person" },
  { rank: 2, name: "Samantha Bee", points: 2300, avatar: "https://placehold.co/100x100.png", hint: "person" },
  { rank: 3, name: "Ken Watanabe", points: 2150, avatar: "https://placehold.co/100x100.png", hint: "person" },
  { rank: 4, name: "Maria Garcia", points: 1980, avatar: "https://placehold.co/100x100.png", hint: "person" },
  { rank: 5, name: "David Miller", points: 1800, avatar: "https://placehold.co/100x100.png", hint: "person" },
  { rank: 6, name: "Jessica Chen", points: 1750, avatar: "https://placehold.co/100x100.png", hint: "person" },
  { rank: 7, name: "Brian O'Connell", points: 1600, avatar: "https://placehold.co/100x100.png", hint: "person" },
];

export default function CommunityPage() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Trophy />
            Top Job Hunters
          </CardTitle>
          <CardDescription>See who is leading the job search game this week.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank}>
                  <TableCell>
                     <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted font-bold">
                        {user.rank}
                     </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.hint} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                       {user.rank === 1 && <Badge variant="default">Top User</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{user.points} XP</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
