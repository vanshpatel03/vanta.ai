import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const usage = {
    resumes: 1,
    coverLetters: 1,
    outreachMessages: 3,
  };
  const limits = {
    resumes: 2,
    coverLetters: 2,
    outreachMessages: 5,
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Alex Doe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@vanta.ai" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="current_password">Current Password</Label>
              <Input id="current_password" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new_password">New Password</Label>
              <Input id="new_password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Subscription</CardTitle>
          <CardDescription>Manage your billing and subscription plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">Free Plan</h3>
                <p className="text-sm text-muted-foreground">You are currently on the Free plan.</p>
              </div>
              <Button className="mt-2 sm:mt-0">Upgrade to Pro</Button>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-md font-semibold mb-4">Current Usage</h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>AI Resume Builds</span>
                    <span>{usage.resumes} of {limits.resumes} used</span>
                  </div>
                  <Progress value={(usage.resumes / limits.resumes) * 100} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>AI Cover Letters</span>
                    <span>{usage.coverLetters} of {limits.coverLetters} used</span>
                  </div>
                  <Progress value={(usage.coverLetters / limits.coverLetters) * 100} />
                </div>
                 <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>LinkedIn Outreach</span>
                    <span>{usage.outreachMessages} of {limits.outreachMessages} used</span>
                  </div>
                  <Progress value={(usage.outreachMessages / limits.outreachMessages) * 100} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
