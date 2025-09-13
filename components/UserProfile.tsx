import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User, Edit, GraduationCap, Mail, LogOut } from 'lucide-react';
import { useAuth } from './AuthProvider';

export function UserProfile() {
  const { user, logout } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    education: user?.education || 'Student'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-auto p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {getInitials(userInfo.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="text-sm truncate">{userInfo.name}</div>
              <div className="text-xs text-muted-foreground truncate">{userInfo.email}</div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              User Profile
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl">
                  {getInitials(isEditing ? tempUserInfo.name : userInfo.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={tempUserInfo.name}
                    onChange={(e) => setTempUserInfo({...tempUserInfo, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={tempUserInfo.email}
                    onChange={(e) => setTempUserInfo({...tempUserInfo, email: e.target.value})}
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Education Qualification
                  </Label>
                  <Input
                    id="education"
                    value={tempUserInfo.education}
                    onChange={(e) => setTempUserInfo({...tempUserInfo, education: e.target.value})}
                    placeholder="e.g., Computer Science Student, PhD in Physics"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p>{userInfo.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="break-all">{userInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Education Qualification</p>
                      <p>{userInfo.education}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    variant="outline" 
                    className="flex-1 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button 
                    onClick={logout}
                    variant="outline" 
                    className="flex-1 flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/20"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}