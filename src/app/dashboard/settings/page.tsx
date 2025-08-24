import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  // This would be dynamic based on the user's subscription
  const plan = "Free"; // "Free", "Premium", "Pro", "Pro Annual"
  
  const usage = {
    resumes: 1,
    coverLetters: 0,
    outreachMessages: 2,
  };
  
  const limits = {
    Free: { resumes: 1, coverLetters: 1, outreachMessages: 3 },
    Premium: { resumes: Infinity, coverLetters: Infinity, outreachMessages: Infinity },
    Pro: { resumes: Infinity, coverLetters: Infinity, outreachMessages: Infinity },
    "Pro Annual": { resumes: Infinity, coverLetters: Infinity, outreachMessages: Infinity },
  };

  const currentLimits = limits[plan as keyof typeof limits] || limits.Free;
  const isFreePlan = plan === 'Free';

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
                <h3 className="text-lg font-semibold">{plan} Plan</h3>
                <p className="text-sm text-muted-foreground">
                  {plan === 'Free' ? 'You are currently on the Free plan.' : `Your plan renews on ${new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}.`}
                </p>
              </div>
              <Button className="mt-2 sm:mt-0">Upgrade to Pro</Button>
            </div>
            
            {isFreePlan && (
              <>
                <Separator />
                <div>
                  <h4 className="text-md font-semibold mb-4">Current Usage</h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>AI Resume Builds</span>
                        <span>{usage.resumes} of {currentLimits.resumes} used</span>
                      </div>
                      <Progress value={(usage.resumes / currentLimits.resumes) * 100} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>AI Cover Letters</span>
                        <span>{usage.coverLetters} of {currentLimits.coverLetters} used</span>
                      </div>
                      <Progress value={(usage.coverLetters / currentLimits.coverLetters) * 100} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>LinkedIn Outreach</span>
                        <span>{usage.outreachMessages} of {currentLimits.outreachMessages} used</span>
                      </div>
                      <Progress value={(usage.outreachMessages / currentLimits.outreachMessages) * 100} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
